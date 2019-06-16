<template>
    <div id="container">
        <login-slides></login-slides>

        <div id="frontContainer">
            <el-row>
                <el-col id="loginCol" :xs="layout.xs" :sm="layout.sm" :md="layout.md" :lg="layout.lg">
                    <el-card class="loginBox">
                        <img class="logoPic" src="../assets/petIO.png"/>
                        <h3 id="loginLabel">登陆</h3>
                        <hr/>
                        <el-form ref="lgForm" :rules="rule"  id="form" :model="loginForm">
                            <el-form-item prop="username">
                                <el-input prefix-icon="el-icon-caret-right" :maxlength="16" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input prefix-icon="el-icon-caret-right" show-password :maxlength="16" v-model="loginForm.password" placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <a href="#" style="text-align: left" @click="forgetVisible=true"><small>忘记密码？</small></a>
                            <el-button-group id="buttonGroup">
                                <el-button :loading="isLoading" class="buttonLg" type="primary" @click="submitLoginForm"><i class="el-icon-check"></i>  登陆</el-button>
                                <el-button plain class="buttonLg" @click="startSignup">注册  <i class="el-icon-edit"></i></el-button>
                            </el-button-group>
                        </el-form>
                        <el-alert class="alertInfo" v-if="alertInfo.show" :title="alertInfo.title" :type="alertInfo.type" show-icon close-text="朕已阅" @close="closeAlert"></el-alert>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <signup-box ref="signUpBox"></signup-box>
        <el-dialog title="忘记密码" :close-on-click-modal="false" :visible.sync="forgetVisible" width="800px">
            <el-form ref="modifyForm" :model="modifyForm" :rules="modifyrule" label-position="top" style="text-align: left">
                <el-form-item label="注册时使用的邮箱" prop="emailAddress">
                    <el-input v-model="modifyForm.emailAddress"></el-input>
                </el-form-item>
                <el-form-item label="邮箱验证码" prop="verifyCode">
                    <el-input v-model="modifyForm.verifyCode" style="display: inline-block; width: 60%"></el-input>
                    <el-button type="primary" style="display: inline-block;float:right; width: 35%" @click="getValidationCode" :loading="emailLoading">{{emailBtnTxt}}</el-button>
                </el-form-item>
                <el-form-item label="输入新的密码" prop="newPassword">
                    <el-input v-model="modifyForm.newPassword" show-password></el-input>
                </el-form-item>
                <el-button type="primary" style="margin: 0.5em 0 0.5em 0" @click="modifyFormSubmit">确认修改</el-button>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import LoginSlides from "./login-slides";
    import SignupBox from "./signup-box";
    export default {
        name: "login-page",
        components: {SignupBox, LoginSlides},
        data(){
            var validateEmail=(rule,value,callback)=>{

                let reg=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if(!reg.test(value)){
                    callback(new Error('请输入正确的邮箱地址格式'))
                }else{
                    callback();
                }
            };
            return{
                forgetVisible:false,
                isLoading:false,
                emailLoading:false,
                layout:{
                    xs:{span:16, offset:3},
                    sm:{span:14, offset:4},
                    md:{span:9, offset:6},
                    lg:{span:7, offset:12},
                },
                emailBtnTxt:"点击发送验证码",
                loginForm:{
                    username:"",
                    password:""
                },
                alertInfo:{
                    show:false,
                    type:"success",
                    title:"submitted"

                },
                modifyForm:{
                    emailAddress:'',
                    verifyCode:'',
                    newPassword:''
                },
                modifyrule:{
                    newPassword:[
                        {required:true,message:"请输入新密码",trigger:"blur"},
                        {min:8,max:16,message:"字符长度在8-16",trigger:"blur"},
                    ],
                    verifyCode:[
                        {required:true,message:"请输入验证码",trigger:"blur"},
                        {min:6,max:32,trigger:"blur"},
                    ],
                    emailAddress:[
                        {required:true,message:"请输入验证码",trigger:"blur"},
                        {min:6,max:36,trigger:"blur"},
                        {validator:validateEmail,trigger:"blur"}
                    ]
                },
                rule:{
                    username:[
                        {required:true, message:"请输入用户名",trigger:"blur"},
                        {max:16,message:"用户名长度不超过16字符",trigger:"blur"}
                    ],
                    password:[
                        {required:true, message:"请输入密码",trigger:"blur"},
                        {max:16,message:"密码长度不超过16字符",trigger:"blur"}
                    ]
                }

            }
        },
        methods:{
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
                            that.$message({
                                type:"warning",
                                message:response.data.message
                            })
                        }
                        else {
                            alert("修改成功！");
                            that.modifyForm.newPassword="";
                            that.modifyForm.emailAddress="";
                            that.modifyForm.verifyCode="";
                            that.forgetVisible=false;
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
            getValidationCode:function(){
                let reg=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if(!reg.test(this.modifyForm.emailAddress)){
                    console.log(this.modifyForm);
                    this.$message("请先正确填写邮箱");
                    return;
                }
                const that=this;
                this.$http.post("mailcodeonchangepwd",
                    that.modifyForm.emailAddress,{
                        headers: {
                            'Content-Type':'text/plain'
                        }
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
            submitLoginForm:function () {
                this.$refs["lgForm"].validate((valid) => {
                    if(valid){
                        this.submitForm();
                    }else{
                        return false;
                    }
                })



            },
            submitForm:function(){
                const that=this;
                that.isLoading=true;
                this.$http.post('/login',this.loginForm)
                    .then(function(response){
                        that.alertInfo.title=response.data.message;
                        that.isLoading=false;
                        if(response.data.code!==200){
                            that.alertInfo.type="error";
                        }else{
                            that.alertInfo.type="success";
                            that.$router.push("/adoption/list");
                        }

                        that.alertInfo.show=true;

                    }).catch(function (error) {
                    that.isLoading=false;
                    if(error.response){
                        that.alertInfo.title=error.response.message;
                    }else{
                        that.alertInfo.title=error.message;
                    }

                    that.alertInfo.type="error";
                    that.alertInfo.show=true;

                })
            },
            closeAlert:function () {
                this.alertInfo.show=false;
            },
            startSignup:function () {

                this.$refs.signUpBox.signUpVisible=true;
            }
        }
    }
</script>


<style scoped>
    #container{
        height:100vh;
        width:100vw;

    }

    #loginLabel{
        text-align: left;
        padding-left: 0.5em;
        border-left-color: deepskyblue;
        border-left-width: 0.4em;
        border-left-style: solid;
        margin-bottom: 1.5em;
    }

    #frontContainer{
        position: absolute;
        z-index: 100;
        top:0;
        right:0;
        left:0;
        bottom: 0;
        pointer-events: none;
    }
    .loginBox{
        position:relative;
        margin-top:30%;
        width: 100%;
        padding-left: 5%;
        padding-right: 5%;
        padding-top:8%;
        padding-bottom: 10%;
        background-color:rgba(255,255,255,0.95);
        pointer-events: auto;
        overflow: visible;

    }
    el-row{
        height:100%;
    }
    #form{
        text-align: left;
        margin-top:1.5em;
        margin-left:0.4em;
        margin-right:0.4em;

    }

    #buttonGroup{
        margin-top: 2em;
        min-width: 100%;
    }
    .buttonLg{
        min-width:50%
    }
    .alertInfo{
        margin-top: 1em;
    }
    .logoPic{
        position:absolute;
        height:7.5em;
        width: auto;
        top:-2.34em;
        right: -3.75em;
        z-index: 150;
    }

</style>