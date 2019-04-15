<template>
    <div id="container">
        <login-slides></login-slides>
        <div id="frontContainer">
            <el-row>
                <el-col id="loginCol" :xs="layout.xs" :sm="layout.sm" :md="layout.md" :lg="layout.lg">
                    <el-card class="loginBox">
                        <h3 id="loginLabel">登陆</h3>
                        <hr/>
                        <el-form  id="form" label-position="left" label-width="4em" :model="loginForm">
                            <el-form-item label="用户名">
                                <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-button-group id="buttonGroup">
                                <el-button class="buttonLg" type="primary" @click="submitLoginForm"><i class="el-icon-check"></i>  登陆</el-button>
                                <el-button plain class="buttonLg" @click="startSignup">注册  <i class="el-icon-edit"></i></el-button>
                            </el-button-group>
                        </el-form>
                        <el-alert class="alertInfo" v-if="alertInfo.show" :title="alertInfo.title" :type="alertInfo.type" show-icon close-text="晓得了" @close="closeAlert"></el-alert>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import LoginSlides from "./login-slides";
    export default {
        name: "login-page",
        components: {LoginSlides},
        data(){
            return{
                layout:{
                    xs:{span:16, offset:3},
                    sm:{span:12, offset:6},
                    md:{span:9, offset:7},
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

                }

            }
        },
        methods:{
            submitLoginForm:function () {
                this.alertInfo.show=true;
            },
            closeAlert:function () {
                this.alertInfo.show=false;
            },
            startSignup:function () {
                
            }
        }
    }
</script>

<style scoped>

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
        top:0%;
        right:0;
        left:0;
        bottom: 0;
        pointer-events: none;
    }
    .loginBox{
        margin-top:30%;
        width: 100%;
        padding-left: 5%;
        padding-right: 5%;
        padding-top:8%;
        padding-bottom: 10%;
        background-color:rgba(255,255,255,0.95);
        pointer-events: auto;

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



</style>