<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-22 10:21:52
 * @LastEditTime: 2019-08-18 12:40:50
 * @LastEditors: Please set LastEditors
 -->
<script>
import { max } from "@/assets/js/array";
let audio = require("@/assets/audio/notice.wav");

export default {
  name: "Recharge",
  data() {
    return {
      loading: false,
      tableDatas: [],
      payTypeModal: false,
      loadingTimer: null,
      loadingTimerDuration: 5 * 1000,
      payInfo: [],
      withdraw: {
        modal: false,
        value: "",
        sn: ""
      },
      recharge: {
        modal: false,
        value: "",
        sn: ""
      },
      payCode: {
        value: "",
        size: 300,
        backgroundAlpha: 1,
        background: "white",
        foreground: "black",
        level: "L"
      },
      audio: {
        src: audio,
        open:
          localStorage.getItem("order/withdraw/audio/open/status") === "open"
      }
    };
  },

  computed: {
    tableColumns() {
      let self = this;
      let columns = [];
      columns.push({
        title: "订单号",
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
                    //self.detail.modal = true
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
        title: "交易类型",
        key: "type",
        align: "center",
        render: (h, params) => {
          let text = "";
          if (params.row.type == 0) {
            text = "买入";
          } else {
            text = "卖出";
          }
          return h("div", text);
        }
      });
      columns.push({
        title: "创建时间",
        key: "createTime",
        minWidth: 90,
        align: "center"
      });

      columns.push({
        title: "交易对象",
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
        title: "数量",
        key: "amount",
        align: "center"
      });
      columns.push({
        title: "金额",
        key: "money",
        align: "center"
      });

      columns.push({
        title: "备注",
        key: "payRemark",
        align: "center"
      });
      columns.push({
        title: "支付/收款方式",
        key: "payMode",
        align: "center"
      });

      columns.push({
        title: "操作",
        key: "done",
        align: "center",
        render(h, params, index) {
          if (params.row && params.row.type == 1) {
            return h("p", [
              h(
                "Button",
                {
                  on: {
                    click: function() {
                      self.withdraw.modal = true;
                      self.withdraw.sn = params.row && params.row.orderSn;
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
                "确认放币"
              )
            ]);
          } else {
            return h("p", [
              h(
                "Button",
                {
                  on: {
                    click: function() {
                      let sn = params.row && params.row.orderSn;
                      self.recharge.money = params.row && params.row.money;
                      self.recharge.sn = sn;
                      self.getOrderDatail(sn);
                    }
                  },
                  props: {
                    type: "success"
                  },
                  style: {
                    marginRight: "8px",
                    marginBottom: "8px"
                  }
                },
                "去付款"
              )
            ]);
          }
        }
      });

      return columns;
    }
  },

  mounted() {
    this.initPage();
  },

  methods: {
    /**
     * 初始化页面，获取订单列表，并设置获取订单的定时器
     */
    initPage() {
      this.getOrder(true);
      this.setLoadingTimer();
    },
    /**
     * 获取订单的定时器
     */
    setLoadingTimer() {
      this.clearLoadingTimer();

      this.loadingTimer = setInterval(() => {
        this.getOrder(false);
        // 判断当前弹出的订单是否还存在，即过期
      }, this.loadingTimerDuration);
    },

    /**
     * 清除获取订单的定时器
     */

    clearLoadingTimer() {
      clearInterval(this.loadingTimer);
      this.loadingTimer = null;
    },

    /**
     * 处理订单 - 放币/付款
     */

    cancelOrder(type) {
      if (type === "withdraw") {
        var params = {
          orderSn: this.withdraw.sn,
          jyPassword: this.withdraw.value
        };
        if (params.jyPassword == "") {
          this.$Message.error("请输入交易密码");
          return;
        }

        this.$http
          .post(this.host + "/otc/order/release", params)
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              this.$Message.success(resp.message);
              this.initPage();
            } else {
              this.$Message.error(resp.message);
            }
          });
      } else {
        this.$http
          .post(this.host + "/otc/order/pay", {
            orderSn: this.recharge.sn
          })
          .then(response => {
            var resp = response.body;

            if (resp.code == 0) {
              this.$Message.success(resp.message);
              this.recharge.modal = false;
              this.recharge.sn = ""; // 完成放币后需要删除当前处理的订单
              this.initPage();
            } else {
              this.$Message.error(resp.message);
            }
          });
      }
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

            this.recharge.modal = true;
            console.log(this.payInfo);
          } else {
            this.$Message.error("获取付款方式失败！");
            this.recharge.modal = false;
          }
        });
    },

    /**
     * 获取订单列表
     */

    getOrder(loading = false) {
      this.loading = loading; // 是否显示加载动画

      let params = {
        status: 2,
        pageNo: 0,
        pageSize: 20
      };

      this.$http
        .post(this.host + "/otc/order/goToPayOrConfirm")
        .then(response => {
          var resp = response.body;
          if (resp.code === 0 && resp.data) {
            this.tableDatas = resp.data;
            this.isEmergeNewOrder();
          } else {
            this.$Message.error(resp.message);
          }
          this.loading = false;
        });
    },

    /**
     * 判断数组，后面数组是否有数据添加
     */

    isEmergeNewOrder() {
      let id = 0; // 订单最新的唯一id，用于判断是否有新的数据的添加
      this.tableDatas.forEach(element => {
        id = Math.max(id, element["orderId"]);
      });
      let newOrderUniqueId =
        localStorage.getItem("order/rechage-withdraw/new/unique/id") || 0;
      localStorage.setItem("order/rechage-withdraw/new/unique/id", id);
      if (newOrderUniqueId < id) {
        this.audio.open && this.playAudio();
      }
    },

    /**
     * 音频播放
     */

    playAudio: function() {
      var audio = document.getElementById("noticeMusic");
      if (audio !== null) audio.play();
    }
  },
  watch: {
    ["audio.open"](val) {
      localStorage.setItem(
        "order/withdraw/audio/open/status",
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
    <div style="margin-bottom: 10px; text-align:center;overflow:hidden">
      <span style="float:right">
        <Checkbox v-model="audio.open">
          {{ audio.open ? "关闭" : "开启" }}新订单消息提醒
        </Checkbox>
      </span>
    </div>
    <audio id="noticeMusic" :src="audio.src">
      您的浏览器不支持 audio 标签。
    </audio>

    <div class="nav-right">
      <div class="bill_box_order">
        <div>
          <Table
            no-data-text="暂无订单"
            :columns="tableColumns"
            :data="tableDatas"
            :loading="loading"
            :disabled-hover="true"
          ></Table>
        </div>
      </div>
    </div>
    <Modal
      v-model="withdraw.modal"
      title="提示"
      @on-ok="cancelOrder('withdraw')"
      :mask-closable="false"
      class="ivu-modal--left"
      width="400px"
    >
      <div class="">
        <div class="vui-margin-bottom">
          <span class="vui-color--danger">是否确认放币？</span>
        </div>
        <div>
          <Input
            type="password"
            v-model="withdraw.value"
            placeholder="请输入资金交易密码"
            autocomplete="off"
          ></Input>
        </div>
      </div>
    </Modal>
    <Modal
      v-model="recharge.modal"
      :mask-closable="false"
      class="ivu-modal--left"
      width="400px"
    >
      <div slot="header">
        <p style="text-align: center">
          {{ recharge.sn }}
        </p>
      </div>
      <div class="vp-paytype">
        <div class="vp-paytype__label">
          <span style="font-size:50px">￥ {{ recharge.money }}</span>
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
          <Button type="warning" @click.native="cancelOrder('recharge')"
            >完成付款</Button
          >
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
</style>
