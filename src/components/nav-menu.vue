<template>
    <el-menu :default-active="activeIndex1" class="el-menu-demo" mode="horizontal"
             @select="handleSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
        <img id="logoPic" src="../assets/petIO.png"/>
        <!--<el-menu-item index="1" @click="gotoPersonal">个人中心</el-menu-item>-->
        <el-menu-item index="2" @click="gotoAdoptionList">领养</el-menu-item>
        <el-menu-item index="3" @click="gotoAdoptionPublish">送养</el-menu-item>
        <el-menu-item v-if="loginStatus!==200" index="1" class="personal" @click="gotoPersonal">登录</el-menu-item>
        <el-submenu v-if="loginStatus===200" index="1" class="personal">
            <template slot="title">你好！{{userName}}</template>
            <el-menu-item index="1-1" @click="gotoPersonal">
                评论
                <el-badge v-if="commentUnread!=0" :value="commentUnread" :max="99" class="item">
                </el-badge>
            </el-menu-item>
            <el-menu-item index="1-2" @click="gotoPersonal">
                申请
                <el-badge v-if="applyUnread!=0" :value="applyUnread" :max="99" class="item">
                </el-badge>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "nav-menu",
        data(){
            return{
                activeIndex1:'',
                loginStatus:0,
                applyUnread:0,
                commentUnread:0,
                userName:''
            }
        },
        created(){
            this.activeIndex1=this.getIndex();
            this.getUnread();
        },
        methods:{
            getUnread(){
                const that=this;
                this.$http.get("/comment/unread")
                    .then(function (response) {
                        that.loginStatus=response.data.code;
                        if(that.loginStatus===200) {
                            that.commentUnread = response.data.data.number;
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
                this.$http.get("/apply/unread")
                    .then(function (response) {
                        that.loginStatus=response.data.code;
                        if(that.loginStatus===200){
                            that.applyUnread=response.data.data.number;
                        }
                        // console.log(response)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                this.$http.get("/userinfo/info")
                    .then(function (response) {
                        that.loginStatus=response.data.code;
                        if(that.loginStatus===200){
                            that.userName=response.data.data.username;
                        }
                        // console.log(response)
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
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
                if(this.loginStatus===400){
                    this.$router.push("/login");
                }
                else {
                    this.$router.push("/adoption/personal")
                }

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
        float:left;
        margin-top:-0.3em;
        margin-left:3em;
        margin-right: 1em;
    }
    .personal{
        float: right;
        margin-right: 5em;
    }
    #search{
        text-align: right;
    }
</style>