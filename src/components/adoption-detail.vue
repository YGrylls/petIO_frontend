<template>
    <div v-loading.fullscreen.lock="fullscreenLoading" style="margin-bottom: 2em">
        <el-container>
            <el-card id="adoption-detail-card">
                <el-row>
                    <el-col :span="16"><h2 class="content">{{adoptionDetailInfo.adoptionTitle}}</h2></el-col>
                    <el-col :span="4" :offset="4">
                        <!--<el-button type="text" v-if="adoptionDetailInfo.adoptionStatus==0" class="AdoptionBtn">未领养</el-button>-->
                        <!--<el-button type="text" v-else class="AdoptionBtn">未领养</el-button>-->
                        <el-tag style="margin-top: 2em;float: right;font-size: 1em" :type="tagType">{{tagText}}</el-tag>
                    </el-col>
                </el-row>
                <el-row id="locate">
                    <el-col align="left"><i class="el-icon-location-outline">{{adoptionDetailInfo.adoptionPosition}}</i></el-col>
                </el-row>
                <el-row>
                    <el-col align="left"><i class="el-icon-time">{{adoptionDetailInfo.publishDate}}</i></el-col>
                </el-row>
                <el-row style="text-align: left">
                    <el-col :span="3"><p>类型：<strong>{{adoptionDetailInfo.category}}</strong></p></el-col>
                    <el-col :span="3">
                        <p v-if="adoptionDetailInfo.gender=='female'">性别：<strong>母</strong></p>
                        <p v-else>性别：<strong>公</strong></p>
                    </el-col>
                    <el-col :span="3">
                        <p v-if="adoptionDetailInfo.free==true">免费：<strong>是</strong></p>
                        <p v-else>免费：<strong>否</strong></p>
                    </el-col>
                    <el-col :span="3">
                        <p v-if="adoptionDetailInfo.free==true">金额：<strong>￥0</strong></p>
                        <p v-else>金额：<strong>￥{{adoptionDetailInfo.cost}}</strong></p>
                    </el-col>
                    <el-col :span="12" class="AdoptionBtn"><el-button type="primary" :disabled="isApplyDisable" @click="ensureApply">{{applyText}}</el-button></el-col>
                </el-row>
                <strong><p class="content">领养要求</p></strong>
                <p class="content">{{adoptionDetailInfo.adoptionDetailRequirement}}</p>
                <strong><p class="content">宠物照片</p></strong>
                <viewer :images="adoptionDetailInfo.adoptionImg">
                    <img class="adoptionDetailPhoto" v-for="src in adoptionDetailInfo.adoptionImg" :key="src"  :src="src" >
                </viewer>
                <strong><p class="content">宠物描述</p></strong>
                <p class="content">{{adoptionDetailInfo.adoptionDetailAbstract}}</p>
                <strong><p class="content">留言区</p></strong>
                <comment-container :a-author="adoptionDetailInfo.editor" ref="comments" class="comment"></comment-container>

            </el-card>
            <el-card id="adoption-detail-aside">
                <user-info-box :user-box-info="userBoxInfo"></user-info-box>
            </el-card>
        </el-container>
        <apply-box ref="applyBox"></apply-box>
    </div>
</template>

<script>
    import ApplyBox from './apply-box';
    import CommentContainer from "./comment-container";
    import UserInfoBox from "./user-info-box";
    export default {
        name: "adoption-detail",
        components: {UserInfoBox, CommentContainer, ApplyBox},
        created(){

        },
        data(){
            return{
                userBoxInfo:{

                },
                fullscreenLoading:false,
                tagType:"",
                tagText:"可申请",
                isApplyDisable:false,
                applyText:"联系方式",
                adoptionId:{
                    id:""
                },
                adoptionDetailInfo:{
                    aID:0,
                    adoptionTitle:'',
                    editor:'',
                    adoptionStatus:0,
                    adoptionPosition:'',
                    category:"",
                    gender:"",
                    free: 0,
                    cost:0,
                    adoptionDetailAbstract:'',
                    adoptionDetailRequirement:'',
                    publishDate:'',
                    adoptionImg:[]
                },
                adoptionDetailPhoto:[
                    {id:0,url:require("../assets/loginBG0.jpg")},
                    {id:1,url:require("../assets/loginBG1.jpg")},
                    {id:2,url:require("../assets/loginBG2.jpg")}
                ],
                imgType:"card"
            }
        },
        methods:{
            ensureApply() {
                const that=this;
                this.$confirm('您一天至多可以申请三个送养发布信息的联系方式, 是否继续?（若您申请过该处联系方式则不会累加）', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.showContactInfo();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消申请'
                    });
                });
            },
            showContactInfo:function () {
                let id =parseInt(this.$route.params.id);
                const url='/adoption/apply/'+id;
                const that=this;
                this.$http.post(url).then(function (response) {
                    if(response.data.code===200){
                        console.log(response.data);
                        that.$refs.applyBox.ContactInfo.communicationType=response.data.data.communicationType;
                        that.$refs.applyBox.ContactInfo.communication=response.data.data.communication;
                        that.$refs.applyBox.ContactInfo.username=response.data.data.username;
                        that.$refs.applyBox.applyBoxVisible=true;
                    }
                    that.$message(response.data.message);
                    if(response.data.code===401){
                        that.$router.push("/login");
                    }
                }).catch(function (error) {
                    if(error.response){
                        that.$message({message:error.response.message,
                            type:"warning"});
                    }else{
                        that.$message({message:error.message,
                            type:"warning"});
                    }
                });

            },
            getData:function () {
                //这里AJAX请求拿到服务器的返回信息后再将信息填充显示
                var id =this.$route.params.id;
                id=parseInt(id)
                var url='/adoption/detail/'+id;
                const that=this;
                this.$http.post(url)
                    .then(function (response) {
                        if(response.data.code!==200){
                            alert("error");
                        }
                        else {
                            // console.log(response.data.data);
                            that.adoptionDetailInfo.aID=response.data.data.aID;
                            that.adoptionDetailInfo.editor=response.data.data.editor;
                            that.adoptionDetailInfo.adoptionTitle=response.data.data.aTitle;
                            that.adoptionDetailInfo.adoptionStatus=response.data.data.aState;
                            that.adoptionDetailInfo.adoptionPosition=response.data.data.location;
                            that.adoptionDetailInfo.category=response.data.data.aType;
                            that.adoptionDetailInfo.gender=response.data.data.aSex;
                            that.adoptionDetailInfo.free=response.data.data.free;
                            that.adoptionDetailInfo.cost=response.data.data.aMoney;
                            that.adoptionDetailInfo.adoptionDetailAbstract=response.data.data.aText;
                            that.adoptionDetailInfo.adoptionDetailRequirement=response.data.data.aDetailInfo;
                            that.adoptionDetailInfo.publishDate=response.data.data.publishDate;
                            that.adoptionDetailInfo.adoptionImg=response.data.data.imgPaths;
                            that.$refs.comments.adoptionId=response.data.data.aID;
                            that.$refs.comments.getComments();
                            console.log(that.adoptionDetailInfo.adoptionImg);

                            if(that.adoptionDetailInfo.adoptionStatus!==1){
                                that.isApplyDisable=true;
                                that.applyText="无法申请联系方式";
                                if(that.adoptionDetailInfo.adoptionStatus===4){
                                    that.tagType="danger";
                                    that.tagText="已关闭";
                                }else if(that.adoptionDetailInfo.adoptionStatus===5){
                                    that.tagType="warning";
                                    that.tagText="已完成";
                                }else if(that.adoptionDetailInfo.adoptionStatus===6){
                                    that.tagType="warning";
                                    that.tagText="已进入确认流程";
                                }

                            }

                        }
                        that.fullscreenLoading=false;
                    })
                    .catch(function (error) {
                        console.log(error);
                        that.fullscreenLoading=false;
                    });

            }
        },
        mounted(){
            const that=this;
            this.fullscreenLoading=true;
            this.getData();


            window.onresize=()=>{
                return(()=>{
                    window.screenWidth=document.body.clientWidth;
                    that.screenWidth=window.screenWidth;
                    if(that.screenWidth<800){
                        that.imgType="";
                    }
                    else {
                        that.imgType="card";
                    }
                })()
            }
        }
    }
</script>

<style scoped>
    .content{
        text-align: left;
        margin-bottom: 2em;
    }
    #adoption-detail-card{
        margin-left: 3%;
        padding-right: 2%;
        width: 60%;
        margin-top: 20px;
    }
    .comment{
        margin:0.5em;
    }
    #adoption-detail-aside{

        margin-left: 2%;
        width:25%;
        margin-top: 20px;
    }



    .adoptionDetailPhoto{
        margin: 0.5em;
        width: 11vw;
        height:11vw;
        object-fit: cover;
        border: gray;
        border-width: 1px;
        border-style: solid;
        border-radius: 0.2em;
        transition: 0.5s;
        /*width: 100%;*/
        /*display: block;*/
    }
    .adoptionDetailPhoto:hover{

        transform:scale(1.05);
    }
    .AdoptionBtn{
        text-align: right;
    }
    #locate{
        margin-bottom: 2px;
    }
</style>