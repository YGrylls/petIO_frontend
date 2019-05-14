<template>
    <el-dialog :visible.sync="applyBoxVisible" :close-on-click-modal="false">
        <h2>联系方式</h2>
        <p>用户名：<span>{{ContactInfo.username}}</span></p>
        <p v-if="ContactInfo.communicationType=='微信'">微信：<span>{{ContactInfo.communication}}</span></p>
        <p v-else>电话：<span>{{ContactInfo.communication}}</span></p>
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