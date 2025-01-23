//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    alioss : app.globalData.alioss,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let that=this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //登录 session 判定
    wx.getStorage({
        key: 'userNumber',
        success: function(res) {
          that.setData({
            isLogin: true
          });
        },
        fail: function(res) {
          that.setData({
            isLogin: false
        });
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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
})
