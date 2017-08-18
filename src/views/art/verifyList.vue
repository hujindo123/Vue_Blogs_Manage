<template>
  <div>
    <el-table :data="dataList" stripe style="width: 100%">
      <el-table-column
        label="日期"
        min-width="15%">
        <template scope="scope">
          {{tableData[scope.$index].article_create_time | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="用户名"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="article_type_name"
        label="分类"
        min-width="15%">
      </el-table-column>
      <el-table-column
        prop="article_title"
        min-width="40%"
        label="主题">
      </el-table-column>
      <el-table-column
        prop="art_title"
        label="操作"
        min-width="15%">
        <template scope="scope" v-if="tableData">
          <el-button class="e_button" @click.native.prevent="getArticle(scope.$index, tableData)" type="text"
                     size="small">
            查看
          </el-button>
          <el-button class="e_button" @click.native.prevent="verifyPass(scope.$index, tableData)" type="text"
                     size="small">
            通过
          </el-button>
          <el-button class="e_button" @click.native.prevent="verifyUpass(scope.$index, tableData)" type="text"
                     size="small">不通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" v-if="dataList.length>0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="size"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <mode v-if="blankPage" :showpage="showpage" :upass="upass" :form="form" :nickname="nickname" @close="close"></mode>
    <!-- <div class="zhezhao" v-show="blankPage">


     </div>-->
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  .e_button
    margin-right 5%

  .block
    margin 20px auto
    text-align center

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
<script>
  const ERR_OK = 200;
  import mode from '@/components/mode';
  import { axios, formatDate } from '@/router/config';
  export default {
    data () {
      return {
        tableData: [],
        nickname: '',
        showpage: {},
        blankPage: false,
        upass: false,
        choiceId: '',
        form: {
          type: [],
          desc: '',
          result: ' ',
          art_id: ' '
        },
        dataList: [],
        currentPage1: 1,
        total: 0, // 总共的条数
        size: 10 // 每页显示条目个数
      };
    },
    components: {
      mode
    },
    filters: {
      formatDate (time) {
        let date = new Date(parseInt(time));
        return formatDate(date, 'yyyy-MM-dd-hh:mm');
      }
    },
    created () {
      this.getList();
    },
    methods: {
      close ($t) {
        this.blankPage = false;
        this.upass = false;
        this.upass = false;
        if ($t === 'upss') {
          this.dataList.splice(this.choiceId, 1);
        }
      },
      getList () {
        let self = this;
        /* 获取列表 */
        axios('get', '/api/select_verify_list', {}, (response) => {
          if (response.code === ERR_OK) {
            self.tableData = response.data;
            self.dataList = self.tableData.slice(0, self.size);
            self.total = response.data.length;
          } else {
            console.log(response.msg);
          }
        });
      },
      getArticle (index, val) {
        var self = this;
        self.blankPage = true;
        axios('get', '/api/select_article', {
          id: val[index].article_id
        }, (response) => {
          if (response.code === ERR_OK) {
            self.showpage = response.data;
            self.nickname = val[index].nickname;
          } else {
            console.log(response.msg);
          }
        });
      },
      verifyPass (index, val) {
        axios('get', '/api/verify_pass_article', {
          art_id: val[index].article_id
        }, (response) => {
          if (response.code === ERR_OK) {
            this.getList();
          } else {
            console.log(response.msg);
          }
        });
      },
      verifyUpass (index, val) {
        this.blankPage = true;
        this.upass = true;
        this.choiceId = index;
        this.form.art_id = val[index].article_id;
      },
      handleSizeChange (val) {
        var self = this;
        self.dataList = self.tableData.slice(self.size * (val - 1), self.size * val);
      },
      handleCurrentChange (val) {
        var self = this;
        self.dataList = self.tableData.slice(self.size * (val - 1), self.size * val);
      }
    }
  };
</script>
