const app=getApp();
const globalFn = require('../../utils/globalFunction.js');
Page({
  data: {
    userInfo: {}, 
    newpasswd: '',
  },
  onLoad: async function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      });
    }else{
      wx.navigateTo({
        url: '/pages/indexPage/index',
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
  changePasswdRequire(e){
    let that=this
    wx.showModal({
      title: '提示',
      content: '确认更改密码？',
      complete: (res) => {
        if (res.confirm) {
          
          wx.request({
            url: app.globalData.RequestURL + 'change_passwd/',
            data: {
              number: that.data.userInfo.number,
              newpasswd: that.data.newpasswd,
            },
            method: 'POST',
            success: (res) => {
              if (res.data.status == 200) {
                wx.showToast({
                  title: '修改成功',
                  icon: 'success',
                  duration: 2000
                });
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 2000)
              } else {
                wx.showToast({
                  title: '修改失败',
                  icon: 'none',
                  duration: 2000
                });
              }
            },
            fail: (res) => {
              wx.showToast({
                title: '网络错误',
                icon: 'none',
                duration: 2000
              });
            }
          })
        }
      }
    })
  }
});