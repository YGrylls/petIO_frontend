<template>
    <div id="container">
        <login-slides></login-slides>

        <div id="frontContainer">
            <el-row>
                <el-col id="loginCol" :xs="layout.xs" :sm="layout.sm" :md="layout.md" :lg="layout.lg">
                    <el-card class="loginBox">
                        <img class="logoPic logoPicXs" src="../assets/petIO.png"/>
                        <h3 id="loginLabel">登陆</h3>
                        <hr/>
                        <el-form ref="lgForm" :rules="rule"  id="form" :model="loginForm">
                            <el-form-item prop="username">
                                <el-input prefix-icon="el-icon-caret-right" :maxlength="16" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input prefix-icon="el-icon-caret-right" show-password :maxlength="16" v-model="loginForm.password" placeholder="请输入密码"></el-input>
                            </el-form-item>
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
    </div>
</template>

<script>
    import LoginSlides from "./login-slides";
    import SignupBox from "./signup-box";
    export default {
        name: "login-page",
        components: {SignupBox, LoginSlides},
        data(){
            return{
                isLoading:false,
                layout:{
                    xs:{span:14, offset:4},
                    sm:{span:12, offset:5},
                    md:{span:9, offset:6},
                    lg:{span:7, offset:12},
                },
                loginForm:{
                    username:"",
                    password:""
                },
                alertInfo:{
                    show:false,
                    type:"success",
                    title:"submitted"

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
        padding-left: 1em;
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
        height:10em;
        width: auto;
        position: absolute;
        top:-3.12em;
        right: -5em;
        z-index: 150;
    }
    @media (max-width:768px){
        .logoPicXs{
            height:7.5em;
            width: auto;
            top:-2.34em;
            right: -3.75em;
        }
    }

</style>