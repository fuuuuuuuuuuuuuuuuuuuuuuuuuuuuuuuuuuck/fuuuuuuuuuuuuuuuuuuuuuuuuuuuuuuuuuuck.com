<template>
    <div class="app-wrapper">
        <div class="sidebar-wrapper">
            <Background></Background>
        </div>
        <div class="main-container">
            dashboard
        </div>
    </div>
</template>

<script>
    import Background  from './Background';

    export default {
      name: 'layout',
      components: {
        Background
      },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    .app-wrapper {
    }
</style>
