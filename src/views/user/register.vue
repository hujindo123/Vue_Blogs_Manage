<template>
  <div class="register_main">
    <router-link to="/login" class="apply">返回登录页面</router-link>
    <div class="register_wrapper">
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
          <el-button type="primary" @click="submitForm('ruleForm')">立即申请</el-button>
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
            axios('post', '/register', {
              username: self.ruleForm.name,
              password: self.ruleForm.pwd,
              email: self.ruleForm.email,
              sex: self.ruleForm.sex
            }, function (data) {
              if (data.code === ERR_OK) {
                window.location.href = '/login';
              } else {
                alert(data.msg);
              };
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
  .register_main
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
    .register_wrapper
      width 460px
      height 500px
      background rgba(0, 0, 0, 0.3);
      position relative
      left 50%
      top 50%
      margin-left -280px
      margin-top -300px
      border-radius 5px
      color #fff
      .el-form
        width 390px
        padding-top 70px
        .el-form-item
          margin-bottom 32px
        .el-form-item__label,.el-radio
          color #fff

</style>
