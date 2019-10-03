import Vue from 'vue'

Vue.mixin({

    methods:{
        $request(url){
            return  (params) => {
                return new Promise((resolve,reject)=>{
                    this.$http.post(this.host +  url , params ).then((response)=>{
                        let res = response.body ;
                         resolve(res)
                    },()=>{
                        this.$Message.error('请求失败!');
                    }).catch((error)=>{
                        this.$Message.error('异常!');
                    })
                })
            }
        },
        $getFormData(file){
            let formData = new FormData();
            formData.append('file',file);
            return formData ;
        }
    }
});