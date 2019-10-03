<script>
import "./chat.css";
import { mapGetters } from "vuex";

let timerDuration = 10 * 1000;

export default {
  name: "app-chat",
  data() {
    return {
      chatBox: {
        show: false,
        count: 0
      }
    };
  },

  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.setReadCountTimer();
    },

    openCustomer() {
      this.$router.push({ path: "/customer" });
    },

    getUserId() {
      try {
        return JSON.parse(localStorage.getItem("MEMBER"))["id"];
      } catch (error) {
        return "";
      }
    },
    /**
     * 获取未读信息条数
     */
    getUnReadCount() {
      console.log();
      let userId = this.getUserId();
      if (!userId) return "";
      this.$http
        .post(this.host + "/chat/cdUnRead.do", { cdId: userId })
        .then(response => {
          let res = response["body"];

          if (res["code"] === "000") {
            this.chatBox.count = res["data"] && res["data"]["unReadCnt"];
          } else {
            this.$Message.error("获取未读信息条数失败！");
          }
        })
        .catch(err => {
          console.log("err", err);
          this.$Message.error("获取未读信息条数失败！");
        });
    },
    /**
     * 设置定时器
     */
    setReadCountTimer() {
      this.clrearReadCountTimer();
      this.getUnReadCount();
      this._readCountTimer = setInterval(() => {
        this.getUnReadCount();
      }, timerDuration);
    },
    /**
     * 清除定时器
     */
    clrearReadCountTimer() {
      clearInterval(this._readCountTimer);
      this._readCountTimer = null;
    }
  },
  beforeDestroy() {
    this.clrearReadCountTimer();
  }
};
</script>

<template>
  <div>
    <div class="app-chat-btn" @click="openCustomer">
      <div class="app-tag">
        <img src="../../assets/images/icon-chat.png" alt="" />
        <i class="app-tag--wrap" v-if="!!chatBox.count">{{ chatBox.count }}</i>
      </div>
    </div>
  </div>
</template>

<style>
</style>