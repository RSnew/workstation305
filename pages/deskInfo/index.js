const app = getApp();
let ddmRange;
let globalFunction = require('../../utils/globalFunction.js');
Page({
  data: {
    options: [
      '理工楼 A 809',
      '理工楼 A 810',
      '理工楼 A 811',
    ],
    alioss : app.globalData.alioss,
    desks: {},
    desksCount: 0,
    pageSize:9,
    pageNumber:1,
    index:0,
  },
  onLoad(options) {
    this.listDesks();
  },
  onReady() {
    ddmRange = this.selectComponent("#ddmRange");
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
          room: this.data.options[this.data.index],
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
  // 下拉菜单需要的函数
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
    this.listDesks();
  },
  toReverseSeat: function(e){
    wx.navigateTo({
      url: '/pages/reserveSeat/index',
    })
  }
});