<template>
    <div v-loading.fullscreen.lock="fullscreenLoading" id="container">
        <el-card id="showInfo">
            <h1>{{personalForm.name}}</h1>
            <hr>
            <p class="tag"><span>昵称：</span><strong>{{personalForm.name}}</strong></p>
            <div style="text-align: left">
                <el-button type="danger" style="margin-bottom: 1em;" @click="logout">返回登录</el-button>
            </div>
            <el-collapse v-model="activecollapse">
                <el-collapse-item title="评论信息" name="1">
                    <div v-for="item in OtherCommentList" :key="item.key">
                        <div>
                            <el-alert style="text-align: left"
                                    class="info"
                                    :center="false"
                                    :title="item.username+'给您评论了'"
                                    :description="'标题：'+item.aTitle"
                                    type="success"
                                    close-text="详情"
                                    @close="gotoDetail_setRead(item.aID,item.uID)">
                            </el-alert>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="您的申请" name="2">
                    <div v-for="item in OtherApplyList" :key="item.key">
                            <el-alert style="text-align: left"
                                    class="info"
                                    :center="false"
                                    :title="item.username+'申请您的领养'"
                                    :description="'标题：'+item.aTitle"
                                    type="success"
                                      close-text="知道了"
                                     @close="setApplyRead(item.aID,item.uID)">
                            </el-alert>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-card>
        <el-card id="modifyInfo">
            <el-tabs v-model="activeName">
                <el-tab-pane label="送养信息" name="second">
                    <personal-item @refresh="refresh" v-on:listenToChildEvent="refresh"  v-for="(item,index) in publishmentList" :key="index" :publishment-data="item"></personal-item>
                </el-tab-pane>
                <el-tab-pane label="申请信息" name="first">
                    <apply-item  @refresh="refresh" v-for="(item,index) in applyList" :key="index" :publishment-data="item" :chosen-list="chosenList" :chosen-complete-list="chosenCompleteList"></apply-item>
                </el-tab-pane>
                <el-tab-pane label="修改密码" name="third">
                    <hr/>
                    <h3 class="tag">密码修改</h3>
                    <el-form ref="modifyForm" :model="modifyForm" :rules="modifyrule" label-position="top" style="text-align: left">
                        <el-form-item label="注册时使用的邮箱" prop="mailAddress">
                            <el-input v-model="modifyForm.mailAddress"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱验证码" prop="verifyCode">
                            <el-input v-model="modifyForm.verifyCode" style="display: inline-block; width: 70%"></el-input>
                            <el-button type="primary" style="display: inline-block;float:right; width: 25%" @click="getValidationCode" :loading="emailLoading">{{emailBtnTxt}}</el-button>
                        </el-form-item>
                        <el-form-item label="输入新的密码" prop="password">
                            <el-input v-model="modifyForm.password" show-password></el-input>
                        </el-form-item>
                        <el-button type="primary" style="margin: 0.5em 0 0.5em 0" @click="modifyFormSubmit">确认修改</el-button>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-card>

    </div>
</template>

<script>
    import personalItem from './personal-item'
    import applyItem from './apply-item'
    export default {
        name: "personal-info",
        components:{personalItem,applyItem},
        mounted(){
            this.refresh();
        },
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
                activecollapse:["1","2"],
                fullscreenLoading:false,
                OtherCommentList:[],
                OtherApplyList:[],
                OtherCommentNum:0,
                OtherApplyNum:0,
                activeName:'second',
                personalForm: {
                    name: '',
                },
                modifyForm:{
                    mailAddress:'',
                    verifyCode:'',
                    password:''
                },
                chosenList:[],
                chosenCompleteList:[],
                publishmentList:[],
                applyList:[],
                publishDate:new Date(),
                emailLoading:false,
                emailBtnTxt:"点击发送验证码",
                modifyrule:{
                    password:[
                        {required:true,message:"请输入新密码",trigger:"blur"},
                        {min:8,max:16,message:"字符长度在8-16",trigger:"blur"},
                    ],
                    verifyCode:[
                        {required:true,message:"请输入验证码",trigger:"blur"},
                        {min:6,max:32,trigger:"blur"},
                    ],
                    mailAddress:[
                        {required:true,message:"请输入验证码",trigger:"blur"},
                        {min:6,max:36,trigger:"blur"},
                        {validator:validateEmail,trigger:"blur"}
                    ]
                }
            }
        },
        methods:{
            logout(){
                this.$router.push("/login");
            },
            gotoDetail(id){
                this.$router.push("/adoption/detail/"+id);
                // console.log(id);
            },
            gotoDetail_setRead(aid,uid){
                const that=this;
                var url='comment/read/'+uid;
                // console.log(url);
                this.$http.post(url)
                    .then(function (response) {
                        if(response.data.code===200){
                            that.getOtherComment();
                            that.$emit('showCommentUnreadNum',that.OtherCommentNum);
                            that.$router.push("/adoption/detail/"+aid);
                        }
                        else {
                            console.log(response);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            getOtherComment(){
                const that=this;
                this.$http.get("/comment/unread")
                    .then(function (response) {
                        // console.log("comment:",response);
                        that.OtherCommentNum=response.data.data.number;
                        that.OtherCommentList=response.data.data.list;
                        console.log(that.OtherCommentList);
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },
            getOtherApply(){
                const that=this;
                this.$http.get("/apply/ownerunread")
                    .then(function (response) {
                        // console.log(response);
                        that.OtherApplyNum=response.data.data.number;
                        that.OtherApplyList=response.data.data.list;
                        // console.log(that.OtherApplyList)
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            setApplyRead(id,uid){
                const that=this;
                var url='/apply/ownerread/'+id+'/'+uid;
                console.log(url);
                this.$http.post(url)
                    .then(function (response) {
                        if(response.data.code===200){
                            that.getOtherApply();
                            that.$emit("showApplyUnreadNum",that.OtherApplyNum);
                            //that.$router.push("/adoption/detail/"+id);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            getChosen(){
                const that=this;
                this.$http.get("/userinfo/AfterFirst").then((res)=>{
                    if(res.data.code===200){
                        that.chosenList=res.data.data;
                    }else{
                        that.$message({
                            type:"warning",
                            message:res.data.message
                        })
                    }
                }).catch(()=>{
                    that.$message({
                        type:"warning",
                        message:"Network Error"
                    })
                })
            },
            getChosenComplete(){
                const that=this;
                this.$http.get("/userinfo/AfterSecond").then((res)=>{
                    if(res.data.code===200){
                        that.chosenCompleteList=res.data.data;
                    }else{
                        that.$message({
                            type:"warning",
                            message:res.data.message
                        })
                    }
                }).catch(()=>{
                    that.$message({
                        type:"warning",
                        message:"Network Error"
                    })
                })
            },
            refresh:function(){
                this.fullscreenLoading=true;
                this.showUser();
                this.getPublishment();
                this.getApply();
                this.getChosen();
                this.getChosenComplete();
                this.getOtherComment();
                this.getOtherApply();
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
                            that.modifyForm.password="";
                            that.modifyForm.mailAddress="";
                            that.modifyForm.verifyCode="";
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
                            // console.log(response.data.data);
                            that.personalForm.name=response.data.data.username;
                            // that.personalForm.email=response.data.data.userMail;
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
                        that.fullscreenLoading=false;
                    })
                    .catch(function (error) {
                        if(error.response){
                            alert(error.response.message);
                        }
                        else {
                            alert(error.message);
                        }
                        that.fullscreenLoading=false;
                    })
            },
            getValidationCode:function(){
                let reg=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if(!reg.test(this.modifyForm.mailAddress)){
                    console.log(this.modifyForm);
                    this.$message("请先正确填写邮箱");
                    return;
                }
                const that=this;
                this.$http.post("mailcodeonchangepwd",
                    that.modifyForm.mailAddress,{
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
    .info{
        margin-bottom: 0.5em;
    }
    .info:hover{
        font-weight: bolder;
    }

    /*#commentList :hover{*/
        /*transform: scale(1.05);*/
    /*}*/
</style>