<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-22 10:21:52
 * @LastEditTime: 2019-08-18 12:03:47
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
      cancel: {
        modal: false,
        value: "",
        sn: ""
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
        title: "备注",
        key: "payRemark",
        align: "center"
      });
      columns.push({
        title: "支付方式",
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
                      self.cancel.modal = true;
                      self.cancel.sn = params.row && params.row.orderSn;
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
            return h(
              "span",
              {
                class: "vc-text--danger"
              },
              "等待放币"
            );
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

    cancelOrderPay(sn) {
      console.log(sn);
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
     * 处理订单 - 放币
     */

    cancelOrder() {
      var params = {
        orderSn: this.cancel.sn,
        jyPassword: this.cancel.value
      };
      if (params.jyPassword == "") {
        this.$Message.error(this.$t("otc.chat.msg7tip"));
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

      this.$http.post(this.host + "/otc/order/goToConfirm").then(response => {
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
        localStorage.getItem("order/withdraw/new/unique/id") || 0;
      localStorage.setItem("order/withdraw/new/unique/id", id);
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
      <span class="vui-color--danger">
        用户正在付款，请在确认收到买家付款后及时点击【确认放币】，否则请勿点击
      </span>
      <span style="float:right">
        <Checkbox v-model="audio.open">
          {{ audio.open ? "关闭" : "开启" }}新订单消息提醒</Checkbox
        >
      </span>
    </div>
    <audio id="noticeMusic" :src="audio.src">
      您的浏览器不支持 audio 标签。
    </audio>

    <div class="nav-right">
      <div class="bill_box_order">
        <div>
          <Table
            no-data-text="暂无卖出订单"
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
      title="提示"
      @on-ok="cancelOrder()"
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
            v-model="cancel.value"
            placeholder="请输入资金交易密码"
            autocomplete="off"
          ></Input>
        </div>
      </div>
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
</style>
