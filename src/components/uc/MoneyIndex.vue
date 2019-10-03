<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-01-18 09:32:45
 * @LastEditTime: 2019-08-14 14:47:18
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="nav-rights">
    <Modal
      v-model="popup.transfer"
      title="内部转账"
      :mask-closable="false"
      class="ivu-modal--left"
      width="400px"
    >
      <div>
        <div v-flex v-css="{ marginBottom: 'large' }">
          <div v-flex-item="{ span: 6 }">
            <div
              v-css="{
                lineHeight: '32px',
                textAlign: 'right',
                paddingRight: 'large'
              }"
            >
              币种：
            </div>
          </div>
          <div v-flex-item="{ span: 18 }">
            <div>
              <i-select v-model="transfer.coinType">
                <i-option
                  :value="item['coinType']"
                  v-for="(item, index) in tableMoney"
                  :key="index"
                  >{{ item["coinType"] }}</i-option
                >
              </i-select>
            </div>
          </div>
        </div>
        <div v-flex v-css="{ marginBottom: 'large' }">
          <div v-flex-item="{ span: 6 }">
            <div
              v-css="{
                lineHeight: '32px',
                textAlign: 'right',
                paddingRight: 'large'
              }"
            >
              数量：
            </div>
          </div>
          <div v-flex-item="{ span: 18 }">
            <div>
              <InputNumber
                v-model="transfer.number"
                placeholder="请您输入转账数量"
                size="large"
                :min="0"
                :max="selectedCoin && selectedCoin['balance']"
                style="width:100%"
                class="background-color---transparent"
                :disabled="!selectedCoin"
              ></InputNumber>
            </div>
            <div
              v-css="{ marginTop: '10px' }"
              class="vui-color--danger"
              v-if="selectedCoin"
            >
              提示：最多转账数量
              <span v-css="{ color: 'primary' }">{{
                selectedCoin["balance"] + " "
              }}</span>
              {{ selectedCoin["coinType"] }}
            </div>
          </div>
        </div>

        <div v-flex v-css="{ marginBottom: 'large' }">
          <div v-flex-item="{ span: 6 }">
            <div
              v-css="{
                lineHeight: '32px',
                textAlign: 'right',
                paddingRight: 'large'
              }"
            >
              手机号：
            </div>
          </div>
          <div v-flex-item="{ span: 18 }">
            <div v-flex="{ alignItems: 'center' }">
              <div v-css="{ flex: 1 }">
                <i-input
                  v-model="transfer.mobile"
                  type="text"
                  placeholder="请输入对方的手机号码"
                ></i-input>
              </div>
              <div
                v-css="{
                  width: '60px',
                  textAlign: 'right',
                  cursor: 'pointer',
                  color: 'primary'
                }"
                @click="popup.account = !popup.account"
                v-if="transfer.accountList.length > 0"
              >
                账号簿
              </div>
            </div>
            <div
              v-css="{
                marginTop: '10px',
                maxHeight: '150px',
                overflow: 'auto'
              }"
              v-if="popup.account"
            >
              <div
                v-css="{
                  padding: '10px',
                  textAlign: 'right',
                  cursor: 'pointer'
                }"
                v-for="(item, index) in transfer.accountList"
                :key="index"
                @click="selectAccount(item)"
              >
                <span v-css="{ marginRight: '10px' }">{{
                  item["mobilePhone"]
                }}</span>
                <span>{{ item["realName"] }}</span>
              </div>
            </div>

            <!-- <i-select
              v-model="transfer.mobile"
              filterable
              placeholder="请选择或输入对方的手机号码"
              class="text-color--white"
            >
              <i-option value="13980464237">13980464237</i-option>
              <i-option value="13980464238">13980464238</i-option>
              <i-option value="13980464239">13980464239</i-option>
            </i-select> -->
          </div>
        </div>

        <div v-flex v-css="{ marginBottom: 'large' }">
          <div v-flex-item="{ span: 6 }">
            <div
              v-css="{
                lineHeight: '32px',
                textAlign: 'right',
                paddingRight: 'large'
              }"
            >
              真实姓名：
            </div>
          </div>
          <div v-flex-item="{ span: 18 }">
            <i-input
              v-model="transfer.realName"
              type="text"
              placeholder="请输入对方的真实姓名"
            ></i-input>
            <div v-css="{ marginTop: '10px' }" class="vui-color--danger">
              提示：对方账号必须实名认证，否则转账失败
            </div>
          </div>
        </div>

        <div v-flex v-css="{ marginBottom: 'large' }">
          <div v-flex-item="{ span: 6 }">
            <div
              v-css="{
                lineHeight: '32px',
                textAlign: 'right',
                paddingRight: 'large'
              }"
            >
              资金密码：
            </div>
          </div>
          <div v-flex-item="{ span: 18 }">
            <i-input
              v-model="transfer.jsPassword"
              type="password"
              placeholder="请输入您的资金密码..."
            ></i-input>
          </div>
        </div>
      </div>
      <div slot="footer">
        <i-button type="default" @click="popup.transfer = false">取消</i-button>
        <i-button type="primary" @click="transferMoney">保存</i-button>
      </div>
    </Modal>

    <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
      <div class="bill_box rightarea padding-right-clear">
        <div class="shaow">
          <div class="money_table">
            <Table
              :columns="tableColumnsMoney"
              :data="tableMoney"
              :loading="loading"
              :disabled-hover="true"
            ></Table>
          </div>
        </div>
      </div>
    </div>
    <Modal
      v-model="modal"
      :title="$t('uc.finance.money.match')"
      @on-ok="matchGCC"
      :mask-closable="false"
    >
      <P style="font-weight: bold;padding: 10px 0;"
        >{{ $t("uc.finance.money.matchtip1") }}：{{ GCCMatchAmount }}</P
      >
      <p>
        <span>{{ $t("uc.finance.money.matchtip2") }}：</span>
        <InputNumber
          style="width: 150px;"
          type="text"
          v-model="matchAmount"
          :placeholder="$t('uc.finance.money.matchtip2')"
        ></InputNumber>
      </p>
    </Modal>
    <Modal
      v-model="modal_msg"
      :title="$t('uc.finance.money.match')"
      :mask-closable="false"
    >
      <p>{{ match_msg }}</p>
    </Modal>
  </div>
</template>
<script>
import { Checker } from "store-es";
import { regexes } from "../../config/basis.js";
let regexMobile = regexes.find(item => item["type"] === "mobile")["value"];
export default {
  components: {},
  data() {
    return {
      GCCMatchAmount: 0,
      matchAmount: 0,
      modal: false,
      loginmsg: this.$t("common.logintip"),
      loading: true,
      ordKeyword: "",
      tableMoney: [],
      canMatch: true,
      modal_msg: false,
      match_msg: "",
      popup: {
        transfer: false,
        account: false
      },
      transfer: {
        number: 0,
        mobile: "",
        realName: "",
        jsPassword: "",
        coinType: "",
        accountList: []
      }
    };
  },
  methods: {
    initialize() {
      this.getMoney();
      this.transferHis();
    },
    // 选择账号
    selectAccount(item) {
      this.transfer.mobile = item["mobilePhone"];
      this.transfer.realName = item["realName"];
      this.popup.account = false;
    },
    // 转账历史
    transferHis() {
      this.$http.post(this.host + "/otc/transfer/transferHis").then(res => {
        let data = res["data"];
        console.log(data);
        if (data["code"] === 0) {
          this.transfer.accountList = data["data"];
        } else {
          this.$Message.error(data["message"]);
        }
      });
    },
    // 内部转账
    transferMoney() {
      let check = new Checker();
      check
        .set(this.transfer.coinType, true, "请选择币种")
        .set(this.transfer.number.toString(), true, "请输入转账数量")
        .check(
          "转账数量有误，数量必须大于0，并且不能大于当前选择币种的最大数量",
          value => {
            return value > 0 && value <= this.selectedCoin["balance"];
          }
        )
        .set(this.transfer.mobile, true, "请输入对方的手机号码")
        .check("手机号码格式有误", value => {
          return regexMobile.test(value);
        })
        .set(this.transfer.realName, true, "请输入对方的真实姓名")
        .set(this.transfer.jsPassword, true, "请输入您的交易密码");
      if (check.pass) {
        this.$http
          .post(this.host + "/otc/transfer/transferToUser", {
            unit: this.transfer.coinType,
            mobile: this.transfer.mobile,
            realName: this.transfer.realName,
            number: this.transfer.number,
            jyPassword: this.transfer.jsPassword
          })
          .then(res => {
            let data = res["data"];
            if (data["code"] === 0) {
              this.$Message.success("转账成功");
              this.popup.transfer = false;
              this.transfer.jsPassword = "";
              this.transfer.realName = "";
              this.transfer.mobile = "";
              this.transfer.coinType = "";
              this.transfer.number = 0;
              this.initialize();
            } else {
              this.$Message.error(data["message"]);
            }
          });
      } else {
        this.$Message.error(check.message);
      }
    },

    getMoney() {
      //获取
      this.$http.post(this.host + "/uc/asset/wallet").then(response => {
        var resp = response.body;
        if (resp.code == 0) {
          this.tableMoney = resp.data;
          for (let i = 0; i < this.tableMoney.length; i++) {
            this.tableMoney[i]["coinType"] = this.tableMoney[i].coin.unit;
          }
          //console.log(this.tableMoney);
          this.loading = false;
        } else {
          // this.$Message.error(resp.message);
          //  this.$Message.info(this.$t('common.logintip'));
          this.$Message.error(this.loginmsg);
        }
      });
    },
    getGCCMatchAmount() {
      //获取
      this.$http
        .post(this.host + "/uc/asset/wallet/match-check")
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.canMatch = true;
            this.GCCMatchAmount = resp.data;
          } else {
            this.canMatch = false;
            this.match_msg = resp.message;
            // this.$Message.error(this.loginmsg);
          }
          this.showMatchDailog();
        });
    },
    showMatchDailog() {
      if (this.canMatch) this.modal = true;
      else this.modal_msg = true;
    },
    matchGCC() {
      if (this.matchAmount <= 0) {
        this.$Message.warning(this.$t("uc.finance.money.matcherr1"));
      } else if (this.matchAmount > this.GCCMatchAmount) {
        this.$Message.warning(this.$t("uc.finance.money.matcherr2"));
      } else {
        //配对
        let params = {};
        params["amount"] = this.matchAmount;
        this.$http
          .post(this.host + "/uc/asset/wallet/match", params)
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              this.$Message.success(this.$t("uc.finance.money.matchsuccess"));
              this.GCCMatchAmount = this.GCCMatchAmount - this.matchAmount;
            } else {
              this.$Message.error(resp.message);
            }
          });
      }
    },
    resetAddress(unit) {
      let params = {};
      params["unit"] = unit;
      this.$http
        .post(this.host + "/uc/asset/wallet/reset-address", params)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Message.success(this.$t("uc.finance.money.resetsuccess"));
            setTimeout(function() {
              window.location.reload();
            }, 3000);
          } else {
            this.$Message.error(resp.message);
          }
        });
    }
  },
  created() {
    this.initialize();
    //this.getGCCMatchAmount();
  },
  computed: {
    selectedCoin() {
      return this.tableMoney.find(
        item => item["coinType"] === this.transfer.coinType
      );
    },

    tableColumnsMoney() {
      let self = this;
      let columns = [];
      columns.push({
        title: this.$t("uc.finance.money.cointype"),
        key: "coinType",
        width: 100,
        align: "center"
      });
      columns.push({
        title: this.$t("uc.finance.money.balance"),
        key: "balance",
        align: "center",
        render(h, params) {
          return h(
            "span",
            {
              attrs: {
                title: params.row.balance
              }
            },
            self.toFloor(params.row.balance || "0")
          );
        }
      });
      columns.push({
        title: this.$t("uc.finance.money.frozen"),
        key: "frozenBalance",
        align: "center",
        render(h, params) {
          return h(
            "span",
            {
              attrs: {
                title: params.row.frozenBalance
              }
            },
            self.toFloor(params.row.frozenBalance || "0")
          );
        }
      });
      columns.push({
        title: this.$t("uc.finance.money.needreleased"),
        align: "center",
        render(h, params) {
          return h(
            "span",
            {
              attrs: {
                title: params.row.toReleased
              }
            },
            self.toFloor(params.row.toReleased || "0")
          );
        }
      });
      columns.push({
        title: this.$t("uc.finance.money.operate"),
        key: "price1",
        align: "center",
        render: function(h, params) {
          var actions = [];
          if (params.row.coin.canRecharge == 1) {
            if (params.row.address != null && params.row.address != "") {
              //   console.log(self.$t('uc.finance.money.charge'));
              // 充币
              actions.push(
                h(
                  "Button",
                  {
                    // 充币;
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    on: {
                      click: function() {
                        self.$router.push(
                          "/uc/recharge?name=" + params.row.coin.unit
                        );
                      }
                    },
                    style: {
                      marginRight: "8px"
                    }
                  },
                  self.$t("uc.finance.money.charge")
                )
              );
            } else {
              //   获取地址按钮;
              actions.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "info",
                      size: "small"
                    },
                    on: {
                      click: function() {
                        self.resetAddress(params.row.coin.unit);
                      }
                    },
                    style: {
                      marginRight: "8px"
                    }
                  },
                  self.$t("uc.finance.money.getaddress")
                )
              );
            }
          }
          if (params.row.coin.canWithdraw == 1) {
            // console.log(self.$t('uc.finance.money.pickup'));
            // 提币;
            actions.push(
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: function() {
                      self.$router.push(
                        "/uc/withdraw?name=" + params.row.coin.unit
                      );
                    }
                  },
                  style: {
                    marginRight: "8px"
                  }
                },
                self.$t("uc.finance.money.pickup")
              )
            );
          }
          if (params.row.coin.unit.toUpperCase() == "GCC") {
            // 配对;
            actions.push(
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  on: {
                    click: function() {
                      // self.showMatchDailog(params.row);
                      self.getGCCMatchAmount();
                      // self.$router.push('/finance/recharge?name=' + params.row.coin.unit);
                    }
                  },
                  style: {
                    marginRight: "8px"
                  }
                },
                self.$t("uc.finance.money.match")
              )
            );
          }
          actions.push(
            h(
              "Button",
              {
                props: {
                  type: "info",
                  size: "small"
                },
                on: {
                  click: () => {
                    self.popup.transfer = true;
                  }
                },
                style: {
                  marginRight: "8px"
                }
              },
              "内部转账"
            )
          );
          return h("p", actions);
        }
      });
      return columns;
    }
  },
  watch: {
    ["transfer.coinType"]() {
      this.transfer.number = 0;
    }
  }
};
</script>
 
<style lang="scss">
.nav-right {
  .rightarea.bill_box {
    .shaow {
      padding: 5px;
    }
    .money_table {
      .ivu-table-wrapper {
        .ivu-table-header {
          background: #27313e;
          th {
            color: #fff;
          }
        }
        .ivu-table-body {
          td {
            color: #fff;
            .ivu-table-cell {
              p .ivu-btn {
                background: transparent;
                height: 25px;
                padding: 0 10px;
                span {
                  display: inline-block;
                  line-height: 25px;
                  font-size: 14px;
                }
              }
              p .ivu-btn.ivu-btn-info {
                border: 1px solid #f0ac19;
                border-radius: 20px;
                span {
                  color: #f0ac19;
                }
              }
              p .ivu-btn.ivu-btn-error {
                border: 1px solid #f15057;
                border-radius: 20px;
                span {
                  color: #f15057;
                }
              }
              p .ivu-btn.ivu-btn-primary {
                border: 1px solid #00b275;
                border-radius: 20px;
                span {
                  color: #00b275;
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

<style scoped lang="scss">
.nav-right {
  height: auto;
  overflow: hidden;
  padding: 0 0 0 15px;
}

.nav-right .rightarea.bill_box {
  padding-left: 15px;
  width: 100%;
  height: auto;
  overflow: hidden;
}
</style>

<style>
.text-color--white .ivu-select-input {
  color: #fff;
}

.background-color---transparent.ivu-input-number-disabled
  .ivu-input-number-input {
  background-color: transparent;
}
</style>

