<template>
    <el-dialog :visible.sync="signUpVisible" :close-on-click-modal="false">
        <h3 id="signupLabel">注册</h3>
        <hr/>
        <el-form class="dialogForm" ref="suForm" :model="signUpForm" :rules="rule" label-position="top" label-width="4em">
            <el-form-item label="用户名" prop="username">
                <el-input :maxlength="16" v-model="signUpForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input :maxlength="16" v-model="signUpForm.password" show-password placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="再次输入密码" prop="passwordConfirm">
                <el-input :maxlength="16" v-model="signUpForm.passwordConfirm" show-password placeholder="请再次输入密码"></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址" prop="emailAddress">
                <el-input :maxlength="36" v-model="signUpForm.emailAddress" placeholder="请输入可用的邮箱"></el-input>
            </el-form-item>
            <el-form-item label="邮箱验证码" prop="validationCode">
                <el-input v-model="signUpForm.validationCode" placeholder="请输入通过邮箱获得的的验证码" style="width: 70%;display: inline-block"></el-input>
                <el-button type="primary" style="display: inline-block;float:right" @click="getValidationCode">点击发送验证码</el-button>
            </el-form-item>
        </el-form>
        <el-button id="signupSubmitBtn" :loading="isLoading" circle type="success" @click="submitSignup" ><i class="el-icon-check"></i></el-button>
        <el-alert class="alertInfo" v-if="alertInfo.show" :title="alertInfo.title" :type="alertInfo.type" show-icon close-text="朕已阅" @close="closeAlert"></el-alert>
    </el-dialog>
</template>

<script>
    export default {
        name: "signup-box",
        data(){
            var doubleCheck=(rule,value,callback)=>{
                if(value!==this.signUpForm.password){
                    callback(new Error('密码输入不一致'));
                }else{
                    callback();
                }

            };
            var validateEmail=(rule,value,callback)=>{
                //to be done
                callback();
            };
            return{
                signUpVisible:false,
                signUpForm:{
                    username:"",
                    password:"",
                    passwordConfirm:"",
                    emailAddress:"",
                    validationCode:""
                },
                alertInfo:{
                    show:false,
                    type:"success",
                    title:"submitted"

                },
                isLoading:false,



                rule:{
                    username:[
                        {required:true,message:"请输入用户名",trigger:"blur"},
                        {min:6,max:16,message:"用户名长度在6到16字符",trigger:"blur"}
                    ],
                    password:[
                        {required:true, message:"请输入密码",trigger:"blur"},
                        {min:8,max:16,message:"密码长度在8到16字符",trigger:"blur"}
                    ],
                    passwordConfirm:[
                        {required:true, message:"请再次输入密码",trigger:"blur"},
                        {validator: doubleCheck,trigger:"blur"},
                    ],
                    emailAddress:[
                        {required:true, message:"请输入邮箱",trigger:"blur"},
                        {validator: validateEmail,trigger:"blur"}

                    ],
                    validationCode:[
                        {required:true, message:"请输入验证码",trigger:"blur"},
                    ]
                }
            }
        },
        methods:{
            closeAlert:function () {
                this.alertInfo.show=false;
            },
            getValidationCode:function(){
                //to be done
            },
            submitSignup:function () {
                this.$refs["suForm"].validate((valid) => {
                    if(valid){
                        this.submitForm();
                    }else{
                        return false;
                    }
                })
            },
            submitForm: function(){
                const that=this;
                that.isLoading=true;
                this.$http.post('/signup',{
                    username:this.signUpForm.username,
                    password:this.signUpForm.password,
                    userTel:this.signUpForm.phoneNumber
                })
                    .then(function(response){
                        that.alertInfo.title=response.data.message;
                        that.isLoading=false;
                        if(response.data.code!==200){
                            that.alertInfo.type="error";
                        }else{
                            that.alertInfo.type="success";
                            that.$refs["suForm"].resetFields();
                            that.signUpVisible=false;
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
    .alertInfo{
        margin-top: 1em;
    }



</style>