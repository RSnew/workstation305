const app = getApp();
const globalFunction = require('../../utils/globalFunction.js');
Page({
  data: {
    userInfo: {}
  },
  onLoad: async function () {
    if(app.globalData.userInfo){
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }else{
      wx.navigateTo({
        url: '/pages/indexPage/index'
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
  // 退出登录
  logout() {
    wx.showModal({
      title: '提示',
      content: '确定退出登录？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('userNumber')
          wx.navigateTo({
            url: '/pages/indexPage/index'
          })
        }
      }
    })
  },
  // 修改密码
  changePassword() {
    wx.navigateTo({
      url: '/pages/changePasswdPage/index'
    })
  },
});