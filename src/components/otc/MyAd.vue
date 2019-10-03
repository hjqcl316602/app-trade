<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-02-19 15:51:13
 * @LastEditTime: 2019-08-20 14:26:16
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="nav-rights">
    <Modal
      v-model="edit.popup"
      :mask-closable="false"
      class="ivu-modal--left"
      width="400px"
      :title="edit.type === 'insert' ? '发布广告' : '修改广告'"
    >
      <div class="vui-padding--large">
        <div>
          <div
            class="vui-row--flex vui-align-items--flex-start vui-margin-bottom--large"
          >
            <div
              class="vui-span--6 vui-text-align--right vui-padding-right--large"
            >
              <span class="vui-color--label">温馨提示</span>
            </div>
            <div class="vui-span--18">
              <div class="vui-margin-bottom">
                <span class="vui-color--danger">承兑额度=出售或购买的上限</span>
              </div>
              <div class="vui-margin-bottom">
                <span class="vui-color--danger"
                  >承兑额度增加=用其他数字货币兑换TTM会增加TTM数量的额度</span
                >
              </div>
              <div class="vui-margin-bottom">
                <span class="vui-color--danger"
                  >承兑额度的减少=用TTM兑换其他数字货币会减少TTM数量的额度</span
                >
              </div>
            </div>
          </div>

          <div
            class="vui-row--flex vui-align-items--center vui-margin-bottom--large"
          >
            <div
              class="vui-span--6 vui-text-align--right vui-padding-right--large"
            >
              <span class="vui-color--label">承兑额度</span>
            </div>
            <div class="vui-span--18">
              <span class="vui-color--primary">{{ edit.base.limit }}</span>
            </div>
          </div>

          <div
            class="vui-row--flex vui-align-items--center vui-margin-bottom--large"
          >
            <div
              class="vui-span--6 vui-text-align--right vui-padding-right--large"
            >
              <span class="vui-color--label">余额</span>
            </div>
            <div class="vui-span--18">
              <span class="vui-color--primary">{{ edit.base.balance }}</span>
            </div>
          </div>

          <div
            class="vui-row--flex vui-align-items--center vui-margin-bottom--large"
          >
            <div
              class="vui-span--6 vui-text-align--right vui-padding-right--large"
            >
              <span class="vui-color--danger">*</span
              ><span class="vui-color--label">我想要</span>
            </div>
            <div class="vui-span--18">
              <RadioGroup v-model="edit.advertiseType">
                <Radio label="1" :disabled="edit.type === 'update'"
                  >在线出售</Radio
                >
                <Radio label="0" :disabled="edit.type === 'update'"
                  >在线购买</Radio
                >
              </RadioGroup>
            </div>
          </div>
          <div
            class="vui-row--flex vui-align-items--center vui-margin-bottom--large"
          >
            <div
              class="vui-span--6 vui-text-align--right vui-padding-right--large"
            >
              <span class="vui-color--danger">*</span
              ><span class="vui-color--label">交易数量</span>
            </div>
            <div class="vui-span--18">
              <div>
                <i-input
                  v-model="edit.number"
                  placeholder="请输入您的交易数量"
                  autocomplete="off"
                ></i-input>
              </div>
              <div class="vui-margin-top">
                <div v-if="edit.advertiseType === '1'">
                  <span class="vui-color--danger">提示：可出售额度</span>
                  <span class="vui-color--primary">{{
                    edit.base.leftSellLimit
                  }}</span>
                  <span class="vui-color--danger">,交易数量不小于100</span>
                </div>
                <div v-else>
                  <span class="vui-color--danger">提示：可购买额度</span>
                  <span class="vui-color--primary">{{
                    edit.base.leftBuyLimit
                  }}</span>
                  <span class="vui-color--danger">,交易数量不小于100</span>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="false"
            class="vui-row--flex vui-align-items--center vui-margin-bottom--large"
          >
            <div
              class="vui-span--6 vui-text-align--right vui-padding-right--large"
            >
              <span class="vui-color--label">最小交易额</span>
            </div>
            <div class="vui-span--18">
              <i-input
                v-model="edit.minLimit"
                placeholder="请输入您的最小交易额"
                autocomplete="off"
              ></i-input>
            </div>
          </div>

          <div
            class="vui-row--flex vui-align-items--center vui-margin-bottom--large"
          >
            <div
              class="vui-span--6 vui-text-align--right vui-padding-right--large"
            >
              <span class="vui-color--label">最大交易额</span>
            </div>
            <div class="vui-span--18">
              <i-input
                v-model="edit.maxLimit"
                placeholder="请输入您的最大交易额"
                autocomplete="off"
              ></i-input>
            </div>
          </div>

          <div
            class="vui-row--flex vui-align-items--center vui-margin-bottom--large"
          >
            <div
              class="vui-span--6 vui-text-align--right vui-padding-right--large"
            >
              <span class="vui-color--danger">*</span>
              <span class="vui-color--label">付款方式</span>
            </div>
            <div class="vui-span--18">
              <div class="vui-flex vui-align-items--center">
                <div class="vui-flex--1">
                  <Select v-model="edit.payMode">
                    <Option
                      v-for="item in edit.payModeList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.label }}</Option
                    >
                  </Select>
                </div>
                <div class="vui-margin-left">
                  <i-button @click="banding">绑定</i-button>
                </div>
              </div>
            </div>
          </div>

          <div class="vui-row--flex vui-align-items--center">
            <div
              class="vui-span--6 vui-text-align--right vui-padding-right--large"
            >
              <span class="vui-color--danger">*</span
              ><span class="vui-color--label">资金密码</span>
            </div>
            <div class="vui-span--18">
              <i-input
                v-model="edit.password"
                type="password"
                placeholder="请输入您的资金密码..."
              ></i-input>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <i-button type="default" @click="edit.popup = false">取消</i-button>
        <i-button type="primary" @click="sureSave">保存</i-button>
      </div>
    </Modal>
    <div class="my_ad_box">
      <div class="add_ad vui-flex ">
        <div class="vui-flex--1 vui-center">
          <div>
            <div class="vui-color--danger vui-line-height--medium">
              当广告最小交易额所购买数量加上手续费大于广告剩余数量，该广告自动下架
            </div>
            <div class="vui-color--danger vui-line-height--medium">
              一种支付或收款方式分别最多可以上架一个在线出售和在线够买广告
            </div>
          </div>
        </div>
        <div>
          <Button
            icon="ios-add-circle"
            type="primary"
            @click="beforePublish('insert')"
          >
            发布广告
          </Button>
          <Button icon="ios-build" type="success" @click="banding">
            账号设置
          </Button>
        </div>
      </div>
      <template v-if="false">
        <div class="vui-margin-bottom">
          <div
            class="vui-font-weight--800 vui-color--danger  vui-line-height--medium"
          >
            温馨提示:
          </div>
          <div class="vui-color--danger vui-line-height--medium">
            当广告最小交易额所购买数量加上手续费大于广告剩余数量，该广告自动下架
          </div>
          <div class="vui-color--danger vui-line-height--medium">
            一种支付或收款方式分别最多可以上架一个在线出售和在线够买广告
          </div>
        </div>
      </template>
      <div class="order-table">
        <Table
          :columns="tableColumnsAdv"
          :data="tableAdv"
          :no-data-text="$t('common.nodata')"
          :loading="loading"
          class="tables"
          :disabled-hover="true"
        ></Table>
        <div style="margin: 10px;overflow: hidden" id="pages">
          <div style="float: right;">
            <Page
              v-if="totalPage > 0"
              :pageSize="pageNumber"
              :total="totalPage"
              :current="currentPage"
              @on-change="changePage"
            ></Page>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Checker, regexer } from "store-es";
const regexNumberMoney = regexer.find(el => {
  return el.type === "number-money";
})["value"];
export default {
  components: {},
  data() {
    let self = this;
    return {
      edit: {
        popup: false,
        type: "insert",
        id: "",
        advertiseType: "1",
        number: "",
        payMode: "",
        maxLimit: "",
        //minLimit: "",
        payModeList: [],
        password: "",
        base: {
          limit: 0,
          balance: 0,
          leftBuyLimit: 0,
          leftSellLimit: 0
        }
      },

      loginmsg: this.$t("common.logintip"),
      dataCount: 0,
      tableAdv: [],
      loading: true,
      tableColumnsAdv: [
        {
          title: self.$t("otc.myad.no"),
          key: "id",
          width: 55,
          align: "center"
        },
        {
          title: self.$t("otc.myad.type"),
          key: "advertiseType",
          width: 90,
          align: "center",
          render: (h, params) => {
            let text = "";
            if (params.row.advertiseType == 0) {
              text = self.$t("otc.myad.buy");
            } else if (params.row.advertiseType == 1) {
              text = self.$t("otc.myad.sell");
            }
            return h("div", [h("p", text)]);
          }
        },
        {
          title: self.$t("otc.myad.limit"),
          key: "limit",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("p", params.row.minLimit + "~" + params.row.maxLimit)
            ]);
          }
        },
        {
          title: self.$t("otc.myad.remain"),
          key: "remainAmount",
          width: 90,
          align: "center"
        },
        {
          title: self.$t("otc.myad.coin"),
          key: "coinUnit",
          width: 100,
          align: "center"
        },
        {
          title: "支付/收款方式",
          key: "payMode",
          width: 100,
          align: "center"
        },
        {
          title: self.$t("otc.myad.created"),
          key: "createTime",
          width: 160,
          align: "center"
        },
        {
          title: self.$t("otc.myad.operate"),
          key: "buyBtn",
          width: 180,
          align: "center",
          render: function(h, params) {
            return h("p", [
              h(
                "a",
                {
                  on: {
                    click: function() {
                      if (params.row.status == 0) {
                        self.$Message.error(self.$t("otc.myad.errmsg"));
                      } else {
                        console.log(params.row.platformCoin);
                        self.beforePublish("update", params.row);
                      }
                    }
                  }
                },
                [
                  h(
                    "Button",
                    {
                      props: {
                        size: "small"
                      },
                      style: {
                        marginRight: "8px"
                      }
                    },
                    self.$t("otc.myad.update")
                  )
                ]
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      //要上架
                      if (params.row.status == 1) {
                        let canshu = {};
                        canshu["id"] = params.row.id;
                        // canshu['status'] = params.row.status == 0 ? 1 : 0
                        self.$http
                          .post(self.host + "/otc/advertise/on/shelves", canshu)
                          .then(response => {
                            var resp = response.body;
                            if (resp.code == 0) {
                              self.$Message.success(resp.message);
                              // self.$router.go(0)
                              self.getAd();
                            } else {
                              self.$Message.error(resp.message);
                            }
                          });
                      } else if (params.row.status == 0) {
                        let canshu = {};
                        canshu["id"] = params.row.id;
                        // canshu['status'] = params.row.status == 0 ? 1 : 0
                        self.$http
                          .post(
                            self.host + "/otc/advertise/off/shelves",
                            canshu
                          )
                          .then(response => {
                            var resp = response.body;
                            if (resp.code == 0) {
                              self.$Message.success(resp.message);
                              // self.$router.go(0)
                              self.getAd();
                            } else {
                              self.$Message.error(resp.message);
                            }
                          });
                      }
                    }
                  }
                },
                params.row.status == 0
                  ? self.$t("otc.myad.dropoff")
                  : self.$t("otc.myad.shelf")
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      let canshu = {};
                      canshu["id"] = params.row.id;

                      if (params.row.status == 1) {
                        self.$Modal.confirm({
                          title: self.$t("common.tip"),
                          content: "<p>" + self.$t("common.delete") + "</p>",
                          onOk: () => {
                            self.$http
                              .post(self.host + "/otc/advertise/delete", canshu)
                              .then(response => {
                                var resp = response.body;
                                if (resp.code == 0) {
                                  self.$Message.success(resp.message);
                                  self.remove(params.index);
                                } else {
                                  self.$Message.error(resp.message);
                                }
                              });
                          }
                        });
                      } else {
                        self.$Message.error("下架广告后才可以删除！");
                      }
                    }
                  }
                },
                self.$t("otc.myad.delete")
              )
            ]);
          }
        }
      ],
      totalPage: 0,
      pageNumber: 10,
      currentPage: 1
    };
  },
  methods: {
    sureSave() {
      let checker = new Checker();
      console.log(this.edit);
      checker
        .set(this.edit.number + "", true, "请输入交易数量")
        .check("交易数量格式错误，请输入合法的金额格式", value => {
          return regexNumberMoney.test(value);
        })
        .check("交易数量不小于100", value => {
          return value - 0 >= 100;
        })
        .check("交易数量不能大于可用额度", value => {
          if (this.edit.advertiseType === "1") {
            return value - 0 <= this.edit.base.leftSellLimit - 0;
          } else {
            return value - 0 <= this.edit.base.leftBuyLimit - 0;
          }
        })
        .set(this.edit.maxLimit + "")
        .check("最大交易额格式错误，请输入合法的金额格式", value => {
          return regexNumberMoney.test(value);
        })
        .check("最大交易额不小于100", value => {
          return value - 0 >= 100;
        })
        .check("最大交易额不能大于交易数量", value => {
          return value - 0 <= this.edit.number - 0;
        })

        .set(this.edit.payMode, true, "请选择收款方式")
        .set(this.edit.password, true, "请输入资金密码");
      if (checker.pass) {
        let object = {
          number: this.edit.number,
          pay: [this.edit.payMode],
          jyPassword: this.edit.password,
          //minLimit: this.edit.minLimit,
          maxLimit: this.edit.maxLimit,
          advertiseType: this.edit.advertiseType
        };
        if (this.edit.type == "insert") {
          this.$http
            .post(this.host + "/otc/advertise/createStable", object)
            .then(response => {
              var resp = response.body;
              if (resp.code == 0) {
                this.$Message.success(resp.message);
                this.edit.popup = false;
                this.edit.number = "";
                this.edit.payMode = "";
                this.edit.maxLimit = "";
                this.getAd();
              } else {
                this.$Message.error(resp.message);
              }
            });
        } else {
          object["id"] = this.edit.id;
          this.$http
            .post(this.host + "/otc/advertise/updateStable", object)
            .then(response => {
              var resp = response.body;
              if (resp.code == 0) {
                this.$Message.success(resp.message);
                this.edit.popup = false;
                this.edit.number = "";
                this.edit.payMode = "";
                this.edit.maxLimit = "";
                this.getAd();
              } else {
                this.$Message.error(resp.message);
              }
            });
        }
      } else {
        this.$Message.error(checker.message);
      }
    },

    beforePublish(type, item) {
      this.edit.type = type;
      if (type === "update") {
        this.edit.number = item["number"];
        //this.edit.minLimit = item["minLimit"];
        this.edit.maxLimit = item["maxLimit"];
        this.edit.payMode = (item["payMode"] + "").split(",")[0];
        this.edit.advertiseType = item["advertiseType"] + "";
        this.edit.id = item["id"] + "";
      }
      this.edit.popup = true;
      this.getMember();
      this.getAccount();
      this.getBaseMessage();
    },
    /**
     * 获取个人基本信息
     */
    getMember() {
      let self = this;
      this.$http.get(this.host + this.api.uc.identification).then(res => {
        let certifiedBusinessStatus = res.body.data.certifiedBusinessStatus;
        if (certifiedBusinessStatus == 2) {
        } else {
          this.$Message.warning("请先申请商家认证!");
          this.$router.push("/identbusiness");
        }
      });
    },

    // 获得额度等基本信息
    getBaseMessage() {
      //获取个人账户信息
      let self = this;
      this.$http.post(this.host + "/otc/advertise/init").then(response => {
        var resp = response.body;
        if (resp.code === 0) {
          if (resp.data) {
            this.edit.base = Object.assign(this.edit.base, resp.data);
          } else this.$Message.error("获取用户剩余额度等信息失败！");
        } else this.$Message.error(resp.message);
      });
    },

    /**
     * 获取个人收款账号
     */
    getAccount() {
      this.$http
        .post(this.host + "/uc/approve/account/setting")
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.edit.payModeList = [];
            let data = (resp.data || []).filter(item => item["checked"] === 1);
            if (data.findIndex(item => item["type"] === 1) > -1) {
              this.edit.payModeList.push({ label: "银联", value: "银联" });
            }
            if (data.findIndex(item => item["type"] === 2) > -1) {
              this.edit.payModeList.push({ label: "微信", value: "微信" });
            }
            if (data.findIndex(item => item["type"] === 3) > -1) {
              this.edit.payModeList.push({ label: "支付宝", value: "支付宝" });
            }
            if (data.findIndex(item => item["type"] === 4) > -1) {
              this.edit.payModeList.push({ label: "云闪付", value: "云闪付" });
            }
            if (data.findIndex(item => item["type"] === 5) > -1) {
              this.edit.payModeList.push({ label: "聚合码", value: "聚合码" });
            }
          } else {
            this.$Message.error(resp.message);
          }
        });
    },

    updateLangData() {
      this.tableColumnsAdv[0].title = this.$t("otc.myad.no");
      this.tableColumnsAdv[1].title = this.$t("otc.myad.type");
      this.tableColumnsAdv[2].title = this.$t("otc.myad.limit");
      this.tableColumnsAdv[3].title = this.$t("otc.myad.remain");
      this.tableColumnsAdv[4].title = this.$t("otc.myad.coin");
      this.tableColumnsAdv[5].title = this.$t("otc.myad.created");
      this.tableColumnsAdv[6].title = this.$t("otc.myad.operate");
    },
    remove(index) {
      this.tableAdv.splice(index, 1);
    },
    banding() {
      this.$router.push("/uc/account");
    },
    changePage() {},
    getAd() {
      //获取个人广告
      this.$http.post(this.host + "/otc/advertise/all").then(response => {
        var resp = response.body;
        if (resp.code == 0) {
          this.tableAdv = resp.data.content;
          // console.log(this.tableAdv);
          for (var i = 0; i < this.tableAdv.length; i++) {
            this.tableAdv[i].coinUnit = this.tableAdv[i].coin.unit;
          }
          this.loading = false;
          //this.dataCount = resp.data.length
          this.totalPage = resp.data.totalElements;
        } else {
          // this.$Message.error(resp.message);
          // this.$Message.error(this.$t('common.logintip'));
          this.$Message.error(this.loginmsg);
        }
      });
    },
    publish(type) {
      if (type == "coin") {
        this.$router.push(this.api.otc.createCoin);
      } else {
        this.$router.push(this.api.otc.createAd);
      }
    }
  },
  computed: {
    lang: function() {
      return this.$store.state.lang;
    }
  },
  watch: {
    lang: function() {
      this.updateLangData();
    }
  },
  created() {
    this.getAd();
  }
};
</script>
<style scoped lang="scss">
.nav-rights {
  padding: 0 0 0 20px;
  .my_ad_box {
    .add_ad {
      margin-bottom: 20px;
    }
    .ivu-alert.ivu-alert-info {
      border: none;
      background-color: #192330;
      text-align: center;
    }
  }
}
</style>
<style lang="scss">
.nav-rights {
  .my_ad_box {
    .order-table {
      .ivu-table {
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
        .ivu-table-body {
          .ivu-table-tbody .ivu-table-row .ivu-table-cell {
            button.ivu-btn {
              border-radius: 10px;
              background: #fff;
            }
            button.ivu-btn.ivu-btn-default {
              border: 1px solid #00b275;
              background-color: transparent;
              span {
                color: #00b275;
              }
            }
            button.ivu-btn.ivu-btn-primary {
              border: 1px solid #f0ac19;
              background-color: transparent;
              span {
                color: #f0ac19;
              }
            }
            button.ivu-btn.ivu-btn-error {
              border: 1px solid #f15057;
              background-color: transparent;
              span {
                color: #f15057;
              }
            }
          }
        }
      }
    }
  }
}
</style>
