<template>
    <div>
        <div>
            <el-card id="commentPublish">
                <el-form :model="commentForm" :rules="rule" label-position="top">
                    <el-form-item label="发表留言" prop="commentText">
                        <el-input v-model="commentForm.commentText" :maxlength="140" placeholder="留言至多140字哦" type="textarea">
                        </el-input>
                    </el-form-item>
                    <el-button :disabled="isComment" @click="publishComment" type="primary">{{btnTxt}}</el-button>
                </el-form>
            </el-card>
        </div>
        <div id="commentList">
            <comment-info v-for="(item,index) in comments" :comment="item" :key="index" :a-author="aAuthor" ></comment-info>
        </div>
    </div>
</template>

<script>
    import CommentInfo from "./comment-info";
    export default {
        name: "comment-container",
        components: {CommentInfo},
        props:["aAuthor"],
        computed:{
            btnTxt(){
                if(!this.isLogin) return "请先登录";
                else{
                    if(this.commentForm.toUser!=="")return "回复 "+this.commentForm.toUser;
                    else return "发表留言";
                }
            }
        },
        data(){
            return{
                adoptionId:-1,
                commentForm:{
                    toUser:"",
                    commentText:"",
                },
                isComment:false,
                isLogin:true,
                rule:{
                    commentText:[
                        {min:1},
                        {max:140,min:1, message:"留言至多140字"}
                    ]
                },
                comments:[]



            }


        },
        mounted(){
            this.showUser();
        },
        methods:{
            changeToUser(user){
                this.commentForm.toUser=user;
                //console.log(user);
            },
            showUser(){
                const that=this;
                this.$http.get("/userinfo/info")
                    .then(function (response) {
                        if(response.data.code!==200){
                            that.isComment=true;
                            that.isLogin=false;
                        }
                    })
                    .catch(function () {
                        that.isComment=true;
                        that.isLogin=false;
                    })
            },
            getComments(){
                const that=this;
                this.$http.get("/comment/get/"+this.adoptionId).then((res)=>{
                    if(res.data.code===200){
                        that.comments=res.data.data;
                    }else{
                        that.$message({
                            type:"warning",
                            message:res.data.message
                        })
                    }
                }).catch(()=>{
                    that.$message({
                        type:"warning",
                        message:"Network Error"
                    })
                })

            },
            publishComment(){
                const that=this;
                this.$http.post("/comment/publish",{
                    aID:this.adoptionId,    //int
                    toUsername:this.commentForm.toUser,     //string username
                    commentText:this.commentForm.commentText //string
                }).then((res)=>{
                    if(res.data.code===200){
                        that.$message("留言成功");
                        that.commentForm.toUser="";
                        that.commentForm.commentText="";
                        that.getComments();
                    }
                    else{
                        that.$message({
                            type:"warning",
                            message:res.data.message
                        });
                        if(res.data.code===401){
                            that.$router.push("/login");
                        }
                    }
                }).catch(()=>{
                    that.$message({
                        type:"warning",
                        message:"Network Error"
                    })
                })
            }
        }




    }
</script>

<style scoped>
    #commentPublish{
        text-align: left;
        padding: 1em;
    }
</style>