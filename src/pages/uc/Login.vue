<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-01-18 09:32:45
 * @LastEditTime: 2019-09-02 13:58:38
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="login_form">
    <input type="text" hidden />
    <input type="password" hidden />
    <div class="login_right">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <div class="login_title">{{ $t("uc.login.login") }}</div>
        <FormItem prop="user" v-show="false">
          <Input
            name="user"
            type="text"
            v-model="formInline.user"
            :placeholder="$t('uc.login.usertip')"
            class="user"
            autocomplete="off"
          >
          </Input>
        </FormItem>
        <FormItem prop="password" v-show="false">
          <Input
            type="password"
            v-model="formInline.password"
            :placeholder="$t('uc.login.pwdtip')"
            @on-keyup="onKeyup"
            autocomplete="off"
          >
          </Input>
        </FormItem>
        <FormItem prop="user">
          <Input
            name="user"
            type="text"
            v-model="formInline.user"
            :placeholder="$t('uc.login.usertip')"
            class="user"
            autocomplete="off"
          >
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input
            type="password"
            v-model="formInline.password"
            :placeholder="$t('uc.login.pwdtip')"
            @on-keyup="onKeyup"
            autocomplete="off"
          >
          </Input>
        </FormItem>
        <p id="notice" class="hide">{{ $t("uc.login.validatemsg") }}</p>
        <p style="height:30px;">
          <router-link
            to="/findPwd"
            style="color:#979797;float:right;padding-right:10px;font-size:12px;"
          >
            {{ $t("uc.login.forget") }}
          </router-link>
        </p>
        <FormItem style="margin-bottom:15px;">
          <Button class="login_btn">{{ $t("uc.login.login") }}</Button>
        </FormItem>
        <div class="to_register">
          <span>没有账号</span>
          <router-link to="/register">立即注册</router-link>
        </div>
      </Form>
    </div>
  </div>
</template>
<style scoped lang="scss">
/* 验证码 */
.login_form {
  background: #0b1520 url(../../assets/images/login_bg.jpg) no-repeat center
    center;
  height: 760px;
  position: relative;
  overflow: hidden;
  .login_right {
    padding: 20px 30px 20px 30px;
    position: absolute;
    background: #17212e;
    width: 350px;
    height: 330px;
    left: 50%;
    top: 50%;
    margin-left: -175px;
    margin-top: -165px;
    border-top: 4px solid #f0ac19;
    border-radius: 5px;
    form.ivu-form.ivu-form-label-right.ivu-form-inline {
      .login_title {
        height: 70px;
        color: #fff;
      }
      .ivu-form-item {
        .ivu-form-item-content {
          .login_btn.ivu-btn {
            width: 100%;
            background-color: #f0ac19;
            outline: none;
            border-color: #f0ac19;
            color: #fff;
            font-size: 18px;
            border-radius: 30px;
            &:focus {
              -moz-box-shadow: 0px 0px 0px #fff, 0px 0px 0px #fff;
              -webkit-box-shadow: 0px 0px 0px #fff, 0px 0px 0px #fff;
              box-shadow: 0px 0px 0px #fff, 0px 0px 0px #fff;
            }
          }
        }
      }
    }
  }
  .to_register {
    overflow: hidden;
    font-size: 12px;
    span {
      float: left;
    }
    a {
      float: right;
      color: #f0ac19;
    }
  }
}
#captcha {
  width: 100%;
  display: inline-block;
}
.show {
  display: block;
}
.hide {
  display: none;
}
#notice {
  color: red;
}
#wait {
  text-align: left;
  color: #666;
  margin: 0;
}
.geetest_wait_dot geetest_dot_1 {
  color: red;
}
.user .ivu-btn,
.ivu-btn:active,
.ivu-btn:focus {
  border-color: #d7dde4;
  box-shadow: none;
}
/*  */
</style>
<script>
import gtInit from "../../assets/js/gt.js";
import { regexes } from "../../config/basis.js";
import $ from "jquery";
let regexMobile = regexes.find(item => item["type"] === "mobile")["value"];
export default {
  data() {
    const validateMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码！"));
        // } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
      } else if (!regexMobile.test(value)) {
        callback(new Error("手机号码格式错误！"));
      } else {
        callback();
      }
    };

    return {
      captchaObj: null,
      _captchaResult: null,
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: this.$t("uc.login.loginvalidate"), //请输入手机号
            trigger: "blur"
          },
          { validator: validateMobile, trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: this.$t("uc.login.pwdvalidate1"), // 请输入密码
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: this.$t("uc.login.pwdvalidate2"), // 密码长度不能少于6位
            trigger: "blur"
          }
        ]
      }
    };
  },
  created: function() {
    this.init();
  },
  computed: {
    isLogin: function() {
      return this.$store.getters.isLogin;
    }
  },
  methods: {
    init() {
      //console.log(this.isLogin)
      if (this.isLogin) {
        this.$router.push("/");
      } else {
        this.initGtCaptcha();
      }
    },
    onKeyup(ev) {
      if (ev.keyCode == 13) {
        $(".login_btn").click();
      }
    },
    initGtCaptcha() {
      var that = this;
      console.log(this.host + "/uc/start/captcha");
      this.$http.get(this.host + "/uc/start/captcha").then(function(res) {
        window.initGeetest(
          {
            // 以下配置参数来自服务端 SDK
            gt: res.body.gt,
            challenge: res.body.challenge,
            offline: !res.body.success, //表示用户后台检测极验服务器是否宕机
            new_captcha: res.body.new_captcha, //用于宕机时表示是新验证码的宕机
            product: "bind",
            width: "100%"
          },
          this.handler
        );
      });
    },
    handler(captchaObj) {
      captchaObj
        .onReady(() => {
          $("#wait").hide();
        })
        .onSuccess(() => {
          let result = (this._captchaResult = captchaObj.getValidate());
          if (!result) {
            this.$Message.error("请完成验证");
          } else {
            this.handleSubmit("formInline");
          }
        });
      $(".login_btn").click(() => {
        this.$refs["formInline"].validate(valid => {
          //console.log(valid);
          if (valid) {
            captchaObj.verify();
          } else {
            this.$Message.error("请填写正确的登录信息！");
          }
        });

        return;
        let reg = regexMobile,
          tel = this.formInline.user,
          flagtel = reg.test(tel),
          flagpass = this.formInline.password.length >= 6 ? true : false;
        flagtel && flagpass && captchaObj.verify();
        (!flagtel || !flagpass) && this.$Message.error("填写的信息有误！");
      });
    },
    logout() {
      this.$http.post(this.host + "/uc/logout", {}).then(response => {
        var resp = response.body;
        if (resp.code == 0) {
          localStorage.setItem("MEMBER", JSON.stringify(null));
          localStorage.setItem("TOKEN", null);
          localStorage.removeItem("USERKEY", null);
        } else {
          // this.$Message.error(resp.message);
        }
      });
    },
    handleSubmit(name) {
      var result = this._captchaResult;
      if (!result) {
        $("#notice").show();
        setTimeout(function() {
          $("#notice").hide();
        }, 2000);
      } else {
        this.$refs[name].validate(valid => {
          if (valid) {
            var params = {};
            params["username"] = this.formInline.user;
            params["password"] = this.formInline.password;
            this.$http
              .post(this.host + this.api.uc.login, params)
              .then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                  this.$Message.success(this.$t("uc.login.success"));
                  // let member = Object.assign(response.body.data, {
                  //   chanelFlag: 1
                  // });
                  this.$store.commit("setMember", response.body.data);
                  if (
                    this.$route.query.key != null &&
                    this.$route.query.key != ""
                  ) {
                    localStorage.setItem("USERKEY", this.$route.query.key);
                  }
                  this.$router.push("/");
                } else {
                  this.$Message.error(resp.message);
                }
              });
          } else {
          }
        });
      }
    }
  }
};
</script>
<style lang="scss">
.login_form {
  .login_right {
    form.ivu-form.ivu-form-label-right.ivu-form-inline {
      .ivu-form-item {
        .ivu-form-item-content {
          .ivu-input-wrapper.ivu-input-type {
            .ivu-input {
              background-color: transparent;
              font-size: 14px;
              border: none;
              border-bottom: 1px solid #27313e;
              border-radius: 0;
              // color:#fff;
              &:focus {
                border: none;
                border-bottom: 1px solid #27313e;
                -moz-box-shadow: 2px 2px 5px transparent,
                  -2px -2px 4px transparent;
                -webkit-box-shadow: 2px 2px 5px transparent,
                  -2px -2px 4px transparent;
                box-shadow: 2px 2px 5px transparent, -2px -2px 4px transparent;
              }
            }
          }
        }
      }
    }
  }
}
</style>
