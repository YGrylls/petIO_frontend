<template>
    <div id="container">
        <el-card id="showInfo">
            <h1>{{personalForm.name}}</h1>
            <hr>
            <p class="tag"><span>昵称：</span><strong>{{personalForm.name}}</strong></p>
            <p class="tag"><span>手机：</span><strong>{{personalForm.phone}}</strong></p>
        </el-card>
        <el-card id="modifyInfo">
            <el-tabs v-model="activeName">
                <el-tab-pane label="个人信息" name="first">
                    <hr/>
                    <h3 class="tag">个人信息修改</h3>
                    <el-form ref="personalForm" :model="personalForm" label-width="80px">
                        <el-form-item label="昵称">
                            <el-input :disabled="true" v-model="personalForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="手机">
                            <el-input v-model="personalForm.phone"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="personalFormSubmit">确认修改</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="送养信息" name="second">
                    <personal-item v-if="publishmentList!=[]" v-for="(item,index) in publishmentList" :key="index" :publishment-data="item"></personal-item>
                </el-tab-pane>
                <el-tab-pane label="修改密码" name="third">
                    <hr/>
                    <h3 class="tag">密码修改</h3>
                    <el-form ref="modifyForm" :model="modifyForm" :rules="modifyrule" label-width="80px">
                        <el-form-item label="旧密码" prop="prevPassword">
                            <el-input :minlength="8" :maxlength="16" v-model="modifyForm.prevPassword" show-password placeholder="请输入旧密码"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="newPassword">
                            <el-input :minlength="8" :maxlength="16" v-model="modifyForm.newPassword" show-password placeholder="请输入新密码"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="confirmPassword">
                            <el-input :minlength="8" :maxlength="16" v-model="modifyForm.confirmPassword" show-password placeholder="请确认新密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="modifyFormSubmit">确认修改</el-button>
                        </el-form-item>
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
    export default {
        name: "personal-info",
        components:{personalItem},
        created(){
            this.showUser();
            this.getPublishment();
        },
        data(){
            var firstCheck=(rule,value,callback)=>{
                if(value==this.modifyForm.prevPassword){
                    callback(new Error("新密码应与旧密码不一致"))
                }
                else {
                    callback();
                }
            };
            var secondCheck=(rule,value,callback)=>{
                if(value!=this.modifyForm.newPassword){
                    callback(new Error("密码输入不一致"))
                }
                else {
                    callback();
                }
            };
            var check=(rule,value,callback)=>{
                if(value==""){
                    callback(new Error("请输入原始密码"))
                }
                else {
                    callback();
                }
            };
            return{
                activeName:'first',
                personalForm: {
                    name: '',
                    phone: '',
                },
                modifyForm:{
                    prevPassword:'',
                    newPassword:'',
                    confirmPassword:''
                },
                publishmentList:[],
                publishDate:new Date(),

                modifyrule:{
                    prevPassword:[
                        {require:true,message:"请输入原始密码",trigger:"blur"},
                        {min:8,max:16,message:"字符长度在8-16",trigger:"blur"},
                        {validator:check,trigger:"blur"}
                        ],
                    newPassword:[
                        {require:true,message:"请输入新密码",trigger:"blur"},
                        {min:8,max:16,message:"字符长度在8-16",trigger:"blur"},
                        {validator:firstCheck,trigger:"blur"}
                    ],
                    confirmPassword:[
                        {require:true,message:"请输入确认密码",trigger:"blur"},
                        {min:8,max:16,message:"字符长度在8-16",trigger:"blur"},
                        {validator:secondCheck,trigger:"blur"}
                    ]
                }

            }
        },
        methods:{
            personalFormSubmit:function ()  {
                alert('personalFormSubmit!');
            },
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
                this.$http.post("/userinfo/changePassword",{
                    oldpass:that.modifyForm.prevPassword,
                    newpass:that.modifyForm.newPassword
                })
                    .then(function (response) {
                        if(response.data.code!=200){
                            alert("error!");
                        }
                        else {
                            alert("修改成功！");
                            that.modifyForm.newPassword="";
                            that.modifyForm.prevPassword="";
                            that.modifyForm.confirmPassword="";
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
                        if(response.data.code!=200){
                            alert("error");
                            //that.$router.push("/login");
                        }
                        else {
                            that.personalForm.name=response.data.data.username;
                            that.personalForm.phone=response.data.data.userTel;
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
                        else if(response.data.code==200){
                            that.publishmentList=response.data.data;
                            console.log(that.publishmentList)
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
            decideType(){
                // if(false){
                //     return catPic;
                // }
                // return dogPic;
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