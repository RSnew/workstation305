const app = getApp();
Page({
  data: {
    teamID: null, // 用于存储传递的 teamID
    acceptedCompetition: [], // 用于存储已报名的比赛信息
  },

  onLoad(options) {
    const teamID = options.teamID;
    console.log("teamID:", teamID);
    if (teamID) {
      this.setData({ teamID });
      this.fetchAcceptedCompetitions(teamID);
    } else {
      wx.showToast({
        title: '未找到队伍 ID',
        icon: 'none',
      });
    }
  },

  fetchAcceptedCompetitions(teamID) {
    wx.request({
      url: app.globalData.RequestURL + 'get_accepted_competition_by_id/', 
      method: 'POST',
      data: {
        teamID: teamID, // 传递 teamID
      },
      success: (res) => {
        console.log(res.data.data);
        if (res.data.success) {
          this.setData({
            acceptedCompetition: res.data.data, // 更新已报名的比赛信息
          });
        } else {
          wx.showToast({
            title: '获取数据失败',
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