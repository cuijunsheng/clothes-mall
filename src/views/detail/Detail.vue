<template>
  <div id="detail">
    <detail-nav-bar/>
    <scroll class="scroll-content">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods-info="goodsInfo"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-image-info :image-info="detailImageInfo"/>
      <detail-param-info :param-info="detailParamInfo"/>
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

  import Scroll from "components/common/scroll/Scroll";

  import {getDetails, GoodsInfo} from 'network/detail'

  export default {
    name: "Detail",
    data() {
      return {
        id: null,
        topImages: [],
        goodsInfo: {},
        shopInfo: {},
        detailImageInfo: [],
        detailParamInfo:{}
      }
    },
    components: {
      DetailParamInfo,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailImageInfo,

      Scroll
    },
    created() {
      this.id = this.$route.query.id;
      getDetails(this.id).then(res => {
        console.log(res);
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
      })
    },
  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    background-color: #fff;
  }

  .scroll-content {
    height: calc(100% - 44px);
    position: relative;
    z-index: 1;
    background-color: #fff;
  }
</style>
