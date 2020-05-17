import {debounce} from "./utils";

export const imgLoadListenerMixin = {
  data() {
    return {
      imgLoadListener: null,
      newRefresh:null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 200)
    this.imgLoadListener = () => {
      // this.$refs.scroll.refresh();
      this.newRefresh();
    }
    //应该在mounted里拿$refs,如果在created里拿，可能组件还没有挂载到dom上，拿到的是null
    this.$bus.$on('imageLoad', this.imgLoadListener)

    console.log('mixin mounted');

  }
}
