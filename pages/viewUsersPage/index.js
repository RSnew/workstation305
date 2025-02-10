const app = getApp()
let globalFunction = require('../../utils/globalFunction.js')
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
  listUsersQuery:async function(e){
    wx.showLoading({
      title: '加载中',
    })
    try{
      wx.request({
        url: app.globalData.RequestURL+'list_user/',
        data:{
          page: this.data.pageNumber,
          pageSize: this.data.pageSize
        },
        success: (res) => {
          console.log(res.data.data)
          console.log(res.data.total)
          this.setData({
            users: res.data.data,
            usersCount: res.data.total
          })
        }
      })
    }catch(e){
      console.log(e)
      wx.showModal({
        title: '提示',
        content: '加载失败，请检查网络',
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    }finally{
      wx.hideLoading()
    }
    
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
  test:async function(e){
    let userNumber= e._relatedInfo.anchorTargetText
    let user=await globalFunction.getUserInfo(app, userNumber,this)
    console.log(user)
    wx.navigateTo({
      url: '/pages/userInfoPage/index?userNumber='+userNumber
    })
  }
});