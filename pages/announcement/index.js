const app = getApp();

Page({
  data: {
    title: '',
    content: '',
  },
  bindTitleInput(e) {
    this.setData({
      title: e.detail.value,
    });
  },
  bindContentInput(e) {
    this.setData({
      content: e.detail.value,
    });
  },
  submitAnnouncement() {
    const { title, content } = this.data;
    if (!title || !content) {
      wx.showToast({
        title: '标题和内容不能为空',
        icon: 'none',
      });
      return;
    }
    wx.request({
      url: app.globalData.RequestURL + 'create_announcement/',
      method: 'POST',
      data: {
        title: title,
        content: content,
      },
      success: (res) => {
        if (res.data.status === 'success') {
          wx.showToast({
            title: '公告发送成功',
            icon: 'success',
          });
          this.setData({
            title: '',
            content: '',
          });
        } else {
          wx.showToast({
            title: res.data.data || '公告发送失败',
            icon: 'none',
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '网络错误，请重试',
          icon: 'none',
        });
      },
    });
  },
});