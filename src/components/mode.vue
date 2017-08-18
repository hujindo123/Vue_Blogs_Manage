<template>
  <div class="zhezhao">
    <div v-if="!upass" style="height: 100%">
      <i class="close el-icon-circle-close" @click="close"></i>
      <div class="showpage">
        <h1>{{showpage.article_title}}</h1>
        <div class="time">{{showpage.article_create_time | formatDate}}<span class="nickname">{{nickname}}</span></div>
        <div class="c_content" v-html="showpage.article_content"></div>
      </div>
    </div>
    <div v-if="upass" class="v_msg">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="原因">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="太黄太暴力" name="type"></el-checkbox>
            <el-checkbox label="不符合法律法规" name="type"></el-checkbox>
            <el-checkbox label="没有内涵" name="type"></el-checkbox>
            <el-checkbox label="没有新意" name="type"></el-checkbox>
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
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  .zhezhao
    position absolute
    width 100%
    height 100%
    top 0
    left 0
    z-index 200
    background rgba(0, 0, 0, 0.5)
    .close
      font-size 35px
      color #fff
      position absolute
      cursor pointer
      left 50%
      margin-left 250px
      top 50%
      margin-top -25px
    .showpage
      position relative
      width 500px
      min-height 100%
      z-index 300
      overflow hidden
      overflow-y scroll
      background #ffffff
      left 50%
      margin-left -330px
      top 0
      line-height 1.5
      padding 0 10px
      box-sizing border-box
      h1
        padding 25px
        text-align center
        font-size 20px
        line-height 1.5
        font-weight bold
      .time
        color #bebebe
        .nickname
          margin-left 50px
      .c_content
        margin-top 15px
        img
          width 100%
    .v_msg
      width 50%
      padding 35px
      box-sizing border-box
      min-height 400px
      background #fff
      margin 0 auto
      margin-top 50px
</style>
<script type="text/ecmascript-6">
  import { axios, formatDate } from '@/router/config';
  const ERR_OK = 200;
  export default {
    props: {
      showpage: {
        type: Object,
        default: {}
      },
      nickname: {
        type: String,
        default: ''
      },
      upass: {
        type: Boolean
      },
      form: {
        type: Object
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(parseInt(time));
        return formatDate(date, 'yyyy-MM-dd-hh:mm');
      }
    },
    methods: {
      close () {
        this.$emit('close');
      },
      onSubmit () {
        var self = this;
        this.form.result = '';
        for (var value of (this.form.type)) {
          this.form.result += value + '、';
        }
        if (this.form.desc.trim().length > 0) {
          this.form.result = this.form.result + '' + this.form.desc;
        }
        axios('get', '/api/u_pass_article', {
          art_id: this.form.art_id,
          art_reason: this.form.result
        }, (response) => {
          if (response.code === ERR_OK) {
            self.$emit('close', 'upss');
          } else {
            alert(response.msg);
          }
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
