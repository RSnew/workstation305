const app = getApp();
const globalFunction = require('../../utils/globalFunction.js');
Page({
  data: {
    userInfo: {},
    isMyself: false,
    userNumber: '',
  },
  onLoad(options)  {
    this.setData({
      userNumber: options.userNumber
    })
    console.log(options)
  },
  onReady: async function () {
    let that=this
    let userNumber=this.data.userNumber
    wx.showLoading({
      title: '加载中',
    })
    try{
      let user=await globalFunction.getUserInfo(app, userNumber,that)
      console.log(user)
      if (user){
        that.setData({
          userInfo: user
        })
      }
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
    finally{
      wx.hideLoading()
    }
    
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