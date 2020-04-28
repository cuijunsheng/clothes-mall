<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="back">
        <img src="~assets/images/common/back.svg">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="title-item"
             :class="{active:index===currentIndex}"
             @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    components: {
      NavBar
    },
    methods: {
      back() {
        this.$router.back();
      },
      titleClick(index){
        this.currentIndex = index;
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 14px;
  }

  .title-item {
    flex: 1;
  }

  .back {
    margin-top: 8px;
  }

  .active {
    color: var(--color-high-text);
  }
</style>
