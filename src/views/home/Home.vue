<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="scroll-content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pullUpLoad="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <home-recommend-views :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <!--监听组件根元素的原生事件，必须用事件修饰符.native-->
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from './components/HomeSwiper'
  import HomeRecommendViews from './components/RecommendView'
  import FeatureView from './components/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/context/tabControl/TabControl'
  import GoodsList from 'components/context/goodsList/GoodsList'
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/context/backTop/BackTop";

  import {getHomeMultiData, getHomeGoods} from "network/home";

  export default {
    name: "Home",
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: {page: 0, list: []},
          new: {page: 0, list: []},
          sell: {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    components: {
      NavBar,
      TabControl,
      HomeSwiper,
      HomeRecommendViews,
      FeatureView,
      GoodsList,
      Scroll,
      BackTop
    },
    created() {
      //1.请求首页基本数据
      this.getHomeMultiData();

      //2.请求首页商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      //应该在mounted里拿$refs,如果在created里拿，可能组件还没有挂载到dom上，拿到的是null
      this.$bus.$on('imageLoad',()=>{
        this.$refs.scroll.refresh();
      })
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        switch (index) {
          case(0):
            this.currentType = 'pop'
            break
          case(1):
            this.currentType = 'new'
            break
          case(2):
            this.currentType = 'sell'
            break
        }
      },
      backTop() {
        //父组件获取名为scroll的子组件对象
        // this.$refs.scroll.bScroll.scrollTo(0, 0, 500)
        //拿到scroll子组件后，直接调用组件封装的backTop()，而不是拿到组件内bScroll对象后再调用对象的scrollTo()
        this.$refs.scroll.backTop(0, 0, 500);
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000 ? true : false
      },
      loadMore(){
        this.getHomeGoods(this.currentType);
        this.$refs.scroll.finishPullUp()
      },

      /**
       * 网络请求相关的方法
       */
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        let page = this.goods[type].page += 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page = page
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    position: relative;
    height: 100vh; /*100%视口 viewpoint height ,由于内容把home整体都撑高了，所以需要一个固定高度*/
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    width: 100%;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .scroll-content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  /*.scroll-content {
    height: calc(100% - 93px); !*css3中计算div长度值，减去上下高度就是要滚动的高度*!
    overflow: hidden;
    margin-top: 44px;
  }*/
</style>
