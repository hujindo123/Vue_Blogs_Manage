<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
    <el-form-item label="名称" prop="title">
      <el-input v-model="ruleForm.title" placeholder="请输入内容" style="width: 400px"></el-input>
    </el-form-item>
    <el-form-item label="类别" prop="selectType">
      <el-select v-model="ruleForm.selectType" placeholder="请选择">
        <el-option
          v-for="item in (ruleForm.options)"
          :key="item.value"
          :label="item.artType_name"
          :value="item.artType_id">
        </el-option>
      </el-select>
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
</template>

<script type="text/ecmascript-6">
  import { quillEditor } from 'vue-quill-editor';
  import { axios } from '@/router/config';
  const ERR_OK = 200;
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
            {required: true, message: '请输入文章标题', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          selectType: [
            {required: true, message: '请选择文章类别', trigger: 'change', type: 'number'}
          ]
        }
      };
    },
    methods: {
      submitForm: function (ruleForm) {
        var self = this;
        self.$refs[ruleForm].validate((valid) => {
          if (valid) {
            if (self.ruleForm.content.length >= 20) {
              axios('get', '/api/addArt', {
                title: self.ruleForm.title,
                select: self.ruleForm.selectType,
                content: self.ruleForm.content
              }, function (data) {
                console.log(data);
              });
            } else {
              self.ruleForm.error = '文章最小得200字';
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
    created () {
      var self = this;
      axios('get', '/api/artType', {}, function (data) {
        if (data.code === ERR_OK) {
          self.ruleForm.options = data.data;
        } else {
          alert(data.message);
        }
      });
    },
    components: {
      quillEditor
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ql-container
    height 300px
    overflow-y scroll
</style>
