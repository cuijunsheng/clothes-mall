import {request} from "./request";

export function getHomeMultiData() {

  return request({
    url:'home/multidata',
    method:'get'
  })
}


export function getHomeGoods(type,page) {
  return request({
    url:'home/data',
    params:{
      type,
      page
    }
  })
}
