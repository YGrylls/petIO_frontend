<template>
    <el-menu :default-active="activeIndex1" class="el-menu-demo" mode="horizontal"
             @select="handleSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">领养</el-menu-item>
        <el-menu-item index="3">送养</el-menu-item>
        <el-menu-item index="4">关于我们</el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "adoption-detail",
        data(){
            return{
                activeIndex1:'1'
            }
        }
    }
</script>

<style scoped>

</style>