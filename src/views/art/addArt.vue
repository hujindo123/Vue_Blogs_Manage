<template>
  <div style="width: 100%">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">公告</el-breadcrumb-item>
        <el-breadcrumb-item >添加公告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item label="名称" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入内容" style="width: 50%"></el-input>
      </el-form-item>
      <el-form-item label="类别" prop="selectType">
        <el-input v-model="ruleForm.selectType" placeholder="请输入原因" style="width: 50%"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- bidirectional data binding（双向数据绑定） -->
        <quill-editor :content="ruleForm.content" @change="onEditorChange($event)">
        </quill-editor>
        <div class="el-form-item__error" v-html="ruleForm.error"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">发表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import { quillEditor } from 'vue-quill-editor';
  import { axios } from '@/router/config';
  export default {
    data () {
      return {
        ruleForm: {
          title: '',
          selectType: '',
          options: '',
          content: '<h2>I am Example</h2>',
          error: ''
        },
        rules: {
          title: [
            {required: true, message: '请输入公告标题', trigger: 'blur'},
            {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
          ],
          selectType: [
            {required: true, message: '请输入公告原因', trigger: 'blur'},
            {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm: function (ruleForm) {
        var self = this;
        self.$refs[ruleForm].validate((valid) => {
          if (valid) {
            if (self.ruleForm.content.length >= 200) {
              axios('get', '/api/notice', {
                title: self.ruleForm.title,
                reason: self.ruleForm.selectType,
                content: self.ruleForm.content
              }, function (data) {
                console.log(data);
              });
            } else {
              self.ruleForm.error = '公告最小得200字';
              setTimeout(() => {
                self.ruleForm.error = '';
              }, 3000);
            }
          }
        });
      },
      onEditorChange ({editor, html, text}) {
        this.ruleForm.content = html;
        console.log(this.ruleForm.content);
      }
    },
    components: {
      quillEditor
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .demo-ruleForm
    width 80%
    text-align left
  .ql-container
    height 200px
    overflow-y scroll
</style>
