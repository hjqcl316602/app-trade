<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-01-18 09:32:45
 * @LastEditTime: 2019-09-05 17:15:07
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="content-wrap">
    <input type="password" hidden />
    <div class="container chat-in-box" id="List">
      <p style="padding: 10px 0 10px 20px;font-size: 16px;">
        <!-- <router-link
                  to="/uc/order"

                >{{$t('otc.myorder')}}</router-link> > -->

        <span style="color:#f0a70a;cursor: pointer;" @click="$router.go(-1)">{{
          $t("otc.myorder")
        }}</span>
        <span style="font-size:14px;"> > 订单详情</span>
      </p>
      <Row class="chat-in">
        <Col span="4">
          <div class="leftmenu left-box chat-right vui-padding--large">
            <div class="chat-right-in">
              <div v-if="tradeType == 0">
                <div class="vui-margin-bottom vui-text-align--center">
                  <span class="vui-color--danger vui-font-weight--bold"
                    >温馨提示</span
                  >
                </div>
                <div class="vui-margin-bottom" style="text-indent: 20px">
                  <span>1.</span>
                  <span>
                    请在规定的时限内按照对方给出的账号完成支付，并在本页面点击“
                  </span>
                  <span class="vui-color--danger">
                    付款完成
                  </span>
                  <span>
                    ”。转账时请在留言中备注好交易单号
                  </span>
                </div>
                <div class="vui-margin-bottom" style="text-indent: 20px">
                  <span>
                    2.卖方收到款项后会在网站确认收款，系统会自动将您所购买的数字资产发放至您的账户，请注意查收
                  </span>
                </div>
                <div class="vui-margin-bottom" style="text-indent: 20px">
                  <span>
                    3.请不要使用其他聊天软件与对方沟通，更不要接受对方向您发送的任何文件、邮箱附件等，所有沟通环节请都在本页面的聊天窗口完成
                  </span>
                </div>
              </div>
              <div v-else>
                <div class="vui-margin-bottom vui-text-align--center">
                  <span class="vui-color--danger  vui-font-weight--bold"
                    >温馨提示</span
                  >
                </div>
                <div class="vui-margin-bottom" style="text-indent: 20px">
                  <span>
                    1.
                  </span>
                  <span>
                    您所出售的数字资产，已交由平台托管冻结。请在确定收到对方付款后，点击“
                  </span>
                  <span class="vui-color--danger">确认放行</span>
                  <span>
                    支付数字资产
                  </span>
                </div>
                <div class="vui-margin-bottom" style="text-indent: 20px">
                  <span>
                    2.请不要相信任何催促放币的理由，确认收到款项后再释放数字资产，避免造成损失！
                  </span>
                </div>
                <div class="vui-margin-bottom" style="text-indent: 20px">
                  <span>
                    3.在收到账短信后，请务必登录网上银行或手机银行确认款项是否入账，避免因收到诈骗短信错误释放数字资产！
                  </span>
                </div>
                <div class="vui-margin-bottom" style="text-indent: 20px">
                  <span>
                    4.请不要使用其他聊天软件与对方沟通，更不要接受对方向您发送的任何文件、邮箱附件等，所有沟通环节请都在本页面的聊天窗口完成
                  </span>
                </div>
              </div>

              <div class="mt20" v-if="false">
                <h5>{{ $t("otc.chat.operatetip") }}:</h5>
                <div>
                  <p>
                    1、{{ $t("otc.chat.operatetip_1") }}“
                    <em>{{ $t("otc.chat.finishpayment") }}</em
                    >”。{{ $t("otc.chat.operatetip_1_1") }}。
                  </p>
                  <p>2、{{ $t("otc.chat.operatetip_1_2") }}。</p>
                </div>
                <span>
                  <b>{{ $t("otc.chat.note") }}：</b> </span
                ><br />
                <span>{{ $t("otc.chat.notetip") }}</span
                ><br />
              </div>
              <div class="mt20" v-if="false">
                <h5>{{ $t("otc.chat.operatetip") }}:</h5>
                <div>
                  <p>
                    1、{{ $t("otc.chat.operatetip_2_1") }}“
                    <em>{{ $t("otc.chat.confirmrelease") }}</em
                    >”{{ $t("otc.chat.paydigital") }}！
                  </p>
                  <p>2、{{ $t("otc.chat.operatetip_2_2") }}</p>
                  <p>3、{{ $t("otc.chat.operatetip_2_3") }}</p>
                </div>
                <span>
                  <b>{{ $t("otc.chat.note") }}：</b> </span
                ><br />
                <span>{{ $t("otc.chat.notetip") }}</span
                ><br />
              </div>
              <div class="bottom-btn">
                <div style="padding-top:20px;">
                  <h6 style="font-weight: 600">
                    订单状态:
                    <span>{{ statusText }}</span>
                  </h6>
                  <div v-show="statusBtn == 1 && tradeType == 0">
                    <Button type="warning" @click="modal1 = true"
                      >
                      付款完成
                    </Button>
                    <Button @click="modal3 = true" type="error"
                      >
                      取消交易
                    </Button>
                  </div>
                  <div v-show="statusBtn == 2 && tradeType == 0">
                    <Button type="warning" @click="beforeAppear"
                      >
                      订单申诉
                    </Button>
                    <Button @click="modal3 = true" type="error"
                      >
                      取消交易
                    </Button>
                  </div>
                  <div v-show="statusBtn == 2 && tradeType == 1">
                    <Button type="warning" @click="modal5 = true"
                      >
                      确认放行
                    </Button>
                    <Button @click="beforeAppear" type="error">订单申诉</Button>
                  </div>
                  <!-- <Button type="primary" v-show="statusBtn==2" @click="modal4 = true" long></Button> -->
                </div>
                <div style="padding-top:20px;">
                  <div>
                    <Button type="warning" @click="beforeTranfer"
                      >直接转账
                    </Button>
                  </div>
                </div>
                <div style="padding-top:20px;" v-if="params.showBtn">
                  <div>
                    <Button type="error" @click="handlerCustom"
                      >关闭申诉
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span="20">
          <div
            class="vui-padding--large vui-margin-left"
            style="background-color: #141e2b"
          >
            <Row>
              <i-col span="6">
                <div class="vui-margin-bottom--large">
                  <Row>
                    <i-col span="8">
                      <div class="vui-text-align--right">
                        <span class="">订单号：</span>
                      </div>
                    </i-col>
                    <i-col span="16">
                      <div class="vui-padding-left vui-text-align--left">
                        <span class="vui-font-weight--bold">{{
                          msg.orderSn
                        }}</span>
                      </div>
                    </i-col>
                  </Row>
                </div>
                <div class="vui-margin-bottom--large">
                  <Row>
                    <i-col span="8">
                      <div class="vui-text-align--right">
                        <span class="">渠道编号：</span>
                      </div>
                    </i-col>
                    <i-col span="16">
                      <div class="vui-padding-left vui-text-align--left">
                        <span class="vui-font-weight--bold">
                          {{
                          msg.channelOrderId || "--"
                        }}
                        </span>
                      </div>
                    </i-col>
                  </Row>
                </div>
                <div class="vui-margin-bottom--large">
                  <Row>
                    <i-col span="8">
                      <div class="vui-text-align--right">
                        <span class="">渠道用户编号：</span>
                      </div>
                    </i-col>
                    <i-col span="16">
                      <div class="vui-padding-left vui-text-align--left">
                        <span class="vui-font-weight--bold">
                          {{
                          msg.subMemId || "--"
                        }}
                        </span>
                      </div>
                    </i-col>
                  </Row>
                </div>
                <div class="vui-margin-bottom--large">
                  <Row>
                    <i-col span="8">
                      <div class="vui-text-align--right">
                        <span class="">状态：</span>
                      </div>
                    </i-col>
                    <i-col span="16">
                      <div class="vui-padding-left vui-text-align--left">
                        <h5>{{ statusText }}</h5>
                        <div v-show="statusBtn == 1" class="reserve-time">
                          {{ reserveTime }}
                        </div>
                      </div>
                    </i-col>
                  </Row>
                </div>
                <div class="vui-margin-bottom--large">
                  <Row>
                    <i-col span="8">
                      <div class="vui-text-align--right">
                        <span class="">创建时间：</span>
                      </div>
                    </i-col>
                    <i-col span="16">
                      <div class="vui-padding-left vui-text-align--left">
                        <span class="vui-font-weight--bold">{{
                          msg.createTime
                        }}</span>
                      </div>
                    </i-col>
                  </Row>
                </div>

                <div class="vui-margin-bottom--large">
                  <Row>
                    <i-col span="8">
                      <div class="vui-text-align--right">
                        <span class="">交易对象：</span>
                      </div>
                    </i-col>
                    <i-col span="16">
                      <div class="vui-padding-left vui-text-align--left">
                        <span class="vui-font-weight--bold">{{
                          msg.otherSide
                        }}</span>
                      </div>
                    </i-col>
                  </Row>
                </div>

                <div class="vui-margin-bottom--large">
                  <Row>
                    <i-col span="8">
                      <div class="vui-text-align--right">
                        <span class="">交易价格：</span>
                      </div>
                    </i-col>
                    <i-col span="16">
                      <div class="vui-padding-left vui-text-align--left">
                        <span class="vui-font-weight--bold"
                          >{{ msg.price }} CNY</span
                        >
                      </div>
                    </i-col>
                  </Row>
                </div>

                <div class="vui-margin-bottom--large">
                  <Row>
                    <i-col span="8">
                      <div class="vui-text-align--right">
                        <span class="">交易数量：</span>
                      </div>
                    </i-col>
                    <i-col span="16">
                      <div class="vui-padding-left vui-text-align--left">
                        <span class="vui-font-weight--bold"
                          >{{ msg.amount }} {{ msg.unit }}</span
                        >
                      </div>
                    </i-col>
                  </Row>
                </div>
                <div class="vui-margin-bottom--large">
                  <Row>
                    <i-col span="8">
                      <div class="vui-text-align--right">
                        <span class="">交易金额：</span>
                      </div>
                    </i-col>
                    <i-col span="16">
                      <div class="vui-padding-left vui-text-align--left">
                        <span class="vui-font-weight--bold"
                          >{{ msg.money }} CNY</span
                        >
                      </div>
                    </i-col>
                  </Row>
                </div>

                <div class="vui-margin-bottom--large">
                  <Row>
                    <i-col span="8">
                      <div class="vui-text-align--right">
                        <span class="">手续费：</span>
                      </div>
                    </i-col>
                    <i-col span="16">
                      <div class="vui-padding-left vui-text-align--left">
                        <span class="vui-font-weight--bold">
                          {{
                          msg.commission
                        }}
                        </span>
                      </div>
                    </i-col>
                  </Row>
                </div>
                <div class="vui-margin-bottom--large">
                  <Row>
                    <i-col span="8">
                      <div class="vui-text-align--right">
                        <span class="">交易方式：</span>
                      </div>
                    </i-col>
                    <i-col span="16">
                      <div class="vui-padding-left vui-text-align--left">
                        <span class="vui-font-weight--bold">
                          {{
                          msg.payMode
                        }}
                        </span>
                      </div>
                    </i-col>
                  </Row>
                </div>
                <div
                  class="vui-margin-bottom--large"
                  v-if="aggregate.aggregateMode"
                >
                  <Row>
                    <i-col span="8">
                      <div class="vui-text-align--right">
                        <span class="">收款方式：</span>
                      </div>
                    </i-col>
                    <i-col span="16">
                      <div class="vui-padding-left vui-text-align--left">
                        <span class="vui-font-weight--bold">
                          {{ aggregate.aggregateMode }}
                        </span>
                      </div>
                    </i-col>
                  </Row>
                </div>
                <div class="vui-margin-bottom--large" v-if="msg.payRemark">
                  <Row>
                    <i-col span="8">
                      <div class="vui-text-align--right">
                        <span class="">备注：</span>
                      </div>
                    </i-col>
                    <i-col span="16">
                      <div class="vui-padding-left vui-text-align--left">
                        <span class="vui-font-weight--bold">
                          {{
                          msg.payRemark
                        }}
                        </span>
                      </div>
                    </i-col>
                  </Row>
                </div>
                <div class="vui-margin-bottom--large" v-if="msg.transferNumber">
                  <Row>
                    <i-col span="8">
                      <div class="vui-text-align--right">
                        <span class="">转账金额：</span>
                      </div>
                    </i-col>
                    <i-col span="16">
                      <div class="vui-padding-left vui-text-align--left">
                        <span class="vui-font-weight--bold">
                          {{
                          msg.transferNumber
                        }}
                        </span>
                      </div>
                    </i-col>
                  </Row>
                </div>
                <div class="vui-margin-bottom--large" v-if="msg.transferTime">
                  <Row>
                    <i-col span="8">
                      <div class="vui-text-align--right">
                        <span class="">转账时间：</span>
                      </div>
                    </i-col>
                    <i-col span="16">
                      <div class="vui-padding-left vui-text-align--left">
                        <span class="vui-font-weight--bold">
                          {{
                          msg.transferTime
                        }}
                        </span>
                      </div>
                    </i-col>
                  </Row>
                </div>
              </i-col>
              <i-col span="18">
                <div>
                  <Row class="vui-padding--large" type="flex" justify="center">
                    <i-col span="6" class="order-info" v-if="payStatus.bank">
                      <i class="icons bankfor"></i>
                      <span
                        >
                        {{ bankInfo != null ? bankInfo.bankRealName : "" }}
                      </span>
                      <p style="line-height: 30px">
                        {{ bankInfo && bankInfo.cardNo }}
                      </p>
                      <p
                        v-if="
                          bankInfo &&
                            bankInfo != null &&
                            bankInfo.cardNo != null &&
                            bankInfo.cardNo != ''
                        "
                      >
                        <a @click="showQRCode(3)">银行卡</a>
                      </p>
                    </i-col>
                    <i-col span="6" class="order-info" v-if="payStatus.ali">
                      <i class="icons alipay"></i>
                      <span>{{ $t("otc.chat.zfb") }}</span>
                      <p style="line-height: 30px">
                        {{ alipay && alipay.alipayRealName }}
                      </p>
                      <p><a @click="showQRCode(1)">二维码</a></p>
                    </i-col>
                    <i-col span="6" class="order-info" v-if="payStatus.wx">
                      <i class="icons wechat"></i>
                      <span>{{ $t("otc.chat.wx") }}</span>
                      <p style="line-height: 30px">
                        {{ wechatPay && wechatPay.wechat }}
                      </p>
                      <p><a @click="showQRCode(2)">二维码</a></p>
                    </i-col>

                    <i-col
                      span="6"
                      class="order-info"
                      v-if="payStatus.unionpay"
                    >
                      <i class="icons unionpay"></i>
                      <span>云闪付</span>
                      <p style="line-height: 30px">
                        {{ unionpay && unionpay.unionpay }}
                      </p>
                      <p><a @click="showQRCode(4)">二维码</a></p>
                    </i-col>
                    <i-col
                      span="6"
                      class="order-info"
                      v-if="payStatus.aggregate"
                    >
                      <i class="icons polymer"></i>
                      <span>聚合码</span>
                      <p style="line-height: 30px">
                        {{ aggregate && aggregate.aggregate }}
                      </p>
                      <p><a @click="showQRCode(5)">二维码</a></p>
                    </i-col>
                  </Row>
                </div>
                <chatline
                  :msg="msg"
                  :orderType="params.type"
                  v-if="this.msg.orderId"
                ></chatline>
              </i-col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>

    <Modal
      v-model="modal1"
      :title="$t('otc.chat.tip')"
      @on-ok="ok1"
      :mask-closable="false"
      class="ivu-modal--left"
      width="400px"
    >
      <p style="color:red;font-weight: bold;">{{ $t("otc.chat.msg1") }}</p>
    </Modal>
    <!-- <Modal v-model="modal2" :title="$t('otc.chat.tip')" @on-ok="ok2" :loading="isloading">
                <p style="color:red;font-weight: bold;">{{$t('otc.chat.msg2')}}</p>
            </Modal> -->
    <Modal
      v-model="modal3"
      :title="$t('otc.chat.tip')"
      @on-ok="ok3"
      :mask-closable="false"
    >
      <p style="color:red;font-weight: bold;">{{ $t("otc.chat.msg3") }}</p>
    </Modal>
    <Modal
      v-model="modal4"
      :title="$t('otc.chat.tip')"
      @on-ok="ok4"
      :mask-closable="false"
      class="ivu-modal--left"
      width="400px"
    >
      <Form :model="formItem" :label-width="80">
        <FormItem :label="$t('otc.chat.comptype')">
          <Select v-model="formItem.select">
            <Option value="1">{{ $t("otc.chat.msg4") }}</Option>
            <Option value="2">{{ $t("otc.chat.msg5") }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('otc.chat.compremark')">
          <Input
            v-model="formItem.remark"
            type="textarea"
            autocomplete="off"
            :autosize="{ minRows: 2, maxRows: 5 }"
            :placeholder="$t('otc.chat.willcomp')"
          ></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="modal5"
      :title="$t('otc.chat.tip')"
      @on-ok="ok5"
      :mask-closable="false"
      class="ivu-modal--left"
      width="400px"
    >
      <P style="color:red;font-weight: bold;">
        {{ $t("otc.chat.msg6") }}<br />
        <Input
          type="password"
          v-model="fundpwd"
          :placeholder="$t('otc.chat.msg7')"
          autocomplete="off"
          v-show="false"
        ></Input>
        <Input
          type="password"
          v-model="fundpwd"
          :placeholder="$t('otc.chat.msg7')"
          autocomplete="off"
        ></Input>
      </P>
    </Modal>
    <Modal
      v-model="tranfer.open"
      :title="'转账给' + tranfer.otherSide"
      @on-ok="handlerTranfer"
      :mask-closable="false"
      class="ivu-modal--left"
      width="400px"
    >
      <Input
        type="password"
        v-model="fundpwd"
        :placeholder="$t('otc.chat.msg7')"
        autocomplete="off"
        v-show="false"
      ></Input>

      <div class="vui-margin-bottom">
        <span style="color:#999"
          >当前可用余额 ：<span style="color:#f0ac19;">{{
            tranfer.balance
          }}</span>
        </span>
      </div>
      <div style="margin-bottom:20px;display:flex;">
        <div class="vp-number--block " style="flex:1">
          <Input-number
            :min="0"
            v-model="tranfer.number"
            :placeholder="'请输入要转账的' + tranfer.unit + '数量'"
          ></Input-number>
        </div>
        <div>
          <span style="line-height:32px;margin-left:10px">{{
            tranfer.unit
          }}</span>
        </div>
      </div>
      <div>
        <Input
          type="password"
          v-model="tranfer.jyPassword"
          placeholder="请输入资金密码"
          autocomplete="off"
        ></Input>
      </div>
    </Modal>
    <Modal v-model="modal6" class="ivu-modal--left" width="400px">
      <div slot="header">
        <p style="text-align: center">{{ payPopupMessage[payCodeType] }}</p>
      </div>

      <div style="text-align:center;padding: 20px 0 ;">
        <div class="text-align:center;" v-if="payCodeType == 3">
          <div style="color: white ; font-size: 24px;margin-bottom:10px;">
            {{ bankInfo.bankRealName }}
          </div>
          <div style="color: white ; font-size: 24px;margin-bottom:10px;">
            {{ bankInfo.bank }}
          </div>
          <div style="color: white ; font-size: 36px;margin-bottom:10px;">
            {{ payCode.value }}
          </div>
        </div>

        <div v-else>
          <div style="position: relative" v-if="payCode.value">
            <div
              style="position: absolute;top:50%;left:50%;transform: translate(-50%,-50%);background-color: white"
            >
              <i
                class="icons "
                :class="{
                  'alipay-plus': payCodeType == 1,
                  'wechat-plus': payCodeType == 2,
                  'unionpay-plus': payCodeType == 4,
                  'polymer-plus': payCodeType == 5
                }"
                style="height:50px;width: 50px;"
              ></i>
            </div>
            <qriously
              :value="payCode.value"
              :size="payCode.size"
              :level="payCode.level"
              :background="payCode.background"
              :foreground="payCode.foreground"
              :backgroundAlpha="payCode.backgroundAlpha"
            />
          </div>
          <div v-else>
            <img :src="payCode.imageUrl" alt="" style="max-height:300px" />
          </div>
        </div>
      </div>
      <div
        style=" text-align:center "
        v-if="payCodeType == 1 && alipay.alipayRealName"
      >
        <span style="font-size:16px;font-weight:800;color:#fff">{{
          alipay.alipayRealName
        }}</span>
      </div>

      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
var Stomp = require("stompjs");
var SockJS = require("sockjs-client");
2;
import chatline from "../../components/otc/Chatline";

export default {
  components: {
    chatline
  },
  data() {
    return {
      watching: false,
      stompClient: null,
      reserveTime: "",
      reserveInteval: null,
      fundpwd: "",
      statusBtn: 0,
      tradeType: 0,
      isloading: true,
      payTime: "",
      statusText: "",
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      modal6: false,
      formItem: {
        select: "",
        remark: ""
      },
      msg: {},
      realName: "",
      payInfo: {},
      bankInfo: {},
      alipay: {},
      wechatPay: {},
      aggregate: {},
      payCodeUrl: "",
      payCodeType: 0,
      payPopupMessage: [
        "请用银行卡进行转账",
        "请用手机支付宝扫码",
        "请用手机微信扫码",
        "请用银行卡进行转账"
      ],
      payCode: {
        value: "",
        size: 300,
        backgroundAlpha: 1,
        background: "white",
        foreground: "black",
        level: "L"
      },
      payStatus: {
        wx: false,
        bank: false,
        ali: false,
        aggregate: false
      },
      tranfer: {
        open: false,
        number: null,
        orderSn: "",
        unit: "",
        jyPassword: "",
        otherSide: "",
        balance: 0
      },
      params: {
        orderSn: "",
        type: "",
        showBtn: false
      }
    };
  },

  mounted() {
    this.init();
  },
  computed: {},

  methods: {
    init() {
      this.params.orderSn = this.$route.query["orderSn"];
      this.params.type = this.$route.query["type"];
      this.setDetailTimer();
    },

    /**
     * 获取可转账的余额
     */

    getTransferBalance() {
      let self = this;
      this.$http.post(this.host + "/otc/advertise/init").then(response => {
        var resp = response.body;
        if (resp.code === 0) {
          if (resp.data) {
            this.tranfer.balance = resp.data["balance"];
            // this.base.balance = resp.data.balance;
            // this.base.limit = resp.data.limit;
            // this.base.leftBuyLimit = resp.data.leftBuyLimit;
            // this.base.leftSellLimit = resp.data.leftSellLimit ;
          } else this.$Message.error("获取用户余额信息失败！");
        } else this.$Message.error(resp.message);
      });
    },

    /**
     * 设置定时器 - 获取订单详情
     */
    setDetailTimer() {
      this.clearDetailTimer();
      this.getDetail();
      this._detailTimer = setInterval(() => {
        this.getDetail();
      }, 10 * 1000);
    },
    /**
     * 清除定时器 - 获取订单详情
     */
    clearDetailTimer() {
      clearInterval(this._detailTimer);
      this._detailTimer = null;
    },

    /**
     * 是否显示关闭申诉按钮
     */
    isShowCloseCustomBtn() {
      let messageLocal = localStorage.getItem("app/order/custom/message");
      let message = messageLocal ? JSON.parse(messageLocal) : {};
      return this.params.type === "custom" && msg["Id"] === message["memberId"];
    },

    /**
     * 直接转账前处理
     */

    beforeTranfer: function() {
      this.tranfer.open = true;
      this.tranfer.unit = this.msg.unit;
      this.tranfer.orderSn = this.msg.orderSn;
      this.tranfer.otherSide = this.msg.otherSide;

      this.getTransferBalance();
    },

    /**
     *  处理申诉订单
     */
    handlerCustom: function() {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "是否确定申诉订单已处理！",
        onOk: () => {
          this.$http
            .post(this.host + "/otc/order/closeAppealOrder", {
              orderId: this.msg.orderId
            })
            .then(response => {
              let data = response["body"];
              if (data["code"] === 0) {
                this.$Message.success("申诉订单已处理完成！");
                setTimeout(() => {
                  this.$router.go(-1);
                }, 1500);
              }
            })
            .catch(() => {
              this.$Message.warning("抱歉，申诉订单处理失败！");
            });
        }
      });
    },

    /**
     * 确定转账
     */

    handlerTranfer: function() {
      if (this.tranfer.number <= 0)
        return this.$Message.warning("请输入合法的数量！");
      if (!this.tranfer.jyPassword)
        return this.$Message.warning("请输入您的资金密码！");

      this.$http
        .post(this.host + "/otc/order/directTransfer", {
          number: this.tranfer.number,
          jyPassword: this.tranfer.jyPassword,
          orderSn: this.tranfer.orderSn
        })
        .then(
          response => {
            let data = response["body"];
            if (data["code"] === 0) {
              this.tranfer.number = 0;
              this.$Message.success("转账成功！");
            } else {
              this.$Message.warning(data.message);
            }
          },
          () => {
            this.$Message.warning("抱歉，转账失败！");
          }
        );
    },

    /**
     * 显示支付方式
     */

    showQRCode: function(type) {
      console.log(this.alipay);
      console.log(this.wechatPay);
      this.payCodeType = type;
      if (type == 1) {
        this.payCode.value = this.alipay.alipayUrl;
        this.payCode.imageUrl = this.alipay.alipayCodeUrl;
      } else if (type == 2) {
        this.payCode.imageUrl = this.wechatPay.qrWeCodeUrl;
        this.payCode.value = this.wechatPay.wechatUrl;
      } else if (type == 3) {
        this.payCode.value = this.bankInfo.cardNo;
      } else if (type == 4) {
        this.payCode.imageUrl = this.unionpay.unionpayCodeUrl;
        this.payCode.value = this.unionpay.unionpayUrl;
      } else if (type == 5) {
        this.payCode.imageUrl = this.aggregate.aggregateCodeUrl;
        this.payCode.value = this.aggregate.aggregateUrl;
      }

      this.modal6 = true;
    },

    /**
     * 申诉前判断订单是否可以申诉
     */

    beforeAppear: function() {
      this.$http
        .post(this.host + "/otc/order/canAppeal", {
          orderSn: this.$route.query.tradeId
        })
        .then(response => {
          var resp = response.body;
          if (resp.code === 0) this.modal4 = true;
          else this.$Message.error(resp.message);
        });
    },

    ok1() {
      this.$http
        .post(this.host + "/otc/order/pay", {
          orderSn: this.$route.query.tradeId
        })
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Message.success(resp.message);
            //this.sendOrderStatusNotice(1);
            this.getDetail();
          } else {
            this.$Message.error(resp.message);
          }
        });
    },

    ok3() {
      this.$http
        .post(this.host + "/otc/order/cancel", {
          orderSn: this.$route.query.tradeId
        })
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Message.success(resp.message);
            //this.sendOrderStatusNotice(3);
            this.getDetail();
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    ok4() {
      //订单申诉
      //时间
      if (1 == 1) {
        var params = {};
        params["orderSn"] = this.$route.query.tradeId;
        params["remark"] = this.formItem.remark;

        this.$http
          .post(this.host + "/otc/order/appeal", params)
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              this.$Message.success(resp.message);
              //this.sendOrderStatusNotice(4);
              this.getDetail();
            } else {
              this.$Message.error(resp.message);
            }
          });
      }
    },
    ok5() {
      var params = {};
      params["orderSn"] = this.$route.query.tradeId;
      params["jyPassword"] = this.fundpwd;
      if (this.fundpwd == "") {
        this.$Message.error(this.$t("otc.chat.msg7tip"));
        return;
      }
      this.$http
        .post(this.host + "/otc/order/release", params)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Message.success(resp.message);
            //this.sendOrderStatusNotice(5);
            this.getDetail();
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    /**
     * 获取订单详情
     */
    getDetail() {
      let tradeId = this.$route.query.tradeId;
      if (!Boolean(tradeId)) return;
      //获取个人广告详情
      this.$http
        .post(this.host + "/otc/order/detail", {
          orderSn: tradeId
        })
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.msg = resp.data;

            //判断关闭申诉按钮是否显示
            let messageLocal = localStorage.getItem("app/order/custom/message");
            let message = messageLocal ? JSON.parse(messageLocal) : {};

            this.params.showBtn =
              this.params.type == "custom" &&
              this.msg["myId"] === message["memberId"];

            this.payInfo = this.msg.payInfo;
            if (this.payInfo == null) {
              this.bankInfo = this.alipay = this.wechatPay == null;
            } else {
              this.bankInfo = this.msg.payInfo.bankInfo;

              // 支付方式
              let payModes = this.msg.payMode && this.msg.payMode.split(",");

              //真实姓名
              this.realName = this.msg.payInfo.realName;

              // 支付宝支付
              let aliInfo = this.payInfo["alipay"];

              if (payModes.indexOf("支付宝") > -1) {
                this.payStatus.ali = true;
                this.alipay = aliInfo || {};
              } else {
                this.payStatus.ali = false;
              }

              // 微信支付
              let wxInfo = this.payInfo["wechatPay"];
              if (payModes.indexOf("微信") > -1) {
                this.payStatus.wx = true;
                this.wechatPay = wxInfo || {};
              } else {
                this.payStatus.wx = false;
              }

              // 聚合支付
              let aggregate = this.payInfo["aggregate"];
              if (payModes.indexOf("聚合码") > -1) {
                this.payStatus.aggregate = true;
                this.aggregate = aggregate || {};
              } else {
                this.payStatus.aggregate = false;
              }

              // 银行卡支付
              let bankInfo = this.payInfo["bankInfo"];

              if (payModes.indexOf("银联") > -1) {
                this.payStatus.bank = true;
                this.bankInfo = bankInfo || {};
              } else {
                this.payStatus.bank = false;
              }

              //云闪付
              let unionpay = this.payInfo["unionpay"];

              if (payModes.indexOf("云闪付") > -1) {
                this.payStatus.unionpay = true;
                this.unionpay = unionpay || {};
              } else {
                this.payStatus.unionpay = false;
              }
            }

            this.statusBtn = resp.data.status;
            this.tradeType = resp.data.type;
            this.statusText = this.setOrderStatus(this.statusBtn);

            if (resp.data.status == 1) {
              this.setBackTimer();
            } else {
              this.clearBackTimer();
            }
          } else {
            this.$Message.error(resp.message);
          }
        });
    },

    /**
     * 设置倒计时定时器
     */

    setBackTimer() {
      this.clearBackTimer();
      let createTime = +new Date(this.msg["createTime"]);
      let currentTime = +new Date(this.msg["currentTime"]);
      let timeLimit = Number(this.msg["timeLimit"]) * 60 * 1000;

      this.reserveTime = this.getBackTime(createTime, currentTime, timeLimit);
      this._backTimer = setInterval(() => {
        currentTime += 1000;
        this.reserveTime = this.getBackTime(createTime, currentTime, timeLimit);
      }, 1000);
    },
    /**
     * 清除定时器
     */
    clearBackTimer() {
      clearInterval(this._backTimer);
      this._backTimer = null;
    },
    /**
     * 获取倒计时
     */
    getBackTime(createTimes, currentTimes, timeLimits) {
      //let createTimes = +new Date(createTime);
      //let crrentTimes = +new Date(currentTime);
      //let timeLimits = Number(timeLimit) * 60 * 1000

      let backTimes = timeLimits - (currentTimes - createTimes);
      console.log(backTimes);
      if (backTimes <= 0) {
        //this.getDetail()
        return "";
      }

      //console.log(string)

      function getTime(times) {
        let hour = 1000 * 60 * 60;

        let minute = 1000 * 60;

        let second = 1000;

        let hours = Math.floor(times / hour);

        let minutes = Math.floor((times - hours * hour) / minute);

        let seconds = Math.floor(
          (times - hours * hour - minutes * minute) / second
        );

        //console.log(hours, minutes, seconds);

        if (hours > 0) {
          return `${hours}时${getZero(minutes)}分${getZero(seconds)}秒`;
        }

        if (minutes > 0) {
          return `${getZero(minutes)}分${getZero(seconds)}秒`;
        }

        if (seconds > 0) {
          return `${getZero(seconds)}秒`;
        }

        return 0;
      }

      function getZero(time) {
        return Number(time) > 9 ? time : "0" + time;
      }

      return getTime(backTimes);
    },

    /**
     * 设置订单状态
     */

    setOrderStatus: function(status) {
      let statusSoure = [
        { status: 0, text: "已取消" },
        { status: 1, text: "等待付款" },
        { status: 2, text: "等待放行" },
        { status: 3, text: "已完成" },
        { status: 4, text: "申诉中" }
      ];
      let findStatus = statusSoure.find(item => {
        return item["status"] === status;
      });
      return !!findStatus && findStatus["text"];
    }
  },
  beforeDestroy() {
    this.clearDetailTimer();
    this.clearBackTimer();
  }
};
</script>

<style>
.chat-in .ivu-col.ivu-col-span-4 .ivu-poptip-popper {
  margin-top: 35px;
}

.chat-in .ivu-col.ivu-col-span-4 .ivu-poptip-title {
  display: none;
}
</style>

<style scoped>
.vp-number--block .ivu-input-number {
  width: 100%;
}

.pop-tel {
  position: absolute;
  top: 50px;
  right: 10px;
  width: 25px;
  height: 25px;
  z-index: 100;
}

.pop-tel img {
  width: 100%;
  height: 100%;
}

.chat-in-box .chat-in .chat-right .chat-right-in h6.h6-flex {
  display: flex;
  overflow: auto;
  min-width: auto;
  white-space: normal;
}

.h6-flex > span {
  flex: 0 0 40px;
}

.h6-flex > a {
  flex: 1 1 100%;
  width: 100%;
}

/* right */
.reserve-time {
  color: #ed3f14;
  font-weight: 700;
}

.rightbox {
  background: #192330;
  margin-left: 20px;
  padding-bottom: 20px;
  margin-bottom: 40px;
}

.chat-top {
  padding: 30px 0;
  font-size: 14px;
}

.order-time h5 {
  font-size: 16px;
  line-height: 40px;
}

.order-info h5 {
  font-weight: 600;
  font-size: 14px;
}

.order-info p a {
  color: #f0a70a;
}

.icons.alipay {
  background-image: url(../../assets/img/alipay.png);
}

.icons.alipay-plus {
  background-image: url(../../assets/img/alipay-plus.png);
}

.icons.wechat {
  background-image: url(../../assets/img/wechat.png);
}

.icons.wechat-plus {
  background-image: url(../../assets/img/wechat-plus.png);
}

.icons.unionpay {
  background-image: url(../../assets/img/unionpay.png);
}

.icons.unionpay-plus {
  background-image: url(../../assets/img/unionpay.png);
}

.icons.polymer {
  background-image: url(../../assets/img/icon-polymer.png);
}

.icons.polymer-plus {
  background-image: url(../../assets/img/icon-polymer.png);
}

.icons.qrcode {
  background-image: url(../../assets/images/wechats.png);
}

.icons {
  height: 17px;
  width: 17px;
  display: inline-block;
  margin-top: -1px;
  background-size: 100% 100%;
  vertical-align: middle;
}

.bankfor {
  background-image: url(../../assets/img/bankcard.png);
}

.content-wrap {
  /* background: #f5f5f5; */
  min-height: 600px;
  padding-top: 60px;
}

.container {
  padding: 20px;
  margin: 0 auto;
  min-width: 1200px;
  /* background: white; */
}

/* chat */

/* left */

.mt20 {
  margin-top: 20px;
}

.leftmenu {
  background-color: #192330;
  position: relative;
  text-align: left;
}

.chat-in-box .chat-in .chat-right .chat-right-in {
  /* background-color: white; */
}

.chat-in-box .chat-in .chat-right .chat-right-in h6 {
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  min-width: 195px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 8px;
}

.chat-in-box .chat-in .chat-right .chat-right-in .seller {
  margin-left: 6px;
}

.chat-in-box .chat-in .chat-right .chat-right-in h6 span {
  margin-left: 6px;
}

.chat-in-box .chat-in .chat-right .chat-right-in h6 a {
  color: #f0a70a;
}

.chat-in-box .chat-in .chat-right .chat-right-in p {
  color: #ccc;
  font-size: 12px;
  margin-bottom: 8px;
  line-height: 1.5;
}

.chat-in-box .chat-in .chat-right .chat-right-in p em {
  color: #f40a0a;
  font-style: normal;
}

/* -- */

.content-wrap {
  /* background: #f5f5f5; */
  min-height: 515px;
}

.container {
  /*padding-top: 30px;*/
  margin: 0 auto;
}
</style>
