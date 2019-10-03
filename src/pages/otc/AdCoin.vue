<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-02-19 15:56:25
 * @LastEditTime: 2019-08-13 16:52:04
 * @LastEditors: Please set LastEditors
 -->
<script>
//import { VaPopupRadio }  from './component'
//import user  from '../vue.mixins/user'
export default {
  name: "AdCoin",
  components: {},
  mixins: [],
  data() {
    const numberCheck = (rule, value, callback) => {
      if (value === "" || value < 100) {
        callback(new Error("请输入正确的数量！不小于100"));
      } else if (Number.isNaN(Number(value))) {
        callback(new Error("请输入正确的数值！"));
      } else {
        callback();
      }
    };

    return {
      form: {
        advertiseType: "1",
        number: "",
        payMode: [],
        priceW: ""
      },
      base: {
        limit: 0,
        balance: 0,
        leftBuyLimit: 0,
        leftSellLimit: 0
      },
      edit: {
        type: "insert",
        id: ""
      },
      ruleValidate: {
        advertiseType: [{ required: true, trigger: "change" }],
        number: [
          {
            required: true,
            validator: numberCheck,
            //message: this.$t("请输入正确的数值！"),
            trigger: "blur"
          }
        ],
        payMode: [
          {
            required: true,
            type: "array",
            min: 1,
            message: this.$t("otc.publishad.inputtip7"),
            trigger: "change"
          }
        ],
        priceW: [
          {
            required: true,
            message: this.$t("otc.publishad.inputtip8"),
            trigger: "blur"
          }
        ]
      },
      isId: false,
      payModeList: [
        // {
        //   value: this.$t("otc.publishad.zfb"),
        //   label: this.$t("otc.publishad.zfb"),
        //   isOpen: true
        // },
        // {
        //   value: this.$t("otc.publishad.wx"),
        //   label: this.$t("otc.publishad.wx"),
        //   isOpen: true
        // },
        // {
        //   value: this.$t("otc.publishad.unionpay"),
        //   label: this.$t("otc.publishad.unionpay"),
        //   isOpen: true
        // }
      ]
    };
  },
  mounted() {},
  created() {
    this.initPage();
  },
  activated() {},
  methods: {
    async initPage() {
      this.getMember();
      this.getDetailAd();
      this.getBaseMessage();
    },
    // 获得额度等基本信息
    getBaseMessage() {
      //获取个人账户信息
      let self = this;
      this.$http.post(this.host + "/otc/advertise/init").then(response => {
        var resp = response.body;
        if (resp.code === 0) {
          if (resp.data) {
            this.base = Object.assign(this.base, resp.data);
            // this.base.balance = resp.data.balance;
            // this.base.limit = resp.data.limit;
            // this.base.leftBuyLimit = resp.data.leftBuyLimit;
            // this.base.leftSellLimit = resp.data.leftSellLimit ;
          } else this.$Message.error("获取用户剩余额度等信息失败！");
        } else this.$Message.error(resp.message);
      });
    },

    getDetailAd() {
      this.edit.id = this.$route.query["id"];
      if (this.edit.id) {
        this.edit.type = "update";
        this.$http
          .post(this.host + "/otc/advertise/detail", { id: this.edit.id })
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              let data = resp["data"];
              this.form.advertiseType = data["advertiseType"] + "";
              this.form.number = data["number"];
              this.form.payMode = (data.payMode + "").split(",");
            } else {
              this.$Message.error(resp.message);
            }
          });
      } else {
        this.edit.type = "insert";
      }
    },
    getMember() {
      //获取个人安全信息
      let self = this;
      this.$http.get(this.host + this.api.uc.identification).then(res => {
        let certifiedBusinessStatus = res.body.data.certifiedBusinessStatus;
        if (certifiedBusinessStatus == 2) {
          this.getAccount();
        } else {
          this.$Message.warning("请先申请商家认证!");
          this.$router.push("/identbusiness");
        }
      });
    },
    getAccount() {
      //获取个人账户信息
      let self = this;
      this.$http
        .post(this.host + "/uc/approve/account/setting")
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            let data = (resp.data || []).filter(item => item["checked"] === 1);
            if (data.findIndex(item => item["type"] === 1) > -1) {
              this.payModeList.push({ label: "银联", value: "银联" });
            }
            if (data.findIndex(item => item["type"] === 2) > -1) {
              this.payModeList.push({ label: "微信", value: "微信" });
            }
            if (data.findIndex(item => item["type"] === 3) > -1) {
              this.payModeList.push({ label: "支付宝", value: "支付宝" });
            }
            if (data.findIndex(item => item["type"] === 4) > -1) {
              this.payModeList.push({ label: "云闪付", value: "云闪付" });
            }
          } else {
            this.msg = resp.message;
            this.$Message.error(resp.message);
          }

          //   if (
          //     resp.data.bankVerified == 0 &&
          //     resp.data.aliVerified == 0 &&
          //     resp.data.wechatVerified == 0
          //   ) {
          //     this.$Message.success(this.$t("otc.publishad.submittip4"));
          //     self.$router.push("/uc/account");
          //   }
          //   if (resp.data.aliVerified == 1) {
          //     this.payModeList[0].isOpen = false;
          //   }
          //   if (resp.data.wechatVerified == 1) {
          //     this.payModeList[1].isOpen = false;
          //   }
          //   if (resp.data.bankVerified == 1) {
          //     this.payModeList[2].isOpen = false;
          //   }
          // } else {
          //   this.msg = resp.message;
          //   this.$Message.error(resp.message);
          // }
        });
    },
    handleSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let object = {};
          object["advertiseType"] = this.form.advertiseType;
          object["number"] = this.form.number;
          object["pay"] = this.form.payMode;
          object["jyPassword"] = this.form.priceW;
          console.log(object);
          if (this.edit.type == "insert") {
            this.$http
              .post(this.host + "/otc/advertise/createStable", object)
              .then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                  this.$Message.success(resp.message);
                  var that = this;
                  setTimeout(() => {
                    that.$router.push("/uc/ad");
                  }, 1000);
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
                  var that = this;
                  setTimeout(() => {
                    that.$router.push("/uc/ad");
                  }, 1000);
                } else {
                  this.$Message.error(resp.message);
                }
              });
          }
        } else {
          this.$Message.error(this.$t("otc.publishad.submit_failure"));
        }
      });
    }
  },
  watch: {
    "": {
      handler(val, olval) {},
      deep: true,
      immediate: true
    }
  }
};
</script>
<template>
  <div class="my_ad_container">
    <input type="text" hidden />
    <input type="password" hidden />

    <div class="contbox">
      <div class="">
        <div class="send-box">
          <div>
            <span style="color:#aaa;fontSize:14px;padding-left: 20px;"
              >【 承兑额度 】 <span>{{ base.limit }}</span></span
            >
            <span style="color:#aaa;fontSize:14px;padding-left: 20px;"
              >【 余额 】 <span>{{ base.balance }}</span></span
            >
          </div>
          <div class="formbox send-form">
            <Form
              ref="form"
              :model="form"
              :rules="ruleValidate"
              :label-width="90"
            >
              <FormItem label="余额" v-show="false">
                <Input :value="base.balance" readonly></Input>
              </FormItem>
              <FormItem label="额度" v-show="false">
                <Input :value="base.limit" readonly></Input>
              </FormItem>
              <FormItem :label="$t('otc.publishad.iwant')" prop="advertiseType">
                <RadioGroup v-model="form.advertiseType">
                  <Radio label="1" :disabled="edit.type === 'update'">{{
                    $t("otc.publishad.sellonline")
                  }}</Radio>
                  <Radio label="0" :disabled="edit.type === 'update'">{{
                    $t("otc.publishad.buyonline")
                  }}</Radio>
                </RadioGroup>
              </FormItem>
              <span
                v-if="form.advertiseType == '1'"
                tag="div"
                style="padding-left: 90px;color:#f0ac19;"
                >【可出售】{{ base.leftSellLimit }}
              </span>
              <span
                v-if="form.advertiseType == '0'"
                tag="div"
                style="padding-left: 90px;color:#f0ac19;"
                >【可购买】{{ base.leftBuyLimit }}
              </span>
              <FormItem label="交易数量" prop="number" v-show="false">
                <Input
                  v-model="form.number"
                  placeholder="请输入您的交易数量"
                  autocomplete="off"
                ></Input>
              </FormItem>
              <FormItem label="交易数量" prop="number">
                <Input
                  v-model="form.number"
                  placeholder="请输入您的交易数量"
                  autocomplete="off"
                ></Input>
              </FormItem>

              <router-link
                to="/uc/account"
                style="padding-left: 90px;color:#f0ac19;"
                >{{ $t("otc.publishad.tip2") }}</router-link
              >
              <FormItem :label="$t('otc.publishad.paymode')" prop="payMode">
                <Select v-model="form.payMode" multiple>
                  <Option
                    v-for="item in payModeList"
                    :value="item.value"
                    :key="item.value"
                    :disabled="item.isOpen"
                    >{{ item.label }}</Option
                  >
                </Select>
              </FormItem>
              <FormItem
                :label="$t('otc.publishad.fundpwd')"
                prop="priceW"
                v-show="false"
              >
                <Input
                  v-model="form.priceW"
                  :placeholder="$t('otc.publishad.fundpwdtip')"
                  type="password"
                  autocomplete="off"
                ></Input>
              </FormItem>
              <FormItem :label="$t('otc.publishad.fundpwd')" prop="priceW">
                <Input
                  v-model="form.priceW"
                  :placeholder="$t('otc.publishad.fundpwdtip')"
                  type="password"
                  autocomplete="off"
                ></Input>
              </FormItem>

              <FormItem>
                <Button
                  style="background:#f0a70a;color:#fff;border:1px solid #f0a70a;"
                  long
                  @click="handleSubmit('form')"
                  >{{ $t("otc.publishad.submit") }}</Button
                >
                <!-- <Button type="ghost" @click="handleReset('form')" style="margin-left: 8px">Reset</Button> -->
              </FormItem>
            </Form>
          </div>
          <div>
            <p style="font-size: 18px;font-weight: 600;line-height: 50px">
              温馨提示
            </p>
            <p style="font-size: 14px;line-height: 24px">
              • 承兑额度=出售或购买的上限
            </p>
            <p style="font-size: 14px;line-height: 24px">
              • 承兑额度增加=用其他数字货币兑换TTM会增加TTM数量的额度
            </p>
            <p style="font-size: 14px;line-height: 24px">
              • 承兑额度的减少=用TTM兑换其他数字货币会减少TTM数量的额度
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.my_ad_container {
  width: 80%;
  float: right;
}
.cankao {
  color: #e24a64;
}
.contbox {
  position: relative;
}
#price {
  font-size: 18px;
  color: #e24a64;
}

.send-box .send-form .msg {
  padding-left: 90px;
  margin-bottom: 10px;
  position: relative;
  top: -4px;
}

.formbox {
  width: 50%;
  padding-top: 30px;
}

.send-box {
  color: #fff;
  padding: 32px;
}

.title-box {
  /*border-left: 1px dashed #ebeff5;*/
  border-bottom: 1px dashed #ccc;
  padding-bottom: 30px;
  text-align: left;
  padding-left: 18px;
}

.title-box .titles {
  font-size: 18px;
  font-weight: normal;
  color: #fff;
  margin-bottom: 15px;
}

.title-box p {
  line-height: 2;
}

.title-box p a {
  color: #f0a70a;
}

.order-table {
  margin-top: 20px;
}

.content-wrap {
  // background: #f5f5f5;
  min-height: 750px;
}

.container {
  margin: 0 auto;
}
</style>
