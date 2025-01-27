const app=getApp();
const globalFn = require('../../utils/globalFunction.js');
Page({
  data: {
    userInfo: {}, 
    newpasswd: '',
  },
  onLoad: async function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      });
    }else{
      wx.navigateTo({
        url: '/pages/indexPage/index',
      });
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
  changePasswdRequire(e){
    let that=this
    wx.showModal({
      title: '提示',
      content: '确认更改密码？',
      complete: (res) => {
        if (res.confirm) {
          that.setData({
            newpasswd: e.detail.value
          })
        }
      }
    })
  }
});