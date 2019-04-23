<template>
    <el-menu :default-active="activeIndex1" class="el-menu-demo" mode="horizontal"
             @select="handleSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
        <el-menu-item index="1">个人中心</el-menu-item>
        <el-menu-item index="2">领养</el-menu-item>
        <el-menu-item index="3">送养</el-menu-item>
        <img id="logoPic" src="../assets/petIO.png"/>
    </el-menu>
</template>

<script>
    export default {
        name: "nav-menu",
        data(){
            return{
                activeIndex1:'2'
            }
        },
        methods:{
            handleSelect(){
                //TO BE DONE
            }
        }
    }
</script>

<style scoped>
    #logoPic{
        height:4em;
        float:right;
        margin-top:-0.3em;
        margin-right:1em;
    }
    #search{
        text-align: right;
    }
</style>