const app = getApp();
const globalFunction = require('../../utils/globalFunction.js');
Page({
  data: {
    userInfo: {},
    isMyself: false,
    isAdmin: false,
    isChange: false,
    userNumber: '',
    isEdit: false
  },
  onLoad(options)  {
    this.setData({
      userNumber: options.userNumber
    })
    console.log(options)
  },
  onReady: async function () {
    let that=this
    let userNumber=this.data.userNumber
    wx.showLoading({
      title: '加载中',
    })
    try{
      let user=await globalFunction.getUserInfo(app, userNumber,that)
      console.log(user)
      if (user){
        that.setData({
          userInfo: user
        })
        app.globalData.userInfo=user
      }
      if(userNumber==wx.getStorageSync('userNumber')){
        that.setData({
          isMyself: true
        })
        if(user.isAdmin){
          that.setData({
            isAdmin: true
          })
        }
      }
      // 管理员修改用户信息按钮逻辑
      if(app.globalData.userInfo){
        let userTest=app.globalData.userInfo
        console.log(userTest)
        if(userTest.isAdmin){
          that.setData({
            isChange: true
          })
        }
      }
    }catch(e){
      console.log(e)
      wx.showModal({
        title: '提示',
        content: '加载失败，请登录或检查网络',
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    }
    finally{
      wx.hideLoading()
    }
    
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
  // 退出登录
  logout() {
    wx.showModal({
      title: '提示',
      content: '确定退出登录？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('userNumber')
          wx.navigateTo({
            url: '/pages/indexPage/index'
          })
        }
      }
    })
  },
  // 修改密码
  changePassword() {
    wx.navigateTo({
      url: '/pages/changePasswdPage/index'
    })
  },
  //管理员
  toAdminPage() {
    wx.navigateTo({
      url: '/pages/adminPage/index'
    });
  },
  // 修改用户信息
  toggleEdit() {
    if (this.data.isEdit) {
      this.saveUserInfo();
    }
    this.setData({
      isEdit: !this.data.isEdit
    })
  },
  // 保存用户信息
  saveUserInfo() {
    let that = this;
    let userInfo = this.data.userInfo;
    wx.showLoading({
      title: '保存中',
    })
    wx.request({
      url: app.globalData.RequestURL + 'update_user/',
      method: 'POST',
      data: {
        number: userInfo.number,
        name: userInfo.name,
        major: userInfo.major,
        degree: userInfo.degree,
        inYear: userInfo.inYear,
        outYear: userInfo.outYear,
        allTime: userInfo.allTime,
        level: userInfo.level,
        matchTime: userInfo.matchTime,
        matchWinTime: userInfo.matchWinTime
      },
      success: function (res) {
        if (res.data.status == 200) {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '保存失败，请检查网络',
            success: function (res) {
              if (res.confirm) {
                that.setData({
                  isEdit: false
                })
              }
            }
          })
        }
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '保存失败，请检查网络',
          success: function (res) {
            if (res.confirm) {
              that.setData({
                isEdit: false
              })
            }
          }
        })
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  // 各数据项绑定事件
  bindNameInput(e) {
    this.setData({
      'userInfo.name': e.detail.value
    })
  },
  bindMajorInput(e) {
    this.setData({
      'userInfo.major': e.detail.value
    })
  },
  bindDegreeInput(e) {
    this.setData({
      'userInfo.degree': e.detail.value
    })
  },
  bindInYearInput(e) {
    this.setData({
      'userInfo.inYear': e.detail.value
    })
  },
  bindOutYearInput(e) {
    this.setData({
      'userInfo.outYear': e.detail.value
    })
  },
  bindAllTimeInput(e) {
    this.setData({
      'userInfo.allTime': e.detail.value
    })
  },
  bindLevelInput(e) {
    this.setData({
      'userInfo.level': e.detail.value
    })
  },
  bindMatchTimeInput(e){
    this.setData({
      'userInfo.matchTime': e.detail.value
    })
  },
  bindMatchWinTimeInput(e){
    this.setData({
      'userInfo.matchWinTime': e.detail.value
    })
  }
});