<template>
    <div>
        <nav-menu></nav-menu>
        <router-view></router-view>
    </div>
</template>

<script>
    import NavMenu from './nav-menu';
    export default {
        name: "adoption-page",
        components:{NavMenu}
    }
</script>

<style scoped>

</style>