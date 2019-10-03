<script type="text/ecmascript-6">
//import { VaPopupRadio }  from './component'
//import user  from '../vue.mixins/user'
export default {
  name: "Helper",
  components: {},
  mixins: [],
  data() {
    return {
      params: {
        appId: ""
      }
    };
  },
  created() {},
  activated() {},

  methods: {},
  watch: {}
};
</script>
<template>
  <div class="nav-rights">
    <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
      <div class="bill_box rightarea padding-right-clear record account-box">
        <section class="trade-group merchant-top">
          <i class="merchant-icon tips"></i>
          <span class="tips-word">收款助手</span>
        </section>
        <section class="accountContent">
          <div class="account-in">
            <div class="account-item">
              <div class="account-item-in">
                <span class="card-number">VirtualXposed</span>
                <a class="btn" :href="this.host + '/VirtualXposed.apk'"
                  >立即下载</a
                >
              </div>
            </div>

            <div class="account-item">
              <div class="account-item-in">
                <span class="card-number">BPay</span>
                <a class="btn" :href="this.host + '/bpay.apk'">立即下载</a>
              </div>
            </div>

            <div class="account-item" v-show="true">
              <div class="account-item-in">
                <span class="card-number">微信</span>
                <a class="btn" :href="this.host + '/wx.apk'">立即下载</a>
              </div>
            </div>

            <div class="account-item">
              <div class="account-item-in">
                <span class="card-number">支付宝</span>
                <a class="btn" :href="this.host + '/alipay.apk'">立即下载</a>
              </div>
            </div>

            <div class="account-item" v-show="true">
              <div class="account-item-in">
                <span class="card-number">TTM</span>
                <a class="btn" :href="this.host + '/ttm.apk'">立即下载</a>
              </div>
            </div>
          </div>
        </section>
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
  justify-content: space-between;
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
  width: 40%;
  height: 40px;
  margin-right: 15px;
  border-right: 0px dashed #27313e;
  padding: 0 15px;
  line-height: 40px;
  text-align: left;
  display: inline-block;
}

.account-box .account-in .account-item .account-item-in .bankInfo {
  width: 40%;
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
