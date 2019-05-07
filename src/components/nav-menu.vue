<template>
    <el-menu :default-active="activeIndex1" class="el-menu-demo" mode="horizontal"
             @select="handleSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
        <el-menu-item index="1" @click="gotoPersonal">个人中心</el-menu-item>
        <el-menu-item index="2" @click="gotoAdoptionList">领养</el-menu-item>
        <el-menu-item index="3" @click="gotoAdoptionPublish">送养</el-menu-item>
        <img id="logoPic" src="../assets/petIO.png"/>
    </el-menu>
</template>

<script>
    export default {
        name: "nav-menu",
        data(){
            return{
                activeIndex1:''
            }
        },
        created(){
            this.activeIndex1=this.getIndex();
        },
        methods:{
            getIndex(){
                if(this.$route.path=="/adoption/personal"){
                    return "1";
                }
                else if(this.$route.path=="/adoption/list"){
                    return "2";
                }
                else if(this.$route.path=="/adoption/publish"){
                    return "3";
                }
                return "2";
            },
            handleSelect(){
                //TO BE DONE
            },
            gotoPersonal(){
                this.$router.push("/adoption/personal")
            },
            gotoAdoptionList(){
                this.$router.push("/adoption/list")
            },
            gotoAdoptionPublish(){
                this.$router.push("/adoption/publish")
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