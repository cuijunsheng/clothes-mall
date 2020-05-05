<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods-info="goodsInfo"/>
  </div>
</template>

<script>
  import DetailNavBar from "./components/DetailNavBar";
  import DetailSwiper from "./components/DetailSwiper";
  import DetailBaseInfo from "./components/DetailBaseInfo";

  import {getDetails, GoodsInfo} from 'network/detail'

  export default {
    name: "Detail",
    data() {
      return {
        id: null,
        topImages: [],
        goodsInfo: {}
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo
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
      })
    },
  }
</script>

<style scoped>

</style>
