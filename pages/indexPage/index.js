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
    if (number ){
      if(app.globalData.userInfo){
        this.setData({
          isLogin: true
        })
      }else{
        let user=await globalFunction.getUserInfo(app, number)
        if(user){
          this.setData({
            isLogin: true
          })
        }
      }
      
    }else{
      this.setData({
        isLogin: false
      })
    }
    if(wx.getStorageSync('isAdmin')){
      this.setData({
        isAdmin: true
      })
    }
  },
  onReady: function () {
    if (!wx.getStorageSync('openid')) {
      wx.login({
        success(res) {
          if (res.code) {
            console.log('登录成功，code:', res.code);
            // 将 code 发送到服务器
            wx.request({
              url: app.globalData.RequestURL+'get_openid/',
              method: 'POST',
              data: {
                code: res.code
              },
              success(response) {
                console.log('服务器返回的 openid:', response.data.openid);
                wx.setStorageSync('openid', response.data.openid);
              },
              fail(error) {
                console.error('请求服务器失败:', error);
              }
            });
          } else {
            console.error('登录失败:', res.errMsg);
          }
        },
        fail(error) {
          console.error('wx.login 调用失败:', error);
        }
      });
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
      url: '/pages/userInfoPage/index?userNumber='+wx.getStorageSync('userNumber'),
    })
  },
  toAdminPage:function(e){
    wx.navigateTo({
      url: '/pages/adminPage/index',
    })
  },
  toDeskInfo:function(e){
    wx.navigateTo({
      url: '/pages/deskInfo/index',
    })
  },
  toScanCodePage:function(e){
    wx.navigateTo({
      url: '/pages/scanCodePage/scanCode',
    })
  },
  //客服接口测试
  handleContact(e) {
    console.log('客服会话回调:', e.detail);
  }
})
