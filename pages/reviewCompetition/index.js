const app = getApp();
Page({
  data: {
    competitionList: [] // 初始化为空，实际数据从服务器获取
  },

  onLoad: function () {
    // 从服务器获取比赛报名列表
    this.getCompetitionList();
  },

  // 获取比赛报名列表
  getCompetitionList: function () {
    wx.request({
      url: app.globalData.RequestURL + 'get_pending_team_competition/', // 替换为实际的API地址
      method: 'GET',
      success: (res) => {
        console.log(res.data.data);
        if (res.data.success) {
          this.setData({
            competitionList: res.data.data // 假设返回的数据格式
          });
          console.log(this.data.competitionList.length);
        } else {
          wx.showToast({
            title: '加载失败，请重试',
            icon: 'none'
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '网络错误，请重试',
          icon: 'none'
        });
      }
    });
  },

  // 同意报名
  acceptPendingCompetition: function (event) {
    const index = event.currentTarget.dataset.index;
    const competition = this.data.competitionList[index];
    wx.request({
        url: app.globalData.RequestURL + 'competition_review/',
        method: 'POST',
        data: {
          teamID: competition.teamID,
          competitionID: competition.competitionID,
          action: 'accept',
          type: "competition",
        },
        success: (res) => {
          console.log(res.data);
          if (res.data.status === 'success') {
            wx.showToast({
              title: `已同意 ${competition.teamName} 的报名`,
              icon: 'success'
            });
            this.getCompetitionList(); // 刷新列表
          } else {
            wx.showToast({
              title: res.data.message || '操作失败',
              icon: 'none'
            });
          }
        },
        fail: () => {
          wx.showToast({
            title: '网络错误，请重试',
            icon: 'none'
          });
        }
    })
  },

  // 拒绝报名
  rejectPendingCompetition: function (event) {
    const index = event.currentTarget.dataset.index;
    const competition = this.data.competitionList[index];
    wx.request({
        url: app.globalData.RequestURL + 'competition_review/',
        method: 'POST',
        data: {
          teamID: competition.teamID,
          competitionID: competition.competitionID,
          action: 'reject',
          type: "competition",
        },
        success: (res) => {
          console.log(res.data);
          if (res.data.status === 'success') {
            wx.showToast({
              title: `已同意 ${competition.teamName} 的报名`,
              icon: 'success'
            });
            this.getCompetitionList(); // 刷新列表
          } else {
            wx.showToast({
              title: res.data.message || '操作失败',
              icon: 'none'
            });
          }
        },
        fail: () => {
          wx.showToast({
            title: '网络错误，请重试',
            icon: 'none'
          });
        }
    })
  }
});