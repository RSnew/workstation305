const app= getApp()
Page({
  data: {
    competitionName: '', // 比赛名称
    timeFront: '',       // 开始时间
    timeRear: '',        // 结束时间
    introduction: '',    // 比赛介绍
    url: '',             // 竞赛官网
  },

  // 绑定比赛名称输入
  bindNameInput(e) {
    this.setData({
      competitionName: e.detail.value,
    });
  },

   // 绑定开始时间选择
   bindTimeFrontChange(e) {
    this.setData({
      timeFront: e.detail.value, // 选择的日期格式为 YYYY-MM-DD
    });
  },

  // 绑定结束时间选择
  bindTimeRearChange(e) {
    this.setData({
      timeRear: e.detail.value, // 选择的日期格式为 YYYY-MM-DD
    });
  },

  // 绑定比赛介绍输入
  bindIntroductionInput(e) {
    this.setData({
      introduction: e.detail.value,
    });
  },

  // 绑定竞赛官网输入
  bindUrlInput(e) {
    this.setData({
      url: e.detail.value,
    });
  },

  // 提交比赛信息
  submitCompetition() {
    const { competitionName, timeFront, timeRear, introduction, url } = this.data;

    // 表单验证
    if (!competitionName || !timeFront || !timeRear || !introduction || !url) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
      });
      return;
    }

    // 提交到后端
    wx.request({
      url: app.globalData.RequestURL + 'add_competition/',
      method: 'POST',
      data: {
        name: competitionName,
        time_front: timeFront,
        time_rear: timeRear,
        introduction: introduction,
        url: url,
      },
      success: (res) => {
        if (res.data.status === 'success') {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
          });
          // 返回上一页
          wx.navigateBack();
        } else {
          wx.showToast({
            title: res.data.data || '添加失败',
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