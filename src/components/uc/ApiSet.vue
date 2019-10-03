<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-01-18 09:32:45
 * @LastEditTime: 2019-08-20 09:26:48
 * @LastEditors: Please set LastEditors
 -->
<script>
export default {
  name: "ApiSet",
  components: {},
  mixins: [],
  data() {
    return {
      params: {
        appId: "",
        appKey: "",
        appSecret: "",
        privateKey: "",
        returnUrl: ""
      },
      show: false,
      form: {
        returnUrl: ""
      },
      payCode: {
        value: "12345",
        size: 250,
        backgroundAlpha: 1,
        background: "white",
        foreground: "black",
        level: "L"
      },
      ruleValidate: {
        returnUrl: [
          { required: true, message: "returnUrl不能为空！", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      if (!this.isRealName()) {
        this.$Message.error("请先完成实名认证!");
        setTimeout(() => {
          this.$router.push({ path: "/uc/safe", query: { type: 6 } });
        }, 1500);
      } else if (!this.isBusiness()) {
        this.$Message.error("请先申请成为商家！!");
        setTimeout(() => {
          this.$router.push({ path: "/identbusiness" });
        }, 1500);
      } else {
        this.getApi();
      }
    },
    // 判断是否是商家
    isBusiness() {
      let member = localStorage.getItem("MEMBER")
        ? JSON.parse(localStorage.getItem("MEMBER"))
        : {};
      return member["memberLevel"] === 2;
    },
    // 判断是否实名认证
    isRealName() {
      let member = localStorage.getItem("MEMBER")
        ? JSON.parse(localStorage.getItem("MEMBER"))
        : {};
      return !!member["realName"];
    },
    showItem(type) {
      if (type === "returnUrl") {
        this.show = !this.show;
        this.form.returnUrl = this.params.returnUrl;
      } else if (type === "appKey") {
        this.$http
          .post(this.host + "/uc/approve/resetAppKey")
          .then(response => {
            var resp = response.body;
            console.log(resp);
            if (resp.code == 0) {
              this.params["appKey"] = resp["data"];
              this.$Message.success("appKey获取成功！");
              this.stringifyCode();
            } else {
              this.$Message.error(resp.message);
            }
          });
      } else if (type === "appSecret") {
        this.$http
          .post(this.host + "/uc/approve/resetAppSecret")
          .then(response => {
            var resp = response.body;
            console.log(resp);
            if (resp.code == 0) {
              this.params["appSecret"] = resp["data"];
              this.$Message.success("appSecret获取成功！");
              this.stringifyCode();
            } else {
              this.$Message.error(resp.message);
            }
          });
      } else if (type === "privateKey") {
        this.$http.post(this.host + "/uc/approve/resetRsa").then(response => {
          var resp = response.body;
          console.log(resp);
          if (resp.code == 0) {
            this.params["privateKey"] = resp["data"];
            this.$Message.success("privateKey获取成功！");
            this.stringifyCode();
          } else {
            this.$Message.error(resp.message);
          }
        });
      }
    },
    getApi() {
      this.$http.post(this.host + "/uc/approve/initApi").then(response => {
        var resp = response.body;
        //console.log(resp);
        if (resp.code == 0) {
          let data = resp["data"];
          this.params = Object.assign(this.params, data);
          this.stringifyCode();
          //console.log(this.params);
        } else {
          this.$Message.error(resp.message);
        }
      });
    },

    stringifyCode() {
      let params = {
        appId: this.params.appId,
        appSecret: this.params.appSecret,
        appKey: this.params.appKey,
        serverUrl: window.location.origin + "/p/"
      };
      this.payCode.value = JSON.stringify(params);
    },

    handleSubmit() {
      console.log(this.form.returnUrl);
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$http
            .post(this.host + "/uc/approve/updateReturnUrl", {
              returnUrl: this.form.returnUrl
            })
            .then(response => {
              var resp = response.body;
              console.log(resp);
              if (resp.code == 0) {
                this.params["returnUrl"] = this.form.returnUrl;
                this.$Message.success("returnUrl保存成功！");
                this.show = false;
              } else {
                this.$Message.error(resp.message);
              }
            });
        }
      });
    },
    onSuccess(name) {
      this.$Message.success(name + " 复制成功");
    },
    onError() {
      this.$Message.error("复制失败");
    }
  },
  watch: {}
};
</script>
<template>
    <div class="nav-rights">
        <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
            <div class="bill_box rightarea padding-right-clear record account-box">
                <section class="trade-group merchant-top">
                    <i class="merchant-icon tips"></i>
                    <span class="tips-word">API设置</span>
                </section>
                <Row>
                    <i-col :span="18">
                        <section class="accountContent">
                            <div class="account-in">
                                <div class="account-item">
                                    <div class="account-item-in">
                                        <span class="card-number">appId</span>
                                        <p
                                                class="bankInfo"
                                                style="color: #fff;word-break: break-all"
                                        >
                                            {{ params.appId }}
                                            <i-button type="text"
                                                      v-if="params.appId"
                                                      v-clipboard:copy="params.appId"
                                                      　　v-clipboard:success="()=>onSuccess('appId')"
                                                      　　v-clipboard:error="onError"
                                            >复制
                                            </i-button>
                                        </p>
                                    </div>
                                </div>
                                <div class="account-item">
                                    <div class="account-item-in">
                                        <span class="card-number">appSecret</span>
                                                <p
                                                class="bankInfo"
                                                style="color: #fff;word-break: break-all"
                                        >
                                            {{ params.appSecret }}
                                                    <i-button type="text"
                                                              v-if="params.appSecret"
                                                              v-clipboard:copy="params.appSecret"
                                                              　　v-clipboard:success="()=>onSuccess('appSecret')"
                                                              　　v-clipboard:error="onError"
                                                    >复制
                                                    </i-button>
                                        </p>
                                        <a class="btn" @click="showItem('appSecret')">重新获取</a>
                                    </div>
                                </div>
                                <div class="account-item">
                                    <div class="account-item-in">
                                        <span class="card-number">appKey</span>
                                        <p
                                                class="bankInfo"
                                                style="color: #fff;word-break: break-all"
                                        >
                                            {{ params.appKey }}
                                            <i-button type="text"
                                                      v-if="params.appKey"
                                                      v-clipboard:copy="params.appKey"
                                                      　　v-clipboard:success="()=>onSuccess('appKey')"
                                                      　　v-clipboard:error="onError"
                                            >复制
                                            </i-button>
                                        </p>
                                        <a class="btn" @click="showItem('appKey')">重新获取</a>
                                    </div>
                                </div>

                                <div class="account-item">
                                    <div class="account-item-in">
                                        <span class="card-number">privateKey</span>
                                        <p
                                                class="bankInfo"
                                                style="color: #fff;word-break: break-all"
                                        >
                                            {{ params.privateKey }}
                                            <i-button type="text"
                                                      v-if="params.privateKey"
                                                      v-clipboard:copy="params.privateKey"
                                                      　　v-clipboard:success="()=>onSuccess('privateKey')"
                                                      　　v-clipboard:error="onError"
                                            >复制
                                            </i-button>
                                        </p>
                                        <a class="btn" @click="showItem('privateKey')">重新获取</a>
                                    </div>
                                </div>
                                <div class="account-item">
                                    <div class="account-item-in">
                                        <span class="card-number">returnUrl</span>
                                        <p
                                                class="bankInfo"
                                                style="color: #fff;word-break: break-all"
                                        >
                                            {{ params.returnUrl }}
                                            <i-button type="text"
                                                      v-if="params.returnUrl"
                                                      v-clipboard:copy="params.returnUrl"
                                                      　　v-clipboard:success="()=>onSuccess('returnUrl')"
                                                      　　v-clipboard:error="onError"
                                            >复制
                                            </i-button>
                                        </p>
                                        <a
                                                class="btn"
                                                v-if="params.returnUrl"
                                                @click="showItem('returnUrl')"
                                        >修改</a
                                        >
                                        <a class="btn" v-else @click="showItem('returnUrl')"
                                        >绑定</a
                                        >
                                    </div>
                                    <div class="account-detail" v-show="show">
                                        <div class="detail-list">
                                            <Form
                                                    ref="form"
                                                    :model="form"
                                                    :rules="ruleValidate"
                                                    :label-width="85"
                                            >
                                                <!--update - hjq -->
                                                <!-- name -->
                                                <FormItem label="returnUrl" prop="returnUrl">
                                                    <Input
                                                            size="large"
                                                            v-model="form.returnUrl"
                                                            placeholder="请输入returnUrl..."
                                                    ></Input>
                                                </FormItem>

                                                <FormItem>
                                                    <div style="text-align: center">
                                                        <Button type="primary" @click="handleSubmit('form')"
                                                        >保存
                                                        </Button
                                                        >
                                                    </div>
                                                </FormItem>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </i-col>
                    <i-col :span="6">
                        <div class="vui-margin-bottom vui-text-align--center ">
                            <span class="vui-color--danger">手机APP[BPay]扫一扫</span>
                        </div>
                        <div class="">
                            <qriously
                                    :value="payCode.value"
                                    :size="payCode.size"
                                    :level="payCode.level"
                                    :background="payCode.background"
                                    :foreground="payCode.foreground"
                                    :backgroundAlpha="payCode.backgroundAlpha"
                            />
                        </div>
                    </i-col>
                </Row>
            </div>
        </div>
    </div>
</template>
<style scoped>
.account-box .account-in .account-item .account-detail {
  padding: 30px 0;
  /* background: white; */
  margin: 6px 0;
}

.account-box .account-in .account-item .account-detail .detail-list {
  width: 40%;
  width: 80%;
  margin: 0 auto;
}

.account-box
  .account-in
  .account-item
  .account-detail
  .detail-list
  .input-control {
  margin-bottom: 10px;
  height: 45px;
}

.detail-list .input-control .ivu-input-group-prepend {
  width: 63px;
}

.detail-list .input-control .ivu-input {
  height: 45px;
}

.account-box .account-in .account-item {
  margin-bottom: 10px;
}

.account-box .account-in .account-item .account-item-in {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 15px 30px 15px 50px;
  -webkit-box-shadow: 0 1px 0 0 rgba(69, 112, 128, 0.06);
  box-shadow: 0 1px 0 0 rgba(69, 112, 128, 0.06);
  font-size: 14px;
  color: #fff;
}

.account-box .account-in .account-item .account-item-in .icons {
  height: 17px;
  width: 17px;
  display: inline-block;
  margin-top: -1px;
  background-size: 100% 100%;
}

.account-box .account-in .account-item .account-item-in .bankfor {
  background-image: url(../../assets/img/bankcard.png);
}

.icons.alipay {
  background-image: url(../../assets/img/alipay.png);
}

.icons.wechat {
  background-image: url(../../assets/img/wechat.png);
}

.account-box .account-in .account-item .account-item-in .card-number {
  width: 142px;
  height: 40px;
  margin-right: 15px;
  border-right: 1px dashed #27313e;
  padding: 0 15px;
  line-height: 40px;
  text-align: left;
  display: inline-block;
}

.account-box .account-in .account-item .account-item-in .bankInfo {
  width: 70%;
  text-align: left;
}

.account-box .account-in .account-item .account-item-in .btn {
  padding: 8px 10px;
  cursor: pointer;
  color: #f0a70a;
}

.tips-g {
  color: #fff;
  font-size: 12px;
}

.table-inner {
  position: relative;
  text-align: left;
  border-radius: 3px;
  padding: 23px 20px 20px;
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

.action-inner {
  width: 100%;
  display: table;
}

.action-inner .inner-box {
  display: table-cell;
  width: 100%;
}

.action-box .title .copy {
  user-select: text;
}

.action-box .title a.link-copy {
  font-size: 14px;
  margin-left: 20px;
}

.hb-night a {
  text-decoration: none;
  color: #f0a70a;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.action-box .title a.link-qrcode {
  margin-left: 20px;
  font-size: 14px;
  position: relative;
}

.hb-night a {
  text-decoration: none;
  color: #f0a70a;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.action-box .subtitle {
  font-size: 12px;
  margin-top: 30px;
}

.action-content {
  width: 100%;
  margin-top: 30px;
  overflow: hidden;
  display: table;
}

.action-box .title {
  margin-top: 20px;
  font-size: 20px;
  user-select: none;
}

.action-box .title .show-qrcode {
  position: absolute;
  top: -100px;
  left: 40px;
  padding: 10px;
}

.action-inner .inner-box.deposit-address {
  width: 80%;
}

p.describe {
  font-size: 16px;
  font-weight: 600;
}

.merchant-top {
  height: 50px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 15px;
}

.trade-group {
  margin-bottom: 20px;
  font-size: 14px;
}

.merchant-icon {
  display: inline-block;
  margin-left: 4px;
  background-size: 100% 100%;
}

.merchant-top .tips-word {
  -webkit-box-flex: 2;
  -ms-flex-positive: 2;
  flex-grow: 2;
  text-align: left;
}

.merchant-icon.tips {
  width: 4px;
  height: 22px;
  margin-right: 10px;
  background: #f0a70a;
}

.bill_box {
  width: 100%;
  height: auto;
  overflow: hidden;
}

.rightarea {
  padding-left: 15px !important;
  padding-right: 15px !important;
  margin-bottom: 60px !important;
}

.rightarea .rightarea-top {
  line-height: 75px;
  border-bottom: #f1f1f1 solid 1px;
}

.rightarea .rightarea-con {
  padding-top: 30px;
  padding-bottom: 125px;
}

.rightarea .trade-process {
  line-height: 30px;
  padding: 0 15px;
  background: #f1f1f1;
  display: inline-block;
  position: relative;
  margin-right: 20px;
}

.rightarea .trade-process.active {
  color: #eb6f6c;
  background: #f9f5eb;
}

.rightarea .trade-process .icon {
  background: #fff;
  border-radius: 20px;
  height: 20px;
  width: 20px;
  display: inline-block;
  line-height: 20px;
  text-align: center;
  margin-right: 10px;
}

.rightarea .trade-process .arrow {
  position: absolute;
  top: 10px;
  right: -5px;
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid #f1f1f1;
}

.rightarea .trade-process.active .arrow {
  border-left: 5px solid #f9f5eb;
}

.rightarea .rightarea-tabs {
  border: none;
}

.rightarea .rightarea-tabs li > a {
  width: 100%;
  height: 100%;
  padding: 0;
  margin-right: 0;
  font-size: 14px;
  color: #646464;
  border-radius: 0;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rightarea .rightarea-tabs li > a:hover {
  background-color: #fcfbfb;
}

.rightarea .rightarea-tabs li {
  width: 125px;
  height: 40px;
  position: relative;
  margin: -1px 0 0 -1px;
  border: 1px solid #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.rightarea .rightarea-tabs li.active {
  background-color: #fcfbfb;
}

.rightarea .rightarea-tabs li:last-child {
  border-right: 1px solid #f1f1f1;
}

.rightarea .rightarea-tabs li.active > a,
.rightarea .rightarea-tabs li:hover > a {
  color: #da2e22;
  border: none;
}

.rightarea .panel-tips {
  border: 3px solid #fdfaf3;
  color: #9e9e9e;
  font-size: 12px;
}

.rightarea .panel-tips .panel-header {
  background: #fdfaf3;
  line-height: 40px;
  margin-bottom: 15px;
}

.rightarea .panel-tips .panel-title {
  font-size: 16px;
}

.rightarea .recordtitle {
  cursor: pointer;
}

.nav-right {
  /* width: 1000px; */
  height: auto;
  overflow: hidden;
  padding: 0 15px;
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
</style>
