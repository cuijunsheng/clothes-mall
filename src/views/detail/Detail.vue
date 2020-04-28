<template>
  <div id="detail">
    <detail-nav-bar/>
    <h2>详情页</h2>
    {{id}}
  </div>
</template>

<script>
  import DetailNavBar from "./components/DetailNavBar";
  export default {
    name: "Detail",
    components: {DetailNavBar},
    data() {
      return {
        id: null
      }
    },
    created() {
      this.id = this.$route.query.id;
    },
    comments:{
      DetailNavBar
    }
  }
</script>

<style scoped>

</style>
