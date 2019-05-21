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
            <comment-info v-for="(item,index) in comments" :comment="item" :key="index" ></comment-info>
        </div>
    </div>
</template>

<script>
    import CommentInfo from "./comment-info";
    export default {
        name: "comment-container",
        components: {CommentInfo},
        data(){
            return{
                adoptionId:-1,
                commentForm:{
                    toUser:"",
                    commentText:"",

                },
                isComment:false,
                btnTxt:"发布留言",
                rule:{
                    commentText:[
                        {required:true, message:"请输入"},
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
            showUser(){
                const that=this;
                this.$http.get("/userinfo/info")
                    .then(function (response) {
                        if(response.data.code!==200){
                            that.isComment=true;
                            that.btnTxt="请先登录";
                        }
                    })
                    .catch(function () {
                        that.isComment=true;
                        that.btnTxt="请先登录";
                    })
            },
            getComments(){
                const that=this;
                this.$http.get("/comment/get/"+this.adoptionId).then((res)=>{

                }).catch((err)=>{

                })

            },
            publishComment(){
                const that=this;
                this.$http.post("/comment/publish",{
                    aID:this.adoptionId,    //int
                    toUsername:this.toUser,     //string username
                    commentText:this.commentText //string
                }).then((res)=>{

                }).catch((err)=>{

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