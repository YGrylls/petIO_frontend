<template>
    <el-card ref="itemCard" id="cardContainer">
        <div @click="viewDetail" id="content">
            <h3>{{adoptionData.aTitle}}</h3>
            <div style="display: flex">
                <div style="width: 60%">
                    <p>{{adoptionData.editor}} 送养的 {{adoptionData.aType}}</p>
                    <p><i class="el-icon-location"></i> {{adoptionData.location}}  <i class="el-icon-date"></i> {{adoptionData.publishDate}}</p>
                    <p>{{testShow}}</p>
                </div>
                <img v-if="adoptionData.imgPaths" class="adoptionPhoto" :src="adoptionData.imgPaths[0]" >
            </div>
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
        computed:{
            testShow(){
                let fix="";
                if(this.adoptionData.aText.length>45){
                    fix="...";
                }
                return this.adoptionData.aText.slice(0,45)+fix;
            }
        },
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

        width: 160px;
        opacity:0.6;
    }
    .adoptionPhoto{
        margin: 0.5em;
        width: 120px;
        height:120px;
        object-fit: cover;
        border: gray;
        border-width: 1px;
        border-style: solid;
        border-radius: 0.2em;
        transition: 0.5s;
    }
    .adoptionPhoto:hover{

        transform:scale(1.05);
    }
</style>