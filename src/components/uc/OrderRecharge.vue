<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-11 13:26:14
 * @LastEditTime: 2019-09-02 16:13:06
 * @LastEditors: Please set LastEditors
 -->
<script>
let audio = require("@/assets/audio/notice.wav");

export default {
  name: "Recharge",
  data() {
    return {
      loading: false,
      tableDatas: [],

      payInfo: [],
      cancel: {
        money: 0,
        sn: "",
        modal: false,
        payModal: false
      },
      payCode: {
        value: "",
        size: 300,
        backgroundAlpha: 1,
        background: "white",
        foreground: "black",
        level: "L"
      },

      loadingTimer: null,
      loadingTimerDuration: 5 * 1000,
      audio: {
        src: audio,
        open:
          localStorage.getItem("order/recharge/audio/open/status") === "open"
      }
    };
  },

  computed: {
    tableColumns() {
      let self = this;
      let columns = [];
      columns.push({
        title: this.$t("uc.otcorder.orderno"),
        key: "orderSn",
        minWidth: 60,
        align: "center",
        render: function(h, params) {
          return h("p", [
            h(
              "a",
              {
                on: {
                  click: function() {
                    self.$router.push("/chat?tradeId=" + params.row.orderSn);
                  }
                },
                class: "vc-text--link"
              },
              params.row.orderSn
            )
          ]);
        }
      });
      columns.push({
        title: this.$t("uc.otcorder.created"),
        key: "createTime",
        minWidth: 90,
        align: "center"
      });
      // columns.push({
      //   title: this.$t("uc.otcorder.symbol"),
      //   key: "unit",
      //   // width: 80,
      //   align: "center"
      // });
      // columns.push({
      //   title: this.$t("uc.otcorder.type"),
      //   key: "type",
      //   // width: 90,
      //   align: "center",
      //   render: (h, params) => {
      //     let text = "";
      //     if (params.row.type == 0) {
      //       text = self.$t("uc.otcorder.type_buy");
      //     } else {
      //       text = self.$t("uc.otcorder.type_sell");
      //     }
      //     return h("div", [h("p", text)]);
      //   }
      // });
      columns.push({
        title: this.$t("uc.otcorder.tradename"),
        key: "name",
        // width: 80,
        ellipsis: "true",
        align: "center",
        render: function(h, params) {
          return h("p", [
            h(
              "a",
              {
                on: {
                  click: function() {
                    self.$router.push("/checkuser?id=" + params.row.name);
                  }
                },
                class: "vc-text--link"
              },
              params.row.name
            )
          ]);
        }
      });
      columns.push({
        title: this.$t("uc.otcorder.amount"),
        key: "amount",
        align: "center"
      });
      columns.push({
        title: this.$t("uc.otcorder.money"),
        key: "money",
        align: "center"
      });

      columns.push({
        title: "付款方式",
        key: "payMode",
        align: "center"
      });
      columns.push({
        title: "剩余时间",
        key: "commission",
        align: "center",
        render(h, params) {
          let time = self.strTime(params.row && params.row.leftTime, false);
          return h("span", { class: "vc-text--pramiry" }, time);
        }
      });
      columns.push({
        title: "操作",
        key: "done",
        align: "center",
        render(h, params, index) {
          if (params.row && params.row.type == 0) {
            return h("p", [
              h(
                "Button",
                {
                  on: {
                    click: function() {
                      let sn = params.row && params.row.orderSn;
                      self.cancel.money = params.row && params.row.money;
                      self.cancel.sn = sn;
                      self.getOrderDatail(sn);
                    }
                  },
                  props: {
                    type: "warning"
                  },
                  style: {
                    marginRight: "8px",
                    marginBottom: "8px"
                  }
                },
                "去付款"
              )
            ]);
          } else {
            return h(
              "span",
              {
                class: "vc-text--danger"
              },
              "等待付款"
            );
          }
        }
      });

      return columns;
    }
  },
  mounted() {
    //this.audio.open = localStorage.getItem('order/recharge/audio/open/status') ==='open'
    this.initPage();
  },
  methods: {
    strTime(value, Millisecond = true) {
      if (Number(value) < 0) return 0;
      value = Millisecond ? value : value * 1000;

      const MINUTE = 60 * 1000;
      let minutes = Math.floor(value / MINUTE);
      let seconds = Math.floor((value - minutes * MINUTE) / 1000);

      return minutes === 0 && seconds === 0
        ? "已过期"
        : minutes === 0
          ? `${seconds}秒`
          : `${minutes}分 ${seconds}秒`;
    },
    initPage() {
      this.getOrder(true);
      this.setLoadingTimer();
    },
    cancelOrder() {
      this.$http
        .post(this.host + "/otc/order/pay", {
          orderSn: this.cancel.sn
        })
        .then(response => {
          var resp = response.body;

          if (resp.code == 0) {
            this.$Message.success(resp.message);
            this.cancel.payModal = false;
            this.cancel.sn = ""; // 完成放币后需要删除当前处理的订单
            this.initPage();
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    setLoadingTimer() {
      this.clearLoadingTimer();

      this.loadingTimer = setInterval(() => {
        this.getOrder(false);
        // 判断当前弹出的订单是否还存在，即过期
        if (this.cancel.sn && !this.isExit()) {
          this.$Message.error("订单已过期！");
          this.cancel.payModal = false;
          this.cancel.sn = "";
        }
      }, this.loadingTimerDuration);
    },

    isExit() {
      for (let n = 0; n < this.tableDatas.length; n++) {
        let orderSn = this.tableDatas[n]["orderSn"];
        if (orderSn === this.cancel.sn) return true;
      }
      return false;
    },

    // 清除定时器
    clearLoadingTimer() {
      clearInterval(this.loadingTimer);
      this.loadingTimer = null;
    },
    getOrder(loading = false) {
      this.loading = loading; // 是否显示加载动画

      let params = {
        status: 1,
        pageNo: 0,
        pageSize: 20
      };

      this.$http.post(this.host + "/otc/order/goToPay").then(response => {
        var resp = response.body;
        if (resp.code == 0 && resp.data) {
          this.tableDatas = resp.data; //.filter((item)=>{ return item['type'] == 0 });
          this.isEmergeNewOrder();
        } else {
          this.$Message.error(resp.message);
        }
        this.loading = false;
      });
    },
    getOrderDatail(tradeId) {
      this.$http
        .post(this.host + "/otc/order/detail", {
          orderSn: tradeId
        })
        .then(response => {
          var resp = response.body;
          if (resp.code == 0 && resp.data.payInfo) {
            let payInfo = resp.data.payInfo;
            this.payInfo = [];
            let payModes = resp.data.payMode && resp.data.payMode.split(",");
            if (payModes.indexOf("支付宝") > -1 && payInfo["alipay"]) {
              let aliInfo = {
                title: payInfo["alipay"]["alipay"],
                value: payInfo["alipay"]["alipayUrl"],
                value2: payInfo["alipay"]["alipayCodeUrl"],
                realName: payInfo["alipay"]["alipayRealName"],
                key: "ali",
                type: "支付宝"
              };
              this.payInfo.push(aliInfo);
            }
            if (payModes.indexOf("银联") > -1 && payInfo["bankInfo"]) {
              let cardInfo = {
                key: "card",
                type: "银行卡",
                title: payInfo["bankInfo"]["bankRealName"],
                value: payInfo["bankInfo"]["cardNo"],
                value2: payInfo["bankInfo"]["bank"] // 银行类型
              };
              this.payInfo.push(cardInfo);
            }
            if (payModes.indexOf("微信") > -1 && payInfo["wechatPay"]) {
              let wxInfo = {
                type: "微信",
                key: "wx",
                title: payInfo["wechatPay"]["wechat"],
                value: payInfo["wechatPay"]["wechatUrl"],
                value2: payInfo["wechatPay"]["qrWeCodeUrl"]
              };
              this.payInfo.push(wxInfo);
            }

            if (payModes.indexOf("云闪付") > -1 && payInfo["unionpay"]) {
              let wxInfo = {
                type: "云闪付",
                key: "unionpay",
                title: payInfo["unionpay"]["unionpay"],
                value: payInfo["unionpay"]["unionpayUrl"],
                value2: payInfo["unionpay"]["unionpayCodeUrl"]
              };
              this.payInfo.push(wxInfo);
            }

            this.cancel.payModal = true;
            console.log(this.payInfo);
          } else {
            this.$Message.error("获取付款方式失败！");
            this.cancel.payModal = false;
          }
        });
    },
    // 判断数组，后面数组是否有数据添加
    isEmergeNewOrder() {
      let id = 0; // 订单最新的唯一id，用于判断是否有新的数据的添加
      this.tableDatas.forEach(element => {
        id = Math.max(id, element["orderId"]);
      });
      let newOrderUniqueId =
        localStorage.getItem("order/recharge/new/unique/id") || 0;
      localStorage.setItem("order/recharge/new/unique/id", id);
      if (newOrderUniqueId < id) {
        this.audio.open && this.playAudio();
      }
    },

    // 音频播放
    playAudio: function() {
      var audio = document.getElementById("noticeMusic");
      if (audio !== null) audio.play();
    }
  },
  watch: {
    ["audio.open"](val) {
      localStorage.setItem(
        "order/recharge/audio/open/status",
        val ? "open" : "close"
      );
    }
  },
  beforeDestroy() {
    this.clearLoadingTimer();
  }
};
</script>

<template>
  <div class="nav-rights">
    <audio id="noticeMusic" :src="audio.src">
      您的浏览器不支持 audio 标签。
    </audio>

    <div class="nav-right">
      <div class="bill_box_order">
        <div style="marginBottom:10px;text-align:right">
          <Checkbox v-model="audio.open">
            {{ audio.open ? "关闭" : "开启" }}新订单消息提醒</Checkbox
          >
        </div>
        <div>
          <Table
            no-data-text="暂无买入订单"
            :columns="tableColumns"
            :data="tableDatas"
            :loading="loading"
            :disabled-hover="true"
          ></Table>
        </div>
      </div>
    </div>

    <Modal
      v-model="cancel.modal"
      :title="$t('otc.chat.tip')"
      @on-ok="cancelOrder()"
      :mask-closable="false"
      class="ivu-modal--left"
      width="400px"
    >
      <p style="color:red;font-weight: bold;">{{ $t("otc.chat.msg1") }}</p>
    </Modal>

    <Modal
      v-model="cancel.payModal"
      :mask-closable="false"
      class="ivu-modal--left"
      width="400px"
    >
      <div slot="header">
        <p style="text-align: center">
          {{ cancel.sn }}
        </p>
      </div>
      <div class="vp-paytype">
        <div class="vp-paytype__label">
          <span style="font-size:50px">￥ {{ cancel.money }}</span>
        </div>
        <div class="vp-paytype__body">
          <div
            v-for="(item, index) in payInfo"
            :key="index"
            class="vp-payType__item"
          >
            <span class="vp-text__type">{{ item["type"] }}</span>
            <div class="vp-payType__content">
              <span class="vp-text__title"
                >{{ item["title"] }}
                <span class="vp-text__title" v-if="item['realName']"
                  >({{ item["realName"] }})
                </span>
              </span>
              <span
                class="vp-text__value"
                v-if="item['key'] === 'card'"
                style="font-size:20px"
              >
                {{ item["value"] }}</span
              >
              <span
                class="vp-text__value"
                v-if="item['key'] === 'card'"
                style="font-size:20px"
              >
                {{ item["value2"] }}</span
              >

              <div v-else>
                <div style="position:relative" v-if="item['value']">
                  <div
                    style="position: absolute;top:50%;left:50%;transform: translate(-50%,-50%);background-color: white"
                  >
                    <i
                      class="icons "
                      :class="{
                        'alipay-plus': item['key'] == 'ali',
                        'wechat-plus': item['key'] == 'wx',
                        'unionpay-plus': item['key'] == 'unionpay'
                      }"
                      style="height:50px;width: 50px;"
                    ></i>
                  </div>
                  <qriously
                    :value="item.value"
                    :size="payCode.size"
                    :level="payCode.level"
                    :background="payCode.background"
                    :foreground="payCode.foreground"
                    :backgroundAlpha="payCode.backgroundAlpha"
                  />
                </div>
                <div
                  v-else
                  :style="{
                    width: payCode.size + 'px',
                    height: payCode.size + 'px',
                    textAlign: 'center'
                  }"
                >
                  <img
                    :src="item.value2"
                    alt=""
                    :style="{ height: '100%', width: 'auto' }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="text-align:center;padding:10px;">
          <Button type="warning" @click.native="cancelOrder">完成付款</Button>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<style>
.bill_box_order {
  width: 99%;
  padding-left: 20px;
  height: auto;
  margin: 0 auto;
}

.vc-text--pramiry {
  color: #f0a70a;
}
.vc-text--danger {
  color: red;
}
.vc-text--link,
.vc-text--link:hover {
  color: #f0a70a;
}

.ivu-table-body .ivu-table-column-center {
}

.vp-paytype__label {
  padding: 10px;
  text-align: center;
}
.vp-paytype__body {
  padding: 20px;
  display: flex;
}
.vp-payType__item {
  flex: 1;
  text-align: center;
}
.vp-payType__content {
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.vp-text__type {
  padding: 10px;
  color: #f0a70a;
  font-size: 18px;
  font-weight: 800;
}
.vp-text__title {
  padding: 10px;
  font-size: 16px;
}

.icons.alipay {
  background-image: url(../../assets/img/alipay.png);
}
.icons.alipay-plus {
  background-image: url(../../assets/img/alipay-plus.png);
}

.icons.wechat {
  background-image: url(../../assets/img/wechat.png);
}
.icons.wechat-plus {
  background-image: url(../../assets/img/wechat-plus.png);
}
.icons.unionpay {
  background-image: url(../../assets/img/unionpay.png);
}
.icons.unionpay-plus {
  background-image: url(../../assets/img/unionpay.png);
}
.icons {
  height: 17px;
  width: 17px;
  display: inline-block;
  margin-top: -1px;
  background-size: 100% 100%;
  vertical-align: middle;
}
</style>
