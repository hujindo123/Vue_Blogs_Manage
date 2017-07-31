<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    <el-form-item label="账号" prop="pass">
      <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 200;
  import { axios } from '@/router/config';
  export default {
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          username: '',
          pass: ''
        },
        rules2: {
          pass: [
            {validator: validatePass, required: true, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm (formName) {
        var self = this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
            axios('get', '/login', {
              username: self.ruleForm2.username,
              password: self.ruleForm2.pass
            }, function (data) {
              if (data.code === ERR_OK) {
                sessionStorage.setItem('token', data.token);
                window.location.href = '/';
              } else {
                alert(data.msg);
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
