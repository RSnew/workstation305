// pages/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alioss : app.globalData.alioss,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  /**
   * 返回主界面
   */
  gotoIndex:function(e){
    wx.navigateTo({
      url:"/pages/index/index"
    })
  },
  
  /**
   * 登录失败弹窗 
   */
  loginFalied:function(e){
    wx.showModal({
      title: '警告',
      content: '用户名或密码错误',
      showCancel: false,
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: function(res) {
      }
     })
  },
  /**
   * 登录请求
   */
  loginQuery:function(e){
    let number = e.detail.value.number
    let password = e.detail.value.password
    wx.request({
      url: app.globalData.RequestURL+'loginQuery/',
      data: {
        number: number,
        password: password
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let status=res.statusCode
        // console.log(status)
        if (status=="200"){
          // 设置 session
          wx.setStorageSync('isLoginSession',res.data.data.session)
          app.globalData.userInfo=res.data.data.session
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }else if(status=="403"){
          that.loginFalied()
        }
      }
    })
  }

})