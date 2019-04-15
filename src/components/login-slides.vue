<template>
    <div>
        <el-carousel :height="viewHeight">
            <el-carousel-item v-for="(item,index) in list" :key="index" >
                <div :class="item" ></div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        name: "login-slides",
        data(){
            return{
                list:["slideImg0","slideImg1","slideImg2"],
                viewHeight:"300px"
            }
        },
        mounted(){
            const that=this;
            this.viewHeight=document.body.clientHeight.toString()+"px";
            window.addEventListener("resize",function () {
                that.viewHeight=document.body.clientHeight.toString()+"px";
            },false)
        }
    }
</script>

<style scoped>
    #loginBackground{
        height:100%;
        width: 100%;
        padding:0;
        margin: 0;
    }
    .slideImg0{
        height:100%;
        width:100%;
        background-image: url("../assets/loginBG0.jpg");
        background-size:cover;
        background-position: center;
    }
    .slideImg1{
        height:100%;
        width:100%;
        background-image: url("../assets/loginBG1.jpg");
        background-size:cover;
        background-position: center;
    }
    .slideImg2{
        height:100%;
        width:100%;
        background-image: url("../assets/loginBG2.jpg");
        background-size:cover;
        background-position: center;
    }
</style>