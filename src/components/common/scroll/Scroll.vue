<template>
  <div class="wrapper" ref="wrapper">
    <div class="content" >
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props:{
      probeType: {
        type:Number,
        default:0
      }
    },
    data() {
      return {
        bScroll: null
      }
    },
    mounted() {
      //1.创建better-scroll对象
      this.bScroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true, //如果是button设不设置都可以点击，如果是div,或者其他元素需要有点击事件，则必须设置为true
        pullUpLoad: true
      })

      //2.监听对象滚动
      this.bScroll.on("scroll",(position) => {
        this.$emit('scroll',position)
      })
    },
    methods: {
      backTop(x,y,time=500){
        this.bScroll.scrollTo(x,y,time)
      }
    }
  }
</script>

<style scoped>

</style>
