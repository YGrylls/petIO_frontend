<template>
    <el-dialog :visible.sync="applyBoxVisible" :close-on-click-modal="false" width="520px">
        <h2>联系方式</h2>
        <h3>请您积极联系送养发布用户以协商交流宠物领养的详细信息与情况</h3>
        <hr/>
        <div style="text-align: left">
            <p>用户名：<span>{{ContactInfo.username}}</span></p>
            <p v-if="ContactInfo.communicationType=='微信'">微信：<span>{{ContactInfo.communication}}</span></p>
            <p v-else>电话：<span>{{ContactInfo.communication}}</span></p>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="applyBoxVisible=false">确认</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "apply-box",
        data() {
            return {
                applyBoxVisible: false,
                ContactInfo:{
                    username:'',
                    communicationType:'',
                    communication:''
                }
            }
        },
        methods:{
        }

    };
</script>

<style scoped>

</style>