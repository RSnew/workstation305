Page({
  data: {

  },
  onLoad(options) {

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

  toUserSignIn(){
    wx.navigateTo({
      url: '/pages/userSignIn/index'
    });
  }
});