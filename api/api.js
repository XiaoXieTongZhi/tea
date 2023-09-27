import {request} from '../utils/require';

//获取分类
export function listNav(){
 return request({
    url:'/nav/get',
    method:'post'
  })
}

//获取新闻列表
export  function queryNews(data){
  return request({
    url:'/news/get',
    method:'post',
    data
  })
}

//获取新闻详情
export  function newsDetail(data){
  return request({
    url:'/news/detail',
    method:'post',
    data
  })
}
//获取产品列表
export  function queryProduct (data){
  return request({
    url:'/product/getlist',
    method:'post',
    data
  })
} 