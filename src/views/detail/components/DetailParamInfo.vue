<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !==0">
    <div class="rule">
      <table v-for="(table,index) in paramInfo.rule.tables" :key="index">
        <tr v-for="(tr,index2) in table " :key="index2">
          <td v-for="(td,index3) in tr" :key="index3">{{td}}</td>
        </tr>
      </table>
    </div>
    <div class="param">
      <table>
        <tr v-for="(item,index) in paramInfo.info.set" :key="index">
          <td class="param-key">{{item.key}}</td>
          <td class="param-value">{{item.value}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailParamInfo",
    props: {
      paramInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .param-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }

  .param-info table {
    width: 100%;
    border-collapse: collapse;
  }

  .param-info table tr {
    height: 42px;
  }

  .param-info table tr td {
    border-bottom: 1px solid rgba(100, 100, 100, .1);
  }

  .param {
    border-top: 1px solid rgba(0,0,0,.1);
  }

  .param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }

  .param-value {
    color: #eb4868;
  }
</style>
