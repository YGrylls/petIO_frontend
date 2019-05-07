<template>
    <el-card id="personalItem">
        <div id="personalContent" @click="gotoDetail">
            <h4>{{publishmentData.aTitle}}</h4>
            <el-row>
                <el-col align="left"><i class="el-icon-time">起始时间：{{publishmentData.publishDate}}</i></el-col>
            </el-row>
            <el-row>
                <el-col align="left"><i class="el-icon-time">结束时间：{{publishmentData.expireDate}}</i></el-col>
            </el-row>
        </div>
        <el-button class="choice" size="mini" type="info" icon="el-icon-circle-plus">延时</el-button>
        <el-button class="choice" size="mini" type="danger" icon="el-icon-delete" @click="open2">删除</el-button>

        <img id="adoptionImg" :src="selectImg()">
    </el-card>
</template>

<script>
    import catPic from '../assets/cat.png';
    import dogPic from '../assets/dog.png';
    export default {
        name: "personal-item",
        props:["publishmentData"],
        methods:{
            selectImg:function () {
                if(this.publishmentData.aType=="狗"){
                    return dogPic;
                }
                else {
                    return catPic;
                }

            },
            gotoDetail:function () {
                this.$router.push("/adoption/detail/"+this.publishmentData.aID);
            },
            open2:function () {
                const that=this;
                this.$confirm('此操作将永久删除该帖, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var demand="/userinfo/delete/"+that.publishmentData.aID;
                    // console.log(demand);
                    const confirm=this;
                    this.$http.post(demand)
                        .then(function (response) {
                            if(response.data.code==200){
                                confirm.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                that.$emit("listenToChildEvent");
                            }
                            else {
                                confirm.$message({
                                    type: 'error',
                                    message: '删除失败!'
                                });
                            }
                        })
                        .catch(function (error) {
                            confirm.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
                            console.log(error)
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style scoped>
    #personalContent{
        z-index: 100;
        position: relative;
    }
    #personalItem{
        position: relative;
        text-align: left;
        padding: 0 1.5em 0 1.5em;
        margin: 1.6em;
    }
    #personalItem:hover{
        transform: scale(1.03);
    }
    #adoptionImg{
        position: absolute;
        right:5%;
        bottom: -5%;
        height: 85%;
        opacity:0.6;
    }
    .choice{
        margin-top: 4px;
        font-size: 0.5rem;
    }
    .choice:hover{
        transform: scale(1.05);
    }
</style>