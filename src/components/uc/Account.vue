<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-01-18 09:32:45
 * @LastEditTime: 2019-08-27 10:22:18
 * @LastEditors: Please set LastEditors
 -->
<script>
import "./account.less";
import { funer, Checker, stringer, Queryer } from "store-es";
import { Base64 } from "js-base64";
export default {
  name: "account",
  data() {
    return {
      storage: {
        types: ["银行卡", "微信", "支付宝", "云闪付", "聚合码", "动态码"]
      },
      uploadHeaders: { "x-auth-token": localStorage.getItem("TOKEN") },
      //uploadUrl: 'http://103.91.217.67/res/upload/image/qr.do',
      popup: {
        picture: false,
        edit: false,
        del: false,
        toggle: false,
        feekback: false
      },
      password: "",
      params: {
        type: "6",
        name: "",
        realName: "",
        url: "",
        reUrl: "",
        originUrl: "",
        bankName: ""
      },

      card: {
        realName: "",
        url: "",
        reUrl: "",
        name: "",
        mask: "" // 银行简称
      },
      wx: {
        name: "",
        originUrl: "",
        url: ""
      },
      alipay: {
        realName: "",
        name: "",
        originUrl: "",
        url: "",
        userId: "",
        userIdAgain: ""
      },
      unionpay: {
        name: "",
        originUrl: "",
        url: ""
      },

      polymer: {
        name: "",
        originUrl: "",
        url: "",
        payMode: []
      },
      dynamic: {
        name: ""
      },

      setting: [],
      del: {
        password: "",
        id: ""
      },
      picture: {
        url: ""
      },
      toggle: {
        password: "",
        id: "",
        type: "",
        checked: 0
      },
      feedback: {
        remark: "",
        pic: "",
        payInfoId: ""
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.authAfter();
    });
    this.initialize();
  },
  methods: {
    initialize() {
      this.getSetting();
    },

    getBankName: funer.debouncer(function() {
      this.$request("/p/co/cardDetail.do")({
        cardNo: this.card.reUrl
      }).then(
        data => {
          if (data["code"] === "000") {
            let res = data["data"] || {};
            if (res["bank"] && res["bankName"]) {
              this.card.name = res["bankName"];
              this.card.mask = res["bank"];
            } else {
              this.$Message.error("该银行不支持！");
            }
          } else {
            this.card.name = "";
            this.card.mask = "";
          }
        },
        error => {
          this.$Message.error(error.msg);
        }
      );
    }, 1000),
    getSetting() {
      this.$request("/uc/approve/account/setting")().then(res => {
        if (res["code"] === 0) {
          let list = [];
          list = (res["data"] || []).map(item => {
            if (item["type"] === 1) {
              item["url"] = stringer.connect.start(item["url"], " ");
            }
            return item;
          });

          this.setting = list
            .filter(item => item["checked"] === 1)
            .sort(function(a, b) {
              return a.type - b.type;
            })
            .concat(
              list
                .filter(item => item["checked"] === 0)
                .sort(function(a, b) {
                  return a.type - b.type;
                })
            );
        } else {
          let message = res["message"];
          this.$Message.error(message);
          if (message === "请先设置资金密码") {
            setTimeout(() => {
              this.$router.push({ path: "/uc/safe", query: { type: 5 } });
            }, 1500);
          } else if (message === "请先完成实名认证") {
            setTimeout(() => {
              this.$router.push({ path: "/uc/safe", query: { type: 6 } });
            }, 1500);
          }
        }
      });
    },
    uploadError() {
      this.$Message.error("上传二维码失败，请重新尝试！");
    },
    updoadPicSuccess(res) {
      if (res.code === "000") {
        this.feedback.pic = res.data.url;
      }
    },
    updoadPicError(res) {
      this.$Message.error("上传图片失败，请重新尝试！");
    },
    /**
     * 判断识别出来的二维码是否合法
     * arr 是指 需要判断的数组 url 是指判断的路径
     */
    jageQrType(type, url) {
      let rule = {
        wx: ["alipay"],
        ali: ["wxp"]
      };

      if (!url) return false;
      for (let n = 0; n < rule[type].length; n++) {
        let temp = rule[type][n];
        if (url.indexOf(temp) > -1 || url.indexOf(temp.toUpperCase()) > -1)
          return false;
      }
      return true;
    },
    uploadSuccess(res, type) {
      this.$refs["upload"].fileList = [];
      let qr, url;
      if (
        res["code"] === "000" &&
        res["data"] &&
        (qr = res["data"]["qr"]) &&
        (url = res["data"]["url"])
      ) {
        if (type === "wx" && !this.jageQrType("wx", qr)) {
          return this.$Message.error("非微信收款二维码");
        }
        if (type === "alipay" && !this.jageQrType("ali", qr)) {
          return this.$Message.error("非支付宝收款二维码");
        }
        console.log(type, this[type]);
        this[type].originUrl = url;
        this[type].url = qr;
        this.$Message.success("二维码识别成功！");
      } else {
        if (res["data"] && !res["data"]["qr"]) {
          this.$Message.error("识别二维码失败，请重新尝试！");
        } else {
          this.$Message.error("上传二维码失败，请重新尝试！");
        }
      }
    },

    submitMessage() {
      let check = new Checker();
      if (this.params.type === "1") {
        check
          .set(this.card.realName, true, "请输入您的银行卡姓名")
          .set(this.card.url, true, "请输入您的卡号")
          .check("卡号格式错误，由15-19位数字组成", value => {
            return /^[0-9]{15,19}$/.test(value);
          })
          .set(this.card.reUrl, true, "请再次输入您的卡号")
          .check(
            "请输入相同的银行卡号",
            () => this.card.url === this.card.reUrl
          )
          .set(this.card.name, true, "开户行信息获取失败")
          .set(this.password, true, "请输入您的资金密码");
        if (check.pass) {
          this.$request("/uc/approve/bind/payInfo")({
            type: this.params.type,
            name: this.card.name,
            realName: this.card.realName,
            url: this.card.url,
            alipayOrMask: this.card.mask,
            jyPassword: this.password
          }).then(res => {
            if (res["code"] === 0) {
              this.popup.edit = false;
              this.card.name = "";
              this.card.realName = "";
              this.card.url = "";
              this.card.reUrl = "";
              this.card.mask = "";
              this.getSetting();
              this.$Message.success(res["message"]);
            } else {
              this.$Message.error(res["message"]);
            }
          });
        } else {
          this.$Message.error(check["message"]);
        }
      } else if (this.params.type === "2") {
        check
          .set(this.wx.name, true, "请输入您的微信账号")
          .set(this.wx.originUrl, true, "请上传微信收款二维码")
          .set(this.wx.url, true, "微信二维码识别失败")
          .set(this.password, true, "请输入您的资金密码");
        if (check.pass) {
          this.$request("/uc/approve/bind/payInfo")({
            type: this.params.type,
            name: this.wx.name,
            url: this.wx.url,
            originUrl: this.wx.originUrl,
            jyPassword: this.password
          }).then(res => {
            if (res["code"] === 0) {
              this.popup.edit = false;
              this.wx.name = "";
              this.wx.url = "";
              this.wx.originUrl = "";
              this.getSetting();
              this.$Message.success(res["message"]);
            } else {
              this.$Message.error(res["message"]);
            }
          });
        } else {
          this.$Message.error(check["message"]);
        }
      } else if (this.params.type === "3") {
        check
          .set(this.alipay.realName, true, "请输入您的支付宝真实姓名")
          .set(this.alipay.name, true, "请输入您的支付宝账号")
          .set(this.alipay.originUrl, true, "请上传支付宝收款二维码")
          .set(this.alipay.url, true, "支付宝二维码识别失败")
          .set(this.alipay.userId, true, "请完成支付宝授权")

          .set(this.password, true, "请输入您的资金密码");
        if (check.pass) {
          this.$request("/uc/approve/bind/payInfo")({
            type: this.params.type,
            name: this.alipay.name,
            realName: this.alipay.realName,
            url: this.alipay.url,
            originUrl: this.alipay.originUrl,
            alipayOrMask: this.alipay.userId,
            jyPassword: this.password
          }).then(res => {
            if (res["code"] === 0) {
              this.popup.edit = false;
              this.alipay.name = "";
              this.alipay.realName = "";
              this.alipay.url = "";
              this.alipay.originUrl = "";
              this.alipay.userId = "";
              localStorage.removeItem("app/account/auth/message");
              this.getSetting();
              this.$Message.success(res["message"]);
              setTimeout(() => {
                this.$router.replace({ path: "/uc/account" });
              }, 500);
            } else {
              this.$Message.error(res["message"]);
            }
          });
        } else {
          this.$Message.error(check["message"]);
        }
      } else if (this.params.type === "4") {
        check
          .set(this.unionpay.name, true, "请输入您的云闪付账号")
          .set(this.unionpay.originUrl, true, "请上传云闪付收款二维码")
          .set(this.unionpay.url, true, "云闪付二维码识别失败")
          .set(this.password, true, "请输入您的资金密码");
        if (check.pass) {
          this.$request("/uc/approve/bind/payInfo")({
            type: this.params.type,
            name: this.unionpay.name,
            url: this.unionpay.url,
            originUrl: this.unionpay.originUrl,
            jyPassword: this.password
          }).then(res => {
            if (res["code"] === 0) {
              this.popup.edit = false;
              this.unionpay.name = "";
              this.unionpay.url = "";
              this.unionpay.originUrl = "";
              this.getSetting();
              this.$Message.success(res["message"]);
            } else {
              this.$Message.error(res["message"]);
            }
          });
        } else {
          this.$Message.error(check["message"]);
        }
      } else if (this.params.type === "5") {
        check
          .set(this.polymer.name, true, "请输入您的聚合码账号")
          .set(this.polymer.payMode.join(","), true, "选择付款方式")
          .set(this.polymer.originUrl, true, "请上传聚合码收款二维码")
          .set(this.polymer.url, true, "聚合码二维码识别失败")
          .set(this.password, true, "请输入您的资金密码");
        if (check.pass) {
          this.$request("/uc/approve/bind/payInfo")({
            type: this.params.type,
            name: this.polymer.name,
            url: this.polymer.url,
            alipayOrMask: this.polymer.payMode.join(","),
            originUrl: this.polymer.originUrl,
            jyPassword: this.password
          }).then(res => {
            if (res["code"] === 0) {
              this.popup.edit = false;
              this.polymer.name = "";
              this.polymer.url = "";
              this.polymer.payMode = [];
              this.polymer.originUrl = "";
              this.getSetting();
              this.$Message.success(res["message"]);
            } else {
              this.$Message.error(res["message"]);
            }
          });
        } else {
          this.$Message.error(check["message"]);
        }
      } else if (this.params.type === "6") {
        check
          .set(this.dynamic.name, true, "请输入您的动态码账号")
          .set(this.password, true, "请输入您的资金密码");
        if (check.pass) {
          this.$request("/uc/approve/bind/payInfo")({
            type: this.params.type,
            name: this.dynamic.name,
            jyPassword: this.password
          }).then(res => {
            if (res["code"] === 0) {
              this.popup.edit = false;
              this.dynamic.name = "";
              this.getSetting();
              this.$Message.success(res["message"]);
            } else {
              this.$Message.error(res["message"]);
            }
          });
        } else {
          this.$Message.error(check["message"]);
        }
      }
    },
    deleteBeforePay(item) {
      this.popup.del = true;
      this.del.id = item["id"];
    },
    deletePay() {
      let check = new Checker();
      check.set(this.password, true, "请输入您的资金密码");
      if (check.pass) {
        this.$request("/uc/approve/delete/payInfo")({
          id: this.del.id,
          jyPassword: this.password
        }).then(res => {
          if (res["code"] === 0) {
            this.$Message.success("绑定成功");
            this.del.id = "";
            this.popup.del = false;
            this.getSetting();
          } else {
            this.$Message.error(res["message"]);
          }
        });
      } else {
        this.$Message.error(check["message"]);
      }
    },

    jumpManagePage(item) {
      this.$router.push(
        "/uc/account/manage?type=" + item["type"] + "&id=" + item["id"]
      );
    },
    toggleBeforePay(item) {
      this.popup.toggle = true;
      this.toggle.id = item["id"];
      this.toggle.type = item["type"];
      this.toggle.checked = item["checked"];
    },
    togglePay() {
      let check = new Checker();
      check.set(this.password, true, "请输入您的资金密码");
      if (check.pass) {
        this.$request("/uc/approve/toggle/payInfo")({
          id: this.toggle.id,
          type: this.toggle.type,
          checked: Math.abs(this.toggle.checked - 1),
          jyPassword: this.password
        }).then(res => {
          if (res["code"] === 0) {
            this.$Message.success(
              `${this.toggle.checked === 1 ? "关闭" : "开启"}成功 `
            );
            this.toggle.id = "";
            this.popup.toggle = false;
            this.getSetting();
          } else {
            this.$Message.error(res["message"]);
          }
        });
      } else {
        this.$Message.error(check["message"]);
      }
    },
    feedbackBefore(item) {
      this.feedback.payInfoId = item.id;
      this.popup.feekback = true;
    },
    sureFeedback() {
      if (!this.feedback.pic) {
        this.$Message.error("请上传图片");
        return false;
      }
      if (!this.feedback.remark) {
        this.$Message.error("请输入反馈内容");
        return false;
      }
      this.$http
        .post(this.host + "/uc/approve/payInfoFeedback", this.feedback)
        .then(response => {
          var resp = response.body;
          if (resp.code === 0) {
            this.$Message.success(resp.message);
            this.popup.feekback = false;
            this.popup.remark = "";
            this.popup.pic = "";
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    authBefore() {
      let message = {
        type: this.params.type,
        name: this.alipay.name,
        realName: this.alipay.realName,
        url: this.alipay.url,
        originUrl: this.alipay.originUrl,
        userId: this.alipay.userId,
        popupEdit: this.popup.edit
      };
      localStorage.setItem("app/account/auth/message", JSON.stringify(message));
      let returnUrl = window.location.href.split("?")[0].replace("#", "@");
      console.log(returnUrl);
      window.location.href =
        this.host + "/p/alipay/redirectURI.do?returnUrl=" + returnUrl;
    },
    authAfter() {
      let search = window.location.href.split("?")[1];
      if (!search) return;
      try {
        let transferSearch = Base64.decode(search);
        if (!transferSearch) return;
        let queryerSearch = new Queryer().parse(transferSearch);

        let userId = queryerSearch ? queryerSearch["userId"] : "";
        if (!userId) return;
        this.alipay.userId = userId;
        let localStorageMessage = localStorage.getItem(
          "app/account/auth/message"
        );
        if (!localStorageMessage) return;
        let message = JSON.parse(localStorageMessage);

        this.popup.edit = message["popupEdit"];

        this.alipay.name = message["name"];
        this.alipay.realName = message["realName"];
        this.alipay.url = message["url"];
        this.alipay.originUrl = message["originUrl"];
        this.params.type = message["type"];
      } catch (e) {
        this.$Message.error("授权有误，请重试！");
      }
    },
    selectPicture(item) {
      this.picture.url = item["originUrl"];
      this.popup.picture = true;
    }
  },
  watch: {
    ["card.reUrl"]: {
      handler(val, olval) {
        this.getBankName();
      }
    }
  },
  computed: {
    openSetting() {
      return this.setting.filter(item => {
        return item["checked"] == 1;
      });
    },
    closeSetting() {
      return this.setting.filter(item => {
        return item["checked"] != 1;
      });
    }
  }
};
</script>

<template>
  <div class=" nav-rights ">
    <Modal
      v-model="popup.picture"
      class="ivu-modal--left"
      width="400px"
      title="收款码"
    >
      <div class="vui-padding--large">
        <img :src="picture.url" alt="" style="max-width:100%" />
      </div>
      <div slot="footer"></div>
    </Modal>
    <Modal
      v-model="popup.toggle"
      :mask-closable="false"
      class="ivu-modal--left"
      width="400px"
      :title="'账号' + (toggle.checked === 1 ? '关闭' : '开启')"
    >
      <div class="vui-padding--large">
        <div class="vui-row--flex vui-align-items--center">
          <div
            class="vui-span--6 vui-text-align--right vui-padding-right--large"
          >
            <span class="vui-color--danger">*</span
            ><span class="vui-color--label">资金密码</span>
          </div>
          <div class="vui-span--18">
            <i-input
              v-model="password"
              type="password"
              placeholder="请输入您的资金密码..."
            ></i-input>
          </div>
        </div>
      </div>
      <div slot="footer">
        <i-button type="default" @click="popup.toggle = false">取消</i-button>
        <i-button type="primary" @click="togglePay">确认</i-button>
      </div>
    </Modal>
    <Modal
      v-model="popup.feekback"
      title="账号异常反馈"
      class="ivu-modal--left"
      width="400px"
      :mask-closable="false"
    >
      <div class="vui-padding--large">
        <div
          class="vui-row--flex vui-align-items--center vi-margin-bottom--large"
        >
          <div
            class="vui-span--4 vui-text-align--right vui-padding-right--large"
          >
            <span class="vui-color--label">图片</span>
          </div>
          <div class="vui-span--20">
            <div v-if="feedback.pic" class="">
              <img style="max-width:100%" :src="feedback.pic" />
            </div>
            <div>
              <Upload
                ref="upload"
                :on-success="res => updoadPicSuccess(res, 'feedback')"
                :headers="uploadHeaders"
                :action="image.compress"
                :on-error="updoadPicError"
                class="is-upload-list--clear"
              >
                <Button icon="ios-cloud-upload-outline">
                  {{ feedback.pic ? "重新上传" : "单击上传" }}
                </Button>
              </Upload>
            </div>
          </div>
        </div>
        <div
          class="vui-row--flex vui-align-items--center vi-margin-bottom--large"
        >
          <div
            class="vui-span--4 vui-text-align--right vui-padding-right--large"
          >
            <span class="vui-color--label">内容</span>
          </div>
          <div class="vui-span--20">
            <i-input
              type="textarea"
              :rows="5"
              placeholder="请输入您的账号异常情况..."
              v-model="feedback.remark"
            ></i-input>
          </div>
        </div>
        <div class="vui-row--flex vui-align-items--center">
          <div
            class="vui-span--4 vui-text-align--right vui-padding-right--large"
          >
            <span class="vui-color--label">范例</span>
          </div>
          <div class="vui-span--20">
            <span class="vi-color--danger" style="line-height: 24px">
              由于该账号连续收款xxx笔相同的金额、一天之内收款xxx笔、一天之内收款xxx金额、新账号、新手机注册、不同手机号码但是同一实名的子账号、确定是用户投诉等原因导致账号被限制收款。时长为xxx天。
            </span>
          </div>
        </div>
      </div>
      <div slot="footer">
        <i-button type="default" @click="popup.feekback = false">取消</i-button>
        <i-button type="primary" @click="sureFeedback">确认</i-button>
      </div>
    </Modal>
    <Modal
      v-model="popup.del"
      title="账号解绑"
      class="ivu-modal--left"
      width="400px"
      :mask-closable="false"
    >
      <div class="vui-padding--large">
        <div class="vui-row--flex vui-align-items--center">
          <div
            class="vui-span--6 vui-text-align--right vui-padding-right--large"
          >
            <span class="vui-color--danger">*</span
            ><span class="vui-color--label">资金密码</span>
          </div>
          <div class="vui-span--18">
            <i-input
              v-model="password"
              type="password"
              placeholder="请输入您的资金密码..."
            ></i-input>
          </div>
        </div>
      </div>
      <div slot="footer">
        <i-button type="default" @click="popup.del = false">取消</i-button>
        <i-button type="primary" @click="deletePay">确认</i-button>
      </div>
    </Modal>
    <Modal
      v-model="popup.edit"
      title="账号编辑"
      class="ivu-modal--left"
      width="400px"
      :mask-closable="false"
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
              <span class="vui-color--danger">*</span>
              收款方式
            </div>
          </div>
          <div v-flex-item="{ span: 18 }">
            <i-select v-model="params.type">
              <i-option value="1">银行卡</i-option>
              <i-option value="2">微信</i-option>
              <i-option value="3">支付宝</i-option>
              <i-option value="4">云闪付</i-option>
              <i-option value="5">聚合码</i-option>
              <i-option value="6">动态码</i-option>
            </i-select>
          </div>
        </div>
        <template v-if="params.type == '1'">
          <div v-flex v-css="{ marginBottom: 'large' }">
            <div v-flex-item="{ span: 6 }">
              <div
                v-css="{
                  lineHeight: '32px',
                  textAlign: 'right',
                  paddingRight: 'large'
                }"
              >
                <span class="vui-color--danger">*</span>
                姓名
              </div>
            </div>
            <div v-flex-item="{ span: 18 }">
              <i-input
                v-model="card.realName"
                placeholder="请输入您的银行卡姓名..."
              ></i-input>
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
                <span class="vui-color--danger">*</span>

                卡号
              </div>
            </div>
            <div v-flex-item="{ span: 18 }">
              <i-input
                v-model="card.url"
                placeholder="请输入您的卡号..."
              ></i-input>
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
                <span class="vui-color--danger">*</span>
                确认卡号
              </div>
            </div>
            <div v-flex-item="{ span: 18 }">
              <i-input
                v-model="card.reUrl"
                placeholder="请再次输入您的卡号..."
                @blur="getBankName"
              ></i-input>
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
                <span class="vui-color--danger">*</span>
                开户行
              </div>
            </div>
            <div v-flex-item="{ span: 18 }">
              <i-input
                v-model="card.name"
                readonly
                placeholder="自动获取开户行信息..."
              ></i-input>
            </div>
          </div>
        </template>
        <template v-if="params.type == '2'">
          <div v-flex v-css="{ marginBottom: 'large' }">
            <div v-flex-item="{ span: 6 }">
              <div
                v-css="{
                  lineHeight: '32px',
                  textAlign: 'right',
                  paddingRight: 'large'
                }"
              >
                <span class="vui-color--danger">*</span>
                微信账号
              </div>
            </div>
            <div v-flex-item="{ span: 18 }">
              <i-input
                v-model="wx.name"
                placeholder="请输入您的微信账号..."
              ></i-input>
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
                <span class="vui-color--danger">*</span>
                收款码
              </div>
            </div>
            <div v-flex-item="{ span: 18 }">
              <div v-if="wx.url" v-css="{ marginBottom: 'normal' }">
                <img style="max-width:100%" :src="wx.originUrl" />
              </div>
              <div>
                <Upload
                  ref="upload"
                  :on-success="res => uploadSuccess(res, 'wx')"
                  :headers="uploadHeaders"
                  :action="image.qr"
                  :on-error="uploadError"
                >
                  <Button icon="ios-cloud-upload-outline">
                    {{ wx.url ? "重新上传" : "单击上传" }}
                  </Button>
                </Upload>
              </div>
            </div>
          </div>
        </template>
        <template v-if="params.type == '3'">
          <div v-flex v-css="{ marginBottom: 'large' }">
            <div v-flex-item="{ span: 6 }">
              <div
                v-css="{
                  lineHeight: '32px',
                  textAlign: 'right',
                  paddingRight: 'large'
                }"
              >
                <span class="vui-color--danger">*</span>
                姓名
              </div>
            </div>
            <div v-flex-item="{ span: 18 }">
              <i-input
                v-model="alipay.realName"
                placeholder="请输入您的支付宝真实姓名..."
              ></i-input>
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
                <span class="vui-color--danger">*</span>
                支付宝账号
              </div>
            </div>
            <div v-flex-item="{ span: 18 }">
              <i-input
                v-model="alipay.name"
                placeholder="请输入您的支付宝账号..."
              ></i-input>
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
                <span class="vui-color--danger">*</span>

                收款码
              </div>
            </div>
            <div v-flex-item="{ span: 18 }">
              <div v-if="alipay.url" v-css="{ marginBottom: 'normal' }">
                <img style="max-width:100%" :src="alipay.originUrl" />
              </div>
              <div>
                <Upload
                  ref="upload"
                  :on-success="res => uploadSuccess(res, 'alipay')"
                  :headers="uploadHeaders"
                  :action="image.qr"
                  :on-error="uploadError"
                >
                  <Button icon="ios-cloud-upload-outline">
                    {{ alipay.url ? "重新上传" : "单击上传" }}
                  </Button>
                </Upload>
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
                <span class="vui-color--danger">*</span>
                支付宝ID
              </div>
            </div>
            <div v-flex-item="{ span: 18 }">
              <div class="vui-flex">
                <div class="vui-flex--1 vui-margin-right">
                  <i-input
                    v-model="alipay.userId"
                    placeholder="请输入您的支付宝ID..."
                  ></i-input>
                </div>
                <Tooltip>
                  <i-button>获取</i-button>
                  <div slot="content" style="width:100%;">
                    <div
                      style="white-space:normal"
                      class="vui-margin-bottom vui-color--primary"
                    >
                      <span
                        >打开支付宝APP扫一扫，将得到的结果填入到输入框中即可，确保输入的支付宝ID准确无误，否则导致收款失败</span
                      >
                    </div>
                    <div>
                      <img
                        src="../../assets/img/userid.jpg"
                        alt=""
                        width="220px"
                      />
                    </div>
                  </div>
                </Tooltip>
              </div>
              <div>
                <i-button @click="authBefore" v-if="false">方式一</i-button>
              </div>
            </div>
          </div>
          <div v-flex v-css="{ marginBottom: 'large' }" v-if="false">
            <div v-flex-item="{ span: 6 }">
              <div
                v-css="{
                  lineHeight: '32px',
                  textAlign: 'right',
                  paddingRight: 'large'
                }"
              >
                <span class="vui-color--danger">*</span>
                确认支付宝ID
              </div>
            </div>
            <div v-flex-item="{ span: 18 }">
              <div class="">
                <i-input
                  v-model="alipay.userIdAgain"
                  placeholder="请再次输入您的支付宝ID..."
                ></i-input>
              </div>
            </div>
          </div>
        </template>
        <template v-if="params.type == '4'">
          <div v-flex v-css="{ marginBottom: 'large' }">
            <div v-flex-item="{ span: 6 }">
              <div
                v-css="{
                  lineHeight: '32px',
                  textAlign: 'right',
                  paddingRight: 'large'
                }"
              >
                <span class="vui-color--danger">*</span>
                云闪付账号
              </div>
            </div>
            <div v-flex-item="{ span: 18 }">
              <i-input
                v-model="unionpay.name"
                placeholder="请输入您的云闪付账号..."
              ></i-input>
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
                <span class="vui-color--danger">*</span>
                收款码
              </div>
            </div>
            <div v-flex-item="{ span: 18 }">
              <div v-if="unionpay.url" v-css="{ marginBottom: 'normal' }">
                <img style="max-width:100%" :src="unionpay.originUrl" />
              </div>
              <div>
                <Upload
                  ref="upload"
                  :on-success="res => uploadSuccess(res, 'unionpay')"
                  :headers="uploadHeaders"
                  :action="image.qr"
                  :on-error="uploadError"
                >
                  <Button icon="ios-cloud-upload-outline">
                    {{ unionpay.url ? "重新上传" : "单击上传" }}
                  </Button>
                </Upload>
              </div>
            </div>
          </div>
        </template>
        <template v-if="params.type == '5'">
          <div v-flex v-css="{ marginBottom: 'large' }">
            <div v-flex-item="{ span: 6 }">
              <div
                v-css="{
                  lineHeight: '32px',
                  textAlign: 'right',
                  paddingRight: 'large'
                }"
              >
                <span class="vui-color--danger">*</span>
                聚合码账号
              </div>
            </div>
            <div v-flex-item="{ span: 18 }">
              <i-input
                v-model="polymer.name"
                placeholder="请输入您的聚合码账号..."
              ></i-input>
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
                <span class="vui-color--danger">*</span>
                付款方式
              </div>
            </div>
            <div v-flex-item="{ span: 18 }">
              <Select v-model="polymer.payMode" multiple>
                <Option value="微信">
                  微信
                </Option>
                <Option value="支付宝">
                  支付宝
                </Option>
              </Select>
            </div>
          </div>
          <div></div>

          <div v-flex v-css="{ marginBottom: 'large' }">
            <div v-flex-item="{ span: 6 }">
              <div
                v-css="{
                  lineHeight: '32px',
                  textAlign: 'right',
                  paddingRight: 'large'
                }"
              >
                <span class="vui-color--danger">*</span>
                收款码
              </div>
            </div>
            <div v-flex-item="{ span: 18 }">
              <div v-if="polymer.url" v-css="{ marginBottom: 'normal' }">
                <img style="max-width:100%" :src="polymer.originUrl" />
              </div>
              <div>
                <Upload
                  ref="upload"
                  :on-success="res => uploadSuccess(res, 'polymer')"
                  :headers="uploadHeaders"
                  :action="image.qr"
                  :on-error="uploadError"
                >
                  <Button icon="ios-cloud-upload-outline">
                    {{ unionpay.url ? "重新上传" : "单击上传" }}
                  </Button>
                </Upload>
              </div>
            </div>
          </div>
        </template>
        <template v-if="params.type == '6'">
          <div v-flex v-css="{ marginBottom: 'large' }">
            <div v-flex-item="{ span: 6 }">
              <div
                v-css="{
                  lineHeight: '32px',
                  textAlign: 'right',
                  paddingRight: 'large'
                }"
              >
                <span class="vui-color--danger">*</span>
                动态码账号
              </div>
            </div>
            <div v-flex-item="{ span: 18 }">
              <i-input
                v-model="dynamic.name"
                placeholder="请输入您的动态码账号..."
              ></i-input>
            </div>
          </div>
        </template>

        <div v-flex v-css="{ marginBottom: 'large' }">
          <div v-flex-item="{ span: 6 }">
            <div
              v-css="{
                lineHeight: '32px',
                textAlign: 'right',
                paddingRight: 'large'
              }"
            >
              <span class="vui-color--danger">*</span>
              资金密码
            </div>
          </div>
          <div v-flex-item="{ span: 18 }">
            <i-input
              v-model="password"
              type="password"
              placeholder="请输入您的资金密码..."
            ></i-input>
          </div>
        </div>
      </div>
      <div slot="footer">
        <i-button type="default" @click="popup.edit = false">取消</i-button>
        <i-button type="primary" @click="submitMessage">保存</i-button>
      </div>
    </Modal>
    <div class="">
      <div
        class="vui-flex vui-align-items--flex-start vui-margin-bottom--large"
      >
        <div class=" vui-flex  ">
          <div class="vui-flex vui-align-items--center">
            <div class="app-bar vui-margin-right"></div>
            <div>
              <span class="vui-color--label vui-font-size--small">
                收款账号管理
              </span>
            </div>
          </div>
        </div>
        <div class="vui-center vui-flex--1">
          <div class="vui-text-align--center">
            <p>
              <span class="vui-color--danger"
                >同一种类型的收款方式只能开启一个账号</span
              >
            </p>
            <p>
              <span class="vui-color--danger"
                >当开启或关闭某种收款方式时，均需要删除该收款方式的广告</span
              >
            </p>
          </div>
        </div>

        <div class="vi-flex">
          <div @click="popup.edit = true">
            <i-button type="primary" icon="ios-add-circle">
              添加收款账号
            </i-button>
          </div>
        </div>
      </div>

      <div>
        <div
          style="padding: 15px;border-bottom:1px solid #27313e; "
          class="vui-flex vui-align-items--center vui-justify-content--space-between"
          v-for="(item, index) in setting"
        >
          <template>
            <div class="" style="width:100px;text-align: center">
              <template v-if="item['checked'] == 1">
                <i class="app-icon app-icon--star"></i>
              </template>
            </div>
          </template>
          <template v-if="item['type'] == 1">
            <div
              class="vui-flex  vui-align-items--center vui-padding-right--large"
              style="width:120px;border-right: 1px dashed #27313e"
            >
              <div
                class="app-icon  app-icon--medium app-icon--bank vui-margin-right--large"
              ></div>
              <span>银行卡</span>
            </div>
            <div
              class="vui-flex--1 vui-padding-right--large vui-padding-left--large"
            >
              <span>
                {{ item["realName"] || "--" }} | {{ item["url"] || "--" }} |
                {{ item["name"] || "--" }} |
                {{ item["alipayOrMask"] || "--" }}
              </span>
            </div>
            <div></div>
          </template>
          <template v-if="item['type'] == 2">
            <div
              class="vui-flex  vui-align-items--center vui-padding-right--large"
              style="width:120px;border-right: 1px dashed #27313e"
            >
              <div
                class="app-icon   app-icon--medium app-icon--wechat vui-margin-right--large"
              ></div>
              <span>微信</span>
            </div>
            <div
              class="vui-flex--1 vui-padding-right--large vui-padding-left--large"
            >
              <span>
                {{ item["name"] || "--" }}
              </span>
            </div>
          </template>
          <template v-if="item['type'] == 3">
            <div
              class="vui-flex  vui-align-items--center vui-padding-right--large"
              style="width:120px;border-right: 1px dashed #27313e"
            >
              <div
                class="app-icon   app-icon--medium app-icon--alipay vui-margin-right--large"
              ></div>
              <span>支付宝</span>
            </div>
            <div
              class="vui-flex--1 vui-padding-right--large vui-padding-left--large"
            >
              <span>
                {{ item["realName"] || "--" }} | {{ item["name"] || "--" }} |
                {{ item["alipayOrMask"] || "--" }}
              </span>
            </div>
          </template>
          <template v-if="item['type'] == 4">
            <div
              class="vui-flex  vui-align-items--center vui-padding-right--large"
              style="width:120px;border-right: 1px dashed #27313e"
            >
              <div
                class="app-icon   app-icon--medium app-icon--unionpay vui-margin-right--large"
              ></div>
              <span>云闪付</span>
            </div>
            <div
              class="vui-flex--1 vui-padding-right--large vui-padding-left--large"
            >
              <span>
                {{ item["name"] || "--" }}
              </span>
            </div>
          </template>
          <template v-if="item['type'] == 5">
            <div
              class="vui-flex  vui-align-items--center vui-padding-right--large"
              style="width:120px;border-right: 1px dashed #27313e"
            >
              <div
                class="app-icon   app-icon--medium app-icon--polymer vui-margin-right--large"
              ></div>
              <span>聚合码</span>
            </div>
            <div
              class="vui-flex--1 vui-padding-right--large vui-padding-left--large"
            >
              <span>
                {{ item["name"] || "--" }} | {{ item["alipayOrMask"] || "--" }}
              </span>
            </div>
          </template>
          <template v-if="item['type'] == 6">
            <div
              class="vui-flex  vui-align-items--center vui-padding-right--large"
              style="width:120px;border-right: 1px dashed #27313e"
            >
              <div
                class="app-icon app-icon--medium  app-icon--dynamic vui-margin-right--large"
              ></div>
              <span>动态码</span>
            </div>
            <div
              class="vui-flex--1 vui-padding-right--large vui-padding-left--large"
            >
              <span>
                {{ item["name"] || "--" }}
              </span>
            </div>
          </template>

          <template
            v-if="
              item['type'] == 2 ||
                item['type'] == 3 ||
                item['type'] == 4 ||
                item['type'] == 5
            "
          >
            <div
              class=" vui-padding-left vui-text-align--right app-cursor--pointer"
              @click="selectPicture(item)"
            >
              <Tooltip content="单击查看收款码大图" placement="bottom">
                <i class="app-icon app-icon--shrink"></i>
              </Tooltip>

              <!--<img :src="item['originUrl']" alt="" style="height:40px" />-->
            </div>
          </template>
          <template>
            <div
              class="vui-flex vui-align-items--center vui-justify-content--flex-end"
              style="width: 350px"
            >
              <div
                class="vui-margin-left"
                v-if="
                  item['type'] == 2 || item['type'] == 3 || item['type'] == 4
                "
                @click="jumpManagePage(item)"
              >
                <i-button type="text">固额码管理</i-button>
              </div>
              <div
                class="vui-margin-left"
                v-if="item['checked'] === 0"
                @click="toggleBeforePay(item)"
              >
                <i-button type="primary">开启</i-button>
              </div>

              <div
                class="vui-margin-left"
                v-if="item['checked'] === 1"
                @click="toggleBeforePay(item)"
              >
                <i-button type="success">关闭</i-button>
              </div>
              <div
                class="vui-margin-left"
                @click="deleteBeforePay(item)"
                v-if="item['checked'] === 0"
              >
                <i-button type="error">解绑</i-button>
              </div>
              <div class="vui-margin-left" @click="feedbackBefore(item)">
                <i-button type="success">
                  反馈
                </i-button>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div
        v-if="openSetting.length == 0 && closeSetting.length == 0"
        class="vui-text-align--center"
      >
        <span v-css="{ lineHeight: '600px' }">
          <span class="vui-color--light">暂无收款账号，</span>
          <span
            class="vui-color--primary app-cursor--pointer"
            @click="popup.edit = true"
          >
            去绑定?
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
