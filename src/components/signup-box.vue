<template>
    <el-dialog :visible.sync="signUpVisible" :close-on-click-modal="false">
        <h3 id="signupLabel">注册</h3>
        <hr/>
        <el-form class="dialogForm" :model="signUpForm" label-position="top" label-width="4em">
            <el-form-item label="用户名">
                <el-input v-model="signUpForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="signUpForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="再次输入密码">
                <el-input v-model="passwordConfirm" placeholder="请再次输入密码"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input v-model="signUpForm.phoneNumber" placeholder="请输入手机号码"></el-input>
            </el-form-item>
        </el-form>
        <el-button id="signupSubmitBtn" circle type="success" @click="submitSignup" ><i class="el-icon-check"></i></el-button>
    </el-dialog>
</template>

<script>
    export default {
        name: "signup-box",
        data(){
            return{
                signUpVisible:false,
                signUpForm:{
                    username:"",
                    password:"",
                    phoneNumber:""
                },
                passwordConfirm:""
            }
        },
        methods:{
            submitSignup:function () {
                alert("well");
            }
        }
    }
</script>

<style>
    .el-dialog{
        max-width: 600px;
    }
</style>
<style scoped>
    .dialogForm{
        text-align: left;
    }
    #signupLabel{
        text-align: left;
        padding-left: 1em;
        border-left-color: deepskyblue;
        border-left-width: 0.4em;
        border-left-style: solid;
        margin-bottom: 1.5em;
    }
    .el-form-item{
        margin-bottom: 0.5em;
    }
    label{
        margin-bottom:0.5em;
        padding-bottom: 0.3em;
    }
    #signupSubmitBtn{
        margin-top: 1em;
    }



</style>