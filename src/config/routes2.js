/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-01-21 15:26:56
 * @LastEditTime: 2019-09-02 13:52:05
 * @LastEditors: Please set LastEditors
 */

// import membercenter from '../pages/uc/MemberCenter'
// import tradeInfo from '../pages/otc/TradeInfo'
// import checkuser from '../pages/otc/CheckUser'
// import chat from '../pages/otc/Chat'
// import notice from '../pages/cms/Notice'
// import noticeitem from '../pages/cms/NoticeItem'
// import aboutus from '../pages/cms/AboutUs' /*关于我们*/
// import moneyindex from '../components/uc/MoneyIndex'
// import record from '../components/uc/Record'
// import trade from '../components/uc/MinTrade'
// import paydividends from '../components/uc/PayDividends'
// import invitingmining from '../components/uc/InvitingMin'
const membercenter = r =>
  require.ensure(
    [],
    () => r(require("../pages/uc/MemberCenter")),
    "membercenter"
  );
const tradeInfo = r =>
  require.ensure([], () => r(require("../pages/otc/TradeInfo")), "tradeInfo");
const checkuser = r =>
  require.ensure([], () => r(require("../pages/otc/CheckUser")), "checkuser");
const chat = r =>
  require.ensure([], () => r(require("../pages/otc/Chat")), "chat");
const notice = r =>
  require.ensure([], () => r(require("../pages/cms/Notice")), "notice");
const noticeitem = r =>
  require.ensure([], () => r(require("../pages/cms/NoticeItem")), "noticeitem");
const aboutus = r =>
  require.ensure([], () => r(require("../pages/cms/AboutUs")), "aboutus");
const moneyindex = r =>
  require.ensure(
    [],
    () => r(require("../components/uc/MoneyIndex")),
    "moneyindex"
  );
const record = r =>
  require.ensure([], () => r(require("../components/uc/Record")), "record");
const trade = r =>
  require.ensure([], () => r(require("../components/uc/MinTrade")), "trade");
const paydividends = r =>
  require.ensure(
    [],
    () => r(require("../components/uc/PayDividends")),
    "paydividends"
  );
const invitingmining = r =>
  require.ensure(
    [],
    () => r(require("../components/uc/InvitingMin")),
    "invitingmining"
  );

// import recharge from '../components/uc/Recharge'
// import withdraw from '../components/uc/Withdraw'
// import FinanceRecharge from '../components/uc/FinanceRecharge'
// import FinanceWithdraw from '../components/uc/FinanceWithdraw'
// import safe from '../components/uc/Safe'
// import account from '../components/uc/Account'
// import withdrawAddr from '../components/uc/WithdrawAddress'
// import apiset from '../components/uc/ApiSet' // api设置
// import helper from '../components/uc/Helper' // 收款助手
// import Index from '../pages/index/index'
// import Login from '../pages/uc/login'
// import Register from '../pages/uc/register'
// import FindPwd from '../pages/uc/findpwd'
// import Exchange from '../pages/exchange/exchange'

const recharge = r =>
  require.ensure([], () => r(require("../components/uc/Recharge")), "page");
const withdraw = r =>
  require.ensure([], () => r(require("../components/uc/Withdraw")), "page");
const FinanceRecharge = r =>
  require.ensure(
    [],
    () => r(require("../components/uc/FinanceRecharge")),
    "page"
  );
const FinanceWithdraw = r =>
  require.ensure(
    [],
    () => r(require("../components/uc/FinanceWithdraw")),
    "page"
  );
const safe = r =>
  require.ensure([], () => r(require("../components/uc/Safe")), "page");
const account = r =>
  require.ensure([], () => r(require("../components/uc/Account")), "page");
const accountManage = r =>
  require.ensure(
    [],
    () => r(require("../components/uc/AccountManage")),
    "page"
  );
const withdrawAddr = r =>
  require.ensure(
    [],
    () => r(require("../components/uc/WithdrawAddress")),
    "page"
  );
const apiset = r =>
  require.ensure([], () => r(require("../components/uc/ApiSet")), "page");
const helper = r =>
  require.ensure([], () => r(require("../components/uc/Helper")), "page");
const Index = r =>
  require.ensure([], () => r(require("../pages/index/index")), "page");
const Login = r =>
  require.ensure([], () => r(require("../pages/uc/login")), "page");
const Register = r =>
  require.ensure([], () => r(require("../pages/uc/register")), "page");
const FindPwd = r =>
  require.ensure([], () => r(require("../pages/uc/findpwd")), "page");
const Exchange = r =>
  require.ensure([], () => r(require("../pages/exchange/exchange")), "page");

// import Help from '../pages/cms/help'
// import HelpList from '../pages/cms/HelpList' //帮助分类列表
// import HelpDetail from '../pages/cms/HelpDetail' //帮助详情
// import OTCMain from '../pages/otc/Main'
// import OtcTrade from '../pages/otc/Trade'
// import OtcOrder from '../components/uc/Order'
// import OtcOrderRecharge from '../components/uc/OrderRecharge' // 添加的交易记录 充值
// import OtcOrderWithdraw from '../components/uc/OrderWithdraw' // 添加的交易记录 提现
// import EntrustCurrent from '../components/uc/EntrustCurrent' //当前委托记录
// import EntrustHistory from '../components/uc/EntrustHistory' //历史委托记录
// import OtcAd from '../components/otc/MyAd'
// import adPublish from '../pages/otc/AdPublish'
// import AdCoin from '../pages/otc/AdCoin'
// import identbusiness from '../pages/uc/IdentBusiness'
const Customer = r =>
  require.ensure(
    [],
    () => r(require("../pages/Customer/customer.vue")),
    "Customer"
  );
const CustomerOrder = r =>
  require.ensure(
    [],
    () => r(require("../pages/Customer/customer-order.vue")),
    "CustomerOrder"
  );
const Help = r =>
  require.ensure([], () => r(require("../pages/cms/help")), "Help");
const HelpList = r =>
  require.ensure([], () => r(require("../pages/cms/HelpList")), "HelpList");
const HelpDetail = r =>
  require.ensure([], () => r(require("../pages/cms/HelpDetail")), "HelpDetail");
const OTCMain = r =>
  require.ensure([], () => r(require("../pages/otc/Main")), "OTCMain");
const OtcTrade = r =>
  require.ensure([], () => r(require("../pages/otc/Trade")), "OtcTrade");
const OtcOrder = r =>
  require.ensure([], () => r(require("../components/uc/Order")), "OtcOrder");
const OtcOrderRecharge = r =>
  require.ensure(
    [],
    () => r(require("../components/uc/OrderRecharge")),
    "OtcOrderRecharge"
  );
const OtcOrderWithdraw = r =>
  require.ensure(
    [],
    () => r(require("../components/uc/OrderWithdraw")),
    "OtcOrderWithdraw"
  );
const OtcOrderRechargeDraw = r =>
  require.ensure(
    [],
    () => r(require("../components/uc/OrderRechargeDraw")),
    "OrderRechargeDraw"
  );
const OtcOrderCustom = r =>
  require.ensure(
    [],
    () => r(require("../components/uc/OrderCustom")),
    "OtcOrderCustom"
  );
const EntrustCurrent = r =>
  require.ensure(
    [],
    () => r(require("../components/uc/EntrustCurrent")),
    "EntrustCurrent"
  );
const EntrustHistory = r =>
  require.ensure(
    [],
    () => r(require("../components/uc/EntrustHistory")),
    "EntrustHistory"
  );
const OtcAd = r =>
  require.ensure([], () => r(require("../components/otc/MyAd")), "OtcAd");
const adPublish = r =>
  require.ensure([], () => r(require("../pages/otc/AdPublish")), "adPublish");
const AdCoin = r =>
  require.ensure([], () => r(require("../pages/otc/AdCoin")), "AdCoin");
const identbusiness = r =>
  require.ensure(
    [],
    () => r(require("../pages/uc/IdentBusiness")),
    "identbusiness"
  );
// 新增页面
const team = r =>
  require.ensure([], () => r(require("../pages/uc/team")), "team");
const orderCustom = r =>
  require.ensure(
    [],
    () => r(require("../pages/cms/order-custom")),
    "orderCustom"
  );

export default [
  { path: "/", redirect: "/index" },
  { path: "/index", component: Index },
  { path: "/login", component: Login },
  { path: "/login/returnUrl/:returnUrl", component: Login },
  { path: "/register", component: Register },
  { path: "/findPwd", component: FindPwd },
  { path: "/exchange", component: Exchange },
  { path: "/exchange/*", component: Exchange },
  { path: "/help", component: Help },
  { path: "/order-custom", component: orderCustom },
  { path: "/helplist", component: HelpList },
  { path: "/helpdetail", component: HelpDetail },
  { path: "/notice", component: notice },
  { path: "/notice/index", component: noticeitem },
  { path: "/customer", component: Customer },
  { path: "/customer-order", component: CustomerOrder },

  { path: "*", redirect: "/index" },
  {
    path: "/otc",
    component: OTCMain,
    children: [
      {
        path: "trade/*",
        component: OtcTrade
      }
    ]
  },
  {
    path: "/uc",
    component: membercenter,
    children: [
      {
        path: "",
        component: safe
      },
      {
        path: "safe",
        component: safe
      },
      {
        path: "team",
        component: team
      },
      {
        path: "account",
        component: account
      },
      {
        path: "account/manage",
        component: accountManage
      },

      {
        path: "apiset",
        component: apiset
      },

      {
        path: "helper",
        component: helper
      },
      {
        path: "money",
        component: moneyindex
      },
      {
        path: "record",
        component: record
      },
      {
        path: "recharge",
        component: recharge
      },
      {
        path: "withdraw",
        component: withdraw
      },
      {
        path: "withdraw/address",
        component: withdrawAddr
      },
      {
        path: "ad",
        component: OtcAd
      },
      {
        path: "ad/create",
        component: adPublish
      },
      {
        path: "ad/update",
        component: adPublish
      },
      {
        path: "ad/createCoin",
        component: AdCoin
      },
      {
        path: "ad/updateCoin",
        component: AdCoin
      },
      {
        path: "order",
        component: OtcOrder
      },

      {
        path: "order/recharge",
        component: OtcOrderRecharge
      },

      {
        path: "order/withdraw",
        component: OtcOrderWithdraw
      },
      {
        path: "order/recharge-withdraw",
        component: OtcOrderRechargeDraw
      },
      {
        path: "order/custom",
        component: OtcOrderCustom
      },

      {
        path: "entrust/current",
        component: EntrustCurrent
      },
      {
        path: "entrust/history",
        component: EntrustHistory
      },
      {
        path: "trade",
        component: trade
      },
      {
        path: "invitingmining",
        component: invitingmining
      },
      {
        path: "paydividends",
        component: paydividends
      },
      {
        path: "financeRecharge",
        component: FinanceRecharge
      },
      {
        path: "financeWithdraw",
        component: FinanceWithdraw
      }
    ]
  },
  {
    name: "tradeInfo",
    path: "/otc/tradeInfo",
    component: tradeInfo
  },
  {
    path: "/checkuser",
    component: checkuser
  },
  {
    path: "/chat",
    component: chat
  },
  {
    path: "/identbusiness",
    component: identbusiness
  },
  // {
  //     path: '/newhelp',
  //     component: newhelp,
  //     children: [{
  //             path: '',
  //             component: noticeindex
  //         },
  //         {
  //             path: 'index',
  //             component: noticeindex
  //         },
  //         {
  //             path: 'account',
  //             component: account
  //         },
  //     ]
  // },
  // {
  //     path: '/question',
  //     component: question
  // },
  // {
  //     path: '/agreement',
  //     component: agreement
  // },
  // {
  //     path: '/rate',
  //     component: rate
  // },
  // {
  //     path: '/about-rule',
  //     component: exchargerule
  // },
  // {
  //     path: '/about-protocol',
  //     component: userprotocol
  // },
  // {
  //     path: '/about-fee',
  //     component: feenote
  // },
  // {
  //     path: '/about-notice',
  //     component: homenotice
  // },
  {
    path: "/about-us",
    component: aboutus
  }
  // {
  //     path: '/join-us',
  //     component: joinus
  // },
  // {
  //     path: '/about-merchant',
  //     component: merchantprotocol
  // }
];
