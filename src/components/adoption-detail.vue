<template>
    <div style="margin-bottom: 2em">
        <el-container>
            <el-card id="adoption-detail-card">
                <el-row>
                    <el-col :span="16"><h2 class="content">{{adoptionDetailInfo.adoptionTitle}}</h2></el-col>
                    <el-col :span="4" :offset="4">
                        <el-button type="text" v-if="adoptionDetailInfo.adoptionStatus==0" class="AdoptionBtn">未领养</el-button>
                        <el-button type="text" v-else class="AdoptionBtn">未领养</el-button>
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
                    <el-col :span="12" class="AdoptionBtn"><el-button type="primary" @click="ensureApply">申请领养</el-button></el-col>
                </el-row>
                <!--<strong><p class="content">宠物相册</p></strong>-->
                <!--<viewer :images="adoptionDetailInfo.adoptionImg">-->
                    <!--<img class="adoptionDetailPhoto" v-for="src in adoptionDetailInfo.adoptionImg" :src="src" :key="src">-->
                <!--</viewer>-->
                <!--<el-carousel ref="DetailPhoto" :interval="4000" :type="imgType" >-->
                    <!--<el-carousel-item v-for="item in adoptionDetailInfo.adoptionImg" :key="item.id">-->
                        <!--&lt;!&ndash;<h3>{{ item }}</h3>&ndash;&gt;-->
                        <!--<img class="adoptionDetailPhoto" v-bind:src="item" />-->
                    <!--</el-carousel-item>-->
                <!--</el-carousel>-->
                <strong><p class="content">领养要求</p></strong>
                <p class="content">{{adoptionDetailInfo.adoptionDetailRequirement}}</p>
                <strong><p class="content">宠物照片</p></strong>
                <viewer :images="adoptionDetailInfo.adoptionImg">
                    <img class="adoptionDetailPhoto" v-for="src in adoptionDetailInfo.adoptionImg" :key="src"  :src="src" >
                </viewer>
                <strong><p class="content">宠物简介</p></strong>
                <p class="content">{{adoptionDetailInfo.adoptionDetailAbstract}}</p>
                <strong><p class="content">留言区</p></strong>
                <comment-container :a-author="adoptionDetailInfo.editor" ref="comments" class="comment"></comment-container>

            </el-card>
            <el-card id="adoption-detail-aside">
                <h2>发布人信息</h2>
                <p>To be done</p>
                <!--<viewer :images="adoptionDetailInfo.adoptionImg">-->
                    <!--<img class="adoptionDetailPhoto" v-for="src in adoptionDetailInfo.adoptionImg" :key="src"  :src="src" >-->
                <!--</viewer>-->
                <!--<el-row>-->
                    <!--<el-col :span="8"><p>领养推荐</p></el-col>-->
                    <!--<el-col :span="4" :offset="12"><el-button type="text">更多</el-button></el-col>-->
                <!--</el-row>-->
            </el-card>
        </el-container>
        <apply-box ref="applyBox"></apply-box>
    </div>
</template>

<script>
    import ApplyBox from './apply-box';
    import CommentContainer from "./comment-container";
    export default {
        name: "adoption-detail",
        components: {CommentContainer, ApplyBox},
        created(){
            this.getData();
        },
        data(){
            return{
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
                this.$confirm('此操作将申请领养该宠物, 是否继续?', '提示', {
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
                        }
                    })
                    .catch(function (error) {
                        alert(error);
                    })
                
            }
        },
        mounted(){
            const that=this;
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