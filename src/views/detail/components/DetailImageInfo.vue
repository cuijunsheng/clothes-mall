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
        <img :src="image">
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
