<template>
  <div class="addtype">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">文章</el-breadcrumb-item>
        <el-breadcrumb-item>添加分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-button type="primary"  @click="dialogFormVisible = true">添加分类</el-button>
    <el-radio class="radio" v-model="radio" label="1">已显示分类</el-radio>
    <el-radio class="radio" v-model="radio" label="2">未显示分类</el-radio>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.type" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类描述" :label-width="formLabelWidth">
          <el-input v-model="form.desc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addArtcileType()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改分类 -->
    <el-dialog :visible.sync="dialogFormVisible1">
      <el-form :model="forms">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="forms.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类描述" :label-width="formLabelWidth">
          <el-input v-model="forms.desc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="updateArtcileType()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看分类 -->
    <el-table :data="artType" border max-height="500" style="width: 100%;margin-top: 15px"
              :default-sort="{prop: 'article_type_status', order: 'descending'}">
      <el-table-column type="index" label="ID" width="100px"></el-table-column>
      <el-table-column prop="article_type_name" label="分类名称"></el-table-column>
      <el-table-column prop="article_type_info" label="分类描述"></el-table-column>
      <el-table-column label="操作" prop="article_type_status">
        <template scope="scope" v-if="artType">
          <el-button class="btn_right" @click.native.prevent="updateRow(scope.$index, artType)" type="text"
                     size="small">修改分类
          </el-button>
          <el-button class="btn_right" @click.native.prevent="showRow(scope.$index, artType)" type="text" size="small"
                     v-if="artType[scope.$index].article_type_status == 0">显示分类
          </el-button>
          <el-button class="btn_right" @click.native.prevent="hideRow(scope.$index, artType)" type="text" size="small"
                     v-if="artType[scope.$index].article_type_status == 1">隐藏分类
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" v-if="artType.length>0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="size"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  const ERR_OK = 200;
  import { axios } from '@/router/config';
  export default {
    data () {
      return {
        radio: '1',
        artTypeList: [],
        artType: [],
        dialogFormVisible: false,
        dialogFormVisible1: false,
        form: {
          name: '',
          desc: ''
        },
        forms: {
          id: '',
          name: '',
          desc: ''
        },
        formLabelWidth: '120px',
        currentPage1: 1,
        total: 0, // 总共的条数
        size: 8 // 每页显示条目个数
      };
    },
    created () {
      this.getType();
    },
    methods: {
      handleSizeChange (val) {
        var self = this;
        self.artType = self.artTypeList.slice(self.size * (val - 1), self.size * val);
      },
      handleCurrentChange (val) {
        var self = this;
        self.artType = self.artTypeList.slice(self.size * (val - 1), self.size * val);
      },
      getType () {
        let self = this;
        axios('get', '/api/select_article_type', {}, (response) => {
          if (response.code === ERR_OK) {
            self.artTypeList = response.data;
            self.artType = self.artTypeList.slice(0, self.size);
            self.total = response.data.length;
          } else {
            alert(response.msg);
          }
        });
      },
      getunSelsect () {
        let self = this;
        axios('get', '/api/show_unselsect_article_type', {}, (response) => {
          if (response.code === ERR_OK) {
            self.artTypeList = response.data;
            self.artType = self.artTypeList.slice(0, self.size);
            self.total = response.data.length;
          } else {
            alert(response.msg);
          }
        });
      },
      addArtcileType () {
        var self = this;
        axios('get', '/api/add_article_type', {
          type: self.form.type,
          desc: self.form.desc
        }, (response) => {
          self.dialogFormVisible = false;
          self.radio === '1' ? self.getType() : self.getunSelsect();
        });
      },
      updateRow (index, artType) {
        this.dialogFormVisible1 = true;
        this.forms.desc = artType[index].article_type_info;
        this.forms.name = artType[index].article_type_name;
        this.forms.id = artType[index].id;
      },
      updateArtcileType () {
        var self = this;
        axios('get', '/api/update_article_type', {
          id: self.forms.id,
          type: self.forms.name,
          desc: self.forms.desc
        }, (response) => {
          self.dialogFormVisible1 = false;
          self.radio === '1' ? self.getType() : self.getunSelsect();
        });
      },
      hideRow (index, artType) {
        var self = this;
        axios('get', '/api/hide_article_type', {
          id: artType[index].id
        }, (response) => {
          self.radio === '1' ? self.getType() : self.getunSelsect();
        });
      },
      showRow (index, artType) {
        var self = this;
        axios('get', '/api/show_article_type', {
          id: artType[index].id
        }, (response) => {
          self.radio === '1' ? self.getType() : self.getunSelsect();
        });
      }
    },
    watch: {
      radio: function () {
        this.radio === '1' ? this.getType() : this.getunSelsect();
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .addtype
    .alert
      width 300px
      margin 0 auto
    .radio
      margin-left 100px
    .el-table--fit
      border-bottom 0
      border-right 1px solid #dfe6ec

    .el-table__body-wrapper, .el-table__footer-wrapper, .el-table__header-wrapper
      width auto

    .el-table__body-wrapper, el-table__header-wrapper, .el-table__header-wrapper
      border-bottom 1px solid #eef1f6

    .el-table::after, .el-table::before
      background-color #fff

    .btn_right
      display inline-block
      margin-right 20%
    .block
      margin 20px auto
      text-align center
</style>
