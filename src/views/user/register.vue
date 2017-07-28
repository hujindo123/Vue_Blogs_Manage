<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="账号" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
      <el-input type="password" v-model="ruleForm.pwd"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="rpwd">
      <el-input type="password" v-model="ruleForm.rpwd"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="ruleForm.sex">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label-width="100px">
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 200;
  import { axios } from '@/router/config';
  export default {
    data () {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          name: '',
          pwd: '',
          rpwd: '',
          email: '',
          sex: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 10 个字符', trigger: 'blur'}
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 13, message: '长度在 6 到 13 个字符', trigger: 'blur'}
          ],
          rpwd: [
            {required: true, message: '请输入确认密码', trigger: 'blur'},
            {validator: validatePass2, trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱', trigger: 'blur,change'}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ]
        }
      };
    },
    methods: {
      submitForm (formName) {
        var self = this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
            axios('get', '/register', {
              username: self.ruleForm.name,
              password: self.ruleForm.pwd,
              email: self.ruleForm.email,
              sex: self.ruleForm.sex
            }, function (data) {
              if (data.code === ERR_OK) {
                window.location.href = '/';
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
