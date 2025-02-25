const app = getApp();
let globalFunction = require('../../utils/globalFunction.js');
Page({
  data: {
    alioss : app.globalData.alioss,
    desks: {},
    desksCount: 0,
    pageSize:9,
    pageNumber:1
  },
  onLoad(options) {
    this.listDesks();
  },
  onReady() {

  },
  onShow() {

  },
  onHide() {

  },
  onUnload() {

  },
  onShareAppMessage() {
    return {
      title: '',
    };
  },
  listDesks:async function(e){
    wx.showLoading({
      title: '加载中',
    })
    try{
      wx.request({
        url: app.globalData.RequestURL+'list_desk/',
        data:{
          page: this.data.pageNumber,
          pageSize: this.data.pageSize
        },
        success: (res) => {
          console.log(res.data.data)
          console.log(res.data.total)
          this.setData({
            desks: res.data.data,
            desksCount: res.data.total
          })
        }
      })
    }catch(e){
      console.log(e)
      wx.showModal({
        title: '提示',
        content: '加载失败，请检查网络',
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    }
    wx.hideLoading()
  },
  changePage:function(e){
    this.setData({
      pageNumber: e.detail.current
    })
  },
});