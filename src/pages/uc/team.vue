<script>
export default {
  name: "",
  data() {
    return {
      bind: {
        code: ""
      },
      agency: {
        value: 0
      },
      message: {},
        follower: []
    };
  },
  props: {},
  computed: {},
  methods: {
    init() {
      this.getAgencyInfo();
    },
    getAgencyInfo() {
      this.$http.post(this.host + "/uc/agency/info").then(response => {
        var resp = response.body;
        if (resp.code === 0) {
          this.message = resp.data;
          let follower = this.message.follower;
          let newfollower = [];
          for (let n = 0; n < follower.length; n++) {
            let object = Object.assign({ handler: 0 }, follower[n]);
            newfollower.push(object);
          }
          this.follower = newfollower;
        } else {
          this.$Message.error(resp.message);
        }
      });
    },
    bindAgencyInfo() {
      if (!this.bind.code) {
        this.$Message.error("请输入您推荐人的推荐码");
        return false;
      }
      this.$http
        .post(this.host + "/uc/agency/bind", {
          promotionCode: this.bind.code
        })
        .then(response => {
          var resp = response.body;
          if (resp.code === 0) {
            this.$Message.success(resp.message);
            this.init();
            //this.sendOrderStatusNotice(1);
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    updatePercentBefore(item) {
      if (this.agency.value == null) {
        this.$Message.error("请输入0-100的数字作为分成比例");
        return false;
      }
      let normalHigh = 1.7,
        normalLower = 1.2;

      let highPercent = Number(
        this.message.memberPercent || this.message.highPercent || normalHigh
      );
      let lowerPercent = Number(this.message.lowPercent || normalLower);
      let reverse = highPercent - lowerPercent;
      let bouns = ((reverse * this.agency.value) / 100 + lowerPercent).toFixed(
        4
      );
      let message = `你是否确定修改团队成员【${item.userName}】的分成比例为【${this.agency.value}%】？预计分成值为【${bouns}】。当日生效`;
      this.$Modal.confirm({
        title: "确认信息",
        content: message,
        onOk: () => {
          this.updatePercent(item.memberId);
        }
      });
    },
    updatePercent(memberId) {
      this.$http
        .post(this.host + "/uc/agency/updateAgencyPercent", {
          memberId,
          bonusPercent: this.agency.value
        })
        .then(response => {
          var resp = response.body;
          if (resp.code === 0) {
            this.$Message.success(resp.message);
            this.init();
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    handlerFollower(type, index, item) {
      if (type === "cancel") {
        this.follower[index].handler = 0;
      } else if (type === "update") {
        this.follower.forEach(ele => {
          ele.handler = 0;
        });
        this.follower[index].handler = 1;
        this.agency.value = item.bonusPercent;
      } else if (type === "save") {
        this.updatePercentBefore(item);
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<template>
  <div class="app-wrapper is-wrapper--right vi-padding--large">
    <div class="vi-padding--large">
      <div class="vi-flex vi-align-items--center">
        <i class="app-tag is-tag--rect vi-margin-right--large"></i>
        <span class="vi-font-size--small">推广</span>
      </div>
    </div>
    <div class="vi-padding--large" v-if="false">
      <div class="vi-center">
        <div>
          <div>
            <span>
              是的山东快书来得快
            </span>
          </div>
          <div>
            <span>
              的实例多亏了斯柯达
            </span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="app-border app-border-bottom">
        <div class="vi-flex vi-padding " style="line-height: 40px">
          <div
            style="width: 160px"
            class="app-border app-border-right app-border--dashed vi-padding-left--large vi-padding-right--large"
          >
            <span>我的推荐人</span>
          </div>
          <div
            class="vi-flex--1 vi-padding-left--large vi-padding-right--large"
          >
            <span v-if="message.parentName">{{ message.parentName }}</span>
            <div v-else>
              <i-input
                type="text"
                placeholder="请输入您推荐人的推荐码"
                v-model="bind.code"
                style="width: 200px"
              ></i-input>
              <i-button
                type="primary"
                class="vi-margin-left"
                @click="bindAgencyInfo"
              >
                绑定
              </i-button>
              <span class="vi-color--danger">
                请绑定您的推荐人，获取推广红利
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="app-border app-border-bottom">
        <div class="vi-flex vi-padding " style="line-height: 40px">
          <div
            style="width: 160px"
            class="app-border app-border-right app-border--dashed vi-padding-left--large vi-padding-right--large"
          >
            <span>我的推荐码</span>
          </div>
          <div
            class="vi-flex--1 vi-padding-left--large vi-padding-right--large"
          >
            <span>{{ message.promotionCode || "--" }}</span>
          </div>
        </div>
      </div>
      <div class="app-border app-border-bottom">
        <div class="vi-flex vi-padding " style="line-height: 40px">
          <div
            style="width: 160px"
            class="app-border app-border-right app-border--dashed vi-padding-left--large vi-padding-right--large"
          >
            <span>我的分成值</span>
          </div>
          <div
            class="vi-flex--1 vi-padding-left--large vi-padding-right--large"
          >
            <span>{{ message.memberPercent || "--" }}%</span>
          </div>
        </div>
      </div>
      <div class="app-border app-border-bottom">
        <div class="vi-flex vi-padding " style="line-height: 40px">
          <div
                  style="width: 160px"
                  class="app-border app-border-right app-border--dashed vi-padding-left--large vi-padding-right--large"
          >
            <span>我的余额</span>
          </div>
          <div
                  class="vi-flex--1 vi-padding-left--large vi-padding-right--large"
          >
            <span>{{ message.myPlatCoin || 0 }}</span>
          </div>
        </div>
      </div>
      <div class="app-border app-border-bottom">
        <div class="vi-flex vi-padding " style="line-height: 40px">
          <div
                  style="width: 160px"
                  class="app-border app-border-right app-border--dashed vi-padding-left--large vi-padding-right--large"
          >
            <span>团队余额</span>
          </div>
          <div
                  class="vi-flex--1 vi-padding-left--large vi-padding-right--large"
          >
            <span>{{ message.totalPlatCoin || 0 }}</span>
          </div>
        </div>
      </div>
      <div class="">
        <div class="vi-flex vi-padding " style="line-height: 40px">
          <div
            style="width: 160px"
            class="app-border app-border-right app-border--dashed vi-padding-left--large vi-padding-right--large"
          >
            <span>我的团队</span>
          </div>
          <div class="vi-flex--1 vi-padding-left--large vi-margin-right--large">
            <div v-if="follower.length > 0">
              <div class="app-border app-border-bottom">
                <Row>
                  <i-col span="3">
                    <div class="vi-padding">
                      <span class="vi-font-weight--bold">编号</span>
                    </div>
                  </i-col>
                  <i-col span="3">
                    <div class="vi-padding">
                      <span class="vi-font-weight--bold">昵称</span>
                    </div>
                  </i-col>
                  <i-col span="3">
                    <div class="vi-padding">
                      <span class="vi-font-weight--bold">余额</span>
                    </div>
                  </i-col>
                  <i-col span="3">
                    <div class="vi-padding">
                      <span class="vi-font-weight--bold">团队余额</span>
                    </div>
                  </i-col>
                  <i-col span="3">
                    <div class="vi-padding">
                      <span class="vi-font-weight--bold">今日收款</span>
                    </div>
                  </i-col>
                  <i-col span="3">
                    <div class="vi-padding">
                      <span class="vi-font-weight--bold">全部收款</span>
                    </div>
                  </i-col>
                  <i-col span="3">
                    <div class="vi-padding">
                      <span class="vi-font-weight--bold">分成值</span>
                    </div>
                  </i-col>
                  <i-col span="3">
                    <div class="vi-padding">
                      <span class="vi-font-weight--bold">分成比例</span>
                    </div>
                  </i-col>
                </Row>
              </div>
              <div
                class="app-border app-border-bottom"
                v-for="(item, index) in follower"
              >
                <Row>
                  <i-col span="3">
                    <div class="vi-padding">
                      <span>{{ item.memberId }}</span>
                    </div>
                  </i-col>
                  <i-col span="3">
                    <div class="vi-padding">
                      <span>{{ item.userName }}</span>
                    </div>
                  </i-col>
                  <i-col span="3">
                    <div class="vi-padding">
                      <span>{{ item.myPlatCoin }}</span>
                    </div>
                  </i-col>
                  <i-col span="3">
                    <div class="vi-padding">
                      <span>{{ item.myTeamPlatCoin }}</span>
                    </div>
                  </i-col>
                  <i-col span="3">
                    <div class="vi-padding">
                      <span>{{ item.totayAmount || 0 }}</span>
                    </div>
                  </i-col>
                  <i-col span="3">
                    <div class="vi-padding">
                      <span>{{ item.totalAmount || 0 }}</span>
                    </div>
                  </i-col>
                  <i-col span="3">
                    <div class="vi-padding">
                      <span>{{ item.agencyPercent || 0 }}</span>
                    </div>
                  </i-col>
                  <i-col span="3">
                    <div class="vi-padding">
                      <div v-if="item.handler === 1">
                        <Input-number
                          :max="100"
                          :min="0"
                          v-model="agency.value"
                        ></Input-number>
                        <span>%</span>
                        <i-button
                          type="primary"
                          @click="handlerFollower('save', index, item)"
                        >
                          保存
                        </i-button>
                        <i-button
                          type="error"
                          @click="handlerFollower('cancel', index, item)"
                        >
                          取消
                        </i-button>
                      </div>
                      <div v-else>
                        <span class="vi-margin-right">
                          {{ item.bonusPercent || 0 }}%
                        </span>
                        <i-button
                          type="default"
                          @click="handlerFollower('update', index, item)"
                        >
                          修改
                        </i-button>
                      </div>
                    </div>
                  </i-col>
                </Row>
              </div>
            </div>
            <div v-else>
              <span>--</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
