<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommendViews",
    props: {
      recommends: {
        type: Array,
        //如果默认值是Object和Array时，必须使用函数返回一个默认值
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    padding: 10px 0 20px;
    border-bottom: solid 10px #eee;
    font-size: 14px;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 5px;
  }
</style>
