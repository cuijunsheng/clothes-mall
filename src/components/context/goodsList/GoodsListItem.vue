<template>
  <div class="goods">
    <img :src="goods.show.img" @load="imageLoad">
    <div class="goods-info">
      <p>{{goods.title}}</p>
      <span class="price">{{goods.price}}</span>
      <span class="collect">{{goods.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods:{
      /**
       *    1.问题：在使用better-scroll做滚动时，会在图片加载完成之前计算出可滚动的高度，比如1300,但是真正要滚动
       * 的高度是图片加载完之后的高度，比如4000，但是scrollHeight不会被重新计算，要想重新计算这个值，必须调用
       * scroll对象的refresh()，重新计算scrollerHeight
       *    2.解决：通过使用Vue的@load()方法监听图片加载完成，有一张图片加载完成就调用一次refresh(),这样计算出来
       * 的高度就是正确的
       *    3.具体解决方案：
       *    1）可以在GoodLostItem里发送自定义事件到GoodList，然后GoodList再发送自定义事件到Home
       * 中，home监听到后，调用scroll的refresh()
       *    2) 使用vuex保存一个全局状态，每当图片加载完成后，item就改变这个状态，然后home中监听到这个状态改变就
       * 调用scroll对象的refresh()
       *    3)使用vue的事件总线，每当图片加载完后，就通过事件总线发射一个事件，home监听事件总线的事件，然后刷新
       *    item: this.$bus.$emit('imageLoad')    home:this.$bus.$on('imageLoad')
       *  但是正常是没有$bus这个属性的，必须再Vue原型中加上这个，Vue.prototype.$bus=new Vue()
       *  监听图片加载完成
       */
      imageLoad(){
        this.$bus.$emit('imageLoad');
      }
    }
  }
</script>

<style scoped>
  .goods {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/images/common/collect.svg") 0 0/14px 14px;
  }
</style>
