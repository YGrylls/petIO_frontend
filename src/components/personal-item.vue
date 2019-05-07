<template>
    <el-card id="personalItem">
        <div id="personalContent">
            <h1>{{publishmentData.aID}}</h1>
        </div>
        <img id="adoptionImg" :src="selectImg()">
    </el-card>
</template>

<script>
    import catPic from '../assets/cat.png';
    import dogPic from '../assets/dog.png';
    export default {
        name: "personal-item",
        props:["publishmentData"],
        methods:{
            selectImg:function () {
                return catPic;
            }
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