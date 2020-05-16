import {request} from "./request";

export function getDetails(id) {
  return request({
    url: 'detail',
    params: {
      iid: id
    }
  })
}

export class GoodsInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.highNowPrice;
  }
}

export function getRecommends() {
  return request({
    url:'recommend'
  })
}
