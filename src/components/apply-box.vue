<template>
    <el-dialog :visible.sync="applyBoxVisible" :close-on-click-modal="false">
        <h2>联系方式</h2>
        <p>姓名：<span>{{ContactInfo.Name}}</span></p>
        <p>联系电话：<span>{{ContactInfo.Contact}}</span></p>
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
                    Name:'张三',
                    Contact:'12345678900'
                }
            }
        },
        methods:{
        }

    };
</script>

<style scoped>

</style>