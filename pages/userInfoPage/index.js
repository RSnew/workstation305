const app = getApp();
Page({
  data: {
    userInfo: {}
  },
  onLoad(options) {
    let that=this;
    let userNumber=wx.getStorageSync('userNumber')
    if (userNumber){
      wx.request({
        url: app.globalData.RequestURL + 'get_userInfo/',
        data: {
          userNumber: userNumber
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          that.setData({
            userInfo: res.data
          })
          console.log(res.data)
        }
      });
    }else{
      wx.navigateTo({
        url: 'pages/indexPage/index',
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
});