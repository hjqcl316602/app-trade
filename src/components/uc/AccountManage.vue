<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 11:38:50
 * @LastEditTime: 2019-08-17 11:08:09
 * @LastEditors: Please set LastEditors
 -->
<script>
import "./account.less";
import { Checker, regexer } from "store-es";
const regexNumberMoney = regexer.find(el => {
  return el.type === "number-money";
})["value"];
const instance = {};
instance.name = "";
instance.props = {};
instance.data = function() {
  return {
    type: 2,
    upload: {
      uploadHeaders: { "x-auth-token": localStorage.getItem("TOKEN") }
    },
    payInfoId: "",
    params: {
      money: "",
      url: "",
      originUrl: "",
      remark: "",
      password: ""
    },
    del: {
      item: {
        remark: "",
        fee: 0,
        originUrl: ""
      },
      password: ""
    },
    picture: {
      url: "",
      popup: false
    },
    popup: {
      edit: false,
      del: false,
      picture: false
    },
    list: []
  };
};
instance.methods = {
  getList() {
    this.$request("/uc/approve/payCode/list")({
      payInfoId: this.payInfoId
    }).then(res => {
      if (res["code"] === 0) {
        this.list = (res["data"] || []).reverse();
      } else {
        this.$Message.error("获取列表失败，请重试");
      }
    });
  },
  sureSubmit() {
    let checker = new Checker();
    checker
      .set(this.params.money, true, "请填入收款金额")
      .check("请输入合法的金钱格式", (value, regex) => {
        return regexNumberMoney.test(value);
      })
      .set(this.params.originUrl, true, "请上传收款码")
      .set(this.params.url, true, "收款码未能识别，请重试")
      .set(this.params.remark + "", true, "请获取备注")
      .set(this.params.password, true, "请输入资金密码");
    if (checker.pass) {
      this.$request("/uc/approve/payCode/insert")({
        payInfoId: this.payInfoId,
        remark: this.params.remark,
        fee: (this.params.money - 0) * 100,
        codeUrl: this.params.url,
        originUrl: this.params.originUrl,
        jyPassword: this.params.password
      }).then(res => {
        if (res["code"] === 0) {
          this.popup.edit = false;
          this.clearParams();
          this.$Message.success("保存成功");
          this.getList();
        } else {
          this.$Message.error("保存失败，请重试");
        }
      });
    } else {
      this.$Message.error(checker.message);
    }
  },
  sureDel() {
    let checker = new Checker();
    checker
      .set(this.del.item["id"] + "", true, "请选择要解绑的收款码")
      .set(this.del.password, true, "请输入资金密码");
    if (checker.pass) {
      this.$request("/uc/approve/payCode/delete")({
        id: this.del.item["id"] + "",
        jyPassword: this.del.password
      }).then(res => {
        if (res["code"] === 0) {
          this.$Message.success("删除成功");
          this.popup.del = false;
          this.del.item = {
            remark: "",
            fee: 0,
            originUrl: ""
          };
          this.getList();
        } else {
          this.$Message.error("删除失败");
        }
      });
    } else {
      this.$Message.error(checker.message);
    }
  },
  clearParams() {
    this.params.money = "";
    this.params.url = "";
    this.params.originUrl = "";
    this.params.remark = "";
  },
  updateItem(item, type) {
    if (type === "del") {
      this.del.item = item;
      this.popup.del = true;
    }
  },
  getCode() {
    this.$request("/uc/approve/payCode/remark")({
      payInfoId: this.payInfoId
    }).then(res => {
      if (res["code"] === 0) {
        this.params.remark = res["data"]["remark"] || "";
        this.$Message.success("获取备注成功");
      } else {
        this.$Message.error("获取备注失败");
      }
    });
  },
  uploadSuccess(res) {
    this.$refs["upload"].fileList = [];
    let data = res["data"] || {};
    let qr = data["qr"];
    let url = data["url"];
    if (res["code"] === "000" && !!url) {
      if (!qr) {
        this.$Message.error("二维码识别失败，请重试");
        return false;
      }
      this.params.url = qr;
      this.params.originUrl = url;
    } else {
      this.$Message.error("图片上传失败，请重试");
    }
  },
  uploadError(res) {
    this.$Message.error("上传图片失败，请重试");
  }
};
instance.created = function() {
  this.type = this.$route.query.type;
  this.payInfoId = this.$route.query.id;
};
instance.mounted = function() {
  this.getList();
  //console.log(this.image);
};
export default instance;
</script>

<template>
  <div class="nav-rights">
    <Modal
      v-model="picture.popup"
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
      v-model="popup.del"
      title="收款码解绑"
      :mask-closable="false"
      class="ivu-modal--left"
      width="400px"
    >
      <div class="vui-padding--large">
        <div class="vui-row--flex vui-margin-bottom--large">
          <div class="vui-span--6 vui-text-align--right vui-padding-right">
            <span class="vui-color--label">金额</span>
          </div>
          <div class="vui-span--18 ">
            <span>{{ (del.item["fee"] - 0) / 100 }}</span>
          </div>
        </div>
        <div class="vui-row--flex vui-margin-bottom--large">
          <div class="vui-span--6 vui-text-align--right vui-padding-right">
            <span class="vui-color--label">备注</span>
          </div>
          <div class="vui-span--18 ">
            <span>{{ del.item["remark"] }}</span>
          </div>
        </div>
        <div class="vui-row--flex vui-margin-bottom--large">
          <div class="vui-span--6 vui-text-align--right vui-padding-right">
            <span class="vui-color--label">收款码</span>
          </div>
          <div class="vui-span--18 ">
            <img :src="del.item['originUrl']" alt="" style="max-width:100%" />
          </div>
        </div>

        <div class="vui-row--flex vui-margin-bottom--large">
          <div class=" vui-span--6 vui-text-align--right vui-padding-right">
            <div class="vui-text-align--right">
              <span style="line-height:32px" class="vui-color--label"
                ><span class="vui-color--danger">*</span>资金密码</span
              >
            </div>
          </div>
          <div class="vui-span--18">
            <div>
              <i-input
                type="password"
                v-model="del.password"
                placeholder="请输入您的资金密码..."
              ></i-input>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <i-button type="default" @click="popup.del = false">取消</i-button>
        <i-button type="primary" @click="sureDel">确认</i-button>
      </div>
    </Modal>
    <Modal
      v-model="popup.edit"
      title="收款编辑"
      :mask-closable="false"
      class="ivu-modal--left"
      width="400px"
    >
      <div class="vui-padding--large">
        <div class="">
          <div class="vui-row--flex vui-row-gutter vui-margin-bottom ">
            <div class=" vui-span--6">
              <div class="vui-text-align--right">
                <span style="line-height:32px" class="vui-color--label"
                  ><span class="vui-color--danger">*</span>收款金额</span
                >
              </div>
            </div>
            <div class="vui-span--18">
              <div>
                <i-input
                  v-model="params.money"
                  placeholder="请输入您的收款金额..."
                ></i-input>
              </div>
              <div class="vui-margin-top">
                <span class="vui-color--danger"
                  >请确保输入的收款金额和收款二维码设置的金额一致</span
                >
              </div>
            </div>
          </div>

          <div class="vui-row--flex vui-row-gutter  vui-margin-bottom">
            <div class=" vui-span--6">
              <div class="vui-text-align--right">
                <span style="line-height:32px" class="vui-color--label"
                  ><span class="vui-color--danger">*</span>备注</span
                >
              </div>
            </div>
            <div class="vui-span--18">
              <div class="vui-flex vui-align-items--center">
                <div class="vui-flex--1 vui-padding-right">
                  <i-input
                    v-model="params.remark"
                    placeholder="请获取备注..."
                    readonly
                  ></i-input>
                </div>
                <div @click="getCode">
                  <i-button type="default">获取</i-button>
                </div>
              </div>
            </div>
          </div>

          <div class="vui-row--flex vui-row-gutter vui-margin-bottom ">
            <div class=" vui-span--6">
              <div class="vui-text-align--right">
                <span style="line-height:32px" class="vui-color--label"
                  ><span class="vui-color--danger">*</span>收款码</span
                >
              </div>
            </div>
            <div class="vui-span--18">
              <div>
                <div v-if="params.url" class="vui-margin-bottom">
                  <img style="max-width: 100%;" :src="params.originUrl" />
                </div>
                <div>
                  <Upload
                    ref="upload"
                    :on-success="uploadSuccess"
                    :headers="upload.uploadHeaders"
                    :action="image.qr"
                    :on-error="uploadError"
                  >
                    <Button icon="ios-cloud-upload-outline">
                      {{ params.url ? "重新上传" : "单击上传" }}
                    </Button>
                  </Upload>
                </div>
              </div>
            </div>
          </div>

          <div class="vui-row--flex vui-row-gutter">
            <div class=" vui-span--6 vui-margin-bottom--large">
              <div class="vui-text-align--right">
                <span style="line-height:32px" class="vui-color--label"
                  ><span class="vui-color--danger">*</span>资金密码</span
                >
              </div>
            </div>
            <div class="vui-span--18">
              <div>
                <i-input
                  type="password"
                  v-model="params.password"
                  placeholder="请输入您的资金密码..."
                ></i-input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <i-button type="default" @click="popup.edit = false">取消</i-button>
        <i-button type="primary" @click="sureSubmit">保存</i-button>
      </div>
    </Modal>

    <div style="padding:0 30px;marginBottom:60px">
      <div class="vui-flex vui-align-items--flex-end vui-margin-bottom--large">
        <div class="vui-flex--1 vui-flex  ">
          <div class="vui-flex vui-align-items--center">
            <div
              class="app-icon app-icon--large app-icon--undertone vui-margin-right"
              :class="{
                'app-icon--wechat': type == 2,
                'app-icon--alipay': type == 3,
                'app-icon--unionpay': type == 4
              }"
            ></div>
            <div>
              <span class="vui-color--label vui-font-size--small"
                >{{
                  type == 2
                    ? "微信"
                    : type == 3
                    ? "支付宝"
                    : type == 4
                    ? "云闪付"
                    : ""
                }}固定金额收款码管理</span
              >
            </div>
          </div>
        </div>

        <div @click="popup.edit = true">
          <i-button type="primary" icon="ios-add">
            添加收款码
          </i-button>
        </div>
      </div>

      <div class="vui-row--flex vui-row-gutter " v-if="list.length > 0">
        <div
          class="vui-span--4 vui-margin-bottom--large"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="vui-padding--large app-border">
            <div
              class="vui-flex vui-padding-bottom vui-padding-top app-border-bottom app-border--dashed"
            >
              <div
                class="vui-flex--none vui-text-align--right vui-padding-right app-border-right app-border--dashed"
                style="width:60px;"
              >
                <span class="vui-color--label">金额</span>
              </div>
              <div class="vui-flex--1 vui-padding-left vui-text-align--left">
                <span>{{ (item.fee - 0) / 100 }}</span>
              </div>
            </div>

            <div
              class="vui-flex vui-padding-bottom vui-padding-top app-border-bottom app-border--dashed"
            >
              <div
                class="vui-flex--none vui-text-align--right vui-padding-right app-border-right app-border--dashed"
                style="width:60px;"
              >
                <span class="vui-color--label">备注</span>
              </div>
              <div class="vui-flex--1 vui-padding-left vui-text-align--left">
                <span>{{ item["remark"] }}</span>
              </div>
            </div>

            <div
              class="vui-flex vui-padding-bottom vui-padding-top app-border-bottom app-border--dashed"
            >
              <div
                class="vui-flex--none vui-text-align--right vui-padding-right app-border-right app-border--dashed"
                style="width:60px;"
              >
                <span class="vui-color--label">收款码</span>
              </div>
              <div
                class="vui-flex--1 vui-padding-left vui-text-align--left app-cursor--pointer"
                @click="
                  (picture.popup = true) && (picture.url = item['originUrl'])
                "
              >
                <img :src="item['originUrl']" alt="" style="max-width:100%" />
              </div>
            </div>

            <div class="vui-flex vui-justify-content--flex-end vui-margin-top">
              <div class="" @click="updateItem(item, 'del')">
                <i-button type="default">解绑</i-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="vui-text-align--center" v-else>
        <span v-css="{ lineHeight: '600px' }">
          <span v-css="{ color: 'light' }">暂无收款码，</span>
          <span
            v-css="{ color: 'primary', cursor: 'pointer' }"
            @click="popup.edit = true"
          >
            去绑定?
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style  scoped>
</style>