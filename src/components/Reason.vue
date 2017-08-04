<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="原因">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="补充说明">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="close()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      form: {
        type: Object,
        default: ''
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .el-icon-check
    color green

  .el-icon-close
    color red

  .e_button
    margin-right 5%

  .e_button
    margin-right 5%
</style>
