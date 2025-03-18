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
  //用户注册
  toUserSignIn(){
    wx.navigateTo({
      url: '/pages/userSignIn/index'
    });
  },
  //修改座位信息
  toDeskInfo(){
    wx.navigateTo({
      url: '/pages/deskInfo/index'
    });
  },
  toReviewSeat(){
    wx.navigateTo({
      url: '/pages/reviewSeat/index'
    });
  },
  toChangeSeat(){
    wx.navigateTo({
      url: '/pages/changeSeat/index'
    });
  },
  toAddSeat(){
    wx.navigateTo({
      url: '/pages/addSeat/index'
    });
  },
  toDeleteSeat(){
    wx.navigateTo({
      url: '/pages/deleteSeat/index'
    });
  }
});