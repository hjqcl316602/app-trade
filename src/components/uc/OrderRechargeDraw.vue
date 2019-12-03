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
      content: {
        scanOrders: [],
        payModeData: {},
        sort: []
      },

      payTypeModal: false,
      loadingTimer: null,
      loadingTimerDuration: 5 * 1000,
      payInfo: [],
      withdraw: {
        modal: false,
        value: "",
        sn: "",
        timer: null,
        backtime: 0
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
      },
      online: {
        timer: null,
        backtime: 0
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
        title: "订单类型",
        key: "type",
        align: "center",
        render: (h, { row }) => {
          if (row.orderType === "customer") {
            return h(
              "p",
              { style: { color: "red", "font-weight": 800 } },
              "申诉订单"
            );
          }
        }
      });
      columns.push({
        title: "交易类型",
        key: "type",
        align: "center",
        render: (h, params) => {
          let text = "";
          if (params.row.type === 0) {
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
        ellipsis: "true",
        align: "center",
        render: function(h, { row }) {
          if (row.orderType !== "customer") {
            return h("p", row.name);
          }
          // return h("p", [
          //   h(
          //     "a",
          //     {
          //       on: {
          //         click: function() {
          //           self.$router.push("/checkuser?id=" + params.row.name);
          //         }
          //       },
          //       class: "vc-text--link"
          //     },
          //     params.row.name
          //   )
          // ]);
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
          let row = params.row;
          if (row == null) return false;
          // 卖出方，需要放币方

          if (row.orderType === "customer") {
            return h("p", [
              h(
                "Button",
                {
                  on: {
                    click: function() {
                      localStorage.setItem(
                        "app/order/custom/message",
                        JSON.stringify(params.row)
                      );
                      self.$router.push(
                        "/chat?tradeId=" + params.row.orderSn + "&type=custom"
                      );
                    }
                  },
                  props: {
                    type: "error"
                  },
                  style: {
                    marginRight: "8px",
                    marginBottom: "8px"
                  }
                },
                "去处理"
              )
            ]);
          }
          if (row.type === 1) {
            if (row.status === 1) {
              return h("p", { style: { color: "red" } }, "等待付款");
            } else if (row.status === 2) {
              return h("p", [
                h(
                  "Button",
                  {
                    on: {
                      click: function() {
                        self.withdraw.modal = true;
                        self.withdraw.backtime = 5;
                        self.setReleaseTimer();
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
            }
          } else if (row.type === 0) {
            // 买入方，需要付款方
            if (row.status === 1) {
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
            } else {
              return h("p", { style: { color: "red" } }, "等待放行");
            }
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
     * 确认放行前
     */
    beforeRelease() {
      this.withdraw.modal = true;
      this.withdraw.backtime = 5;
      this.setReleaseTimer();
    },
    setReleaseTimer() {
      this.clearReleaseTimer();
      this.withdraw.timer = setInterval(() => {
        this.withdraw.backtime--;
        if (this.withdraw.backtime === 0) {
          this.clearReleaseTimer();
        }
      }, 1000);
    },
    clearReleaseTimer() {
      clearInterval(this.withdraw.timer);
      this.withdraw.timer = null;
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
              this.withdraw.modal = false;
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
      this.$http
        .post(this.host + "/otc/order/goToPayOrConfirm")
        .then(({ body }) => {
          this.loading = false;
          let { code, data, message } = body;
          if (code === 0 && data) {
            let { scanOrders, payModeData, sort, appealOrders } = data;
            let newOrders = [];
            scanOrders.forEach(ele => {
              newOrders.push(Object.assign(ele, { orderType: "sellBuy" }));
            });
            appealOrders.forEach(ele => {
              newOrders.push(Object.assign(ele, { orderType: "customer" }));
            });
            this.content.scanOrders = newOrders;
            this.content.sort = sort;
            let newPayModeData = [];
            let keys = Object.keys(payModeData);
            keys.forEach(key => {
              newPayModeData.push({
                text: key,
                value: payModeData[key]
              });
            });
            this.content.payModeData = newPayModeData;
            console.log(this.content);
            //this.getCostomer();
          } else {
            this.loading = false;
            this.$Message.error(message);
          }
        });
    },
    getCostomer() {
      // this.$http.post(this.host + "/otc/order/appealOrder").then(response => {
      //   let resp = response.body;
      //   if (resp.code === 0 && resp.data) {
      //     let resList = resp.data;
      //     let newRes = [];
      //     resList.forEach(ele => {
      //       newRes.push(Object.assign(ele, { orderType: "customer" }));
      //     });
      //     this.tableDatas = this.tableDatas.concat(newRes);
      //     console.log(this.tableDatas);
      //   } else {
      //     this.$Message.error(resp.message);
      //   }
      //   this.loading = false;
      // });
    },

    /**
     * 音频播放
     */

    playAudio: function() {
      var audio = document.getElementById("noticeMusic");
      if (audio !== null) audio.play();
    },
    /**
     * 抢单
     */
    setOnline() {
      this.$http.post(this.host + "/uc/member/online").then(({ body }) => {
        console.log(body);
        let { code, data, message } = body;
        if (code === 0) {
          this.getOrder();
          this.setOnlineTimer();
        } else this.$Message.error(message);
      });
    },
    setOnlineTimer() {
      this.clearOnlineTimer();
      this.online.backtime = 5 * 60 * 1000;
      this.online.timer = setInterval(() => {
        this.online.backtime -= 1000;
        if (this.online.backtime === 0) {
          this.clearOnlineTimer();
        }
      }, 1000);
    },
    clearOnlineTimer() {
      clearInterval(this.online.timer);
      this.online.timer = null;
    },
    /**
     * 格式化时间
     */
    formatTime(times) {
      let hour = 1000 * 60 * 60;

      let minute = 1000 * 60;

      let second = 1000;

      let hours = Math.floor(times / hour);

      let minutes = Math.floor((times - hours * hour) / minute);

      let seconds = Math.floor(
        (times - hours * hour - minutes * minute) / second
      );

      //console.log(hours, minutes, seconds);
      function getZero(time) {
        return Number(time) > 9 ? time : "0" + time;
      }
      if (hours > 0) {
        return `${hours}时${getZero(minutes)}分${getZero(seconds)}秒`;
      }

      if (minutes > 0) {
        return `${getZero(minutes)}分${getZero(seconds)}秒`;
      }

      if (seconds > 0) {
        return `${getZero(seconds)}秒`;
      }
      return 0;
    }
  },
  watch: {
    ["audio.open"](val) {
      localStorage.setItem(
        "order/withdraw/audio/open/status",
        val ? "open" : "close"
      );
    },
    ["withdraw.modal"]() {
      this.withdraw.value = "";
    }
  },
  beforeDestroy() {
    this.clearLoadingTimer();
  }
};
</script>

<template>
  <div class="nav-rights">
    <template v-if="false">
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
    </template>

    <template>
      <div style="line-height: 36px">
        <div class=" ">
          <span class="vi-text is-weight--bold" style="font-size: 16px">
            当前平台正在接单的数量
          </span>
        </div>
        <div class=" vi-padding-left is-padding-left--larger">
          <div class="vi-flex">
            <div
              v-for="(item, index) in content.payModeData"
              class="vi-margin-right is-margin-right--larger"
            >
              <span class="vi-text is-weight--bold">{{ item.text }}：</span>
              <span class="vi-text is-color--primary" style="font-size: 24px">
                {{ item.value }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="content.sort.length > 0">
      <div style="line-height: 36px" class="vi-margin-top">
        <div class="">
          <span class="vi-text is-weight--bold" style="font-size: 16px">
            我的广告
          </span>
        </div>
        <div class="vi-padding-left is-padding-left--larger">
          <div v-for="(item, index) in content.sort" class="vi-flex">
            <div class="vi-margin-right is-margin-right--larger">
              <span class=" vi-text is-weight--bold">
                类型：
              </span>
              <span class="vi-text  ">
                {{ item.advertiseType === 1 ? "在线出售" : "在线够买" }}
              </span>
            </div>
            <div class="vi-margin-right is-margin-right--larger">
              <span class=" vi-text is-weight--bold">
                方式：
              </span>
              <span class="vi-text ">
                {{ item.payMode }}
              </span>
            </div>
            <div class="vi-margin-right is-margin-right--larger">
              <span class=" vi-text is-weight--bold">
                剩余数量|TTM：
              </span>
              <span class="vi-text  "> {{ item.remainAmount }}  </span>
            </div>
            <div class="vi-margin-right is-margin-right--larger">
              <span class=" vi-text is-weight--bold">
                排队号：
              </span>
              <span class="vi-text is-color--primary" style="font-size: 24px">
                {{ item.sortOrder }}
              </span>
            </div>
            <div class="vi-margin-right is-margin-right--larger">
              <span class=" vi-text is-weight--bold">
                抢单号：
              </span>
              <span class="vi-text is-color--primary" style="font-size: 24px">
                {{ item.pickOrder || "--" }}
              </span>
            </div>
          </div>
          <div>
            <i-button
              size="large"
              long
              type="primary"
              @click="setOnline"
              v-if="online.backtime === 0"
            >
              抢单
            </i-button>
            <i-button size="large" long type="default" v-else disabled
              >{{ formatTime(online.backtime) }}后操作</i-button
            >
          </div>
        </div>
      </div>
    </template>

    <template v-if="content.scanOrders.length > 0">
      <div class="vi-margin-top">
        <div class="" style="line-height: 32px">
          <span class="vi-text is-weight--bold" style="font-size: 16px">
            我的订单
          </span>
        </div>
        <div class="vi-padding-left is-padding-left--larger">
          <Table
            no-data-text="暂无订单"
            :columns="tableColumns"
            :data="content.scanOrders"
            :loading="loading"
            :disabled-hover="true"
          ></Table>
        </div>
      </div>
    </template>
    <Modal v-model="withdraw.modal" title="放行提示" width="500px">
      <div slot="footer">
        <i-button type="default" v-if="withdraw.backtime"
          >{{ withdraw.backtime }}秒后操作</i-button
        >
        <i-button type="primary" v-else @click="cancelOrder('withdraw')"
          >确认放行</i-button
        >
      </div>
      <div class="vui-margin-bottom">
        <p class="vui-color--danger vui-font-weight--bold">温馨提示</p>
        <p
          class="vui-color--danger"
          style="text-indent: 20px;line-height: 36px"
        >
          一、最近骗子猖獗，请再次核对金额，金额正确才放行，没有收到款或者收到金额不符款项，请务放行，
          有任何问题请及时联系客服处理。
        </p>
        <p
          class="vui-color--danger"
          style="text-indent: 40px;line-height: 36px"
        >
          例如：付款方会更改自己的昵称，**通过扫码向你付款5000.00元，来迷惑收款方，其实付款方只付款了0.1元，
          已经有多名币商被骗，请一定要谨慎操作
        </p>
        <p
          class="vui-color--danger"
          style="text-indent: 20px;line-height: 36px"
        >
          二、自己不认真核对金额造成损失的，损失由自己承担。
        </p>
        <p
          class="vui-color--danger"
          style="text-indent: 20px;line-height: 36px"
        >
          三、请谨慎放行，确认收到款项再放行，确认收到款项再放行，确认收到款项再放行。
        </p>
      </div>
      <P style="color:red;font-weight: bold;">
        <Input
          type="password"
          v-model="withdraw.value"
          placeholder="请输入资金交易密码"
          autocomplete="off"
        ></Input>
      </P>
    </Modal>
    <Modal
      v-model="withdraw.modal"
      title="提示"
      @on-ok="cancelOrder('withdraw')"
      :mask-closable="false"
      class="ivu-modal--left"
      width="400px"
      v-if="false"
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
