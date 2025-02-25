const app = getApp();
let globalFunction = require('../../utils/globalFunction.js');
Page({
  data: {
    scanInfo: '',
    userInfo: {}
  },
  onLoad(options) {
    if(app.globalData.scanInfo){
      this.setData({
        scanInfo: app.globalData.scanInfo
      })
    }
    if(app.globalData.userInfo){
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
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
  bindSeat(){
    let that = this
    wx.request({
      url: app.globalData.RequestURL+'bind_seat/',
      data:{
        scanInfo: that.data.scanInfo,
        userNumber: that.data.userInfo.number
      },
      method: 'POST',
      success: (res) => {
        switch(res.data.status){
          case 201:
            that.handleBindSeatFail()
            break
          case 200:
            that.handleBindSeatSuccess()
            break
          default:
            that.handleBindSeatFail()
        }
      },
      fail: (res) => {
        that.handleBindSeatFail()
      }
    })
  },
  
  // 模态
  showModal(title, content, callback) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      success: callback
    });
  },
  handleBindSeatSuccess(){
    this.showModal('提示', '绑定成功', ()=>{
      wx.navigateTo({
        url: '/pages/indexPage/index',
      });
    })
  },
  handleBindSeatFail(){
    this.showModal('提示', '绑定失败', ()=>{
      wx.navigateTo({
        url: '/pages/indexPage/index',
      });
    })
  }

});