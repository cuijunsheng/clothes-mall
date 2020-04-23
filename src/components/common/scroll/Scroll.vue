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
      },
      pullUpLoad:{
        type:Boolean,
        default:false
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
        pullUpLoad: this.pullUpLoad
      })

      //2.监听滚动事件
      this.bScroll.on("scroll",(position) => {//这里参数必须加括号
        this.$emit('scroll',position)
      })

      //3.监听上拉加载事件
      this.bScroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })

      console.log(this.bScroll);
    },
    methods: {
      //调用方法的时候先判断以下bScroll有没有初始化成功
      backTop(x,y,time=500){
        this.bScroll && this.bScroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.bScroll && this.bScroll.finishPullUp();
      },
      refresh(){
        this.bScroll && this.bScroll.refresh();
      }
    }
  }
</script>

<style scoped>

</style>
