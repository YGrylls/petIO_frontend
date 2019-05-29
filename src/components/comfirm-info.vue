<template>
    <div id="container">
        <h2>请详细阅读以下内容后再确认</h2>
        <hr/>
        <ul>
            <li>
                您应当在和领养方/送养方<b>充分联系交流并完成您的宠物送养交接工作后</b>才于此进行确认
            </li>
            <li>
                petIO 仅为宠物领养/送养的信息发布交流平台，<b>无法为您的领养/送养行为作出任何保证与保障，请务必考虑通过外部法律手段（如签订民事合同协议等）保护自己以及宠物的权益</b>
            </li>
            <li>
                <b>请您务必与领养方/送养方订宠物领养/送养的民事合同</b>，您可以使用<span><a href="http://localhost:8081/template.pdf " target="templatePDF">《民事合同模板》</a></span>，推荐您在协议中同时写入双方的 petIO 用户名，以备不时之需
            </li>
            <li>
                此确认行为并非强制，<b>亦没有法律效力，仅做留档与证明之用</b>
            </li>
        </ul>
        <hr/>
        <h2>点击确认代表您已经悉知上述内容并且同意</h2>
    </div>
</template>

<script>
    export default {
        name: "comfirm-info"
    }
</script>

<style scoped>
    #container{
        text-align: left;
        padding:1.5em;
    }
    li{
        font-size: 1.2em;
        margin-bottom: 0.5em;
    }
</style>