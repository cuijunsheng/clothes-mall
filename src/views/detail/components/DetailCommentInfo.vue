<template>
  <div>
    <div class="comment-info" v-if="Object.keys(comments).length >0">
      <div class="comment-header">
        <div class="header-title">用户评价</div>
        <div class="header-more">
          更多
          <i class="arrow-right"></i>
        </div>
      </div>
      <div class="comment-user">
        <img :src="comments.user.avatar" alt="">
        <span>{{comments.user.uname}}</span>
      </div>
      <div class="comment-detail">
        <p>{{comments.content}}</p>
        <div class="comment-other">
          <span class="date">{{comments.created | showDate}}</span>
          <span>{{comments.style}}</span>
        </div>
        <div class="comment-imgs">
          <img :src="item" v-for="(item, index) in comments.images">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from 'common/utils'
  export default {
    name: "DetailCommentInfo",
    props: {
      comments: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters:{
      showDate(value){
        let date = new Date(value*1000)
        return formatDate(date,'yyyyMMdd');
      }
    }
  }
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  .comment-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .header-title {
    float: left;
    font-size: 15px;
  }

  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }

  .comment-user {
    padding: 10px 0 5px;
  }

  .comment-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .comment-user span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }

  .comment-detail {
    padding: 0 5px 15px;
  }

  .comment-detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .comment-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .comment-other .date {
    margin-right: 8px;
  }

  .comment-imgs {
    margin-top: 10px;
  }

  .comment-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>
