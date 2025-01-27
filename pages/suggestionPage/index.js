const app = getApp();
Page({
  data: {

  },
  onLoad(options) {

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
  submit:function(e){
    const request=app.globalData.RequestURL;
    let suggestion = e.detail.value.suggestion;
    wx.request({
      url: request+'submitSuggestion/',
      method: 'POST',
      data: {
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
        console.log(res.data);
        wx.showToast({
          title: '提交失败',
          icon: 'error',
          duration: 2000
        });
      }
    });
    
  },
});