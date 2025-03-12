// pages/login.js
const app = getApp()
let globalFunction = require('../../utils/globalFunction.js')
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
    wx.showLoading({
      title: '登录中',
    })
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
      success: async function (res) {
        
        // let status=res.statusCode
        if (res.data.message=="OK" || res.data.message=="ChangePasswd"){
          // 设置 session
          let session=res.data.userInfo
          console.log(session)
          // wx.setStorage('userNumber',session.number)
          wx.setStorageSync("userNumber",session.number)
          wx.setStorageSync("userName",session.name)
          wx.setStorageSync("major",session.major)
          wx.setStorageSync("degree",session.degree)
          wx.setStorageSync("inYear",session.inYear)
          wx.setStorageSync("outYear",session.outYear)
          wx.setStorageSync("allTime",session.allTime)
          wx.setStorageSync("level",session.level)
          wx.setStorageSync("matchTime",session.matchTime)
          wx.setStorageSync("matchWinTime",session.matchWinTime)
          wx.setStorageSync("isAdmin",session.isAdmin)
          let userInfo= {
            number: wx.getStorageSync("userNumber"),
            name: wx.getStorageSync("userName"),
            major: wx.getStorageSync("major"),
            degree: wx.getStorageSync("degree"),
            inYear: wx.getStorageSync("inYear"),
            outYear: wx.getStorageSync("outYear"),
            allTime: wx.getStorageSync("allTime"),
            level: wx.getStorageSync("level"),
            matchTime: wx.getStorageSync("matchTime"),
            matchWinTime: wx.getStorageSync("matchWinTime"),
            isAdmin: wx.getStorageSync("isAdmin")
          }
          app.globalData.userInfo=userInfo
          console.log(app.globalData.userInfo)
          if(res.data.message=="OK"){
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            })
          }else{
            wx.showToast({
              title: '请修改密码',
              icon: 'warning',
              duration: 2000
            })
          }
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/indexPage/index',
            })
          }, 2000)
          
        }else if(res.data.message=="Failed"){
          wx.showToast({
            title: '用户名或密码错误',
            icon: 'error',
            duration: 2000
          })
        }else if(res.data.message=="Empty"){
          wx.showToast({
            title: '请输入用户名和密码',
            icon: 'error',
            duration: 2000
          })
        }
      }
    })
  }

})