<template>
  <div>
    <Modal
      v-model="popup.picture.show"
      class="ivu-modal--preview"
      width="100%"
      title="图片预览"
    >
      <img :src="popup.picture.value" alt="" class="is-preview" />
    </Modal>

    <div class="chat-line">
      <div class="scroll-chat" id="scrollChat">
        <div class="chat-container-box" id="sysbox">
          <div class="system-box">
            <p class="msg-content" v-show="msg.status == 1">
              {{ $t("otc.chatline.status_1") }}
            </p>
            <p class="msg-content" v-show="msg.status == 2">
              {{ $t("otc.chatline.status_2") }}
            </p>
            <p class="msg-content" v-show="msg.status == 3">
              {{ $t("otc.chatline.status_3") }}
            </p>
            <p class="msg-content" v-show="msg.status == 4">
              {{ $t("otc.chatline.status_4") }}
            </p>
            <p class="msg-content" v-show="msg.status == 0">
              {{ $t("otc.chatline.status_5") }}
            </p>
          </div>
        </div>
        <h5 class="more" v-show="!msgParams.push.finished">
          <Icon type="ios-clock-outline" class="clock"></Icon>
          <span @click="getChatHistory(true)">{{
            $t("otc.chatline.loadmore")
          }}</span>
        </h5>
        <template v-for="(item, index) in msgLists">
          <div
            class="chat-container-box left"
            v-show="item.uidFrom != msg.myId"
            :key="index"
          >
            <div class="user-chat-box">
              <div class="user-avatar-box">
                <div class="avatar-box">
                  <div class="user-face user-avatar-public">
                    <template v-if="orderType == 'custom'">
                      <template v-if="item['uidType'] == 3">
                        <span class="user-avatar-in ">客服</span>
                      </template>
                    </template>
                    <template v-else>
                      <span class="user-avatar-in ">{{
                        item["nameFrom"] && item["nameFrom"].slice(0, 1)
                      }}</span>
                    </template>
                  </div>
                </div>
              </div>
              <div class="user-content-box">
                <p class="user-name">{{ item["nameFrom"] }}</p>
                <div class="chat-info">
                  <div class="user-desc">
                    <p class="icon"></p>
                    <em class="input-in" v-if="item['type'] === 0">{{
                      item.content
                    }}</em>

                    <img
                      :src="item['content']"
                      alt=""
                      v-if="item['type'] === 1"
                      style="max-width:200px;max-height:200px"
                      @click="showPicture(item['content'])"
                    />
                  </div>
                  <span class="times">{{ item.sendTimeStr }}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="chat-container-box"
            v-show="item.uidFrom == msg.myId"
            :key="index + 'index'"
          >
            <div class="user-chat-box self-chat-box">
              <div class="user-content-box">
                <p class="user-name">{{ user.username }}</p>
                <div class="chat-info">
                  <div class="user-desc self-desc">
                    <p class="icon"></p>
                    <em class="input-in" v-if="item['type'] === 0">{{
                      item.content
                    }}</em>
                    <img
                      :src="item['content']"
                      alt=""
                      v-if="item['type'] === 1"
                      style="max-width:200px;max-height:200px"
                      @click="showPicture(item['content'])"
                    />
                  </div>
                </div>
              </div>
              <div class="user-avatar-box">
                <div class="avatar-box">
                  <div class="user-face user-avatar-public">
                    <span class="user-avatar-in">我</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <!---->
      <h5 class="spe_show">
        <i class="iconfont icon-warning"></i>
        {{ $t("otc.chatline.warning") }}
      </h5>
      <!---->
      <div class="audio-wrap">
        <audio id="noticeMusic" :src="audioSrc">
          您的浏览器不支持 audio 标签。
        </audio>
      </div>

      <div class="send-msg-box">
        <div class="app-send">
          <label for="file" class="app-send-label">
            <!-- <Icon
              type="md-paper-plane"
              size="28"
              color="#f0ac19"
            /> -->
            <img src="../../assets/images/icon-send-picture.png" alt="" />
            <input
              title="上传图片"
              type="file"
              accept="image/jpg,image/jpeg,image/png"
              class="app-send-input"
              id="file"
              style="display:none"
              @change="sendPicture"
            />
          </label>
        </div>
        <input
          v-model="msgParams.message"
          @keyup.enter="sendMessage"
          ref="editable"
          autocomplete="off"
          type="text"
          :placeholder="$t('otc.chatline.contenttip')"
          style=" background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%;"
        />
        <button class="send-btn" @click="sendMessage">
          <Icon type="md-paper-plane" size="28" color="#f0ac19" />
        </button>
        <div class="msg-notice">
          <!--<Checkbox @on-change="handleCheckClick" v-model="fOpenNotice">开启windows消息提醒,不担心错过任何消息</Checkbox>-->
          <Checkbox @on-change="handleNoticeClick" v-model="fOpenNotice"
            >开启桌面消息提醒</Checkbox
          >
          <Checkbox @on-change="handleAudioClick" v-model="fOpenAudio"
            >开启声音消息提醒</Checkbox
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var Stomp = require("stompjs");
var SockJS = require("sockjs-client");
let audio = require("../../assets/audio/notice.wav");
export default {
  props: ["msg", "orderType"],
  data() {
    return {
      audioSrc: audio,
      fOpenAudio: true,
      fOpenNotice: false,
      showMore: true,
      popup: {
        picture: {
          show: false,
          value: ""
        }
      },
      msgParams: {
        pic: "",
        message: "",
        orderId: "",
        minChatId: "",
        loading: false,
        pageSize: 20,
        push: {
          finished: false
        }
      },
      msgLists: [],
      message: {}
    };
  },
  computed: {
    msgnameS: function() {
      return (this.msg.otherSide + "").slice(0, 1);
    },
    user: function() {
      return JSON.parse(localStorage.getItem("MEMBER"));
    },
    usernameS: function() {
      return (this.user.username + "").slice(0, 1);
    },
    orderId: function() {
      return this.$route.query.tradeId;
    }
  },
  mounted() {
    this.init();
    this.getChatHistory();
    this.createSocketConnect();
    this.getClipboardImage();
  },

  watch: {
    processData: "scrollToBottom"
  },

  methods: {
    init: function() {
      //获取选中的申述订单的详情 - 本地local中
      // 客服的名字和id等信息12px
      let messageLocal = localStorage.getItem("app/order/custom/message");
      this.message = messageLocal ? JSON.parse(messageLocal) : {};
      console.log(this.message);
    },
    /**
     * 时间：2019/9/18 ,
     * 描述：获取粘贴板的图片文件
     */

    getClipboardImage() {
      this.$refs["editable"].onpaste = event => {
        let value = event.clipboardData.items[0];
        if (value.kind === "file" && value.type.indexOf("image/") !== -1) {
          this.sendPicture(value.getAsFile(), "clipboard");
          return false;
        }
      };
    },
    /**
     * 放大图片展示
     */
    showPicture(url) {
      this.popup.picture.value = url;
      this.popup.picture.show = true;
    },
    /**
     * 让浏览器滚动条保持在最低部
     */

    scrollToBottom: function() {
      setTimeout(() => {
        var div = document.getElementById("scrollChat");
        div.scrollTop = div.scrollHeight;
      }, 300);
    },
    /**
     * 播放音频
     */
    playAudio: function() {
      //alert('dshjdhjs')
      var audio = document.getElementById("noticeMusic");
      //console.log(audio)
      if (audio !== null) audio.play();
    },

    handleNoticeClick: function() {
      if (this.fOpenNotice) {
        if (window.Notification) {
          if (Notification.permission == "default") {
            this.$Message.info("请点击允许进行开启!");
            Notification.requestPermission().then(function(result) {
              // result可能是是granted, denied, 或default.
              if (result == "denied")
                this.$Message.info("您已屏蔽消息提醒，如需开通，请查看帮助!");
            });
          } else if (Notification.permission == "denied") {
            this.$Message.info("您已屏蔽消息提醒，如需开通，请查看帮助!");
          } else {
            this.$Message.info("您已开启桌面消息提醒!");
          }
        } else {
          this.$Message.info("您的浏览器不支持该功能");
        }
      } else {
        this.$Message.info("您已关闭桌面消息提醒!");
      }
    },

    /**
     * 是否开启音频
     */

    handleAudioClick: function() {
      if (this.fOpenAudio) {
        this.$Message.info("您已开启声音消息提醒!");
      } else {
        this.$Message.info("您已关闭声音消息提醒!");
      }
    },

    /**
     * 创建聊天
     */
    createSocketConnect() {
      let self = this;
      new Promise((resolve, reject) => {
        this.closeSocket();

        var socket = new SockJS(this.host + "/chat/socket/chat-webSocket");
        this._stompClient = Stomp.over(socket);
        this._stompClient.debug = function name(params) {
          console.log(params);
        };
        this._stompClient.connect(
          {},
          frame => {
            self.$Notice.success({
              top: 50,
              duration: 3,
              title: "提示",
              desc: "聊天室连接成功，可以进行聊天了~"
            });
            resolve();
          },
          frame => {
            self.$Notice.error({
              top: 50,
              duration: 3,
              title: "提示",
              desc: "聊天室连接失败，请重试！"
            });
            reject();
          }
        );
      }).then(res => {
        this._stompClient.subscribe(
          "/topic/chatMsg/cd/" + self.msg.myId,
          function(response) {
            let message = JSON.parse(response.body);
            console.log("chatline-socket-message");
            console.log(message);

            if (self.orderType === "custom" && message["uidType"] != 3) return;

            if (message["orderSn"] != self.msg.orderSn) return;
            if (message["uidFrom"] == self.msg.myId) return;

            self.msgLists.push(message);

            if (
              self.fOpenNotice &&
              window.Notification &&
              Notification.permission == "granted"
            ) {
              var notification = new Notification(self.msg.otherSide + "：", {
                body: message.content,
                icon:
                  "https://bihuo-ex.oss-ap-southeast-1.aliyuncs.com/FAA55D97ED0370F08273C3A94F765C22.png"
              });

              notification.onclick = function() {
                notification.close();
              };
            }
            if (self.fOpenAudio) {
              console.log("fOpenAudio");
              self.playAudio();
            }
            self.scrollToBottom();
          }
        );
      });
    },

    /**
     * 关闭socket
     */
    closeSocket() {
      if (this._stompClient) {
        this._stompClient.disconnect();
        this._stompClient = null;
      }
    },

    /**
     * 发送消息
     */

    sendSocketMessage: function(params) {
        console.log(this.message)
      let message = {};
      message["uidFrom"] = this.msg.myId;
      message["nameFrom"] = this.user.username;
      message.orderId = this.msg.orderId;
      message.orderSn = this.msg.orderSn;
      message.content = params.content;
      message.type = params.type;

      if (this.orderType == "custom") {
        message["uidType"] = 4;
        message["nameTo"] = this.message["kfName"];
        message["uidTo"] = this.message["kfId"];
      } else {
        message["uidType"] = 6;
        message["nameTo"] = this.msg.otherSide;
        message["uidTo"] = this.msg.hisId;
      }
      console.log("chatline-message");
      console.log(message);

      this.msgLists.push(message);
      this.scrollToBottom();
      console.log(this._stompClient);
      this._stompClient.send("/app/message/chat", {}, JSON.stringify(message));
    },

    /**
     * 发送文本消息
     */

    sendMessage: function() {
      if (this.msgParams.message) {
        this.sendSocketMessage({ content: this.msgParams.message, type: 0 });
        this.msgParams.message = "";
      } else {
        this.$Message.info(this.$t("otc.chatline.contentmsg"));
      }
    },

    /**
     * 选择图片，并发送图片消息
     */
    sendPicture: function(e, type = "local") {
      let file = e;
      if (type === "local") {
        file = e.target.files[0];
      }
      let formData = new FormData();
      formData.append("file", file);
      this.$http
        .post(this.image.compress, formData) // this.image.compress http://103.91.217.67/res/upload/image/compress.do
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
     * 获取聊天记录
     */

    getChatHistory: function(more = false) {
      if (this.msgParams.loading)
        return this.$Message.info("请稍等，正在获取聊天记录！");
      this.msgParams.loading = true;

      if (more) {
        this.msgParams.minChatId = this.msgLists[0]["chatId"];
      } else {
        this.msgParams.minChatId = 0;
      }

      let params = {
        minChatId: this.msgParams.minChatId,
        orderId: this.msg.orderId
      };

      /**
       * 申诉订单和交易所对象不一致
       */

      let url =
        this.orderType == "custom"
          ? "/chat/getHistoryMessageCdToKf.do"
          : "/chat/getHistoryMessageCdToCd.do";

      this.$http
        .post(this.host + url, params)
        .then(res => {
          this.msgParams.loading = false;

          let data = res["body"];
          //console.log(data["data"]);

          if (data["code"] === "000") {
            let list = data["data"] ? data["data"].reverse() : [];
            this.msgParams.push.finished =
              this.msgParams.pageSize > list.length;

            if (more) {
              this.msgLists = [...list, ...this.msgLists];
            } else {
              this.msgLists = list;
              this.scrollToBottom();
            }
          } else {
            this.$Message.error("获取历史聊天记录失败！");
          }
        })
        .catch(err => {
          console.log("err", err);
          this.msgParams.loading = false;
          this.$Message.error("获取历史聊天记录失败！");
        });
    },
    /**
     * 判断角色
     * uidType
     */
    isChatType(row) {
      let type = 0;
      let uidFrom = String(row["uidFrom"]);

      let messageLocal = localStorage.getItem("app/order/custom/message");
      let message = messageLocal ? JSON.parse(messageLocal) : {};

      if (uidFrom == message["memberId"]) {
        type = 2;
      }
      if (uidFrom == message["customerId"]) {
        type = 3;
      }
      if (
        uidFrom.indexOf("_") > -1 &&
        uidFrom.split("_")[0] == message["customerId"]
      ) {
        type = 1;
      }
      if (
        uidFrom.indexOf("_") > -1 &&
        uidFrom.split("_")[0] == message["memberId"]
      ) {
        type = 4;
      }

      return type;
    },
    /**
     * 获取当前时间
     */

    CurentTime: function() {
      var now = new Date();

      var year = now.getFullYear(); //年
      var month = now.getMonth() + 1; //月
      var day = now.getDate(); //日

      var hh = now.getHours(); //时
      var mm = now.getMinutes(); //分

      var clock = year + "-";

      if (month < 10) clock += "0";

      clock += month + "-";

      if (day < 10) clock += "0";

      clock += day + " ";

      if (hh < 10) clock += "0";

      clock += hh + ":";
      if (mm < 10) clock += "0";
      clock += mm;
      return clock;
    }
  },
  beforeDestroy() {
    this.closeSocket();
  }
};
</script>
<style scoped>
.pic-show__body {
  padding: 10px;
}

.msg-notice {
  width: 20%;
}
.msg-notice > label {
  margin-top: 8px;
}
.chat-in-box .chat-in .chat-line .spe_show {
  /* background-color: #fdf1e9; */
  color: #ed2525;
  padding: 16px;
  margin-right: 3px;
  border: 1px solid #27313e;
}

.chat-in-box .chat-in .chat-line {
  /* background-color: white; */
  padding: 100px 24px 100px 24px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #27313e;
  margin: 0 auto;
  position: relative;
  min-height: 650px;
  transform: translate(0, 0);
}

#sysbox {
  position: fixed;
  top: 15px;
  left: 0;
  right: 0;
}

.chat-in-box .chat-in .chat-line .scroll-chat {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 557px;
  overflow-y: auto;
  padding-right: 10px;
}

.chat-in-box .chat-in .chat-line .scroll-chat .more {
  text-align: center;
  color: #f0a70a;
}

.chat-in-box .chat-in .chat-line .scroll-chat .more span {
  cursor: pointer;
  padding: 6px 20px 6px 0;
}

.chat-container-box {
  margin-bottom: 20px;
  position: relative;
}

.chat-container-box h5 {
  text-align: center;
  font-size: 14px;
  padding: 10px 0;
}

.chat-container-box .user-chat-box .user-avatar-box,
.chat-container-box .user-chat-box {
  float: left;
}

.chat-container-box .user-chat-box .user-avatar-box,
.chat-container-box .user-chat-box {
  float: left;
}

.avatar-box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

.user-avatar-public {
  background: #fff;
  height: 52px;
  width: 52px;
  box-shadow: 0 1px 5px 0 rgba(71, 78, 114, 0.24);
  position: relative;
}

.user-avatar-public > .user-avatar-in,
.user-avatar-public {
  border-radius: 50%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.user-avatar-public > .user-avatar-in {
  background: #f0a70a;
  height: 42px;
  width: 42px;
  color: #fff;
}

/*修改的地方*/
.chat-container-box.left .user-avatar-public > .user-avatar-in {
  background: #ed4014;
}

.chat-container-box .user-chat-box .user-content-box {
  max-width: 700px;
  float: left;
}

.chat-container-box .user-chat-box .user-content-box .user-name {
  padding-left: 16px;
  font-size: 12px;
  color: #8994a3;
  margin-bottom: 4px;
}

.chat-container-box .user-chat-box .user-content-box .chat-info .user-desc {
  background-color: #f1f1f4;
  padding: 10px 16px;
  border-radius: 6px;
  margin-bottom: 0;
  margin-left: 16px;
  position: relative;
  font-size: 14px;
  word-break: break-all;
}

/*修改的地方*/
.chat-container-box.left
  .user-chat-box
  .user-content-box
  .chat-info
  .user-desc {
  background-color: #ed4014;
}

.chat-container-box .user-chat-box .user-content-box .chat-info .times {
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 6px;
  display: block;
  text-align: right;
  color: #c3c1c1;
}

.chat-container-box
  .user-chat-box
  .user-content-box
  .chat-info
  .user-desc
  .icon {
  height: 0;
  width: 0;
  border: 8px solid transparent;
  border-right: 14px solid #f1f1f4;
  position: absolute;
  top: 6px;
  left: -20px;
}

/*修改的地方*/
.chat-container-box.left
  .user-chat-box
  .user-content-box
  .chat-info
  .user-desc
  .icon {
  border-right: 14px solid #ed4014;
}

.chat-container-box .user-chat-box .user-content-box .chat-info .user-desc em {
  font-style: normal;
  font-size: 12px;
}

.chat-container-box .system-box {
  padding: 16px 24px;
  background-color: #27313e;
  border-radius: 7px;
  margin: 0 auto;
  margin-bottom: 20px;
  font-size: 16px;
  color: #ccc;
  max-width: 500px;
}

.chat-container-box .system-box .times {
  text-align: right;
  font-size: 12px;
}

.chat-container-box .user-chat-box.self-chat-box .user-avatar-box,
.chat-container-box .user-chat-box.self-chat-box {
  float: right;
}

.chat-container-box .user-chat-box.self-chat-box .user-content-box .user-name {
  text-align: right;
  padding-right: 16px;
}

.chat-container-box .user-chat-box .user-content-box .chat-info .self-desc {
  margin-left: 0;
  margin-right: 16px;
  background-color: #f0a70a;
  color: #fff;
}

.chat-container-box
  .user-chat-box
  .user-content-box
  .chat-info
  .self-desc
  .icon {
  height: 0;
  width: 0;
  border: 8px solid transparent;
  border-left: 14px solid #f0a70a;
  position: absolute;
  top: 6px;
  right: -18px;
  left: unset;
}

.chat-in-box .chat-in .chat-line .send-msg-box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 94%;
  position: absolute;
  bottom: 21px;
  left: 25px;
  -webkit-box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1);
  border: 1px solid #27313e;
}

.chat-in-box .chat-in .chat-line .send-msg-box .img-btn {
  position: relative;
  overflow: hidden;
  background-color: transparent;
  width: 10%;
  min-width: 60px;
  /* border: 1px solid #dfe8f2; */
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
  background: #ebeff5;
}

.chat-in-box .chat-in .chat-line .send-msg-box .img-btn .input-file {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 1;
  width: 100%;
}

.chat-in-box .chat-in .chat-line .send-msg-box input {
  color: #fff;
  height: 60px;
  border: 1px solid transparent;
  border-left: none;
  background-color: transparent;
  padding: 10px;
  outline: none;
  width: 80%;
}

.chat-in-box .chat-in .chat-line .send-msg-box .send-btn {
  height: 60px;
  border: none;
  background-color: transparent;
  color: white;
  width: 12%;
  outline: none;
  font-size: 18px;
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: #27313e;
}

.chat-in-box .chat-in .chat-line .send-msg-box .send-pic-btn {
  height: 60px;
  border: none;
  background-color: transparent;
  color: white;
  width: 100%;
  outline: none;
  font-size: 18px;
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: #27313e;
}

.chat-in-box .chat-in .chat-line .send-msg-box .img-btn .img-icons {
  font-size: 24px;
  color: #f0a70a;
}

.chat-in-box .chat-in .chat-line .send-msg-box .send-btn .iconfont {
  font-size: 28px;
  color: #f0a70a;
}

.app-send {
  width: 120px;
}
.app-send .app-send-label {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #27313e;
  cursor: pointer;
}

.app-send .app-send-input {
  display: none;
}

.app-send .app-send-label img {
  width: auto;
  height: 30px;
}
</style>
