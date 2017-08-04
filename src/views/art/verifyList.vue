<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%" v-if="tableData">
      <el-table-column
        label="日期"
        min-width="15%">
        <template scope="scope">
          {{tableData[scope.$index].art_createTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="用户名"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="artType_name"
        label="分类"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="art_title"
        min-width="40%"
        label="主题">
      </el-table-column>
      <el-table-column
        prop="art_title"
        label="操作"
        min-width="15%">
        <template scope="scope" v-if="tableData">
          <el-button class="e_button" @click.native.prevent="seeRow(scope.$index, tableData)" type="text" size="small">
            查看
          </el-button>
          <el-button class="e_button" @click.native.prevent="addRow(scope.$index, tableData)" type="text" size="small">
            通过
          </el-button>
          <el-button class="e_button" @click.native.prevent="deleteRow(scope.$index, tableData)" type="text"
                     size="small">不通过
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
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  .e_button
    margin-right 5%

  .zhezhao
    position absolute
    width 100%
    height 100%
    top 0
    left 0
    z-index 2
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
</style>
<script>
  const ERR_OK = 200;
  import { axios, formatDate } from '@/router/config';
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
    filters: {
      formatDate (time) {
        let date = new Date(parseInt(time));
        return formatDate(date, 'yyyy-MM-dd-hh:mm');
      }
    },
    created () {
      let self = this;
      axios('get', '/api/verifyList', {}, (response) => {
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
