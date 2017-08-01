<template>
  <div>
    <el-menu default-active="2" class="el-menu-vertical-demo"  @open="handleOpen" @close="handleClose">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>文章</template>
        <el-menu-item-group>
          <el-menu-item index="1-1"><router-link to="/art/addType">添加分类</router-link></el-menu-item>
          <el-menu-item index="1-2">添加文章</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>导航一</template>
        <el-menu-item-group>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.nav
  width
</style>
