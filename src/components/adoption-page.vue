<template>
    <div>
        <nav-menu v-bind:apply-unread="applyUnread" v-bind:comment-unread="commentUnread"></nav-menu>
        <router-view @showCommentUnreadNum="showCommentUnreadNum" @showApplyUnreadNum="showApplyUnreadNum"></router-view>
    </div>
</template>

<script>
    import NavMenu from './nav-menu';
    export default {
        name: "adoption-page",
        components:{NavMenu},
        data(){
            return{
                applyUnread:0,
                commentUnread:0
            }
        },
        created(){
            this.getUnread();
        },
        methods:{
            getUnread(){
                const that=this;
                this.$http.get("/comment/unread")
                    .then(function (response) {
                        if(response.data.code===200) {
                            that.commentUnread = response.data.data.number;
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
                this.$http.get("/apply/ownerunread")
                    .then(function (response) {
                        if(response.data.code===200){
                            that.applyUnread=response.data.data.number;
                        }
                        // console.log(response)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            showCommentUnreadNum(data){
                console.log(data);
                this.commentUnread=data;
                this.getUnread();
            },
            showApplyUnreadNum(data){

                this.applyUnread=data;
                this.getUnread();
            }
        }
    }
</script>

<style scoped>

</style>