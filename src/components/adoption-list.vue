<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <el-card id="searchBox">
            <el-form ref="searchForm" :model="pageQuery">
                <el-form-item label="搜索标题">
                    <el-input v-model="pageQuery.searchText" placeholder="默认不指定" :maxlength="16" ></el-input>
                </el-form-item>
                <el-form-item label="选择类型">
                    <el-select size="large" v-model="pageQuery.kindSelect" placeholder="默认全部种类" clearable>
                        <el-option label="宠物狗" value="狗"></el-option>
                        <el-option label="宠物猫" value="猫"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择地区">
                    <el-select size="large" v-model="pageQuery.location" filterable placeholder="默认所有地区" clearable>
                        <el-option label="嘉定" value="嘉定"></el-option>
                        <el-option label="杨浦" value="杨浦"></el-option>
                        <el-option label="虹口" value="虹口"></el-option>
                        <el-option label="普陀" value="普陀"></el-option>
                        <el-option label="宝山" value="宝山"></el-option>
                        <el-option label="徐汇" value="徐汇"></el-option>
                        <el-option label="静安" value="静安"></el-option>
                        <el-option label="黄浦" value="黄浦"></el-option>
                        <el-option label="松江" value="松江"></el-option>
                        <el-option label="奉贤" value="奉贤"></el-option>
                        <el-option label="闵行" value="闵行"></el-option>
                        <el-option label="长宁" value="长宁"></el-option>
                        <el-option label="青浦" value="青浦"></el-option>
                        <el-option label="崇明" value="崇明"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button circle @click="searchUpdate"><i class="el-icon-search"></i></el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <div id="listContainer">
            <list-item v-for="(item, index) in listArray" :key="index" :adoption-data="item"></list-item>
        </div>
        <div id="pageTurner">
            <el-pagination ref="pager"
                    layout="prev, pager, next"
                    :page-size="20"
                    :total="totalItems"
                    :current-page.sync="page"
                    @current-change="pageUpdate">
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
                page:1,
                pageQuery:{
                    kindSelect:"",
                    location:"",
                    searchText:"",
                },
                fullscreenLoading:false,
            }

        },
        methods:{
            pageUpdate(){
                this.update();
            },
            searchUpdate(){
                this.page=1;
                this.update();
            },
            update(){
                this.fullscreenLoading=true;
                this.listArray=[];
                const that=this;
                let jsonData={
                    searchText:this.pageQuery.searchText,
                    regionSelect:this.pageQuery.location,
                    kindSelect:this.pageQuery.kindSelect,
                    page:this.page
                };
                if(!jsonData.regionSelect||jsonData.regionSelect==="")jsonData.regionSelect="All";
                if(!jsonData.kindSelect||jsonData.kindSelect==="")jsonData.kindSelect="All";
                this.$http.post('/adoption',jsonData).then(function (response) {
                    if(response.data.code===200){
                        that.totalItems=response.data.data.number;
                        that.listArray=response.data.data.list;
                    }
                    that.fullscreenLoading=false;
                    that.$message(response.data.message);
                    if(response.data.code===401){
                        that.$router.push("/login");
                    }
                }).catch(function (error) {

                    that.fullscreenLoading=false;
                    if(error.response){
                        that.$message({message:error.response.message,
                        type:"warning"});
                    }else{
                        that.$message({message:error.message,
                            type:"warning"});
                    }

                })
            }

        },
        mounted(){
            this.update();
        }
    }
</script>

<style scoped>
    #listContainer{
        margin:4%;
        width: 60%;
    }
    #searchBox{
        position: fixed;
        right:2%;
        top:8em;
        width: 30%;
    }
    #pageTurner{
        margin: 3%;
    }
    @media (max-width: 900px) {
        #listContainer{
            width: 90%;
        }
        #searchBox{
            position: static;
            margin:4% 4% 5% 4%;
            width: 90%;
        }
    }

</style>