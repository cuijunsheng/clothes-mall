/**
 * 防抖函数，防止图片加载调用scroll的refresh()过多，
 */
export function debounce(func,delay){
  let timer = null
  return function(...args){
    if(timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this,args);
    },delay)
  }
}
