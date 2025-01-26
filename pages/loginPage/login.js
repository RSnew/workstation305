// pages/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alioss : app.globalData.alioss,
    alert: ""
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
      url:"/pages/indexPage/index"
    })
  },
  
  /**
   * 登录请求
   */
  loginQuery:function(e){
    let number = e.detail.value.number
    let password = e.detail.value.password
    let that=this
    wx.request({
      url: app.globalData.RequestURL+'userLogin/',
      data: {
        number: number,
        password: password
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        
        // let status=res.statusCode
        if (res.data.message=="OK"){
          // 设置 session
          that.setData({
            alert:""
          })
          wx.setStorageSync('userNumber',res.data.data.session)
          app.globalData.userInfo=res.data.data.session
          wx.redirectTo({
            url: '/pages/indexPage/index',
          })
        }else if(res.data.message=="Failed"){
          that.setData({
            alert:"用户名或密码错误"
          })
        }else if(res.data.message=="Empty"){
          that.setData({
            alert:"请输入用户名和密码"
          })
        }
        console.log(that.data.alert)
      }
    })
  }

})