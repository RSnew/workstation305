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
});