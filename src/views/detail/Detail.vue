<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar" @titleClick="titleClick"/>
    <scroll class="scroll-content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods-info="goodsInfo"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-image-info :image-info="detailImageInfo" @imageLoad="detailImageLoad"/>
      <detail-param-info :param-info="detailParamInfo" ref="param"/>
      <detail-comment-info :comments="comments" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./components/DetailNavBar";
  import DetailSwiper from "./components/DetailSwiper";
  import DetailBaseInfo from "./components/DetailBaseInfo";
  import DetailShopInfo from "./components/DetailShopInfo";
  import DetailImageInfo from "./components/DetailImageInfo";
  import DetailParamInfo from "./components/DetailParamInfo";
  import DetailCommentInfo from "./components/DetailCommentInfo";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/context/goodsList/GoodsList";

  import {getDetails, GoodsInfo, getRecommends} from 'network/detail'
  import {imgLoadListenerMixin} from "common/mixins";
  import {debounce} from "common/utils";

  export default {
    name: "Detail",
    data() {
      return {
        id: null,
        topImages: [],
        goodsInfo: {},
        shopInfo: {},
        detailImageInfo: [],
        detailParamInfo: {},
        comments: {},
        recommends:[],
        themeTopYArray:[],
        getThemeTopY:null
      }
    },
    components: {
      DetailParamInfo,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailImageInfo,
      DetailCommentInfo,
      GoodsList,
      Scroll
    },
    mixins:[imgLoadListenerMixin],
    created() {
      //1.获取商品id
      this.id = this.$route.query.id;
      //2.请求详情数据
      getDetails(this.id).then(res => {
        /*console.log(res);*/
        const data = res.result;
        //1.获取顶部的轮播图数据
        this.topImages = data.itemInfo.topImages;

        //2.获取商品基本信息
        this.goodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services);
        //3.获取店铺信息
        this.shopInfo = data.shopInfo;
        //4.获取详情图片
        this.detailImageInfo = data.detailInfo.detailImage;
        //5.获取参数信息
        this.detailParamInfo = data.itemParams;
        //6.获取评论信息
        this.comments = data.rate.list[0];
      })
      //3.请求推荐数据
      getRecommends().then(res => {
        console.log(res);
        this.recommends = res.data.list;
      })
      //4.给getThemeTopY赋值
      this.getThemeTopY=debounce(()=>{
        this.themeTopYArray=[]
        this.themeTopYArray.push(0)
        this.themeTopYArray.push(this.$refs.param.$el.offsetTop)
        this.themeTopYArray.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYArray.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYArray);
      },1000)
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off('imageLoad',this.imgLoadListener)
    },
    methods:{
      detailImageLoad(){
        this.newRefresh()
        this.getThemeTopY()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYArray[index])
      }
    }
  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    background-color: #fff;
  }
  .nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .scroll-content {
    height: calc(100% - 44px);
    position: relative;
    z-index: 1;
    background-color: #fff;
  }
</style>
