<template>
  <div v-if="Object.keys(imageInfo).length!==0" class="detail-image-info">
    <div v-for="item in imageInfo">
      <div class="info-desc clear-fix">
        <div class="start"></div>
        <div class="desc">{{item.desc}}</div>
        <div class="end"></div>
      </div>
      <div class="image-key">{{item.key}}</div>
      <div v-for="image in item.list" class="image-info">
        <img :src="image" @load="imageLoad">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailImageInfo",
    props: {
      imageInfo: {
        type: Array,
        default() {
          return {}
        }
      }
    },
    methods:{
      imageLoad(){
        //1.通过自定义事件发出去，父组件接受后做刷新scroll高度操作
        this.$emit('imageLoad')
        //2.通过事件总线发出去，在混入对象中做刷新scroll高度操作,由于详情页需要做点击主题切换到滚动到对应
        //内容，所以需要在图片加载完后获取offSetTop值，所以用第一种自定义事件
       /* this.$bus.$emit('imageLoad')*/
      }
    }
  }
</script>

<style scoped>
  .detail-image-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }
  .image-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .image-info img{
    width: 100%;
  }
</style>
