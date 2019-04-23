<template>
    <div>
        <el-container>
            <el-card id="adoption-detail-card">
                <el-row>
                    <el-col :span="16"><h2 class="content">{{adoptionDetailInfo.adoptionTitle}}</h2></el-col>
                    <el-col :span="4" :offset="4">
                        <el-button type="text" class="AdoptionBtn">{{adoptionDetailInfo.adoptionStatus}}</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col align="left"><i class="el-icon-location-outline">{{adoptionDetailInfo.adoptionPosition}}</i></el-col>
                </el-row>
                <el-row>
                    <el-col :span="3"><p>类型：<strong>{{adoptionDetailInfo.category}}</strong></p></el-col>
                    <el-col :span="3"><p>性别：<strong>{{adoptionDetailInfo.gender}}</strong></p></el-col>
                    <el-col :span="3"><p>免费：<strong>{{adoptionDetailInfo.free}}</strong></p></el-col>
                    <el-col :span="3"><p>金额：<strong>￥{{adoptionDetailInfo.cost}}</strong></p></el-col>
                    <el-col :span="12" class="AdoptionBtn"><el-button type="primary" @click="showContactInfo">联系方式</el-button></el-col>
                </el-row>
                <hr/>
                <strong><p class="content">宠物相册</p></strong>
                <el-carousel :interval="4000" type="card" >
                    <el-carousel-item v-for="item in adoptionDetailPhoto" :key="item.id">
                        <h3>{{ item.url }}</h3>
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
        data(){
            return{
                adoptionDetailInfo:{
                    adoptionTitle:'异瞳白猫弟弟-成都宠物领养',
                    adoptionStatus:'未领养',
                    adoptionPosition:'成都/双流文星临江丽苑三期b区',
                    category:"小猫",
                    gender:"公",
                    free:"免费",
                    cost:"0",
                    adoptionDetailAbstract:'2018.07 山上救助的流浪狗 流浪没人搭理 自己还是只狗宝宝 就在在垃圾堆生了一娃狗仔子！靠吃垃圾为维持 怕它营养不良暴毙 一大家子8只一起救的 奶狗们都已安稳 只剩可怜兮兮的它自己 它身体非常健康 一直在寄养现已节育 可以送养 希望你们可以给它个家',
                    adoptionDetailRequirement:'成都本地人'
                },
                adoptionDetailPhoto:[
                    {id:0,url:require("../assets/loginBG0.jpg")},
                    {id:1,url:require("../assets/loginBG1.jpg")},
                    {id:2,url:require("../assets/loginBG2.jpg")}
                ],
            }
        },
        methods:{
            showContactInfo:function () {
                //这里AJAX请求拿到服务器的返回信息后再将信息填充显示
                this.$refs.applyBox.applyBoxVisible=true;
            },
        },
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
        width: auto;
        height: 100%;
        display: block;
    }
    .AdoptionBtn{
        text-align: right;
    }
</style>