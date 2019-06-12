<template>
    <div>
        <el-card id="personalItem">
            <div id="personalContent" @click="gotoDetail">
                <h4 style="margin-bottom: 0.2em">{{publishmentData.aTitle}} <span><el-tag :type="tagType" id="state" >{{getState}}</el-tag><el-tag v-if="ifChosenComplete" type="success" style="margin-left: 0.5em" >您已确认</el-tag></span></h4>
                <el-tag v-if="ifChosen" type="success" style="font-size: 0.8em;margin-bottom: 0.5em" >等待您的确认</el-tag>

                <el-row style="margin-top: 0.5em">
                    <el-col align="left"><i class="el-icon-time">刷新时间：{{publishmentData.publishDate}}</i></el-col>
                </el-row>
                <el-row>
                    <el-col align="left"><i class="el-icon-time">结束时间：{{publishmentData.expireDate}}</i></el-col>
                </el-row>
            </div>
            <el-button class="choice" size="mini" type="primary" icon="el-icon-circle-plus" @click="open1">查看联系方式</el-button>
            <el-button v-if="isCheckAvailable()" class="choice" size="mini"  icon="el-icon-check" @click="open2">确认领养并完成</el-button>
        </el-card>
        <apply-box ref="applyBox"></apply-box>
        <el-dialog title="确认完成领养" :visible.sync="confirmDialogVisible" width="700px">
            <confirm-info></confirm-info>
            <div slot="footer" class="dialog-footer">
                <el-button @click="confirmDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="completeAdoption()">我已和 {{chosenUser}} 完成交接并确认选择</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import catPic from '../assets/cat.png';
    import dogPic from '../assets/dog.png';
    import applyBox from './apply-box';
    import confirmInfo from './comfirm-info';
    export default {
        name: "apply-item",
        props:["publishmentData","chosenList","chosenCompleteList"],
        components:{
            applyBox,
            confirmInfo
        },
        computed:{

        },
        data(){
            return{
                getState:"开放申请",
                tagType:"",
                ifChosen:false,
                ifChosenComplete:false,
                confirmDialogVisible:false,
                chosenUser:"送养方",
            }
        },
        methods:{
            checkChosen(){
                let id=this.publishmentData.aID;
                for(let item of this.chosenCompleteList){
                    if(id===item.aID){
                        this.ifChosenComplete=true;
                        this.ifChosen=false;
                    }
                }

                for(let item of this.chosenList){
                    if(id===item.aID){
                        this.ifChosen=true;
                        return true;
                    }
                }

                return false;
            },

            completeAdoption(){
                const that=this;
                this.$http.post("/userinfo/secondHandShake",{
                    aID:this.publishmentData.aID,
                    agree:true
                }).then((res)=>{
                    if(res.data.code===200){
                        that.$message({
                            type:"success",
                            message:"成功，领养确认已完成，请照顾好您的新宠物"});
                        that.confirmDialogVisible=false;
                        // that.chosenUser="";
                        that.dialogVisible=false;
                        console.log(that.ifChosen);
                        that.ifChosen=false;
                        console.log(that.ifChosen);
                        this.$emit("refresh");

                    }
                }).catch(()=>{
                    that.$message({
                        type:"warning",
                        message:"Network Error"
                    })
                })
            },
            isCheckAvailable(){

                if(this.publishmentData.aState===6 || this.publishmentData.aState===5){
                    let temp=this.checkChosen();
                    if(this.publishmentData.aState===6){
                        this.getState="进入确认流程";
                        this.tagType="warning";
                        return temp;
                    }else {
                        this.getState="已完成";
                        this.tagType="success";
                        return false;
                    }

                }else if(this.publishmentData.aState===1){
                    this.getState="开放申请";
                    this.tagType="";
                    return false;
                }else{
                    this.getState="暂时关闭";
                    this.tagType="danger";
                    return false;
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
            open2(){
                //to be done
                this.confirmDialogVisible=true;
            },
            open1(){
                const url='/adoption/apply/'+this.publishmentData.aID;
                const that=this;
                this.$http.post(url).then(function (response) {
                    if(response.data.code===200){
                        that.$refs.applyBox.ContactInfo.communicationType=response.data.data.communicationType;
                        that.$refs.applyBox.ContactInfo.communication=response.data.data.communication;
                        that.$refs.applyBox.ContactInfo.username=response.data.data.username;
                        that.$refs.applyBox.applyBoxVisible=true;
                    }
                    that.$message(response.data.message);
                    if(response.data.code===401){
                        that.$router.push("/login");
                    }
                }).catch(function (error) {
                    if(error.response){
                        that.$message({message:error.response.message,
                            type:"warning"});
                    }else{
                        that.$message({message:error.message,
                            type:"warning"});
                    }
                });
            }
        }
    }
</script>

<style scoped>
    #personalContent{
        z-index: 100;
        position: relative;
        width:80%;
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