<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-01-18 09:32:45
 * @LastEditTime: 2019-08-14 16:23:30
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="nav-rights withdraw">
    <div class="nav-right">
      <div class="rightarea">
        <section class="trade-groups merchant-tops">
          <!-- <i class="merchant-icon tips"></i>
          <span class="tips-word">{{$t('uc.finance.withdraw.pickup')}}</span> -->
          <router-link to="/uc/withdraw/address">{{$t('uc.finance.withdraw.addressmanager')}}</router-link>
        </section>
        <section>
          <div class="table-inner action-box">
            <!-- <i class="angle" style="right: 27px;"></i> -->
            <div class="action-inner">
              <div class="inner-left">
                <p class="describe">{{$t('uc.finance.withdraw.symbol')}}</p>
                <Select v-model="coinType" style="width:100px;margin-top: 14px;" @on-change="getAddrList">
                  <Option v-for="item in coinList" :value="item.unit" :key="item.unit">{{ item.unit }}</Option>
                </Select>
              </div>
              <div class="inner-box">
                <div class="form-group form-address">
                  <label for="controlAddress" class="controlAddress describe">{{$t('uc.finance.withdraw.address')}}</label>
                  <div class="control-input-group">
                    <Select ref="address" v-model="withdrawAdress" filterable clearable @on-query-change="onAddressChange">
                      <Option v-for="item in currentCoin.addresses" :value="item.address" :key="item.address">{{ item.remark +'('+ item.address+')' }}</Option>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group-container " style="margin-bottom:14px" v-if='false' >
              <div class="form-group form-amount">
                <label class="label-amount">  
                   memo
                </label>
                <div class="input-group" style="margin-top:14px">
                   <Input v-model='widthdrawMemo' placeholder='请输入您的memo'/>
          
                </div>
              </div>
            </div>

            <div class="form-group-container">
              <div class="form-group form-amount">
                <label class="label-amount"> {{$t('uc.finance.withdraw.num')}}
                  <p class="label-fr">
                    <span>【{{$t('uc.finance.withdraw.avabalance')}}】：
                      <span class="label-pointer" id="valueAvailable">{{currentCoin.balance|toFloor}}</span>
                    </span>
                    <span v-if="currentCoin.enableAutoWithdraw == 0">【{{$t('common.tip')}}】：{{$t('uc.finance.withdraw.msg1')}} {{currentCoin.threshold}} {{$t('uc.finance.withdraw.msg2')}}</span>
                    <span>
                      <a href="javascript:;" id="levelUp" style="display: none;">{{$t('uc.finance.withdraw.increase')}}</a>
                    </span>
                  </p>
                </label>
                <div class="input-group">
                  <Poptip trigger="focus" :content="$t('uc.finance.withdraw.tip1')+currentCoin.withdrawScale+$t('uc.finance.withdraw.tip11')+currentCoin.minAmount+' ,'+$t('uc.finance.withdraw.tip2')+currentCoin.maxAmount" style="width: 100%;">
                    <InputNumber @on-change="computerAmount" v-model="withdrawAmount" :placeholder="$t('uc.finance.withdraw.numtip1')" size="large" ></InputNumber>
                    <span class="input-group-addon addon-tag uppercase firstt">{{currentCoin.unit}}</span>
                  </Poptip>
                </div>
              </div>
            </div>
            <div class="form-group-container form-group-container2">
              <div class="form-group form-fee">
                <label class="label-amount"> {{$t('uc.finance.withdraw.fee')}}
                  <!--<p class="label-fr">-->
                  <!--<span>{{$t('uc.finance.withdraw.range')}}：{{currentCoin.minTxFee}} - {{currentCoin.maxTxFee}}</span>-->
                  <!--</p>-->
                </label>
                <div class="input-group" style="margin-top:14px;position:relative;">
                  <Slider v-if="currentCoin.maxTxFee > currentCoin.minTxFee" v-model="withdrawFee" show-input :step="(currentCoin.maxTxFee - currentCoin.minTxFee)/10" :max="currentCoin.maxTxFee" :min="currentCoin.minTxFee"></Slider>
                  <!--<Poptip v-else trigger="focus" :content="$t('uc.finance.withdraw.tip1')+currentCoin.minTxFee+$t('uc.finance.withdraw.tip1')+currentCoin.maxTxFee" style="width: 100%;">-->
                  <InputNumber readonly v-model="withdrawFee"  size="large"></InputNumber>
                  <span class="input-group-addon addon-tag uppercase">{{currentCoin.unit}}</span>
                  <!--</Poptip>
                  :min="currentCoin.minAmount" :max="currentCoin.maxAmount"
                  :min="currentCoin.minTxFee" :max="currentCoin.maxTxFee"
                  -->
                </div>
              </div>
              <div class="form-group">
                <label>{{$t('uc.finance.withdraw.arriamount')}}</label>
                <div class="input-group" style="margin-top:14px;position:relative;">
                  <InputNumber readonly v-model="withdrawOutAmount" :placeholder="$t('uc.finance.withdraw.arriamount')" size="large"></InputNumber>
                  <!-- <input id="withdrawOutAmount" class="form-control form-out-amount" disabled="" maxlength="20" type="text" value="0"> -->
                  <span class="input-group-addon addon-tag uppercase">{{currentCoin.unit}}</span>
                </div>
              </div>
            </div>
            <div class="action-foot">
              <Button id="withdrawSubmit" long size="large" type="primary" style="height:40px;" @click="apply">{{$t('uc.finance.withdraw.pickup')}}</Button>
            </div>

            <div class="action-content pt10">
              <div class="action-body">
                <p class="acb-p1">{{$t('common.tip')}}</p>
                <p class="acb-p2">• {{$t('uc.finance.withdraw.msg3')}}：{{currentCoin.minAmount}}{{$t('uc.finance.withdraw.msg4')}}。<br>• {{$t('uc.finance.withdraw.msg5')}}<br>• {{$t('uc.finance.withdraw.msg6')}} </p>
              </div>
            </div>
            <div class="action-content">
              <div class="action-body">
                <p class="acb-p1">{{$t('uc.finance.withdraw.record')}}</p>
                <div class="order-table">
                  <p class="acb-p2" style="margin-bottom:10px;">• {{$t('uc.finance.withdraw.click')}}
                    <i class="ivu-icon ivu-icon-funnel"></i>{{$t('uc.finance.withdraw.filtrate')}}</p>
                  <Table :columns="tableColumnsWithdraw" :data="tableWithdraw" :loading="loading"></Table>
                  <div id="pages">
                    <div style="float: right;">
                      <Page class="pages_a" :total="transaction.total" :current="transaction.page + 1" @on-change="changePage"></Page>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <Modal v-model="modal"   :mask-closable="false" class="ivu-modal--left" width="400px">
      <!-- <P style="color:red;font-weight: bold;">
        {{$t('uc.finance.withdraw.fundpwdtip')}}<br/>
        <Input type="password" v-model="fundpwd" :placeholder="$t('otc.chat.msg7')"></Input>
      </p> -->
      <p slot="header">
        提示
      </p>
      <Form class="withdraw-form-inline" ref="formInline" :model="formInline" inline>
        <!-- <FormItem>
          <Input type="text" v-model="user.mobilePhone" disabled></Input>
        </FormItem> -->
        <FormItem prop="code">
          <Input type="text" v-model="formInline.code" :placeholder="$t('uc.regist.smscode')">
          </Input>
          <input id="sendCode" @click="sendCode();" type="Button" :value="sendcodeValue" :disabled="codeIsSending">
          </input>
        </FormItem>
        <FormItem>
          <Input type="password" v-model="formInline.fundpwd" :placeholder="$t('otc.chat.msg7')"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <span style="margin-right:50px" @click="cancel">取消</span>
        <span style="background:#f0ac19;color:#fff;width:80px;border-radius:30px;display:inline-block;text-align:center;height:30px;line-height: 30px;" @click="ok">确定</span>
      </div>
    </Modal>
  </div>
</template>
<script>
import { Checker } from "store-es";
export default {
  data() {
    return {
      user: {},
      codeIsSending: false,
      sendcodeValue: this.$t("uc.regist.sendcode"),
      countdown: 60,
      formInline: {
        code: "",
        fundpwd: ""
      },
      modal: false,
      fundpwd: "",
      currentCoin: {},
      transaction: {
        page: 0,
        pageSize: 10,
        total: 0
      },
      loading: true,
      withdrawAdress: "",
      inputAddress: "", //用户输入的地址
      withdrawAmount: 0,
      withdrawFee: 0,
      withdrawOutAmount: 0,
      widthdrawMemo: "",
      coinType: "",
      coinList: [],
      tableWithdraw: [],
      allTableWithdraw: []
    };
  },
  watch: {
    currentCoin: function() {
      this.withdrawFee =
        this.currentCoin.minTxFee +
        (this.currentCoin.maxTxFee - this.currentCoin.minTxFee) / 2;
    }
  },
  methods: {
    cancel() {
      this.modal = false;
      this.formInline.code = "";
      this.formInline.fundpwd = "";
    },
    sendCode() {
      this.$http.post(this.host + "/uc/mobile/withdraw/code").then(response => {
        var resp = response.body;
        if (resp.code == 0) {
          this.settime();
          this.$Notice.success({
            title: this.$t("common.tip"),
            desc: resp.message
          });
        } else {
          this.$Notice.error({
            title: this.$t("common.tip"),
            desc: resp.message
          });
        }
      });
    },
    settime() {
      this.sendcodeValue = this.countdown;
      this.codeIsSending = true;
      let timercode = setInterval(() => {
        this.countdown--;
        this.sendcodeValue = this.countdown;
        if (this.countdown <= 0) {
          clearInterval(timercode);
          this.sendcodeValue = this.$t("uc.regist.sendcode");
          this.countdown = 60;
          this.codeIsSending = false;
        }
      }, 1000);
    },
    changePage(index) {
      this.transaction.page = index - 1;
      this.getList();
    },
    onAddressChange(data) {
      this.inputAddress = data;
    },
    clearValues() {
      if (this.$refs.address) {
        this.$refs.address.setQuery(" ");
      }
      this.withdrawAdress = "";
      this.inputAddress = "";
      this.withdrawAmount = 0;
      // this.withdrawFee= 0;
      this.withdrawOutAmount = 0;
      this.widthdrawMemo = "";
    },
    getCurrentCoinRecharge() {
      if (this.coinType != "") {
        var temp = [];
        for (var i = 0; i < this.allTableWithdraw.length; i++) {
          //   if (this.allTableWithdraw[i].symbol == this.coinType) {
          if (this.allTableWithdraw[i].coin.unit == this.coinType) {
            temp.push(this.allTableWithdraw[i]);
          }
        }
        this.tableWithdraw = temp;
      } else {
        this.tableWithdraw = this.allTableWithdraw;
      }
    },
    ok() {
      if (this.formInline.code == "") {
        this.modal = true;
        this.$Message.error("请填写短信验证码");
        return;
      }
      if (this.formInline.fundpwd == "") {
        this.modal = true;
        this.$Message.error("请填写资金密码");
        return;
      }
      let params = {};
      params["unit"] = this.currentCoin.unit;
      params["address"] = this.withdrawAdress;
      params["amount"] = this.withdrawAmount;
      params["fee"] = this.withdrawFee;
      params["jyPassword"] = this.formInline.fundpwd;
      params["code"] = this.formInline.code;
      params["memo"] = this.widthdrawMemo;
      this.$http
        .post(this.host + "/uc/withdraw/apply/code", params)
        .then(response => {
          this.fundpwd = "";
          var resp = response.body;
          if (resp.code == 0) {
            this.modal = false;
            this.formInline.code = "";
            this.formInline.fundpwd = "";
            this.transaction.page = 0;
            this.getList();
            this.clearValues();
            this.$Message.success(resp.message);
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    getAddrList() {
      //初始化页面上的值
      this.clearValues();
      //获取地址
      this.$http
        .post(this.host + "/uc/withdraw/support/coin/info")
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.coinList = resp.data;
            if (this.coinType) {
              for (let i = 0; i < resp.data.length; i++) {
                if (this.coinType == resp.data[i].unit) {
                  this.currentCoin = resp.data[i];
                  break;
                }
              }
            } else {
              this.currentCoin = this.coinList[0];
              this.coinType = this.currentCoin.unit;
            }
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    getList() {
      this.loading = true;
      //获取tableWithdraw
      let params = {};
      params["page"] = this.transaction.page;
      params["pageSize"] = this.transaction.pageSize;
      this.$http
        .post(this.host + "/uc/withdraw/record", params)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.tableWithdraw = resp.data.content;
            this.transaction.total = resp.data.totalElements;
            this.transaction.page = resp.data.number;
          } else {
            this.$Message.error(resp.message);
          }
          this.loading = false;
        });
    },
    accSub(arg1, arg2) {
      var r1, r2, m, n;
      try {
        r1 = arg1.toString().split(".")[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.toString().split(".")[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      //last modify by deeka
      //动态控制精度长度
      n = r1 >= r2 ? r1 : r2;
      return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    round(v, e) {
      var t = 1;
      for (; e > 0; t *= 10, e--);
      for (; e < 0; t /= 10, e++);
      return Math.round(v * t) / t;
    },
    computerAmount() {
      this.withdrawOutAmount = this.round(
        this.accSub(this.withdrawAmount, this.withdrawFee),
        this.currentCoin.withdrawScale
      );
    },
    computerAmount2() {
      this.withdrawAmount =
        (this.withdrawAmount + "").replace(/([0-9]+\.[0-9]{6})[0-9]*/, "$1") -
        0;
      this.withdrawOutAmount = this.round(
        this.accSub(this.withdrawAmount, this.withdrawFee),
        this.currentCoin.withdrawScale
      );
    },
    valid() {
      this.withdrawAdress = this.withdrawAdress || this.inputAddress;
      let checker = new Checker();
      checker
        .set(this.coinType, true, "请选择币种")
        .set(this.withdrawAdress, true, "请填入地址")
        .set((this.withdrawAmount || 0) + "", true, "请输入提币数量")
        .check(
          "请填写正确提币数量，最小值为" +
            this.currentCoin.minAmount +
            "，最大值为" +
            this.currentCoin.maxAmount,
          value => {
            return (
              value - 0 >= this.currentCoin.minAmount &&
              value - 0 <= this.currentCoin.maxAmount
            );
          }
        )
        .check("提币数量不得小于手续费", value => {
          return value - 0 >= this.withdrawFee;
        })
        .set((this.withdrawFee || 0) + "", true, "请填入手续费")
        .check(
          "手续费的最小值为" +
            this.currentCoin.minTxFee +
            "，最大值为" +
            this.currentCoin.maxTxFee,
          value => {
            return (
              value - 0 >= this.currentCoin.minTxFee &&
              value - 0 <= this.currentCoin.maxTxFee
            );
          }
        );
      return checker;
      if (this.coinType == "") {
        this.$Message.error("请选择币种");
        return false;
      } else if (this.withdrawAdress == "") {
        this.$Message.error("请填入地址");
        return false;
      } else if (
        (this.coinType === "TTM" || this.coinType === "EOS") &&
        this.widthdrawMemo == ""
      ) {
        this.$Message.error("请输入您的memo");
        return false;
      } else if (
        this.withdrawAmount == "" ||
        this.withdrawAmount == 0 ||
        this.withdrawAmount - 0 < this.currentCoin.minAmount
      ) {
        this.$Message.error(
          "请填写正确提币数量，最小值为" + this.currentCoin.minAmount
        );
        return false;
      } else if (this.withdrawAmount - 0 < this.withdrawFee) {
        this.$Message.error("提币数量不得小于手续费");
        return false;
      } else if (
        this.withdrawFee == "" ||
        this.withdrawFee == 0 ||
        this.withdrawFee - 0 > this.currentCoin.maxTxFee ||
        this.withdrawFee - 0 < this.currentCoin.minTxFee
      ) {
        this.$Message.error(
          "手续费最小值为" +
            this.currentCoin.minTxFee +
            " , " +
            this.$t("uc.finance.withdraw.feetip2") +
            this.currentCoin.maxTxFee
        );
        return false;
      } else {
        return true;
      }
    },
    apply() {
      let check = this.valid();
      if (check.pass) {
        this.modal = true;
        let timercode = setInterval(() => {
          if (this.countdown <= 0) {
            clearInterval(timercode);
            this.sendcodeValue = this.$t("uc.regist.sendcode");
            this.codeIsSending = false;
          }
        }, 1000);
      } else {
        this.$Message.error(check.message);
      }
    },
    getMember() {
      //获取个人安全信息
      this.$http
        .post(this.host + "/uc/approve/security/setting")
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.user = resp.data;
          } else {
            this.$Message.error(this.loginmsg);
          }
        });
    }
  },
  created() {
    // this.getMember();
    this.$http.options.emulateJSON = false;
    this.coinType = this.$route.query.name || "";
    this.getAddrList();
    this.getList(0, 10, 1);
    console.log(this.$store.getters.member);
  },
  computed: {
    member: function() {
      console.log(this.$store.getters.member);
      return this.$store.getters.member;
    },
    tableColumnsWithdraw() {
      let columns = [],
        filters = [];
      if (this.coinList.length > 0) {
        this.coinList.forEach(v => {
          filters.push({
            label: v.unit,
            value: v.unit
          });
        });
      }
      columns.push({
        title: this.$t("uc.finance.withdraw.time"),
        width: 180,
        key: "createTime"
      });
      columns.push({
        title: this.$t("uc.finance.withdraw.symbol"),
        key: "symbol",
        filters,
        filterMultiple: false,
        filterMethod(value, row) {
          return row.coin.unit === value;
        },
        render: function(h, params) {
          return h("span", params.row.coin.unit);
        }
      });
      columns.push({
        title: this.$t("uc.finance.withdraw.address"),
        key: "address"
      });
      columns.push({
        title: this.$t("uc.finance.withdraw.num"),
        key: "totalAmount"
      });
      columns.push({
        title: this.$t("uc.finance.withdraw.fee"),
        key: "fee"
      });
      columns.push({
        title: this.$t("uc.finance.withdraw.status"),
        key: "status",
        render: (h, params) => {
          let text = "";
          if (params.row.status == 0) {
            text = this.$t("uc.finance.withdraw.status_1");
          } else if (params.row.status == 1) {
            text = this.$t("uc.finance.withdraw.status_2");
          } else if (params.row.status == 2) {
            text = this.$t("uc.finance.withdraw.status_3");
          } else if (params.row.status == 3) {
            text = this.$t("uc.finance.withdraw.status_4");
          }
          return h("div", [h("p", text)]);
        }
      });
      return columns;
    }
  }
};
</script>
<style lang="scss">
.withdraw-form-inline {
  padding: 20px 40px 0 40px;
  .ivu-input {
    height: 40px;
    line-height: 40px;
  }
}
</style>

<style scoped lang="scss">
#sendCode {
  position: absolute;
  border: none;
  background: none;
  top: 10px;
  outline: none;
  right: 0;
  width: 30%;
  color: #f0ac19;
  cursor: pointer;
  height: 20px;
  line-height: 20px;
  border-left: 1px solid #dddee1;
}
.nav-rights {
  .nav-right {
    height: auto;
    overflow: hidden;
    padding: 0 15px;
    .rightarea {
      padding-left: 15px;
      .trade-groups.merchant-tops {
        font-size: 14px;
        height: 50px;
        padding: 0 15px;
        color: #fff;
        overflow: hidden;
        display: block;
        margin-right: 0;
        a {
          display: inline-block;
          color: #f0a70a;
          width: 100px;
          height: 30px;
          border: 1px solid #f0a70a;
          line-height: 30px;
          text-align: center;
          border-radius: 20px;
          float: right;
        }
      }
      .action-box {
        padding: 10px 20px 20px;
        .form-group-container {
          .form-group.form-amount {
            .input-group .ivu-poptip {
              .ivu-poptip-rel {
                display: block;
                .ivu-input-number {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
}
.ivu-slider-button-wrap {
  top: -6px;
}
#withdrawAddressList {
  position: absolute;
  height: 0;
  transition: height 0.3s;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 1;
  max-height: 245px;
  overflow: auto;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  height: auto;
  background: #fff;
}

#withdrawAddressList .address-item {
  padding: 0 20px;
  display: flex;
  line-height: 48px;
  border-bottom: 1px solid transparent;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  z-index: 99;
}

#withdrawAddressList .address-item:hover {
  background: #f5f5f5;
  cursor: pointer;
}

#withdrawAddressList .notes {
  position: absolute;
  bottom: 0;
  right: 20px;
  height: 48px;
  line-height: 48px;
  max-width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

p.describe {
  font-size: 16px;
  font-weight: 600;
}

.acb-p1 {
  font-size: 18px;
  font-weight: 600;
  line-height: 50px;
}

.acb-p2 {
  font-size: 14px;
  line-height: 24px;
}

.action-content.pt10 {
  padding-top: 10px;
}

.action-content {
  width: 100%;
  margin-top: 20px;
  // overflow: hidden;
  display: table;
}

.action-content .action-body {
  display: table-cell;
  vertical-align: top;
  line-height: 20px;
  font-size: 12px;
  color: #ccc;
}

.action-foot {
  text-align: center;
  padding: 40px 170px 0;
}

.hb-night .btn.btn-primary,
.hb-night .btn.btn_submit {
  background-color: #7a98f7;
  color: white;
}

.action-inner {
  width: 100%;
  display: table;
}

.action-inner .inner-box {
  display: table-cell;
  width: 80%;
}

.form-group {
  position: relative;
  margin-bottom: 20px;
  font-size: 16px;
}

.controlAddress {
  line-height: 50px;
}

.form-group label {
  max-width: 100%;
  font-weight: 600;
}

.control-input-group {
  position: relative;
}

.control-input-group.open .select-list {
  height: auto;
}

.form-group-container {
  display: table;
  width: 100%;
}

.form-group-container .form-amount {
  width: 100%;
}

.form-group-container .form-group {
  display: table-cell;
}

.form-group-container .form-group span.addon-tag:last-child {
  padding: 0;
  border: none;
  background: none;
  cursor: default;
  position: absolute;
  right: 26px;
  top: 6px;
}

.form-group-container .form-group span.addon-tag:last-child.firstt {
  top: 8px;
}

.form-group-container2 {
  padding-top: 20px;
}

.form-group-container .form-fee {
  width: 50%;
  padding: 0 20px 0 0;
}

.label-amount .label-fr {
  float: right;
  color: #aaa;
  font-size: 14px;
}

.label-amount .label-fr span {
  margin-left: 2px;
}

.form-group-container .form-group {
  display: table-cell;
}

.hb-night table.table .table-inner {
  margin: -4px -20px;
  position: relative;
  background-color: #181b2a;
  border-radius: 3px;
}

.hb-night table.table .table-inner {
  margin: -4px -20px;
  position: relative;
  background-color: #181b2a;
  border-radius: 3px;
}

.hb-night table.table .table-inner {
  margin: -4px -20px;
  position: relative;
  background-color: #181b2a;
  border-radius: 3px;
}

table.table .table-inner.action-box {
  margin: -1px -10px;
}

.merchant-top .tips-word {
  -webkit-box-flex: 2;
  -ms-flex-positive: 2;
  flex-grow: 2;
  text-align: left;
}

.rightarea .rightarea-tabs {
  border: none;
}

.order_box {
  width: 100%;
  background: #fff;
  height: 56px;
  line-height: 56px;
  margin-bottom: 20px;
  border-bottom: 2px solid #ccf2ff;
  position: relative;
  text-align: left;
}

.order_box a {
  color: #8994a3;
  font-size: 16px;
  padding: 0 30px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  line-height: 54px;
  display: inline-block;
}

.order_box .active {
  border-bottom: 2px solid #f0a70a;
}

.order_box .search {
  position: absolute;
  width: 300px;
  height: 32px;
  top: 12px;
  right: 0;
  display: flex;
  /* border: #c5cdd7 solid 1px; */
}

.ivu-btn-primary {
  background-color: #f0a70a;
  border-color: #f0a70a;
}
#pages {
  margin: 10px;
  overflow: hidden;
}
</style>
<style lang="scss">
.nav-rights {
  .nav-right {
    .rightarea {
      .action-box {
        .action-inner {
          .inner-left,
          .inner-box {
            .ivu-select-dropdown .ivu-select-item {
              padding: 6px 16px;
            }
          }
        }
        .form-group-container {
          .form-group {
            .input-group {
              .ivu-poptip-rel {
                display: block;
                .ivu-input-number {
                  width: 100%;
                }
              }
              .ivu-input-number {
                width: 100%;
              }
            }
          }
        }
      }
    }
    .table-inner.action-box {
      .action-content .action-body {
        /*分页*/
        .order-table .ivu-table-wrapper .ivu-table-header {
          thead .ivu-table-cell {
            .ivu-poptip .ivu-poptip-rel .ivu-table-filter {
              i.ivu-icon.ivu-icon-funnel.on {
                color: #f0ac19;
              }
            }
          }
        }
      }
    }
  }
}
</style>

