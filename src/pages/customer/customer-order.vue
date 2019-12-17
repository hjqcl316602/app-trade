<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-02 11:52:42
 * @LastEditTime: 2019-09-02 16:22:40
 * @LastEditors: Please set LastEditors
 -->
<script>
import "./index.css";
import "./chat-send.css";
import "./chat.css";
import { mapState } from "vuex";
var Stomp = require("stompjs");
var SockJS = require("sockjs-client");
var img = require("../../assets/images/icon-send.png");

export default {
  name: "app-chat",
  data() {
    return {
      chat: {
        list: [],
        message: "",
        pic: "",
        loading: false,
        pageSize: 20,
        connected: false,
        push: {
          finished: true
        },
        picture: {
          show: false,
          url: ""
        }
      }
    };
  },
  computed: mapState({
    member: "member"
  }),
  mounted() {
    this.init();
  },

  methods: {
    init() {
      this.getChatHistory();
      this.createConnectSocket();
    },

    /**
     * 获取聊天记录
     */

    getChatHistory: function(more = false) {
      if (this.chat.loading)
        return this.$Message.error("请稍等，正在获取聊天记录！");
      this.chat.loading = true;

      let params = {
        cdId: this.memberMessage.id
      };
      if (more) {
        params.minChatId = this.chat.list[0]["chatId"];
      } else {
        params.minChatId = 0;
      }

      this.$http
        .post(this.host + "/chat/getHistoryMessageCdPKf.do", params)
        .then(res => {
          this.chat.loading = false;

          let data = res["body"];
          console.log(res);

          if (data["code"] === "000") {
            let list = data["data"] ? data["data"].reverse() : [];
            this.chat.push.finished = this.chat.pageSize > list.length;

            if (more) {
              this.chat.list = [...list, ...this.chat.list];
            } else {
              this.chat.list = list;
              this.scrollToBottom();
            }
          } else {
            this.$Message.error("获取历史聊天记录失败！");
          }
        })
        .catch(err => {
          console.log("err", err);
          this.chat.loading = false;
          this.$Message.error("获取历史聊天记录失败！");
        });
    },

    /**
     * 建立联系
     */

    createConnectSocket: function() {
      let promise = new Promise((resolve, reject) => {
        this.closeSocket();
        let self = this;
        var socket = new SockJS(this.host + "/chat/socket/chat-webSocket");
        this._stompClientChat = Stomp.over(socket);
        this._stompClientChat.debug = function name(params) {
          console.log(params);
        };
        this._stompClientChat.connect(
          {},
          function(frame) {
            self.$Notice.success({
              top: 50,
              duration: 3,
              title: "提示",
              desc: "聊天室连接成功，可以进行聊天了~"
            });

            self.chat.connected = true;
            resolve();
          },
          function() {
            self.$Notice.error({
              top: 50,
              duration: 3,
              title: "提示",
              desc: "聊天室连接失败，请重试！"
            });
            self.chat.connected = false;
            reject();
          }
        );
      }).then(res => {
        this._stompClientChat.subscribe(
          "/topic/chatMsg/cd/" + this.memberMessage.id,
          res => {
            let message = JSON.parse(res.body);
            console.log("chat-socket-message");
            console.log(message);

            if (message["uidType"] != 5) return;
            this.getChatHistory();
          }
        );
      });
    },

    /**
     * 关闭实时通信
     */
    closeSocket() {
      if (this._stompClientChat) {
        this._stompClientChat.disconnect();
        this._stompClientChat = null;
      }
    },
    /**
     * 订阅发送信息
     */
    sendSocketMessage(params) {
      let message = {};
      message["uidFrom"] = this.memberMessage.id;
      message["nameFrom"] = this.memberMessage.username;
      message["content"] = params.content;
      message["type"] = params.type;
      message["uidType"] = 7;
      //message["nameTo"] = this.message["kfName"]; 自动分配客服
      //message["uidTo"] = this.message["kfId"];
      console.log("chat-message");
      this.chat.list.push(message);
      console.log(message)
      this.scrollToBottom();
      this._stompClientChat.send(
        "/app/message/chat",
        {},
        JSON.stringify(message)
      );
    },

    /**
     * 发送文本消息
     */

    sendMessage: function() {
      if (!this.chat.connected) {
        return this.$Message.error("当前聊天室连接未成功，请重试");
      }
      if (!this.chat.message) {
        return this.$Message.error("聊天内容不能为空！");
      }
      this.sendSocketMessage({ content: this.chat.message, type: 0 });
      this.chat.message = "";
    },

    /**
     * 选择图片，并发送图片消息
     */
    sendPicture: function(e) {
      if (!this.chat.connected) {
        return this.$Message.error("当前聊天室连接未成功，请重试");
      }
      let file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      this.$http
        .post(this.image.compress, formData) //http://103.91.217.67/res/upload/image/compress.do
        .then(response => {
          let data = response["data"];
          if (data["code"] === "000") {
            this.sendSocketMessage({
              content: data["data"] && data["data"]["url"],
              type: 1
            });
          } else {
            this.$Message.error("发送图片失败！");
          }
        })
        .catch(() => {
          this.$Message.error("发送图片失败！");
        });
    },

    /**
     * 图片放大
     */

    showPicture: function(value) {
      this.chat.picture.show = true;
      this.chat.picture.value = value;
    },
    /**
     * 判断是否是自己
     */
    isMine: function(item) {
      return item["uidType"] == "7";
    },
    /**
     * 让滚动条始终在底部
     */
    scrollToBottom() {
      setTimeout(() => {
        var div = this.$refs["chat"];
        console.log(div);
        div && (div.scrollTop = div.scrollHeight);
      }, 300);
    }
  },
  beforeDestroy() {
    this.closeSocket();
  }
};
</script>

<template>
  <div class="app-customer">
    <Modal v-model="chat.picture.show" :mask-closable="false">
      <div class="" style="text-align:center">
        <img :src="chat.picture.value" alt="" />
      </div>
      <div slot="footer">
        <!-- <i-button
          type="primary"
          @click="popup.picture.show = false"
        >关闭</i-button> -->
      </div>
    </Modal>

    <div class="wrapper">
      <div class="app-chat">
        <div class="wrapper" ref="chat">
          <div class="chat-body">
            <div class="chat-more" v-if="!chat.push.finished">
              <span @click="getChatHistory(true)">加载更多</span>
            </div>
            <div
              class="chat-item"
              v-for="(item, i) in chat.list"
              :key="i"
              :class="{ 'is-left': !isMine(item), 'is-right': isMine(item) }"
            >
              <template v-if="!isMine(item)">
                <div class="chat-head">
                  <div class="chat-head-inner vc-flex--center">
                    <span class="chat-name">客服</span>
                    <!-- {{ item['nameFrom'] ? item['nameFrom'].split('')[0] : '' }} -->
                  </div>
                </div>

                <div style="margin-top:20px">
                  <div class="chat-name-detail">
                    <span v-if="false">{{ item["nameFrom"] }}</span>
                  </div>

                  <div class="chat-content">
                    <div>
                      <div v-if="item['type'] === 0">
                        <span class="chat-info">{{ item["content"] }}</span>
                      </div>
                      <div
                        v-if="item['type'] === 1"
                        @click="showPicture(item['content'])"
                      >
                        <img
                          :src="item['content']"
                          alt=""
                          style="max-width:200px;max-height:200px"
                        />
                      </div>
                    </div>
                    <i class="chat-point"></i>
                  </div>
                  <div class="chat-time" v-if="item['sendTimeStr']">
                    {{ item["sendTimeStr"] }}
                  </div>
                </div>
              </template>

              <template v-if="isMine(item)">
                <div style="margin-top:20px">
                  <div class="chat-name-detail" v-if="false">
                    我
                  </div>

                  <div class="chat-content">
                    <div>
                      <div v-if="item['type'] === 0">
                        <span class="chat-info">{{ item["content"] }}</span>
                      </div>
                      <div
                        v-if="item['type'] === 1"
                        @click="showPicture(item['content'])"
                      >
                        <img
                          :src="item['content']"
                          alt=""
                          style="max-width:200px;max-height:200px"
                        />
                      </div>
                    </div>
                    <i class="chat-point"></i>
                  </div>
                  <div class="chat-time" v-if="item['sendTimeStr']">
                    {{ item["sendTimeStr"] }}
                  </div>
                </div>
                <div class="chat-head">
                  <div class="chat-head-inner vc-flex--center">
                    <span class="chat-name">我</span>
                    <!-- {{ item['nameFrom'] ? item['nameFrom'].split('')[0] : '' }} -->
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>

        <div class="send">
          <div class="app-chat-send">
            <div class="chat-btn is-picture">
              <label for="chatfile" class="chat-btn-label">
                <img src="../../assets/images/icon-send-picture.png" alt="" />
                <input
                  title="上传图片"
                  type="file"
                  accept="image/jpg,image/jpeg,image/png"
                  id="chatfile"
                  style="display:none"
                  @change="sendPicture"
                />
              </label>
            </div>
            <input
              v-model="chat.message"
              @keyup.enter="sendMessage"
              autocomplete="off"
              type="text"
              class="chat-send is-input"
              placeholder="请输入聊天内容，回车键发送"
            />
            <div class="chat-btn is-message" @click="sendMessage">
              <img src="../../assets/images/icon-send.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style   scoped>
</style>
