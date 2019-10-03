<script>
import { max } from "@/assets/js/array";
let audio = require("@/assets/audio/newAppeal_no.mp3");

export default {
  name: "Recharge",
  data() {
    return {
      loading: false,
      tableDatas: [],
      payTypeModal: false,
      loadingTimer: null,
      loadingTimerDuration: 5 * 1000,

      audio: {
        src: audio,
        open: localStorage.getItem("order/custom/audio/open/status") === "open"
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
                    localStorage.setItem(
                      "app/order/custom/message",
                      JSON.stringify(params.row)
                    );
                    self.$router.push(
                      "/chat?tradeId=" + params.row.orderSn + "&type=custom"
                    );
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
        title: "申诉时间",
        key: "appealTime",
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
        key: "customerName",
        align: "center"
      });
      columns.push({
        title: this.$t("uc.otcorder.money"),
        key: "money",
        align: "center"
      });
      columns.push({
        title: this.$t("uc.otcorder.fee"),
        key: "commission",
        align: "center"
      });
      columns.push({
        title: "支付方式",
        key: "payMode",
        align: "center"
      });
      columns.push({
        title: "交易类型",
        key: "payMode",
        align: "center",
        render: (h, params) => {
          let text = "";
          if (params.row.advertiseType == 0) {
            text = "提现";
          } else {
            text = "充值";
          }
          return h("div", [h("p", text)]);
        }
      });
      columns.push({
        title: "操作",
        key: "done",
        align: "center",
        render(h, params, index) {
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
                  type: "warning"
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
      });

      return columns;
    }
  },
  mounted() {
    //this.audio.open =
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
      }, this.loadingTimerDuration);
    },

    /**
     * 清除获取订单的定时器
     */

    clearLoadingTimer() {
      clearInterval(this.loadingTimer);
      this.loadingTimer = null;
    },

    getOrder(loading = false) {
      this.loading = loading; // 是否显示加载动画

      this.$http.post(this.host + "/otc/order/appealOrder").then(response => {
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
     * 判断是否有申诉订单
     */

    isEmergeNewOrder() {
      let orderIds = this.tableDatas
        .map((item, index) => {
          return item["orderId"];
        })
        .join(",")
        .split(",");

      let ids = (localStorage.getItem("order/custom/ids") || "").split(",");

      localStorage.setItem("order/custom/ids", orderIds.join(","));

      for (let n = 0; n < orderIds.length; n++) {
        let temp = orderIds[n];
        if (!ids.includes(temp)) {
          console.log("refff");
          this.audio.open && this.playAudio();
        }
      }
    },

    /**
     * 音频播放
     */

    playAudio: function() {
      var audio = document.getElementById("custom");
      if (audio !== null) audio.play();
    }
  },
  watch: {
    ["audio.open"](val) {
      localStorage.setItem(
        "order/custom/audio/open/status",
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
          {{ audio.open ? "关闭" : "开启" }}申诉订单消息提醒</Checkbox
        >
      </span>
    </div>
    <audio id="custom" :src="audio.src">您的浏览器不支持 audio 标签。</audio>

    <div class="nav-right">
      <div class="bill_box_order">
        <div>
          <Table
            no-data-text="暂无申诉订单"
            :columns="tableColumns"
            :data="tableDatas"
            :loading="loading"
            :disabled-hover="true"
          ></Table>
        </div>
      </div>
    </div>
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
  height: auto;
}
</style>
