const app = getApp();
Page({
  data: {
    openid:""
  },
  onLoad(options) {

  },
  onReady() {
    if(wx.getStorageSync('openid')){
      this.setData({
        openid:wx.getStorageSync('openid')
      })
    }else{
      wx.showToast({
        title: '请先登录',
        icon: 'error',
        duration: 2000
      });
      wx.switchTab({
        url: '/pages/indexPage/index',
      })
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
  submit:function(e){
    let openid = this.data.openid;
    let suggestion = e.detail.value.suggestion;
    wx.request({
      url: app.globalData.RequestURL+'send_customer_service_message/',
      method: 'POST',
      data: {
        openid: openid,
        suggestion: suggestion
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        });
        
      },
      fail: function (res) {
        switch(res.data.status){
          case 500:
            console.log(res.data);
            wx.showToast({
              title: '发送客服消息失败',
              icon: 'error',
              duration: 2000
            });
            break;
            case 402:{
              console.log(res.data);
              wx.showToast({
                title: '建议为空',
                icon: 'error',
                duration: 2000
              });
              break;
            }
        }
      }
    })
    // const request=app.globalData.RequestURL;
    // let suggestion = e.detail.value.suggestion;
    // wx.request({
    //   url: request+'submitSuggestion/',
    //   method: 'POST',
    //   data: {
    //     suggestion: suggestion
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res.data);
    //     wx.showToast({
    //       title: '提交成功',
    //       icon: 'success',
    //       duration: 2000
    //     });
        
    //   },
    //   fail: function (res) {
    //     switch(res.data.status){
    //     case 403:
    //       console.log(res.data);
    //       wx.showToast({
    //         title: '提交失败',
    //         icon: 'error',
    //         duration: 2000
    //       });
    //       break;
    //     case 402:
    //       console.log(res.data);
    //       wx.showToast({
    //         title: '建议为空',
    //         icon: 'error',
    //         duration: 2000
    //       });
    //       break;
    //     }
    //   }
    // });
    
  },
});