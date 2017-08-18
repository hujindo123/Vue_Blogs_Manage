<template>
  <div class="log">
    <div class="picker">
      <el-date-picker
        v-model="value1"
        type="daterange"
        placeholder="选择日期"
        :picker-options="pickerOptions0">
      </el-date-picker>
      <button class="el-button el-button--primary" @click="search">查询</button>
    </div>
    <el-table :data="tableData" stripe style="width: 1322px" v-if="tableData">
      <el-table-column
        label="状态"
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
        width="150">
        <template scope="scope" v-if="tableData">
          <el-button class="e_button" @click.native.prevent="seeRow(scope.$index, tableData)" type="text" size="small">
            查看
          </el-button>
          <el-button class="e_button" v-if="tableData[scope.$index].article_pass_status == -1"
                     @click.native.prevent="verifyPass(scope.$index, tableData)" type="text" size="small">
            通过
          </el-button>
          <el-button class="e_button" v-if="tableData[scope.$index].article_pass_status == 1"
                     @click.native.prevent="verifyUpass(scope.$index, tableData)" type="text" size="small">
            未通过
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
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  .log
    .picker
      margin 10px
    .e_button
      margin-right 5%

    .block
      margin 20px auto
      text-align center

    .el-icon-check
      color green

    .el-icon-close
      color red
</style>
<script>
  const ERR_OK = 200;
  import { axios, formatDate } from '@/router/config';
  import Reason from '@/components/Reason';
  import mode from '@/components/mode';
  export default {
    data () {
      return {
        tableData: [],
        showpage: {},
        blankPage: false,
        see: false,
        upass: false,
        choiceId: ' ',
        nickname: '',
        pickerOptions0: {
          disabledDate (time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        value1: '',
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
      Reason,
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
      close () {
        this.blankPage = false;
        this.upass = false;
        this.upass = false;
        this.getList();
      },
      search () {
        let time1 = new Date().getTime(this.value1[0]);
        let time2 = new Date().getTime(this.value1[1]);
        console.log(time1, time2);
      },
      getList () {
        let self = this;
        axios('get', '/api/select_verify_log', {}, (response) => {
          if (response.code === ERR_OK) {
            self.tableData = response.data;
            self.dataList = self.tableData.slice(0, self.size);
            self.total = response.data.length;
          } else {
            console.log(response.msg);
          }
        });
      },
      seeRow (index, val) {
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
