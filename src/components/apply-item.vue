<template>
    <el-card id="personalItem">
        <div id="personalContent" @click="gotoDetail">
            <h4>{{applyData.aTitle}}</h4>
            <el-row>
                <el-col align="left"><i class="el-icon-time">起始时间：{{applyData.publishDate}}</i></el-col>
            </el-row>
            <el-row>
                <el-col align="left"><i class="el-icon-time">结束时间：{{applyData.expireDate}}</i></el-col>
            </el-row>
        </div>

        <img id="adoptionImg" :src="selectImg()">
    </el-card>
</template>

<script>
    import catPic from '../assets/cat.png';
    import dogPic from '../assets/dog.png';
    export default {
        name: "apply-item",
        props:["applyData"],
        methods:{
            selectImg:function () {
                if(this.applyData.aType=="狗"){
                    return dogPic;
                }
                else {
                    return catPic;
                }

            },
            gotoDetail:function () {
                this.$router.push("/adoption/detail/"+this.applyData.aID);
            },
        }
    }
</script>

<style scoped>
    #personalContent{
        z-index: 100;
        position: relative;
    }
    #personalItem{
        position: relative;
        text-align: left;
        padding: 0 1.5em 0 1.5em;
        margin: 1.6em;
    }
    #personalItem:hover{
        transform: scale(1.03);
    }
    #adoptionImg{
        position: absolute;
        right:5%;
        bottom: -5%;
        height: 85%;
        opacity:0.6;
    }
</style>