<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-01-23 11:57:26
 * @LastEditTime: 2019-08-18 10:51:14
 * @LastEditors: Please set LastEditors
 -->
<style lang="scss" scoped>
.mymsg_wrapper {
  padding-top: 60px;
  .wrapper {
    background: #192330;
    overflow: hidden;
    ul.ivu-menu.ivu-menu-light.ivu-menu-vertical {
      padding: 0 10px;
      width: 15% !important;
      float: left;
      background: #192330;
      min-height: 662px;
      position: static;
      //border-right: 1px solid #27313e;
      color: #fff;
      .title {
        text-align: center;
        font-size: 20px;
        line-height: 40px;
        color: #fff;
      }
    }
    ul.ivu-menu.ivu-menu-light {
      &:after {
        background-color: #192330;
      }
    }
    .nav-rights {
      width: 85%;
      float: left;
      min-height: 600px;
      padding: 20px;
    }
  }
}
</style>
<style lang="scss">
.mymsg_wrapper {
  .wrapper {
    ul.ivu-menu.ivu-menu-light.ivu-menu-vertical {
      li.ivu-menu-submenu {
        .ivu-menu-submenu-title {
          height: 50px;
          padding: 10px;
          border-radius: 5px;
          &:hover {
            background-color: #f0ac19;
            .isclick {
              background-color: #fff;
            }
            .content,
            .ivu-icon {
              color: #fff;
            }
          }
          .isclick {
            width: 6px;
            height: 6px;
            background-color: #f0ac19;
            display: inline-block;
            border-radius: 50%;
            margin-top: 16px;
            line-height: 50px;
          }
          .content {
            padding-left: 5px;
            color: #fff;
          }
          .ivu-icon {
            top: 9px;
          }
        }
        .ivu-menu {
          li.ivu-menu-item.ivu-menu-item-active.ivu-menu-item-selected {
            color: #f0ac19;
            a {
              color: #f0ac19;
            }
          }
          li.ivu-menu-item {
            color: #fff;
            background: #27313e;
            padding: 0;
            text-align: left;
            a {
              color: #fff;
              display: block;
              height: 100%;
              padding: 14px 24px;
              font-size: 14px;
            }
          }
        }
      }
      li.ivu-menu-submenu.ivu-menu-opened {
        .ivu-menu-submenu-title {
          background-color: #f0ac19;
          .isclick {
            background-color: #fff;
          }
          .content,
          .ivu-icon {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="mymsg_wrapper">
    <div class="vui-padding--large">
      <div class="wrapper">
        <Menu
          :active-name="activename"
          :open-names="opennames"
          @on-open-change="sss"
          ref="test"
          :accordion="true"
        >
          <div class="title">个人中心</div>
          <Submenu name="1">
            <template slot="title">
              <span class="isclick"></span>
              <span class="content">账户管理</span>
            </template>
            <MenuItem name="1-1">
              <router-link to="/uc/safe">安全设置</router-link>
            </MenuItem>
            <MenuItem name="1-2">
              <router-link to="/uc/account">账户设置</router-link>
            </MenuItem>
            <MenuItem name="1-3">
              <router-link to="/uc/apiset">API设置</router-link>
            </MenuItem>
            <MenuItem name="1-4">
              <router-link to="/uc/helper">收款助手</router-link>
            </MenuItem>
            <MenuItem name="1-5">
              <router-link to="/uc/team">推广</router-link>
            </MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <span class="isclick"></span>
              <span class="content">资产管理</span>
            </template>
            <MenuItem name="2-1">
              <router-link to="/uc/money">个人资产</router-link>
            </MenuItem>
            <MenuItem name="2-2">
              <router-link to="/uc/record">资产流水</router-link>
            </MenuItem>
            <MenuItem name="2-3">
              <router-link to="/uc/recharge">充币</router-link>
            </MenuItem>
            <MenuItem name="2-4">
              <router-link to="/uc/withdraw">提币</router-link>
            </MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <span class="isclick"></span>
              <span class="content">币币管理</span>
            </template>
            <MenuItem name="3-1">
              <router-link to="/uc/entrust/current">当前委托</router-link>
            </MenuItem>
            <MenuItem name="3-2">
              <router-link to="/uc/entrust/history">历史委托</router-link>
            </MenuItem>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              <span class="isclick"></span>
              <span class="content">法币管理</span>
            </template>
            <MenuItem name="4-1">
              <router-link to="/uc/ad">我的广告</router-link>
            </MenuItem>
            <MenuItem name="4-2">
              <router-link to="/uc/order">我的订单</router-link>
            </MenuItem>
            <MenuItem name="4-3">
              <router-link to="/uc/order/withdraw">卖出订单</router-link>
            </MenuItem>
            <MenuItem name="4-4">
              <router-link to="/uc/order/recharge">买入订单</router-link>
            </MenuItem>
            <MenuItem name="4-5">
              <router-link to="/uc/order/recharge-withdraw"
                >买入/卖出订单</router-link
              >
            </MenuItem>
            <MenuItem name="4-6">
              <router-link to="/uc/order/custom">申诉订单</router-link>
            </MenuItem>
          </Submenu>
          <Submenu name="5">
            <template slot="title">
              <span class="isclick"></span>
              <span class="content">财务管理</span>
            </template>
            <MenuItem name="5-1">
              <router-link to="/uc/financeRecharge">充值</router-link>
            </MenuItem>
            <MenuItem name="5-2">
              <router-link to="/uc/financeWithdraw">提现</router-link>
            </MenuItem>
          </Submenu>
        </Menu>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      activename: "1-1",
      opennames: ["1"],
      routeArr: {
        "/uc/safe": "1-1",
        "/uc/account": "1-2",
        "/uc/account/manage": "1-2",
        "/uc/apiset": "1-3",
        "/uc/helper": "1-4",
        "/uc/team": "1-5",
        "/uc/money": "2-1",
        "/uc/record": "2-2",
        "/uc/recharge": "2-3",
        "/uc/withdraw": "2-4",
        "/uc/trade": "2-5",
        "/uc/paydividends": "2-6",
        "/uc/blc": "2-7",
        "/uc/bjc": "2-8",
        "/uc/entrust/current": "3-1",
        "/uc/entrust/history": "3-2",
        "/uc/ad": "4-1",
        "/uc/order": "4-2",
        "/uc/order/withdraw": "4-3",
        "/uc/order/recharge": "4-4",
        "/uc/order/recharge-withdraw": "4-5",
        "/uc/order/custom": "4-6",
        "/uc/withdraw/address": "2-4",
        "/uc/ad/create": "4-3",
        "/uc/ad/update": "4-4",
        "/uc/ad/createCoin": "4-1",
        "/uc/ad/updateCoin": "4-6",
        "/uc/financeRecharge": "5-1",
        "/uc/financeWithdraw": "5-2"
      }
    };
  },
  created: function() {
    this.init();
    const path = this.$route.path;
    this.heightLightMenu(path);
  },
  methods: {
    init() {
      // this.$store.commit("navigate", "nav-uc");
      this.$store.state.HeaderActiveName = "1-6";
      if (!localStorage.TOKEN || !localStorage.MEMBER) {
        this.$Message.success(this.$t("common.logintip"));
        this.$router.push("/login");
      }
    },
    sss(name) {
      console.log(name);
      let index = 1;
      if (name.length >= 1) {
        index = name[name.length - 1];
        this.opennames = [index];
        this.activename = index + "-1";
        this.link(this.activename);
      } else {
        return;
      }
    },
    link(code) {
      switch (code) {
        case "1-1":
          this.$router.push("/uc/safe");
          break;
        case "2-1":
          this.$router.push("/uc/money");
          break;
        case "3-1":
          this.$router.push("/uc/entrust/current");
          break;
        case "4-1":
          this.$router.push("/uc/ad");
          break;
        case "5-1":
          this.$router.push("/uc/financeRecharge");
          break;
        default:
          this.$router.push("/uc/safe");
          break;
      }
    },
    heightLightMenu(path) {
      // if (path === "/uc/apiset") {
      //   let isBusiness = this.isBusiness();
      //   let isRealName = this.isRealName();
      //   if (!isRealName) {
      //     setTimeout(() => {
      //       this.$router.push({ path: "/uc/safe" });
      //     }, 1000);
      //     this.$Message.error("请先进行实名认证！");
      //   }
      //   if (!isBusiness) {
      //     setTimeout(() => {
      //       this.$router.push({ path: "/identbusiness" });
      //     }, 1000);
      //     this.$Message.error("请先申请成为商家！");
      //   }
      // }

      let acName = this.routeArr[path] || "1-1",
        opName = acName.split("-")[0];
      this.opennames = [opName];
      this.activename = acName;
      this.$nextTick(function() {
        this.$refs.test.updateOpened();
        this.$refs.test.updateActiveName();
      });
    }
  },
  watch: {
    $route(to, form) {
      //console.log(to.path);
      this.heightLightMenu(to.path);
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.$refs.test.updateOpened();
      this.$refs.test.updateActiveName();
    });
    //  this.sss(this.activename);
  }
};
</script>
