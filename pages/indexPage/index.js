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
    let that=this;
    //登录 session 判定
    let user=await globalFunction.getUserInfo(app, that)
    console.log(user)
    if (user){
      app.globalData.userInfo=user
      that.setData({
        userInfo: user,
        isLogin: true
      })
    }
    if(user.isAdmin){
      that.setData({
        isAdmin: true
      })
    }
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
      url: '/pages/userInfoPage/index',
    })
  },
  toAdminPage:function(e){
    wx.navigateTo({
      url: '/pages/adminPage/index',
    })
  }
})
