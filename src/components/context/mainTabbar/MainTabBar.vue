<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home" active-color="red">
        <!--在html标签属性里使用vue定义的路径别名，需要加 ~ 才能正常引入-->
        <img slot="item-icon" src="~assets/images/tabbar/home.svg">
        <img slot="item-icon-active" src="~assets/images/tabbar/home_active.svg">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="item-icon" src="~assets/images/tabbar/category.svg">
        <img slot="item-icon-active" src="~assets/images/tabbar/category_active.svg">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/shopcart">
        <img slot="item-icon" src="~assets/images/tabbar/shopcart.svg">
        <img slot="item-icon-active" src="~assets/images/tabbar/shopcart_active.svg">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img slot="item-icon" src="~assets/images/tabbar/profile.svg">
        <img slot="item-icon-active" src="~assets/images/tabbar/profile_active.svg">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
  import TabBar from '@/components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
