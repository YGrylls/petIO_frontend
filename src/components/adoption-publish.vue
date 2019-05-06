<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-card id="publishCard">
            <el-form ref="publishForm" :model="publishFormData" :rules="rule" label-position="top">
                <el-form-item  label="发布标题" prop="title">
                    <el-input maxlength="40" v-model="publishFormData.title" placeholder="标题应当简明地描述您欲送养的宠物特点或要求"></el-input>
                </el-form-item>
                <el-form-item label="为您欲送养的宠物上传照片（至少一张）" prop="imgUrl">
                    <el-upload
                            action="http://localhost:8081/api/upload"
                            accept="image/jpg,image/jpeg,image/png"
                            list-type="picture-card"
                            :limit="5"
                            :file-list="publishFormData.imgUrls"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess"
                            :on-error="handleUploadError">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item class="inlineFormItem" label="选择您所处的地区" prop="location">
                    <el-select v-model="publishFormData.location" size="large" filterable>
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
                <el-form-item class="inlineFormItem" label="领养是否收费（0即免费）" prop="cost">
                    <el-input maxlength="8" v-model.number="publishFormData.cost" style="width: 15em">
                    </el-input>
                </el-form-item>
                <el-form-item label="选择类型" prop="type">
                    <el-select v-model="publishFormData.type" size="large">
                        <el-option label="宠物狗" value="狗"></el-option>
                        <el-option label="宠物猫" value="猫"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择宠物的性别" prop="sex">
                    <el-select v-model="publishFormData.sex" size="large">
                        <el-option style="color: deepskyblue" label="男生" value="male"></el-option>
                        <el-option style="color: deeppink" label="女生" value="female"></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="详细描述您欲送养的宠物" prop="detail">
                    <el-input v-model="publishFormData.detail" type="textarea" :autosize="{minRows: 6}" placeholder="描述考虑包含宠物健康情况、特征、疫苗接种情况等">
                    </el-input>
                </el-form-item>
                <el-form-item label="描述您对领养的要求" prop="requirements">
                    <el-input v-model="publishFormData.requirements" type="textarea" :autosize="{minRows: 4}" placeholder="要求考虑包含领养者素质、回访要求等，无要求请注明">

                    </el-input>
                </el-form-item>
                <el-form-item class="inlineFormItem" label="留下您的联系方式" prop="communicationType">
                    <el-select v-model="publishFormData.communicationType">
                        <el-option value="微信"/>
                        <el-option value="电话"/>
                    </el-select>
                </el-form-item>
                <el-form-item class="inlineFormItem" prop="communication">
                    <el-input maxlength="24" style="width: 24em" v-model="publishFormData.communication" placeholder="请留下真实可用的联系方式"></el-input>
                </el-form-item>
                <div>
                    <small id="notification">※ 您的送养发布信息将保持30天，您可以在发布到期前三天开始对发布续期</small>
                    <el-button type="primary" :loading="isLoading"  @click="submitClick">确认并提交送养发布信息</el-button>
                </div>

            </el-form>
        </el-card>

    </div>
</template>

<script>
    export default {
        name: "adoption-publish",
        data(){
            return{
                publishFormData:{
                    title:"",
                    imgUrls:[],  //格式 [{'name':'xxx','url':'http"//xxxxxxxx.jpg'}]
                    location:"嘉定",
                    sex:"female",
                    type:"狗",
                    cost:0,
                    detail:"",
                    requirements:"",
                    communicationType:"微信",
                    communication:"",

                },
                isLoading:false,
                dialogVisible:false,
                dialogImageUrl:"",
                rule:{
                    //验证
                    title:[
                        {required:true, message:"请输入"},
                        {max:40,min:10, message:"标题长度应在10到40字符"}
                    ],
                    // imgUrls:[
                    //     {max:5,min:1, message:"宠物相片至少1张，至多5张"}
                    // ],
                    location:[
                        {required:true, message:"请选择"},
                    ],
                    type:[
                        {required:true, message:"请选择"},
                    ],
                    cost:[
                        {required:true, message:"请输入"},
                        {type:"number", message:"必须是数字"}
                    ],
                    detail:[
                        {required:true, message:"请输入"},
                        {max:800,min:15, message:"详情内容应在15到800字符"}
                    ],
                    requirements:[
                        {required:true, message:"请输入"},
                        {max:800,min:1, message:"要求描述应在1到800字符"}
                    ],
                    communicationType:[
                        {required:true, message:"请选择"},
                    ],
                    communication:[
                        {required:true, message:"请输入"},
                        {max:24,min:6, message:"微信号或电话号码应在6到24字符"}
                    ],
                    sex:[
                        {required:true, message:"请选择"},
                    ]
                }
            }
        },
        methods:{
            submitClick(){
                this.$refs.publishForm.validate((valid)=>{
                    if(valid){
                        this.submitPublish()
                    }else{
                        return false;
                    }
                })
            },
            submitPublish(){
                const that=this;
                //先调用验证
                //再AXIOS发送表单
                //response回显
                var imgUrlList=[];
                for (let item of this.publishFormData.imgUrls){
                    imgUrlList.push(item);
                }
                that.isLoading=true;
                this.$http.post('/new',{
                    title:this.publishFormData.title,
                    sex:this.publishFormData.sex,
                    imgUrl:imgUrlList,
                    communication:this.publishFormData.communication,
                    communicationType:this.publishFormData.communicationType,
                    cost:this.publishFormData.cost,
                    detail:this.publishFormData.detail,
                    requirements:this.publishFormData.requirements,
                    type:this.publishFormData.type,
                    location:this.publishFormData.location
                })
                    .then(function (response) {
                        that.isLoading=false;
                            if(response.data.code===200){
                            that.$message("发布成功");
                            that.$router.push("/adoption/detail/"+response.data.data);//跳转
                            }else{
                                that.$message({
                                    type:"warning",
                                    message:response.data.message
                                })
                            }

                    }).catch(function (error) {
                        that.$message({
                            type:"warning",
                            message:error.message
                        });
                        that.isLoading=false;
                    })
            },
            handleRemove(){

            },
            handlePictureCardPreview(file){
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleSuccess(){
                this.$message("上传成功");
            },
            handleUploadError(){
                this.$message({
                    type:"error",
                    message:"上传失败"
                })
            }
        }
    }
</script>

<style scoped>

    #publishCard{
        text-align: left;
        width: 80%;
        margin:auto;
        margin-top:2em;
        padding:2em;
    }
    #notification{
        float: right;
        color: orange;
        margin:0.5em 0 1em 0
    }
    .inlineFormItem{
        display: inline-block;
        margin-right: 1em;
    }
</style>