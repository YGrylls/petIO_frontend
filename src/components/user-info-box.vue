<template>
    <div id="container">
        <h3>To Be Done</h3>
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