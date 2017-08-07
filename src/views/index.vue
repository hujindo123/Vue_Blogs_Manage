<template>
  <div class="app">
    <v-header class="header"></v-header>
    <div class="main">
      <v-nav class="nav"></v-nav>
      <router-view class="content"></router-view>
    </div>
  </div>
</template>
<script>
  import '../../static/css/reset.css';
  import 'element-ui/lib/theme-default/index.css';
  import vHeader from '@/components/header';
  import vNav from '@/components/nav';
  export default {
    components: {
      vHeader,
      vNav
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .app
    display flex
    flex-flow column
    height 100%
    .header
      width 100%
      height 60px
      background #18bc9c
      position relative
      flex 0 0 60px
    .main
      flex 1
      display flex
      flex-flow row
      .nav
        width 200px;
        flex 0 0 200px
        height 100%;
        position relative
        background #363a3c
        .el-menu
          background #363a3c
          .el-submenu .el-menu-item:hover, .el-submenu__title:hover
            background-color #222d32
      .content
        position relative
        overflow hidden
        padding 80px 80px 0 80px
        box-sizing border-box
        flex 1
        flex-flow column
        justify-content top
        align-items center
        text-align left
</style>
