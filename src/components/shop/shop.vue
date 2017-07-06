<template>
  <div>
    <div class="bread">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }" class="home">首页</el-breadcrumb-item>
        <el-breadcrumb-item>所有商家</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="width: 100%">

      <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" :span="24" @selection-change="handleSelectionChange">

        <el-table-column type="selection" :span="2">
        </el-table-column>
        <el-table-column label="日期" :span="22">
          <template scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
       <!-- <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip>
        </el-table-column>-->
      </el-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      };
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
