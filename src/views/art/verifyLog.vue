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
        prop="artType_name"
        min-width="15%"
        label="分类">
      </el-table-column>
      <el-table-column
        prop="art_title"
        min-width="15%"
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
      <i class="close el-icon-circle-close" @click="blankPage=false"></i>
      <div class="showpage">
        <h1>{{showpage.art_title}}</h1>
        <div class="time">{{showpage.art_createTime | formatDate}}</div>
        <div class="c_content" v-html="showpage.art_content"></div>
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
</style>
<script>
  const ERR_OK = 200;
  import { axios, formatDate } from '@/router/config';
  export default {
    data () {
      return {
        tableData: '',
        showpage: '',
        blankPage: false
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
          alert(response.msg);
        }
      });
    },
    methods: {
      seeRow (index, val) {
        this.blankPage = true;
        this.showpage = val[index];
      },
      addRow (index, val) {
        axios('post', '/api/syncList', {
          art_id: val[index].art_id,
          artType_id: val[index].artType_id,
          art_title: val[index].art_title,
          art_createTime: val[index].art_createTime,
          art_content: val[index].art_content,
          u_id: val[index].u_id
        }, (response) => {
          if (response.code === ERR_OK) {
            console.log(response.msg);
          } else {
            alert(response.msg);
          }
        });
      }
    }
  };
</script>
