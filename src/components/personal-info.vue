<template>
    <div id="container">
        <el-card id="showInfo">
            <h1>{{personalForm.name}}</h1>
            <hr>
            <p class="tag"><span>昵称：</span><strong>{{personalForm.name}}</strong></p>
            <p class="tag"><span>邮箱：</span><strong>{{personalForm.email}}</strong></p>
        </el-card>
        <el-card id="modifyInfo">
            <el-tabs v-model="activeName">
                <el-tab-pane label="送养信息" name="second">
                    <personal-item v-on:listenToChildEvent="refresh" v-if="publishmentList!=[]" v-for="(item,index) in publishmentList" :key="index" :publishment-data="item"></personal-item>
                </el-tab-pane>
                <el-tab-pane label="申请信息" name="first">
                    <apply-item v-if="applyList!=[]" v-for="(item,index) in applyList" :key="index" :apply-data="item"></apply-item>
                </el-tab-pane>

                <el-tab-pane label="修改密码" name="third">
                    <hr/>
                    <h3 class="tag">密码修改</h3>
                    <el-form ref="modifyForm" :model="modifyForm" :rules="modifyrule" label-position="top" style="text-align: left">
                        <!--<el-form-item label="旧密码" prop="prevPassword">-->
                            <!--<el-input :minlength="8" :maxlength="16" v-model="modifyForm.prevPassword" show-password placeholder="请输入旧密码"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="新密码" prop="newPassword">-->
                            <!--<el-input :minlength="8" :maxlength="16" v-model="modifyForm.newPassword" show-password placeholder="请输入新密码"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="确认密码" prop="confirmPassword">-->
                            <!--<el-input :minlength="8" :maxlength="16" v-model="modifyForm.confirmPassword" show-password placeholder="请确认新密码"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item>-->
                            <!--<el-button size="mini" type="primary" @click="modifyFormSubmit">确认修改</el-button>-->
                        <!--</el-form-item>-->
                        <el-form-item label="注册时使用的邮箱" prop="emailAddress">
                            <el-input v-model="modifyForm.emailAddress"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱验证码" prop="validationCode">
                            <el-input v-model="modifyForm.validationCode" style="display: inline-block; width: 70%"></el-input>
                            <el-button type="primary" style="display: inline-block;float:right; width: 25%" @click="getValidationCode" :loading="emailLoading">{{emailBtnTxt}}</el-button>
                        </el-form-item>
                        <el-form-item label="输入新的密码" show-password prop="newPassword">
                            <el-input v-model="modifyForm.newPassword"></el-input>
                        </el-form-item>
                        <el-button type="primary" style="margin: 0.5em 0 0.5em 0">确认修改</el-button>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
    import catPic from '../assets/cat.png';
    import dogPic from '../assets/dog.png';
    import personalItem from './personal-item'
    import applyItem from './apply-item'
    export default {
        name: "personal-info",
        components:{personalItem,applyItem},
        created(){
            this.showUser();
            this.getPublishment();
            this.getApply();
        },
        data(){
            // var firstCheck=(rule,value,callback)=>{
            //     if(value==this.modifyForm.prevPassword){
            //         callback(new Error("新密码应与旧密码不一致"))
            //     }
            //     else {
            //         callback();
            //     }
            // };
            // var secondCheck=(rule,value,callback)=>{
            //     if(value!=this.modifyForm.newPassword){
            //         callback(new Error("密码输入不一致"))
            //     }
            //     else {
            //         callback();
            //     }
            // };
            // var check=(rule,value,callback)=>{
            //     if(value==""){
            //         callback(new Error("请输入原始密码"))
            //     }
            //     else {
            //         callback();
            //     }
            // };
            // var validatePhone=(rule,value,callback)=>{
            //     var reg=/^[1][3,4,5,7,8][0-9]{9}$/;
            //     var phone=this.personalForm.phone;
            //     if(!reg.test(phone)){
            //         callback(new Error('手机号格式有误'));
            //     }else{
            //         callback();
            //     }
            // };

            var validateEmail=(rule,value,callback)=>{
                //to be done
                let reg=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if(!reg.test(value)){
                    callback(new Error('请输入正确的邮箱地址格式'))
                }else{
                    callback();
                }
            };
            return{
                activeName:'second',
                personalForm: {
                    name: '',
                    email: '',
                },
                modifyForm:{
                    emailAddress:'',
                    validationCode:'',
                    newPassword:''
                },
                publishmentList:[],
                applyList:[],
                publishDate:new Date(),
                emailLoading:false,
                emailBtnTxt:"点击发送验证码",
                modifyrule:{
                    newPassword:[
                        {required:true,message:"请输入新密码",trigger:"blur"},
                        {min:8,max:16,message:"字符长度在8-16",trigger:"blur"},
                    ],
                    validationCode:[
                        {required:true,message:"请输入验证码",trigger:"blur"},
                        {min:6,max:32,trigger:"blur"},
                    ],
                    emailAddress:[
                        {required:true,message:"请输入验证码",trigger:"blur"},
                        {min:6,max:36,trigger:"blur"},
                        {validator:validateEmail,trigger:"blur"}
                    ]
                }
            }
        },
        methods:{
            refresh:function(){
                this.showUser();
                this.getPublishment();
                this.getApply();
            },
            // personalFormSubmit:function ()  {
            //     this.$refs["personalForm"].validate((valid)=>{
            //         if(valid){
            //             this.modifyPersonalInfo();
            //         }
            //         else {
            //             return false;
            //         }
            //     })
            // },
            // modifyPersonalInfo:function(){
            //     const that=this;
            //     this.$http.post("/userinfo/changePhone",{
            //         username:that.personalForm.name,
            //         userTel:that.personalForm.phone
            //     })
            //         .then(function (response) {
            //             if(response.data.code===200){
            //                 alert("修改成功！");
            //                 that.showUser();
            //                 that.getPublishment();
            //             }
            //             else {
            //                 alert("error");
            //             }
            //         })
            //         .catch(function (error) {
            //             if(error.response){
            //                 alert(error.response.message)
            //             }
            //             else {
            //                 alert(error.message)
            //             }
            //         });
            // },
            modifyFormSubmit:function () {
                this.$refs["modifyForm"].validate((valid) => {
                    if(valid){
                        this.modify();
                    }
                    else {
                        return false;
                    }
                })
            },
            modify:function(){
                const that=this;
                this.$http.post("/userinfo/changePassword",that.modifyForm)
                    .then(function (response) {
                        if(response.data.code!==200){
                            alert("error!");
                        }
                        else {
                            alert("修改成功！");
                            that.modifyForm.newPassword="";
                            that.modifyForm.emailAddress="";
                            that.modifyForm.validationCode="";
                            that.showUser();
                            that.getPublishment();
                        }
                    })
                    .catch(function (error) {
                        if(error.response){
                            alert(error.response.message)
                        }
                        else {
                            alert(error.message)
                        }
                    });
            },
            showUser(){
                const that=this;
                this.$http.get("/userinfo/info")
                    .then(function (response) {
                        if(response.data.code!==200){
                            that.$message({
                                type:"warning",
                                message:response.data.message
                            });
                            that.$router.push("/login");
                        }
                        else {
                            console.log(response.data.data);
                            that.personalForm.name=response.data.data.username;
                            that.personalForm.email=response.data.data.userMail;
                        }
                    })
                    .catch(function (error) {
                        if(error.response){
                            alert(error.response.message);
                        }
                        else {
                            alert(error.message);
                        }
                    })
                },
            getPublishment(){
                const that=this;
                this.$http.get("/userinfo/adoptions")
                    .then(function (response) {
                        if(response.data.code===401){
                            that.$router.push("/login");
                        }
                        else if(response.data.code===200){
                            that.publishmentList=response.data.data;
                            // console.log(that.publishmentList)
                        }
                    })
                    .catch(function (error) {
                        if(error.response){
                            alert(error.response.message);
                        }
                        else {
                            alert(error.message);
                        }
                    })
            },
            getApply(){
                const that=this;
                this.$http.get("/userinfo/apply")
                    .then(function (response) {
                        if(response.data.code===401){
                            that.$router.push("/login");
                        }
                        else if(response.data.code===200){
                            that.applyList=response.data.data;
                        }
                    })
                    .catch(function (error) {
                        if(error.response){
                            alert(error.response.message);
                        }
                        else {
                            alert(error.message);
                        }
                    })
            },
            getValidationCode:function(){
                let reg=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if(!reg.test(this.signUpForm.emailAddress)){
                    this.$message("请先填写邮箱");
                    return;
                }
                const that=this;
                this.$http.post("-----------test----------------",{
                    email:that.signUpForm.emailAddress
                }).then((res)=>{
                    if(res.data.code===200){
                        that.emailBtnTxt="邮件验证码已发送";
                        that.emailLoading=true;
                    }else{
                        that.$message(res.data.message);
                    }

                }).catch(()=>{
                    that.$message({
                        type:"warning",
                        message:"Network Error"
                    })
                })

            },
        }
    }
</script>

<style scoped>
    #container{
        display: flex;
        flex-wrap: wrap;
        padding-left:5%;
        padding-right: 5%;
        align-items: flex-start;
    }
    #showInfo{
        margin: 1.5%;
        width: 200px;
        flex-grow: 1;

    }
    #modifyInfo{
        margin:1.5%;
        padding-right: 5%;
        width:360px;
        flex-grow: 1;
    }
    .tag{
        text-align: left;
    }
</style>