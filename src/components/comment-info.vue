<template>
    <el-card id="oneComment">
        <div id="flexBox">
            <div id="content">
                <p><span class="userText">{{fromUserCheck()}}:</span></p>
                <p><span v-if="ifToVisible()" class="userText toUser">回复 @{{comment.toUser}}  </span> {{comment.commentText}}</p>
                <p id="pubtime"> <i class="el-icon-date"></i> {{comment.pubtime}}</p>
            </div>
            <div id="buttonDiv">
                <el-button  @click="commentBtn" id="commentBtn" type="primary">
                    回复
                </el-button>
            </div>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "comment-info",
        props:["comment","aAuthor","father"],
        methods:{
            ifToVisible(){
                return (this.comment.toUser && this.comment.toUser!=="");
            },
            fromUserCheck(){
                if(this.comment.fromUser===this.aAuthor)return (this.comment.fromUser+" (发布者)");
                else return this.comment.fromUser;
            },
            commentBtn(){
                this.$parent.$el.scrollIntoView();
                this.$parent.changeToUser(this.comment.fromUser);
            }
        }
    }
</script>

<style scoped>
    #oneComment{
        padding-left: 0.5em;
        text-align: left;
        padding-bottom:1em;

    }
    #flexBox{
        display:flex;
        flex-wrap: nowrap;
    }
    .userText{
        font-weight: bold;
        color: #409eff;
    }
    .toUser{
        font-style: italic;
    }
    #pubtime{
        font-size: 0.8em;
        color:gray;
        font-style: italic;
    }
    #commentBtn{
        width: 100%;
        align-self:flex-end;

    }
    #content{
        width: 75%;
    }
    #buttonDiv{
        width: 20%;
        display:flex;
    }

</style>