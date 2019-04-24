<template>
    <el-card ref="itemCard" id="cardContainer">
        <div @click="viewDetail" id="content">
            <h3>{{adoptionData.aTitle}}</h3>
            <p>{{adoptionData.editor}} 送养的 {{adoptionData.aType}}</p>
            <p><i class="el-icon-location"></i> {{adoptionData.location}}</p>
            <p id="pubDate"><i class="el-icon-date"></i> {{adoptionData.publishDate}}</p>
            <!--<p id="readCount"><i class="el-icon-view"></i> {{adoptionData.aRead}}</p>-->
        </div>
        <img id="backgroundType" :src="decideType()"/>
    </el-card>
</template>

<script>
    import catPic from '../assets/cat.png';
    import dogPic from '../assets/dog.png';
    export default {
        name: "list-item",
        props:["adoptionData"],
        methods:{
            decideType(){
                if(this.adoptionData.aType==="猫"){
                    return catPic;
                }
            return dogPic;
            },
            viewDetail(){
                this.$router.push("/adoption/detail/"+this.adoptionData.aID);
            }
        },
        mounted(){

        },
    }
</script>

<style scoped>
    #content{
        z-index: 100;
        position: relative;
    }
    #cardContainer{
        position: relative;
        text-align: left;
        padding: 0 1.5em 0 1.5em;
        margin-bottom: 1.5em;
    }
    #cardContainer:hover{
        transform: scale(1.05);
    }
    #backgroundType{
        position: absolute;
        right:5%;
        bottom: -5%;
        height: 85%;
        opacity:0.6;
    }
</style>