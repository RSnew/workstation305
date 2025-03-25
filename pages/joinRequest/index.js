const app=getApp()
Page({
  data: {
    name: '',
    number: '',
    inYear: '',
    reason: '',
  },

  submit() {
    const { name, number, inYear, reason } = this.data;

    if (!name || !number || !inYear || !reason) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
      });
      return;
    }
    wx.showLoading({
      title: '提交中...',
    });

    wx.request({
      url:app.globalData.RequestURL+"join_request/",
      method: 'POST',
      data: {
        name,
        number,
        inYear,
        reason,
      },
      success: (res) => {
        wx.hideLoading();
        if (res.data.status === "success") {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
          });
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        } else {
          wx.showToast({
            title: '提交失败',
            icon: 'none',
          });
        }
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({
          title: '提交失败',
          icon: 'none',
        });
      },
    })
  },
});