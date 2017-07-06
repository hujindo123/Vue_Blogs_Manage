<template>
  <div id="app">
    <div class="main">
      <div class="header">
        <router-link to="/" class="logo"><img src="../static/img/logo.png" alt=""></router-link>
      </div>
      <div class="wrapper">
        <div class="left_wrapper">
          <router-link to="/" exact class="nav">店铺/商品管理</router-link>
          <router-link to="/banner" exact class="nav">首 页 轮 播 图</router-link>
          <router-link to="/about" exact class="nav">关 于 我 们</router-link>
          <router-link to="/a" exact class="nav">测试栏目</router-link>
          <router-link to="/b" exact class="nav">测试栏目</router-link>
        </div>
        <div class="right_wrapper">
          <router-view></router-view>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import '../static/css/reset.css';
  import 'element-ui/lib/theme-default/index.css';
  export default {
    name: 'app'
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    font-family '微软雅黑', 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale;
    .main
      width 100%
      height 100%
      overflow hidden
      .header
        width 100%
        height 60px
        position absolute
        top 0
        left 0
        z-index 1000
        overflow hidden
        float left
        background #e0edff
        border-bottom 2px solid #95b8e7
        .logo
          width 126px
          margin-left 27px
          display block
          img
            width 100%
            margin-top 8px
      .wrapper
        position relative
        padding-top 62px
        z-index 50000
        height 100%
        .left_wrapper
          width 180px
          height 100%
          background #e0edff
          position relative
          overflow hidden
          float left
          .nav
            width 100%
            height 45px
            display block
            text-align center
            line-height 45px
            font-size 16px
            border-bottom 1px solid #d2d2d2
            background #fff
            &.link-active
              background #4690f6
              color #fff
              border-bottom 1px solid #4690f6
        .right_wrapper
          float left
          position relative
          overflow hidden
          .bread
            padding-top 15px
            padding-left 25px
            height 20px
            line-height 20px
          .el-breadcrumb
            font-size 16px
</style>
