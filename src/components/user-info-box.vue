<template>
    <div id="container">
        <h1 style="font-size: 3em">{{userBoxInfo.username}}</h1>
        <h4>发布过的送养发布: <span style="color: #409EFF">{{userBoxInfo.adoptionNum}}</span></h4>
        <h4>已完成的送养发布: <span style="color: #409EFF">{{userBoxInfo.completeAdoptionNum}}</span></h4>
        <h4>已完成的领养申请: <span style="color: #409EFF">{{userBoxInfo.completeApplyNum}}</span></h4>
    </div>
    
</template>

<script>
    export default {
        name: "user-info-box",
        props:["userBoxInfo"]
    }
</script>

<style scoped>
    #container{
        padding:0.5em;
    }
</style>