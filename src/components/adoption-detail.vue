<template>
    <div>
        <el-container>
            <el-card id="adoption-detail-card">
                <el-row>
                    <el-col :span="16"><h2 class="content">{{adoptionDetailInfo.adoptionTitle}}</h2></el-col>
                    <el-col :span="4" :offset="4">
                        <el-button type="text" v-if="adoptionDetailInfo.adoptionStatus==0" class="AdoptionBtn">未领养</el-button>
                        <el-button type="text" v-else class="AdoptionBtn">未领养</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col align="left"><i class="el-icon-location-outline">{{adoptionDetailInfo.adoptionPosition}}</i></el-col>
                </el-row>
                <el-row>
                    <el-col :span="3"><p>类型：<strong>{{adoptionDetailInfo.category}}</strong></p></el-col>
                    <el-col :span="3">
                        <p v-if="adoptionDetailInfo.gender==0">性别：<strong>公</strong></p>
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
                    <el-col :span="12" class="AdoptionBtn"><el-button type="primary" @click="showContactInfo">联系方式</el-button></el-col>
                </el-row>
                <hr/>
                <strong><p class="content">宠物相册</p></strong>
                <el-carousel ref="DetailPhoto" :interval="4000" :type="imgType" >
                    <el-carousel-item v-for="item in adoptionDetailPhoto" :key="item.id">
                        <!--<h3>{{ item.url }}</h3>-->
                        <img class="adoptionDetailPhoto" v-bind:src="item.url" />
                    </el-carousel-item>
                </el-carousel>
                <hr/>
                <strong><p class="content">宠物简介</p></strong>
                <p class="content">{{adoptionDetailInfo.adoptionDetailAbstract}}</p>
                <hr/>
                <strong><p class="content">领养要求</p></strong>
                <p class="content">{{adoptionDetailInfo.adoptionDetailRequirement}}</p>
            </el-card>
            <el-card id="adoption-detail-aside">
                <el-row>
                    <el-col :span="8"><p>领养推荐</p></el-col>
                    <el-col :span="4" :offset="12"><el-button type="text">更多</el-button></el-col>
                </el-row>
            </el-card>
        </el-container>
        <apply-box ref="applyBox"></apply-box>
    </div>
</template>

<script>
    import ApplyBox from './apply-box';
    export default {
        name: "adoption-detail",
        components: {ApplyBox},
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
                    adoptionStatus:0,
                    adoptionPosition:'',
                    category:"",
                    gender:"",
                    free: 0,
                    cost:0,
                    adoptionDetailAbstract:'',
                    adoptionDetailRequirement:''
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
            showContactInfo:function () {
                let id =parseInt(this.$route.params.id);
                const url='/adoption/apply/'+id;
                const that=this;
                this.$http.post(url).then(function (response) {
                    if(response.data.code===200){
                        that.$refs.applyBox.ContactInfo.Id=response.data.data.username;
                        that.$refs.applyBox.ContactInfo.Name=response.data.data.username;
                        that.$refs.applyBox.ContactInfo.Contact=response.data.data.userTel;
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
                            that.adoptionDetailInfo.aID=response.data.data.aID;
                            that.adoptionDetailInfo.adoptionTitle=response.data.data.aTitle;
                            that.adoptionDetailInfo.adoptionStatus=response.data.data.aState;
                            that.adoptionDetailInfo.adoptionPosition=response.data.data.location;
                            that.adoptionDetailInfo.category=response.data.data.aType;
                            that.adoptionDetailInfo.gender=response.data.data.aSex;
                            that.adoptionDetailInfo.free=response.data.data.free;
                            that.adoptionDetailInfo.cost=response.data.data.aMoney;
                            that.adoptionDetailInfo.adoptionDetailAbstract=response.data.data.aText;
                            that.adoptionDetailInfo.adoptionDetailRequirement=response.data.data.aDetailInfo;
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
                    if(that.screenWidth<1000){
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
    }
    #adoption-detail-card{
        margin-left: 3%;
        padding-right: 2%;
        width: 60%;
        margin-top: 20px;
    }
    #adoption-detail-aside{

        margin-left: 2%;
        width:25%;
        margin-top: 20px;
    }
    .adoptionDetailPhoto{
        width: 100%;
        height: auto;
        display: block;
    }
    .AdoptionBtn{
        text-align: right;
    }
</style>