const app = getApp();
Page({
  data: {
    teamList: [], // 待审核的战队预约列表
  },

  onLoad() {
    // 加载待审核的战队预约列表
    this.loadPendingTeams();
  },

  // 加载待审核的战队预约列表
  loadPendingTeams() {
    wx.request({
      url: app.globalData.RequestURL+'get_pending_team/', 
      method: 'GET',
      success: (res) => {
        if (res.data.status === 'success') {
          this.setData({
            teamList: res.data.data, 
          });
        } else if(res.data.status === 'nobody') {
          this.setData({
            teamList: [],
          });
        } else {
          wx.showToast({
            title: '加载失败，请重试',
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

  // 同意战队预约
  acceptPendingTeam(e) {
    const index = e.currentTarget.dataset.index;
    const team = this.data.teamList[index];

    wx.request({
      url: app.globalData.RequestURL+'admin_review/',
      method: 'POST',
      data: {
        teamID: team.teamID,
        userNumber: team.userNumber,
        role: team.role,
        action: 'accept',
        type: "team",
      },
      success: (res) => {
        console.log(res.data);
        if (res.data.status === 'success') {
          wx.showToast({
            title: '审核通过',
            icon: 'success',
          });
          // 刷新列表
          this.loadPendingTeams();
        } else {
          wx.showToast({
            title: res.data.message || '操作失败',
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

  // 拒绝战队预约
  rejectPendingTeam(e) {
    const index = e.currentTarget.dataset.index;
    const team = this.data.teamList[index];

    wx.request({
      url: app.globalData.RequestURL+'admin_review/', // 替换为你的 API 地址
      method: 'POST',
      data: {
        teamID: team.teamID,
        userNumber: team.userNumber,
        role: team.role,
        action: 'reject',
        type: "team",
      },
      success: (res) => {
        if (res.data.status === 'success') {
          wx.showToast({
            title: '审核拒绝',
            icon: 'success',
          });
          // 刷新列表
          this.loadPendingTeams();
        } else {
          wx.showToast({
            title: res.data.message || '操作失败',
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