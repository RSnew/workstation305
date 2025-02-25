const app = getApp();
let globalFunction = require('../../utils/globalFunction.js');
Page({
  data: {
    scanInfo: app.globalData.scanInfo,
    userNumber:''
  },
  onLoad (options) {
    let that = this
    // 读取信息，有信息进入主界面
    let scanInfo = this.data.scanInfo
    let userNumber = wx.getStorageSync("userNumber")
    if(wx.getStorageSync("scanInfo")){
      scanInfo = wx.getStorageSync("scanInfo")
    }
    if(wx.getStorageSync("userNumber")){
      this.setData({
        userNumber: userNumber
      })
    }
    if(!userNumber){
        wx.showModal({
          title: '提示',
          content: '请重新登录',
          showCancel: false, 
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/indexPage/index',
              })
            }
          }
        })
    }
    console.log("用户数据 "+this.data.userNumber)
    if(!scanInfo){
      wx.scanCode({
        success: (res) => {
          console.log(res.result)
          let scanInfo = res.result
          app.globalData.scanInfo = scanInfo
          this.setData({
            scanInfo: scanInfo
          })
          wx.request({
            url: app.globalData.RequestURL+'check_in/',
            data:{
              scanInfo: scanInfo,
              userNumber: that.data.userNumber
            },
            method: 'POST',
            // TODO 这里微信弹窗有 bug，不跳转
            success: (res) => {
              switch(res.data.status){
                case 205:
                  that.handleAlreadyCheckedIn()
                  break
                case 204:
                  that.handleInvalidQRCode()
                  break
                case 201:
                  that.handleFirstBindSeat()
                  break
                case 200:
                  that.handleCheckInSuccess(res)
                  break
                default:
                  that.handleCheckInFailed()
                
              }
            },
            fail: (res) => {
              console.log(res)
              that.handleCheckInFailed()
            }
            });
          },
          fail: (res) => {
            console.log(res)
            that.handleCheckInFailed()
          }
      });
    }else{
      that.handleAlreadyCheckedIn()
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
  // 定义模态
  showModal(title, content, callback) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      success: callback
    });
  },

  // 签到成功
  handleCheckInSuccess(res) {
    wx.setStorageSync("scanInfo", this.data.scanInfo);
    this.showModal('提示', '签到成功', () => {
      wx.navigateTo({
        url: '/pages/indexPage/index',
      });
    });
  },

  // 二维码格式不正确
  handleInvalidQRCode() {
    this.showModal('提示', '二维码格式不正确', () => {
      wx.navigateTo({
        url: '/pages/indexPage/index',
      });
    });
  },

  // 已经签到
  handleAlreadyCheckedIn() {
    this.showModal('提示', '已经签到过啦', () => {
      wx.navigateTo({
        url: '/pages/indexPage/index',
      });
    });
  },
  // 扫码失败
  handleCheckInFailed(){
    this.showModal('提示', '扫码失败', () => {
      wx.navigateTo({
        url: '/pages/indexPage/index',
      });
    });
  },
  // 第一次绑定座位
  handleFirstBindSeat() {
    this.showModal('提示', '请先绑定座位', () => {
      wx.navigateTo({
        url: '/pages/bindSeatPage/bindSeat',
      });
    });
  }
})