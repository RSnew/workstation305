const app = getApp();
Page({
  data: {
    teamInfo: {
      teamName: '',
      teamSlogan: '',
      instructor: '',
      number_1: '',
      number_2: '',
      number_3: '',
      number_4: '',
      waiting_number_1: '',
      waiting_number_2: '',
    },
  },

  // 绑定战队名称输入
  bindTeamNameInput(e) {
    this.setData({
      'teamInfo.teamName': e.detail.value,
    });
  },

  // 绑定战队口号输入
  bindTeamSloganInput(e) {
    this.setData({
      'teamInfo.teamSlogan': e.detail.value,
    });
  },

  // 绑定指导老师输入
  bindInstructorInput(e) {
    this.setData({
      'teamInfo.instructor': e.detail.value,
    });
  },

  // 绑定成员1输入
  bindNumber1Input(e) {
    this.setData({
      'teamInfo.number_1': e.detail.value,
    });
  },

  // 绑定成员2输入
  bindNumber2Input(e) {
    this.setData({
      'teamInfo.number_2': e.detail.value,
    });
  },

  // 绑定成员3输入
  bindNumber3Input(e) {
    this.setData({
      'teamInfo.number_3': e.detail.value,
    });
  },

  // 绑定成员4输入
  bindNumber4Input(e) {
    this.setData({
      'teamInfo.number_4': e.detail.value,
    });
  },

  // 绑定候补成员1输入
  bindWaitingNumber1Input(e) {
    this.setData({
      'teamInfo.waiting_number_1': e.detail.value,
    });
  },

  // 绑定候补成员2输入
  bindWaitingNumber2Input(e) {
    this.setData({
      'teamInfo.waiting_number_2': e.detail.value,
    });
  },

  // 提交表单
  submitForm() {
    const that=this
    const teamInfo = this.data.teamInfo;

    // 这里可以添加表单验证逻辑
    if (!teamInfo.teamName || 
      !teamInfo.teamSlogan || 
      !teamInfo.instructor ||
      !teamInfo.number_1) {
      wx.showToast({
        title: '请填写必填项',
        icon: 'none',
      });
      return;
    }

    // 提交数据到服务器
    wx.request({
      url: app.globalData.RequestURL+'add_team/', // 替换为你的服务器地址
      method: 'POST',
      data: teamInfo,
      success(res) {
        if (res.data.status === 'success') {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
          });
          // 清空表单
          that.setData({
            teamInfo: {
              teamName: '',
              teamSlogan: '',
              instructor: '',
              number_1: '',
              number_2: '',
              number_3: '',
              number_4: '',
              waiting_number_1: '',
              waiting_number_2: '',
            },
          });
        } else {
          wx.showToast({
            title: '添加失败',
            icon: 'none',
          });
        }
      },
      fail() {
        wx.showToast({
          title: '网络错误，请重试',
          icon: 'none',
        });
      },
    });
  },
});