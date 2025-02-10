//index.js
//获取应用实例
const app = getApp()
let globalFunction = require('../../utils/globalFunction.js')
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    alioss : app.globalData.alioss,
    userInfo: {},
    isLogin: false,
    isAdmin:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: async function () {
    let number=wx.getStorageSync('userNumber')
    //登录 session 判定
    if (number){
      this.setData({
        isLogin: true
      })
    }
    // 管理员放在个人信息页面
    // if(user.isAdmin){
    //   that.setData({
    //     isAdmin: true
    //   })
    // }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      isLogin: true
    })
  },

  toLoginPage:function(e){
    wx.navigateTo({
      url: '/pages/loginPage/login',
    })
  },
  toViewUsersPage:function(e){
    wx.navigateTo({
      url: '/pages/viewUsersPage/index',
    })
  },
  toSuggestionPage:function(e){
    wx.navigateTo({
      url: '/pages/suggestionPage/index',
    })
  },
  toUserInfoPage:function(e){
    wx.navigateTo({
      url: '/pages/userInfoPage/index?userNumber='+wx.getStorageSync('userNumber'),
    })
  },
  toAdminPage:function(e){
    wx.navigateTo({
      url: '/pages/adminPage/index',
    })
  }
})
