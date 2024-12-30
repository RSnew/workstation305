const app = getApp()
Page({
  data: {
    alioss : app.globalData.alioss,
    users:[]
  },
  onLoad(options) {
    this.listUsersQuery();
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
  //请求用户列表
  listUsersQuery:function(){
    wx.request({
      url: app.globalData.RequestURL+'list_user/',
      success: (res) => {
        console.log(res.data)
        this.setData({
          users: res.data
        })
      }
    })
  },
});