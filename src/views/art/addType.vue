<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">文章</el-breadcrumb-item>
        <el-breadcrumb-item>添加分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table :data="artType" border max-height="500" style="width: 100%">
      <el-table-column prop="artType_id" label="ID" min-width="15%"></el-table-column>
      <el-table-column prop="artType_info" label="分类名称" min-width="30%"></el-table-column>
      <el-table-column prop="artType_name" label="分类描述" min-width="40%"></el-table-column>
      <el-table-column label="操作" width="150px" min-width="15%">
        <template scope="scope" v-if="artType">
          <el-button @click.native.prevent="deleteRow(scope.$index, artType)" type="text" size="small">移除</el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index, artType)" type="text" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
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
        var self = this;
        self.$confirm('此操作将会让一些分类文章不能正常预览, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.delType(rows[index].artType_id, function () {
            rows.splice(index, 1);
            self.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      delType (id, callback) {
        axios('get', '/api/delType', {
          id: id
        }, (response) => {
          if (response.code === ERR_OK) {
            debugger;
            callback && callback();
          } else {
            alert(response.msg);
          }
        });
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
  .alert
    width 300px
    margin 0 auto

  .el-table--fit
    border-bottom 0
    border-right 1px solid #dfe6ec

  .el-table__body-wrapper, .el-table__footer-wrapper, .el-table__header-wrapper
    width auto

  .el-table__body-wrapper, el-table__header-wrapper, .el-table__header-wrapper
    border-bottom 1px solid #eef1f6

  .el-table::after, .el-table::before
    background-color #fff
</style>
