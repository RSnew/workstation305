const app = getApp()
Page({
  data: {
    alioss : app.globalData.alioss,
    users:[],
    usersCount:0,
    // 每页显示数量
    pageSize:9,
    pageNumber:1,
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
  listUsersQuery:function(e){
    wx.request({
      url: app.globalData.RequestURL+'list_user/',
      data:{
        page: this.data.pageNumber,
        pageSize: this.data.pageSize
      },
      success: (res) => {
        this.setData({
          users: res.data.data,
          usersCount: res.data.total
        })
      }
    })
  },
  // 检查分页功能
  showConsoleLog:function(e){
    console.log("pageIndex: "+e.detail.current)
  },

  changePage:function(e){
    this.setData({
      pageNumber: e.detail.current
    })
  },
});