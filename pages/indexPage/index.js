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
    recentAnnouncements: [],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: async function () {
    this.fetchRecentAnnouncements();
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
  fetchRecentAnnouncements() {
    wx.request({
      url: app.globalData.RequestURL + 'get_recent_announcement/',
      method: 'GET',
      success: (res) => {
        if (res.data.status === 'success') {
          console.log('recentAnnouncements:', res.data.data);
          this.setData({
            recentAnnouncements: res.data.data,
          });
        } else {
          wx.showToast({
            title: '加载公告失败',
            icon: 'none',
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '网络错误，请重试',
          icon: 'none',
        });
      },
    });
  },
  closeAnnouncement(e) {
    const index = e.currentTarget.dataset.index;
    const { recentAnnouncements } = this.data;
    console.log('closeAnnouncement index:', index);
    recentAnnouncements[index].isVisible = false;
    this.setData({
      recentAnnouncements,
    });
    console.log('recentAnnouncements:', recentAnnouncements);
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
  toDeviceView(e){
    wx.navigateTo({
      url: '/pages/deviceView/index',
    })
  },
  toTeamInfo(e){
    wx.navigateTo({
      url: '/pages/teamInfo/index',
    })
  },
  toCompetitionInfo(e){
    wx.navigateTo({
      url: '/pages/competitionInfo/index',
    })
  },
  toJoinRequest(e){
    wx.navigateTo({
      url: '/pages/joinRequest/index',
    })
  },
  //客服接口测试
  handleContact(e) {
    console.log('客服会话回调:', e.detail);
  },
})
