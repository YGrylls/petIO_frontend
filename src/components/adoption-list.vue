<template>
    <div>
        <div id="listContainer">
            <list-item v-for="(item, index) in listArray" :key="index" :adoption-data="item"></list-item>
        </div>
        <div>
            <el-pagination
                    layout="prev, pager, next"
                    :page-size="20"
                    :total="totalItems"
                    @current-change="pageSlide">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import ListItem from "./list-item";
    export default {
        name: "adoption-list",
        components: {ListItem},
        data(){
            return {
                listArray:[],
                totalItems:100,
            }

        },
        methods:{
            pageSlide(currentPage){
                this.$message(currentPage.toString());
            }

        },
        mounted(){
            this.listArray=[{ //for test use
                aTitle:"测试狗-很可爱的测试狗",
                editor:"赵伟zw666",
                aType:"猫",
                aRead:56,
                location:"上海",
                publishDate:"2019-4-20"
            },
            {
                aTitle:"测试狗-很可爱的测试狗",
                editor:"赵伟zw666",
                aType:"狗",
                aRead:56,
                location:"上海",
                publishDate:"2019-4-20"
            },
            {
                aTitle:"测试狗-很可爱的测试狗",
                editor:"赵伟zw666",
                aType:"狗",
                aRead:56,
                location:"上海",
                publishDate:"2019-4-20"
            },

            ]
        }
    }
</script>

<style scoped>
    #listContainer{
        margin:4%;
        width: 70%;
    }

</style>