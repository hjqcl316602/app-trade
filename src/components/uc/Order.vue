<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-01-18 09:32:45
 * @LastEditTime: 2019-09-05 16:05:25
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="nav-rights">
    <div class="nav-right">
      <div class="bill_box_order">
        <div class="order_box">
          <Tabs :value="tabName" @on-click="showItem" :animated="false">
            <TabPane :label="$t('uc.otcorder.unpaid')" name="name1">
              <div class="order-table">
                <Table
                  :no-data-text="$t('common.nodata')"
                  :columns="tableColumnsOrder"
                  :data="tableOrder"
                  :loading="loading"
                  :disabled-hover="true"
                ></Table>
                <div style="margin: 10px;overflow: hidden" class="page">
                  <div style="float: right;">
                    <Page
                      v-if="totalPage > 0"
                      :total="totalNum"
                      :current="currentPage"
                      show-total
                      @on-change="changePage"
                      :page-size="pageSize"
                    ></Page>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane :label="$t('uc.otcorder.paided')" name="name2">
              <div class="order-table">
                <Table
                  :no-data-text="$t('common.nodata')"
                  :columns="tableColumnsOrder"
                  :data="tableOrder"
                  :loading="loading"
                  :disabled-hover="true"
                ></Table>
                <div style="margin: 10px;overflow: hidden" class="page">
                  <div style="float: right;">
                    <Page
                      v-if="totalPage > 0"
                      :total="totalNum"
                      :current="currentPage"
                      show-total
                      @on-change="changePage"
                      :page-size="pageSize"
                    ></Page>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane :label="$t('uc.otcorder.finished')" name="name3">
              <div class="order-table">
                <Table
                  :no-data-text="$t('common.nodata')"
                  :columns="tableColumnsOrder"
                  :data="tableOrder"
                  :loading="loading"
                  :disabled-hover="true"
                ></Table>
                <div style="margin: 10px;overflow: hidden" class="page">
                  <div style="float: right;">
                    <Page
                      v-if="totalPage > 0"
                      :total="totalNum"
                      :current="currentPage"
                      show-total
                      @on-change="changePage"
                      :page-size="pageSize"
                    ></Page>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane :label="$t('uc.otcorder.canceled')" name="name0">
              <div class="order-table">
                <Table
                  :no-data-text="$t('common.nodata')"
                  :columns="tableColumnsOrder"
                  :data="tableOrder"
                  :loading="loading"
                  :disabled-hover="true"
                ></Table>
                <div style="margin: 10px;overflow: hidden" class="page">
                  <div style="float: right;">
                    <Page
                      v-if="totalPage > 0"
                      :total="totalNum"
                      :pageSize="pageSize"
                      show-total
                      :current="currentPage"
                      @on-change="changePage"
                    ></Page>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane :label="$t('uc.otcorder.appealing')" name="name4">
              <div class="order-table">
                <Table
                  :no-data-text="$t('common.nodata')"
                  :columns="tableColumnsOrder"
                  :data="tableOrder"
                  :loading="loading"
                  :disabled-hover="true"
                ></Table>
                <div style="margin: 10px;overflow: hidden" class="page">
                  <div style="float: right;">
                    <Page
                      v-if="totalPage > 0"
                      :total="totalNum"
                      :current="currentPage"
                      show-total
                      @on-change="changePage"
                      :page-size="pageSize"
                    ></Page>
                  </div>
                </div>
              </div>
            </TabPane>
            <Input
              v-model="ordKeyword"
              slot="extra"
              @on-click="handleSearch"
              icon="ios-search"
              :placeholder="$t('uc.otcorder.searchtip')"
              style="width: 250px;margin-right: 20px;"
            ></Input>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      ordKeyword: "",
      choseBtn: 0,
      whichItem: 1,
      tabName: localStorage.getItem("order/tab/name") || "name1",
      tabOptions: [
        { name: "name1", whichItem: 1 },
        { name: "name2", whichItem: 2 },
        { name: "name3", whichItem: 3 },
        { name: "name0", whichItem: 0 },
        { name: "name4", whichItem: 4 }
      ],
      tableOrder: [],
      loading: true,
      totalPage: 0,
      pageSize: 10,
      totalNum: 0,
      currentPage: 1,
      loginmsg: this.$t("common.logintip"),
      loadingTimer: null,
      loadingTimerDuration: 10 * 1000 // 每隔10秒钟加载一次
    };
  },
  methods: {
    // 获取历史记录信息
    handleListApproveHistory() {},

    // 设置定时器
    setLoadingTimer() {
      this.clearLoadingTimer();

      this.loadingTimer = setInterval(() => {
        this.getOrder(false);
      }, this.loadingTimerDuration);
    },

    // 清除定时器
    clearLoadingTimer() {
      clearInterval(this.loadingTimer);
      this.loadingTimer = null;
    },

    // 搜索
    handleSearch() {
      this.currentPage = 1;
      this.getOrder();
      this.setLoadingTimer();
    },

    // 切换页面
    changePage(pageNo) {
      this.currentPage = pageNo;
      this.getOrder();
      this.setLoadingTimer();
    },

    // tab切换
    showItem(name) {
      this.currentPage = 1;

      localStorage.setItem("order/tab/name", name);

      this.getItem(name);

      this.getOrder();

      this.setLoadingTimer();
    },

    // 获得tab对应的值
    getItem(name) {
      this.whichItem = this.tabOptions.find((item, index) => {
        return item["name"] === name;
      })["whichItem"];
    },

    // 获取订单数据
    getOrder(loading = true) {
      this.loading = loading; // 是否显示加载动画

      //this.tableOrder = [];

      let params = {};

      params["status"] = this.whichItem; // 状态
      params["pageNo"] = Math.max(this.currentPage - 1, 0);
      params["pageSize"] = this.pageSize;
      if (this.ordKeyword != "") {
        params["orderSn"] = this.ordKeyword;
      }
      this.$http.post(this.host + "/otc/order/self", params).then(response => {
        var resp = response.body;
        if (resp.code == 0 && resp.data.content) {
          this.tableOrder = resp.data.content;
          this.totalPage = resp.data.totalPages;
          this.totalNum = resp.data.totalElements;
        } else {
          this.$Message.error(resp.message);
        }
        this.loading = false;
      });
    },

    strpro(str) {
      let newStr = str;
      str = str.slice(1);
      var re = /[\D\d]*/g;
      var str2 = str.replace(re, function(str) {
        var result = "";
        for (var i = 0; i < str.length; i++) {
          result += "*";
        }
        return result;
      });
      return newStr.slice(0, 1) + str2;
    }
  },
  created() {
    //this.tabName = sessionStorage.getItem('tabName') || this.tabName ;

    this.getItem(this.tabName);
    this.getOrder();
    this.setLoadingTimer();
  },

  beforeDestroy() {
    this.clearLoadingTimer();
  },

  mounted() {
    // this.init();
  },
  computed: mapState({
    member: "member",
    basis: "basis",
    tableColumnsOrder() {
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
                }
              },
              params.row.orderSn
            )
          ]);
        }
      });
      if (this.member && this.member.channelFlag == 1) {
        columns.push({
          title: "渠道订单号（渠道用户编号）",
          minWidth: 150,
          align: "center",
          render(h, params) {
            let channelOrderId = params.row.channelOrderId;
            let subMemId = params.row.subMemId;
            return h("p", [
              h("p", channelOrderId),
              h("p", subMemId ? "(" + subMemId + ")" : "")
            ]);
          }
        });
      }
      columns.push({
        title: this.$t("uc.otcorder.created"),
        key: "createTime",
        minWidth: 90,
        align: "center"
      });
      columns.push({
        title: this.$t("uc.otcorder.symbol"),
        key: "unit",
        // width: 80,
        align: "center"
      });
      columns.push({
        title: this.$t("uc.otcorder.type"),
        key: "type",
        // width: 90,
        align: "center",
        render: (h, params) => {
          let text = "";
          if (params.row.type == 0) {
            text = self.$t("uc.otcorder.type_buy");
          } else {
            text = self.$t("uc.otcorder.type_sell");
          }
          return h("div", [h("p", text)]);
        }
      });
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
                }
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
        title: this.$t("uc.otcorder.fee"),
        key: "commission",
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

      if (this.member && this.member.channelFlag == 1) {
        columns.push({
          title: "操作",
          key: "createTime",
          align: "center",
          render(h, params) {
            let appId = params.row.appId;
            let accessToken = params.row.accessToken;
            let orderId = params.row.orderId;
            if (appId && accessToken) {
              return h("p", [
                h(
                  "Button",
                  {
                    on: {
                      click: function() {
                        let url = `${
                          self.basis.isLocal
                            ? self.basis.originTest
                            : self.basis.origin
                        }/p/index.html#/custom/detail/${appId}/${accessToken}?orderId=${orderId}`;
                        window.open(url);
                      }
                    },
                    props: {
                      type: "warning"
                    }
                  },
                  "去申诉"
                )
              ]);
            }
          }
        });
      }

      return columns;
    }
  })
};
</script>
<style scoped>
.bill_box_order {
  width: 99%;
  padding-left: 20px;
  height: auto;
  margin: 0 auto;
  /* overflow: hidden; */
}

.order_box {
  text-align: left;
}

.order_box a {
  color: #0b0d1b;
  font-size: 16px;
  padding: 0 30px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  line-height: 54px;
  display: inline-block;
}

.order_box .active {
  border-bottom: 2px solid #00b5f6;
}

.order_box .search {
  position: absolute;
  width: 300px;
  height: 32px;
  top: 12px;
  right: 0;
  display: flex;
}
</style>

<style lang="scss">
.bill_box_order {
  .order_box {
    .ivu-tabs {
      // overflow:initial;
      color: #fff;
      .ivu-tabs-content {
        .ivu-tabs-tabpane {
          .ivu-table-wrapper {
            border: none;
            box-shadow: none;
            a {
              color: #f0a70a;
            }
          }
        }
      }
      .ivu-tabs-bar {
        .ivu-tabs-nav-container {
          .ivu-tabs-nav-scroll {
            .ivu-tabs-ink-bar {
              background-color: #f0a70a;
            }
            .ivu-tabs-tab.ivu-tabs-tab-active.ivu-tabs-tab-focused {
              color: #f0a70a;
              &:hover {
                color: #f0a70a;
              }
            }
            .ivu-tabs-tab {
              &:hover {
                color: #f0a70a;
              }
            }
          }
        }
      }
      .ivu-tabs-content {
        .ivu-tabs-tabpane {
          .ivu-table-header,
          .ivu-table-body {
            table {
              width: 100% !important;
              thead {
                .ivu-table-cell {
                  padding: 0;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
