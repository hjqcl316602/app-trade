<script>
import { storager,stringer } from "../../../package/es";

let Stomp = require("stompjs");

let SockJS = require("sockjs-client");

export let createSocket = (url = "/chat/socket/chat-webSocket") => {
  let stompClient = null;
  let socket = new SockJS(url);
  stompClient = Stomp.over(socket);
  stompClient.debug = false;
  return stompClient;
};
export default {
  name: "order-custom",
  data() {
    return {
      params: {
        orderSn: "tn201911203574592"
      },
      order: {
        orderSn: "",
        list: [],
        selected: {},
        message: null,
          selectType:'left'
      },
      custom: {
        selected: {},
        list: []
      },
      chat: {
        loading: false,
        minChatId: 0,
        list: [],
        pageSize: 20,
        finished: false,

        orderId: "",
        orderSn: "",
        appId: "",
        accessToken: "",
        uidType: 1,
        uidTo: "",
        uidFrom: "",
        nameFrom: "",
        nameTo: "",

        message: "",

        socketConneted: false,
        socketConnetedCount: 0
      },
      letter: {
        list: []
      },
        preview:{
            content:'',
            show:false
        }
    };
  },
  props: {},
  computed: {},
  methods: {
    init() {
      this.getCustomList();
      this.getLetter()
    },
    getCustomList() {
        let list = storager.getStore("app/custom/list") || [];
        list.map(item=> item.selected = false )
      this.custom.list =  list
    },
    getOrderList() {
      this.$http
        .post(this.host + "/otc/order/self", {
          orderSn: stringer.trim.both(this.order.orderSn),
          pageSize: 20,
          pageNo: 0
        })
        .then(({ body }) => {
          let { code, data, message } = body;
          if (code === 0) {
            this.order.list = data.content;
          } else this.$Message.error(message);
        });
    },
    selectOrder(item) {
      this.order.selected = item;
      let { orderSn } = item;
      this.order.selectType = 'left';
      this.getOrderDetail({orderSn});
    },
    selectCustom({ accessToken, appId, orderId, orderSn }) {
        this.order.selectType = 'right';
      let list = storager.getStore("app/custom/list") || [];
      list.map(item => {
        if (item.orderSn === orderSn) {
          return (item.selected = true);
        } else return (item.selected = false);
      });
      storager.setStore("app/custom/list", list);
      this.custom.list = list;


      this.getCustomDetail({ accessToken, appId, orderId });
      this.getOrderDetail({ orderSn });
    },
    getOrderDetail({ orderSn }) {
      this.$http
        .post(this.host + "/otc/order/detail", { orderSn })
        .then(({ body }) => {
          let { code, data, message } = body;
          if (code === 0) {
            this.order.message = data;
          } else this.$Message.error(message);
        });
    },

    /**
     * 创建socket
     */

    getCustomDetail({ accessToken, appId, orderId }) {
      return new Promise(resolve => {
        this.$http
          .post(this.host + "/p/custom/appealDetail.do", {
            accessToken,
            appId,
            orderId
          })
          .then(({ body }) => {
            let { code, data, msg } = body;
            if (code === "000") {
              this.chat.accessToken = accessToken;

              this.chat.appId = appId;

              this.chat.orderId = orderId;

              this.chat.uidFrom = data.customerId + "_" + data.subMemId;

              this.chat.uidTo = data.memberId;

              this.chat.nameFrom = data.subDealName || data.subMemId;

              this.chat.nameTo = data.memberName; //this.result["memberName"];

              this.chat.orderSn = data.orderSn; //this.result["orderSn"];

              this.createSocket();
              this.getChatList();
            } else this.$Message.error(message);
          });
      });
    },

    getChatList(more = false) {
      return new Promise(resolve => {
        if (this.chat.loading)
          return this.$Message.error("请稍等，正在获取聊天记录！");
        this.chat.loading = true;

        if (more) {
          this.chat.minChatId = this.chat.list[0]["chatId"];
        } else {
          this.chat.minChatId = 0;
        }
        let { minChatId, pageSize,accessToken, appId, orderId } = this.chat;
        this.$http
          .post(this.host + "/chat/getHistoryMessageKh.do", {
            accessToken,
            appId,
            orderId,
            minChatId,
            pageSize
          })
          .then(({ body }) => {
              let { code, data, msg } = body ;
            if (code === "000") {
              let list = data.reverse();

              this.chat.finished = this.chat.pageSize > list.length;

              if (more) {
                this.chat.list = [...list, ...this.chat.list];
              } else {
                this.chat.list = list;

                this.scrollToBottom();
              }
              this.chat.loading = false;
              resolve("list");
            } else this.$Message.error(msg);
          })
          .catch(() => {
            this.chat.loading = false;
          });
      });
    },

    /**
     * 创建socket
     */
    createSocket() {
      this._socket = createSocket(this.host + "/chat/socket/chat-webSocket");

      let connect = this._socket.connect(
        {},
        frame => {
          this.$Message.success("聊天室已连接，您可以进行聊天了~");
          this.chat.socketConneted = true;
          this.chat.socketConnetedCount = 0;
          this.subscribeSocketMessage();
        },
        frame => {
          //this.$toast("聊天室连接失败，请检查网络！");
          //this.params.socketConneted = false;
          this.chat.socketConnetedCount++;
          if (this.chat.socketConnetedCount === 10) {
            this.$Mssage.error("聊天室连接失败，请检查网络！");
            this.chat.socketConnetedCount = 0;
          } else {
            this.chat.socketConneted = false;
            this.createSocket();
          }
        }
      );
      this._socket.debug = function(str) {
        console.log(JSON.stringify(str));
      };
    },
    /**
     * 关闭实时通信
     */
    closeSocket() {
      if (this._socket) {
        this._socket.disconnect();
        this.$Message.error("聊天室已关闭！");
      }
    },
    /**
     * 判断是否是自己
     */
    isMine(item) {
      return item["uidType"] === 1;
    },

    /**
     * 订阅实时聊天信息
     */
    subscribeSocketMessage() {
      this._socket.subscribe(
        "/topic/chatMsg/kh/" + this.chat.uidFrom,
        response => {
          let message = JSON.parse(response.body);
            // 防止多条相同的数据
            console.log(message)
            let find = this.chat.list.find(item=>item.sendTime == message.sendTime)
            if(find) return false
            // 会收到全部的信息 需要过滤出当前的订单对应的信息

          if (message["orderId"] === this.chat.orderId.toString()) {
            this.chat.list.push(message);
          }
          this.scrollToBottom();
        }
      );
    },
      /**
       * 让滚动条始终在底部
       */
      scrollToBottom() {

          setTimeout(() => {
            var div = this.$refs["chatWrap"];
            div.scrollTop = div.scrollHeight;
          }, 300);
      },
      /**
       * 发送实时消息
       */
    sendSocketMessage({ content, type }) {
      let {
        uidTo,
        uidFrom,
        orderId,
        orderSn,
        nameFrom,
        nameTo,
        appId,
        accessToken,
        uidType
      } = this.chat;
      let message = {
        content,
        type,
        uidTo,
        uidFrom,
        orderId,
        orderSn,
        nameFrom,
        nameTo,
        appId,
        accessToken,
        uidType
      };

      this.chat.list.push(message);

      this._socket.send("/app/message/nologin", {}, JSON.stringify(message));
      this.scrollToBottom()
    },

    /**
     * 发送消息
     */
    sendMessage(message) {
        if(this.custom.list.length === 0 || !this.custom.list.find(item=> item.selected )) return this.$Message.error("请选择申诉订单!")

      if (!this.chat.socketConneted)
        return this.$Message.error("聊天室连接失败，请刷新页面重试!");
        if (!message) return this.$Message.error("内容不能为空!");
      this.sendSocketMessage({
        content:message,
        type: 0
      });
      this.chat.message = "";
    },
      sendMessageAndSetLetter(message){
        this.sendMessage(message)
          this.setLetter(message)
      },


    showPicture(content) {
        this.preview.show = true ;
        this.preview.content = content
    },
      uploadImage(e, type = "select") {
          let formData;
          if (type === "select") {
              let file = e.target.files[0];
              formData = new FormData();
              formData.append("file", file);
              e.target.value = "";
          } else {
              formData = new FormData();
              formData.append("file", e);
          }
          this.$http
              .post(this.host + "/res/upload/image/compress.do",formData).then(({ body })=>{
                  let { code, data, msg } = body
              if (code === "000" && data && data.url) {
                  if(this.custom.list.length === 0 || !this.custom.list.find(item=> item.selected )) return this.$Message.error("请选择申诉订单!")
                  if (!this.chat.socketConneted)
                      return this.$Message.error("聊天室连接失败，请刷新页面重试!");
                  this.sendSocketMessage({ content:data.url , type : 1 })
              } else {
                  this.$Message.error(msg);
              }
          })

      },

    getOrderStatus: function getOrderStatus(status) {
      const orderStatusTypes = [
        {
          value: 0,
          text: "已取消",
          className: "is-color--danger",
          icon: "&#xe61e;"
        },
        {
          value: 1,
          text: "等待付款",
          className: "is-color--warning",
          icon: "&#xe64b;"
        },
        {
          value: 2,
          text: "已付款",
          className: "is-color--success",
          icon: "&#xe742;"
        },
        {
          value: 3,
          text: "已完成",
          className: "is-color--success",
          icon: "&#xe742;"
        }
      ];
      return orderStatusTypes.find(item => item.value === status) || {};
    },

    /**
     * 枚举订单类型
     * @param {type} type
     */
    getOrderType: function getOrderType(type) {
      const orderTypes = [
        {
          value: 0,
          text: "充值",
          className: "is-color--danger",
          icon: "&#xe61e;"
        },
        {
          value: 1,
          text: "提现",
          className: "is-color--warning",
          icon: "&#xe64b;"
        }
      ];
      return orderTypes.find(item => item.value === type) || {};
    },
      closeCustom({orderId}){

          this.$Modal.confirm({
              title: '温馨提示',
              content: '您是否确认该订单已处理完成？',
              onOk: () => {
                  let list = storager.getStore("app/custom/list") || [];
                  list = list.filter(item=> item.orderId != orderId)
                  storager.setStore("app/custom/list", list);
                  this.custom.list = list;
              }
          });
      },
    createCustom() {
      let list = storager.getStore("app/custom/list") || [];
      if (list.find(item => item.orderSn === this.order.message.orderSn))
        return this.$Message.error("已在申诉订单列表中");
      //list.map(item => (item.selected = false));
      let {
        accessToken,
        appId,
        orderSn,
        channelOrderId,
        orderId,
        subMemId
      } = this.order.selected;
      list.unshift({
        selected: false,
        accessToken,
        appId,
        orderSn,
        channelOrderId,
        orderId,
        subMemId
      });
      storager.setStore("app/custom/list", list);
      this.custom.list = list;
    },

      /**
       * 常用语
       * @param { message }
       */
      getLetter(){
          let letter = storager.getStore('app/custom/letter') || [];
          this.letter.list = letter
      },
      setLetter(message){
          if(!message) return this.$Message.error("常用语不能为空！");
          if(this.letter.list.find(item=> item.message === message)) return this.$Message.error("常用语中已存！")
          this.letter.list.unshift({ message });
          storager.setStore('app/custom/letter',this.letter.list)
      },
      clearLetter(picker ,index){
          this.letter.list = this.letter.list.filter(item=>picker.message !== item.message)
          storager.setStore('app/custom/letter',this.letter.list)
      }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.closeSocket();
  }
};
</script>

<template>
  <div class="app-view">
    <Modal
            v-model="preview.show"
            class="ivu-modal--preview"
            title="图片预览"
            width="100%"
    >
      <div style="width: 100%;height:100%;text-align: center" @click="preview.show = false " >
        <img :src="preview.content" alt="" class="is-preview"  />
      </div>
      <div slot="footer"></div>
    </Modal>
    <div class="vi-background is-background--light-black">
      <div class="vi-padding">
        <Input
          v-model="order.orderSn"
          slot="extra"
          @on-click="getOrderList"
          icon="ios-search"
          placeholder="输入订单编号搜索"
          @on-enter="getOrderList"
        ></Input>
      </div>
      <div class="vi-flex ">
        <div
          class="vi-flex-item vi-border is-border--right is-border--white is-border--thiner"
          style="width: 300px; "
          v-if="order.list.length > 0"
        >
          <div style=" height: 700px;overflow: auto" class="vi-padding">
            <div class="vi-text is-align--center" style="line-height: 36px">
              <span class="vi-text is-color--primary">搜索订单列表</span>
            </div>
            <div
              v-for="(item, index) in order.list"
              :key="index"
              class="vi-padding vi-border is-border--bottom is-border--thiner"
              @click="selectOrder(item)"
            >
              <div class="" style="line-height: 32px">
                <span> 订单号：{{ item.orderSn }} </span>
              </div>
              <div class="" style="line-height: 28px">
                <span class="vi-text is-size--smaller">
                  渠道编号：{{ item.channelOrderId }}
                </span>
              </div>
              <div class="" style="line-height: 24px">
                <span class="vi-text is-size--smaller">
                  渠道用户编号：{{ item.subMemId }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="vi-flex-item vi-border is-border--right is-border--white is-border--thiner"
          style="width: 300px; "
          v-if="order.message"
        >
          <div style=" height: 700px;overflow: auto" class="vi-padding">
            <div class="vi-text is-align--center" style="line-height: 36px">
              <span class="vi-text is-color--primary">订单详情</span>
            </div>
            <div class="vi-flex" style="line-height: 32px">
              <span
                style="width: 120px"
                class="vi-flex-item vi-text is-align--right vi-padding-right"
              >
                订单编号
              </span>
              <span class="vi-text  ">
                {{ order.message.orderSn }}
              </span>
            </div>
            <div class="vi-flex" style="line-height: 32px">
              <span
                style="width: 120px"
                class="vi-flex-item vi-text is-align--right vi-padding-right"
              >
                渠道编号
              </span>
              <span class="vi-text  ">
                {{ order.message.channelOrderId }}
              </span>
            </div>
            <div class="vi-flex" style="line-height: 32px">
              <span
                style="width: 120px"
                class="vi-flex-item vi-text is-align--right vi-padding-right"
              >
                渠道用户编号
              </span>
              <span class="vi-text  ">
                {{ order.message.subMemId }}
              </span>
            </div>
            <div class="vi-flex" style="line-height: 32px">
              <span
                style="width: 120px"
                class="vi-flex-item vi-text is-align--right vi-padding-right"
              >
                数量 | TTM
              </span>
              <span class="vi-text  ">
                {{ order.message.amount }}
              </span>
            </div>
            <div class="vi-flex" style="line-height: 32px">
              <span
                style="width: 120px"
                class="vi-flex-item vi-text is-align--right vi-padding-right"
              >
                金额 | CNY
              </span>
              <span class="vi-text  ">
                {{ order.message.money }}
              </span>
            </div>
            <div class="vi-flex" style="line-height: 32px">
              <span
                style="width: 120px"
                class="vi-flex-item vi-text is-align--right vi-padding-right"
              >
                方式
              </span>
              <span class="vi-text  ">
                {{ order.message.payMode }}
              </span>
            </div>
            <div class="vi-flex" style="line-height: 32px">
              <span
                style="width: 120px"
                class="vi-flex-item vi-text is-align--right vi-padding-right"
              >
                类型
              </span>
              <span
                class="vi-text  "
                :class="getOrderType(order.message.type).className"
              >
                {{ getOrderType(order.message.type).text }}
              </span>
            </div>
            <div class="vi-flex" style="line-height: 32px">
              <span
                style="width: 120px"
                class="vi-flex-item vi-text is-align--right vi-padding-right"
              >
                状态
              </span>
              <span
                class="vi-text  "
                :class="getOrderStatus(order.message.status).className"
              >
                {{ getOrderStatus(order.message.status).text }}
              </span>
            </div>
            <div class="vi-flex" style="line-height: 32px">
              <span
                style="width: 120px"
                class="vi-flex-item vi-text is-align--right vi-padding-right"
              >
                创建时间
              </span>
              <span class="vi-text  ">
                {{ order.message.createTime }}
              </span>
            </div>
            <div class="vi-flex" style="line-height: 32px">
              <span
                style="width: 120px"
                class="vi-flex-item vi-text is-align--right vi-padding-right"
              >
                转账数量 | TTM
              </span>
              <span class="vi-text  ">
                {{ order.message.transferNumber }}
              </span>
            </div>
            <div class="vi-flex" style="line-height: 32px">
              <span
                style="width: 120px"
                class="vi-flex-item vi-text is-align--right vi-padding-right"
              >
                转账时间
              </span>
              <span class="vi-text  ">
                {{ order.message.transferTime }}
              </span>
            </div>
            <div class="vi-margin-top" v-if="order.selectType ==='left'">
              <i-button type="primary" long @click="createCustom"
                >
                添加到申诉列表
              </i-button
              >
            </div>
          </div>
        </div>
        <div
          class="vi-flex-item vi-border is-border--right is-border--white is-border--thiner"
          style="width: 300px; "
          v-if="custom.list.length > 0"
        >
          <div
            style=" height: 700px;overflow: auto"
            v-if="custom.list.length > 0"
            class="vi-padding"
          >
            <div class="vi-text is-align--center" style="line-height: 36px">
              <span class="vi-text is-color--primary">申诉订单列表</span>
            </div>
            <div
              v-for="(item, index) in custom.list"
              :key="index"
              class="vi-padding vi-border  "
              :class="{ 'is-border--round is-border--primary': item.selected,'is-border--bottom is-border--thiner': !item.selected}"
              @click="selectCustom(item)"
            >
              <div class="" style="line-height: 32px">
                <span> 订单号：{{ item.orderSn }} </span>
              </div>
              <div class="" style="line-height: 28px">
                <span class="vi-text is-size--smaller">
                  渠道编号：{{ item.channelOrderId }}
                </span>
              </div>
              <div class="" style="line-height: 24px">
                <span class="vi-text is-size--smaller">
                  渠道用户编号：{{ item.subMemId }}
                </span>
              </div>
              <div class="vi-text is-align--right">
                <i-button type="error" @click.prevent.stop="closeCustom(item)">
                  关闭
                </i-button>
              </div>
            </div>
          </div>
        </div>
        <div class="vi-flex-item is-flex--1">
          <div style="height: 700px;">
            <div class="vi-chat">
              <div class="vi-chat-body" ref="chatWrap">
                <div
                  v-if="!chat.finished"
                  class="vi-margin-bottom vi-flex is-justify-content--center"
                >
                  <i-button type="default" @click="getChatList(true)">
                    加载更多
                  </i-button>
                </div>
                <div
                  class="vi-chat-row "
                  :class="{
                    'is-row--left': !isMine(item),
                    'is-row--right': isMine(item)
                  }"
                  v-for="(item, index) in chat.list"
                >
                  <div class="vi-chat-tag" style="" v-if="!isMine(item)"></div>

                  <div class="vi-chat-content">
                    <div class="vi-chat-arrow"></div>
                    <div class="vi-chat-message">
                      <div>
                        <span v-if="item.type === 0">{{ item.content }}</span>
                        <img
                          v-else
                          :src="item.content"
                          alt=""
                          style="max-width:250px;max-height: 350px"
                          @click="showPicture(item.content)"
                        />
                      </div>
                      <div class="vi-margin-top" v-if="item.sendTimeStr">
                        <span class="vi-text is-size--smaller ">
                          {{ item.sendTimeStr }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="vi-chat-tag" style="" v-if="isMine(item)"></div>
                </div>
              </div>
              <div class="vi-chat-footer vi-padding">
                <div class="vi-flex is-align-items--center">
                  <label for="upload-2" class="vi-upload">
                    <input
                      type="file"
                      id="upload-2"
                      accept="image/*"
                      @change="e => uploadImage(e)"
                    />
                    <div class="vi-padding-ad">
                      <span class="vi-icon" style="font-size: 24px">
                        &#xe621;
                      </span>
                    </div>
                  </label>

                  <div class="vi-flex-item is-flex--1 vi-margin-right">
                    <Input
                      v-model="chat.message"
                      size="large"
                      ref="editable"
                      @keyup.enter.native="sendMessage(chat.message)"
                      placeholder="输入聊天内容 按回车键可发送"
                    ></Input>
                  </div>
                  <div class="vi-margin-right">
                    <Button type="primary" @click="sendMessage(chat.message)"
                      >发送</Button
                    >
                  </div>

                  <div class="vi-margin-right">
                    <Button type="error" @click="sendMessageAndSetLetter(chat.message)">
                      发送并记为常用语
                    </Button>
                  </div>

                  <div class="">
                    <Button type="success" @click="setLetter(chat.message)">
                      记为常用语
                    </Button>
                  </div>
                </div>
                <div
                  class="vi-padding "
                  style="max-height: 150px;overflow: auto"
                  v-if="letter.list.length > 0"
                >
                  <Tag
                    v-for="(item, index) in letter.list"
                    ref="tagsPageOpened"
                    :key="index"
                    :name="item.message"
                    @on-close="clearLetter(item,index)"
                    @click.native="sendMessage(item.message)"
                    closable
                    >{{ item.message  }}
                  </Tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
