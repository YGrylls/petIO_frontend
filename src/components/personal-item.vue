<template>
    <div>
        <el-card id="personalItem">
            <div id="personalContent" @click="gotoDetail">
                <h4>{{publishmentData.aTitle}} <span><el-tag :type="tagType" id="state" >{{getState}}</el-tag></span></h4>
                <el-row>
                    <el-col align="left"><i class="el-icon-time">刷新时间：{{publishmentData.publishDate}}</i></el-col>
                </el-row>
                <el-row>
                    <el-col align="left"><i class="el-icon-time">关闭时间：{{publishmentData.expireDate}}</i></el-col>
                </el-row>
            </div>
            <el-button class="choice" size="mini" type="primary" icon="el-icon-circle-plus" @click="open1">延时</el-button>
            <el-button class="choice" size="mini" type="danger" icon="el-icon-delete" @click="open2">删除</el-button>
            <el-button class="choice" size="mini" :disabled="isCandidateDisable"  icon="el-icon-check" @click="open3">{{candidateText()}}</el-button>
        </el-card>
        <el-dialog title="在该发布下申请过您联系方式的用户" :visible.sync="dialogVisible" width="620px">
            <div id="candidateList" style="text-align: left">
                <h2>请完全确认并和领养方完成交接工作后再于此确认！</h2>
                <h2 style="margin-bottom: 1.5em">强烈推荐与领养方签署领养民事合同 <span><a href="http://localhost:8081/template.pdf " target="templatePDF">《民事合同模板》</a></span></h2>
                <h3 v-if="candidateList.length===0">暂时没有用户在此申请过您的联系方式哦</h3>
                <div v-for="(item, index) in candidateList" :key="index">
                    <h3>{{item.username}} <span style="float: right">
                            <el-button-group>
                                <el-button type="primary" size="mini" icon="el-icon-search" @click="checkUser(item.username)">查看用户</el-button>
                                <el-button type="primary" size="mini"  @click="chooseUser(item.username)">确认选择<i class="el-icon-check el-icon--right"></i></el-button>
                            </el-button-group>
                        </span></h3>
                    <hr style="color:grey"/>
                </div>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="userDialogVisible" width="30%">
            <user-info-box :user-box-info="userBoxInfo"></user-info-box>
        </el-dialog>
        <el-dialog title="确认选择领养人" :visible.sync="confirmDialogVisible" width="40%">
            <confirm-info></confirm-info>
            <div slot="footer" class="dialog-footer">
                <el-button @click="confirmDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="chooseSelectedUser()">我已和 {{chosenUser}} 完成交接并确认选择</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import catPic from '../assets/cat.png';
    import dogPic from '../assets/dog.png';
    import userInfoBox from './user-info-box';
    import confirmInfo from './comfirm-info';
    export default {
        name: "personal-item",
        props:["publishmentData"],
        components:{
            userInfoBox,
            confirmInfo
        },
        data(){
            return{
                userBoxInfo:{
                    username:"",
                },
                isCandidateDisable:false,
                dialogVisible:false,
                confirmDialogVisible:false,
                candidateList:[],
                userDialogVisible:false,
                chosenUser:"",
                getState:"可申请",
                tagType:"",
            }
        },

        methods:{
            checkUser(username){
                //axios to get userinfo
                //show user info box
            },
            chooseUser(username){
                this.chosenUser=username;
                this.confirmDialogVisible=true;

            },
            getUserBox(){
                this.checkUser(this.chosenUser);
                this.userDialogVisible=true;
            },
            chooseSelectedUser(){
                const that=this;
                this.$http.post("/userinfo/firstHandShake",{
                    aID:this.publishmentData.aID,
                    username:this.chosenUser
                }).then((res)=>{
                    if(res.data.code===200){
                        that.$message({
                            type:"success",
                            message:"成功，请等待对方确认"});
                        that.confirmDialogVisible=false;
                        that.chosenUser="";
                        that.dialogVisible=false;
                        this.$emit("refresh");

                    }
                }).catch(()=>{
                    that.$message({
                        type:"warning",
                        message:"Network Error"
                    })
                })
            },



            candidateText(){
                if(this.publishmentData.aState===6 || this.publishmentData.aState===5){
                    if(this.publishmentData.aState===6){
                        this.getState="等待对方确认";
                        this.tagType="warning";
                    }else {
                        this.getState="已完成";
                        this.tagType="success";
                    }
                    return "查看已选定领养人";
                }else if(this.publishmentData.aState===1){
                    this.getState="可申请";
                    this.tagType="";
                    return "查看已申请用户";
                }else{
                    this.isCandidateDisable=true;
                    this.getState="暂时关闭";
                    this.tagType="danger";
                    return "该发布已暂时关闭";
                }

            },
            selectImg:function () {
                if(this.publishmentData.aType==="狗"){
                    return dogPic;
                }
                else {
                    return catPic;
                }

            },
            gotoDetail:function () {
                this.$router.push("/adoption/detail/"+this.publishmentData.aID);
            },
            open1:function(){
                const that=this;
                this.$confirm('此操作将刷新并续期您的送养发布15天，在其到期前三天之前不可再次刷新, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var demand="/userinfo/delay/"+that.publishmentData.aID;
                    console.log(demand);
                    const confirm=this;
                    this.$http.post(demand)
                        .then(function (response) {
                            if(response.data.code===200) {
                                confirm.$message({
                                    type: 'success',
                                    message: '延时成功!'
                                });
                                that.$emit("refresh");

                            }
                            else {
                                confirm.$message({
                                    type: 'error',
                                    message: response.data.message
                                })
                            }
                        })
                        .catch(function (error) {
                            confirm.$message({
                                type: 'warning',
                                message: 'Networ Error'
                            });
                            console.log(error)
                        })
                    })
                    .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消延时'
                    });
                });
            },
            open2:function () {
                const that=this;
                this.$confirm('此操作将永久删除该发布及其留言等信息, 是否继续?', '注意', {
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
            },
            open3:function(){
                const that=this;
                this.$http.post("/userinfo/getCandidates/"+this.publishmentData.aID).then((res)=>{
                    if(res.data.code===200){
                        console.log(res.data.data.username);
                        if(res.data.data.username){
                            that.getUserBox();
                        }else{
                            that.candidateList=res.data.data;
                            that.dialogVisible=true;

                        }
                    }else{
                        that.$message({
                            type:"warning",
                            message:res.data.message
                        })
                    }
                }).catch((err)=>{
                    console.log(err);
                    that.$message({
                        type:"warning",
                        message:"Network Error"
                    })
                });


            }
        }
    }
</script>

<style scoped>
    #personalContent{
        z-index: 100;
        width:60%;
        position: relative;
        margin-bottom: 1em;
    }
    #personalItem{
        position: relative;
        text-align: left;
        padding: 0 1.5em 0 1.5em;
        margin: 1.6em;
    }
    #personalItem:hover{
        transform: scale(1.02);
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

</style>