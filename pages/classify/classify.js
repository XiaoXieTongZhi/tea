import {
  listNav,
  queryProduct
} from "../../api/api"
let navid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navActive: 0,
    navArr: [],
    proArr: [],
    loading:false,
    isData:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let {idx} =options;

    await this.getNavList();
    if (idx) {
      this.navChange(idx)
    }  else{
    
      navid = this.data.navArr[0]._id;
      this.getProductList();
    }

  },
  //获取分类导航
  async getNavList() {
    await listNav().then(res => {

      this.setData({
        navArr: res.data
      })
    })
  },
  //导航条切换
  navChange(e) {
    let index = e?.detail?.index ?? e;
    navid = this.data.navArr[index]._id
    this.setData({
      proArr:[],
      loading:false,
      isData:false,
      navActive:Number(index)
    })
    this.getProductList()

  },
  //获取产品列表
  getProductList(s = 0) {
    this.setData({
      loading:true
    })
    queryProduct({
      navid,
      size: s

    }).then(res => {
      let oldArr = this.data.proArr;
      let newArr = oldArr.concat(res.data);
      this.setData({
        proArr: newArr,
        loading:false
      })
      if (res.total==this.data.proArr.length) {
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isData) 
    return;
    this.getProductList(this.data.proArr.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})