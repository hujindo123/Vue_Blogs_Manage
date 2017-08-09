<template>
  <div class="log">
    <el-table :data="tableData" stripe style="width: 1322px" v-if="tableData">
      <el-table-column
        label="状态"
        fixed
          width="70px">
        <template scope="scope">
          <i :class="tableData[scope.$index].article_pass_status == 1 ? 'el-icon-check' : 'el-icon-close'"></i>
        </template>
      </el-table-column>
      <el-table-column
        label="上传日期"
        width="150px">
        <template scope="scope">
          {{tableData[scope.$index].article_create_time | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="作者"
        width="100px">
      </el-table-column>
      <el-table-column
        prop="article_type_name"
        label="分类"
        width="150px">
      </el-table-column>
      <el-table-column
        prop="article_title"
        width="150px"
        label="主题">
      </el-table-column>
      <el-table-column
        width="250px"
        label="未通过原因">
        <template scope="scope">
          <p>{{tableData[scope.$index].article_reason}}</p>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        label="审核日期">
        <template scope="scope">
          {{tableData[scope.$index].article_verify_time | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        prop="verify_user_name"
        label="审核员">
      </el-table-column>
      <el-table-column
        prop="art_title"
        label="操作"
        fixed="right"
        width="150">
        <template scope="scope" v-if="tableData">
          <el-button class="e_button" @click.native.prevent="seeRow(scope.$index, tableData)" type="text" size="small">
            查看
          </el-button>
          <el-button class="e_button" v-if="tableData[scope.$index].article_pass_status == -1" @click.native.prevent="addRow(scope.$index, tableData)" type="text" size="small">
            通过
          </el-button>
          <el-button class="e_button" v-if="tableData[scope.$index].article_pass_status == 1" @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
            未通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="zhezhao" v-show="blankPage">
      <div v-if="see" style="height: 100%">
        <i class="close el-icon-circle-close" @click="close"></i>
        <div class="showpage">
          <h1>{{showpage.art_title}}</h1>
          <div class="time">{{showpage.art_createTime | formatDate}}</div>
          <div class="c_content" v-html="showpage.art_content"></div>
        </div>
      </div>
      <div v-if="upass" class="v_msg">
        <Reason :form="form"></Reason>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  .log
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
        overflow hidden
        overflow-y scroll
        background #ffffff
        left 50%
        margin-left -330px
        top 0
        z-index 2
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
  .el-icon-check
    color green
   .el-icon-close
    color red
</style>
<script>
  const ERR_OK = 200;
  import { axios, formatDate } from '@/router/config';
  import Reason from '@/components/Reason';
  export default {
    data () {
      return {
        tableData: [],
        showpage: '',
        blankPage: false,
        see: false,
        upass: false,
        choiceId: ' ',
        form: {
          type: [],
          desc: '',
          result: ' ',
          art_id: ' '
        }
      };
    },
    components: {
      Reason
    },
    filters: {
      formatDate (time) {
        let date = new Date(parseInt(time));
        return formatDate(date, 'yyyy-MM-dd-hh:mm');
      }
    },
    created () {
      let self = this;
      axios('get', '/api/select_verify_log', {}, (response) => {
        if (response.code === ERR_OK) {
          self.tableData = response.data;
        } else {
          console.log(response.msg);
        }
      });
    },
    methods: {
      close () {
        this.blankPage = false;
        this.see = false;
        this.upass = false;
      },
      seeRow (index, val) {
        this.blankPage = true;
        this.see = true;
        this.showpage = val[index];
      },
      addRow (index, val) {
        axios('get', '/api/passArt', {
          art_id: val[index].art_id
        }, (response) => {
          if (response.code === ERR_OK) {
            val.splice(index, 1);
            console.log(response.msg);
          } else {
            console.log(response.msg);
          }
        });
      },
      deleteRow (index, val) {
        this.blankPage = true;
        this.upass = true;
        this.choiceId = index;
        this.form.art_id = val[index].art_id;
      },
      onSubmit () {
        var self = this;
        this.form.result = '';
        for (var value of (this.form.type)) {
          this.form.result += value + '、';
        }
        axios('get', '/api/upassArt', {
          art_id: this.form.art_id,
          art_reason: this.form.result,
          art_desc: this.form.desc
        }, (response) => {
          if (response.code === ERR_OK) {
            self.tableData.splice(self.choiceId, 1);
            self.close();
          } else {
            alert(response.msg);
          }
        });
      }
    }
  };
</script>
