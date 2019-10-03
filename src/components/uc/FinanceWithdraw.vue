<script type="text/ecmascript-6">
    //import { VaPopupRadio }  from './component'
    //import user  from '../vue.mixins/user'
    export default {
        name: "FinanceWithdraw",
        components: {},
        mixins: [],
        data() {
            return {
                formItem:{
                    date:[]
                },
                request:{
                    startTime:'',
                    endTime:''
                },
                response:{

                }
            }
        },
        created() {
            this.initPage();
        },
        activated() {

        },
        methods: {
            async initPage() {
                this.requestData();
            },handleSubmit(){
                this.request.startTime = this.formItem.date[0] ? this.$utils.dateFormat(this.formItem.date[0],'YYYY-MM-DD') : '';
                this.request.endTime = this.formItem.date[1] ? this.$utils.dateFormat(this.formItem.date[1],'YYYY-MM-DD') : '';
                this.requestData()
            },handleClear(){
                this.request.startTime = '';
                this.request.endTime = '';
                this.formItem.date = [];
            },
            requestData(){

                this.$http.post(this.host + "/uc/asset/transaction/withdraw" ,this.request ).then(response => {
                    var resp = response.body;
                    console.log(resp)
                    if(resp.code == 0 && resp.data ){
                        this.response = resp.data ;
                    }else{
                        this.$Message.error('获取提现信息失败！');
                    }
                });
            }


        },
        watch: {
            '': {
                handler(val, olval) {

                },
                deep: true, immediate: true
            }
        },
    }
</script>
<template>
    <div class="nav-rights">
        <div class="nav-right">
            <div class="vc-finance-recharge">
                <Form class="form" :model="formItem" :label-width="65" inline>
                    <FormItem label="起止时间:">
                        <DatePicker type="daterange" v-model="formItem.date" style="width:180px;" format="yyyy-MM-dd"></DatePicker>
                    </FormItem>

                    <FormItem>
                        <Button type="warning" @click="handleSubmit">搜索</Button>
                        <Button style="margin-left: 8px " @click="handleClear " class="clear_btn">清空</Button>
                    </FormItem>
                </Form>
                <div class="items">
                    <div class="item">
                        <p class="item-title">交易金额</p>
                        <p class="item-message">{{ response['amount'] ? response['amount'] : '0.00'  }}</p>
                    </div>
                    <div class="item">
                        <p class="item-title">手续费</p>
                        <p class="item-message">{{ response['commision'] ? response['commision'] : '0.00'  }}</p>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>
<style scoped>
    .form.ivu-form-inline .ivu-form-item {
        display: inline-block;
    }
    .vc-finance-recharge{
        padding-left: 30px;
    }
    .vc-finance-recharge .items{ display: flex ; margin-top: 100px;}
    .vc-finance-recharge .item { flex: 1 ;}
    .vc-finance-recharge .item-title {text-align: center}
    .vc-finance-recharge .item-message {  font-size: 18px;font-weight:  800 ;  text-align: center;margin-top: 10px;}
</style>
