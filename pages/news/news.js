import {
  queryNews
} from '../../api/api';
import {
  formatNum,
  formtime
} from '../../utils/common';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsArr: [],
    loading:false,
    isData:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNewsData()
  },
  //获取新闻
  getNewsData(size = 0) {
    this.setData({
      loading:true
    })
    queryNews({
      limit: 8,
      size
    }).then(res => {
      res.data.forEach(item => {
        item.view_count = formatNum(item.view_count);
        item.publish_date = formtime(item.publish_date, false)
      })
      let oldData =this.data.newsArr;
      let newData =oldData.concat(res.data)
      this.setData({
        newsArr: newData,
        loading:false
      })
      wx.stopPullDownRefresh()
      if (this.data.newsArr.length==res.total) {
        this.setData({
         isData:true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      newsArr:[],
      isData:false,
      loading:false
    })
   this.getNewsData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //到底就不用再请求了
    if (this.data.isData) return;
    this.getNewsData(this.data.newsArr.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})