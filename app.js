//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
         	this.globalData.Custom = capsule;
        	this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
        	this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    // alioss 容器配置
    alioss: "https://sky-bucket-rsnew.oss-cn-huhehaote.aliyuncs.com",
    // 登录 session
    isLogin: false,
    // 请求地址
    // RequestURL: "https://www.workstation305.cn:8000/",
    RequestURL: "http://www.workstation305.cn/",
    // 扫码信息
    scanInfo: '',
  }
})