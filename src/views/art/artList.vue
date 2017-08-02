<template>
  <div></div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 200;
  import { axios } from '@/router/config';
  export default {
    data () {
      return {
        list: ''
      };
    },
    created () {
      this.getList();
    },
    methods: {
      getList () {
        axios('post', '/api/getartList', {}, function (data) {
          if (data.code === ERR_OK) {
            debugger;
          } else {
            alert(data.msg);
          }
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
