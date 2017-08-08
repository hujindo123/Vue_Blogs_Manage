<template>
  <div class="login_main">
    <router-link to="/register" class="apply">申请成为管理员</router-link>
    <div class="login_wrapper">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" @click="submitForm('ruleForm2')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
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
      var validateUserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
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
          username: [
            {validator: validateUserName, required: true, trigger: 'blur'}
          ],
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
            axios('post', '/login', {
              username: self.ruleForm2.username,
              password: self.ruleForm2.pass
            }, function (data) {
              if (data.code === ERR_OK) {
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('level', data.level);
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
  .login_main
    width 100%
    height 100%
    background url("../../../static/img/bg.jpg") center center no-repeat
    background-size cover
    overflow hidden
    .apply
      display block
      position absolute
      right 0
      top 0
      padding 20px
    .login_wrapper
      width 460px
      height 300px
      background rgba(0, 0, 0, 0.3);
      position relative
      left 50%
      top 50%
      margin-left -280px
      margin-top -180px
      border-radius 5px
      color #fff
      .el-form
        width 390px
        padding-top 70px
        .el-form-item
          margin-bottom 32px
        .el-form-item__label
          color #fff
</style>
