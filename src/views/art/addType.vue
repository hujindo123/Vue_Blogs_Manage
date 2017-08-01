<template>
  <el-table :data="artType" border max-height="500">
      <el-table-column prop="artType_id" label="ID" width="80"></el-table-column>
      <el-table-column prop="artType_info" label="分类名称" width="150"></el-table-column>
      <el-table-column prop="artType_name" label="分类描述" width="300"></el-table-column>
      <el-table-column label="操作" width="100">
        <template scope="scope" v-if="artType">
          <el-button @click.native.prevent="deleteRow(scope.$index, artType)" type="text" size="small">移除</el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index, artType)" type="text" size="small">修改</el-button>
        </template>
      </el-table-column>
  </el-table>
</template>

<script>
  const ERR_OK = 200;
  import { axios } from '@/router/config';
  export default {
    methods: {
      getType () {
        let self = this;
        axios('get', '/api/artType', {}, (response) => {
          if (response.code === ERR_OK) {
            self.artType = response.data;
          } else {
            alert(response.msg);
          }
        });
      },
      deleteRow (index, rows) {
        rows.splice(index, 1);
      }
    },
    data () {
      return {
        artType: []
      };
    },
    created () {
      this.getType();
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .el-table__body-wrapper, .el-table__footer-wrapper, .el-table__header-wrapper
    width auto

  .el-table__body-wrapper, el-table__header-wrapper, .el-table__header-wrapper
    border-left 1px solid #eef1f6

  .el-table::after, .el-table::before
    background-color #fff
</style>
