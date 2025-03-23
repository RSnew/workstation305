const app = getApp();
Page({
  data: {
    userNumber: wx.getStorageSync('userNumber'),
    joinedTeam: {},
    competitionInfo: [],
    isEdit: false,
    isAdmin: wx.getStorageSync('isAdmin'),
    isLeader: false,
    currentEditIndex: -1,
  },

  onLoad(options) {
    this.fetchJoinedTeam();
    this.loadCompetitionInfo();
  },

  loadCompetitionInfo() {
    wx.request({
      url: app.globalData.RequestURL + 'get_competition/',
      method: 'GET',
      success: (res) => {
        if (res.data.status === 'success') {
          console.log(res.data.data);
          this.setData({
            competitionInfo: res.data.data,
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

  fetchJoinedTeam() {
    if (!this.data.userNumber) {
      return;
    }
    wx.request({
      url: app.globalData.RequestURL + `get_joinedTeam_id/?userNumber=${this.data.userNumber}`,
      method: 'GET',
      success: (res) => {
        if (res.data.status === 'success') {
          if (res.data.data.number_1 === this.data.userNumber) {
            this.setData({ isLeader: true });
          }
          this.setData({ joinedTeam: res.data.data });
          console.log("目前战队信息:", this.data.joinedTeam);
        } else if (res.data.status === 'notfound') {
          this.setData({ joinedTeam: null });
        } else {
          wx.showToast({
            title: '获取战队信息失败',
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

  toggleEdit(e) {
    const index = e.currentTarget.dataset.index; 
    console.log('toggleEdit index:', index);
    if (this.data.isEdit) {
      this.saveCompetitionInfo(index);
    } else {
      this.setData({
        isEdit: true,
        currentEditIndex: index,
      });
    }
  },
  saveCompetitionInfo(index) {
    console.log('Saving competition info for index:', index);
    const { competitionInfo } = this.data;
    if (index === undefined || index < 0 || index >= competitionInfo.length) {
      wx.showToast({
        title: '无效的比赛索引',
        icon: 'none',
      });
      return;
    }

    const competition = competitionInfo[index];
    wx.request({
      url: app.globalData.RequestURL + 'update_competition/',
      method: 'POST',
      data: {
        id: competition.id,
        name: competition.name,
        time_front: competition.time_front,
        time_rear: competition.time_rear,
        introduction: competition.introduction,
        url: competition.url,
      },
      success: (res) => {
        if (res.data.status === 'success') {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
          });
          this.setData({
            isEdit: false,
          });
        } else {
          wx.showToast({
            title: res.data.data || '保存失败',
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
  deleteCompetition(e) {
    const index = e.currentTarget.dataset.index;
    const { competitionInfo } = this.data;
    wx.showModal({
      title: '提示',
      content: '确定删除该比赛吗？',
      success: (res) => {
        if (res.confirm) {
          wx.request({
            url: app.globalData.RequestURL + 'delete_competition/',
            method: 'POST',
            data: {
              id: competitionInfo[index].id,
            },
            success: (res) => {
              if (res.data.status === 'success') {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                });
                // 从列表中移除该比赛
                competitionInfo.splice(index, 1);
                this.setData({
                  competitionInfo,
                });
              } else {
                wx.showToast({
                  title: res.data.data || '删除失败',
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
        }
      },
    });
  },
  registerForCompetiton(e) {
    const index = e.currentTarget.dataset.index;
    const { competitionInfo } = this.data;
    const competition = competitionInfo[index];
    // console.log('registerForCompetiton index:', index);
    // console.log('competition:', competition);
    wx.request({
      url: app.globalData.RequestURL + 'register_competition/',
      method: 'POST',
      data: {
        teamID: this.data.joinedTeam.teamID,
        competitionID: competition.id
      },
      success: (res) => {
        console.log('registerForCompetiton response:', res.data);
        if (res.data.status === 'success') {
          wx.showToast({
            title: '报名成功，等待审核',
            icon: 'success',
          });
        } else if(res.data.status === 'already') {
          wx.showToast({
            title: '已报名该比赛或未审核完毕',
            icon: 'none',
          });
        } else {
          wx.showToast({
            title: res.data.data || '报名失败',
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
    })
  },

  // 输入框绑定
  bindNameInput(e) {
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    this.setData({
      [`competitionInfo[${index}].name`]: value,
    });
  },
  bindTimeFrontInput(e) {
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    this.setData({
      [`competitionInfo[${index}].time_front`]: value,
    });
  },
  bindTimeRearInput(e) {
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    this.setData({
      [`competitionInfo[${index}].time_rear`]: value,
    });
  },
  bindIntroductionInput(e) {
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    this.setData({
      [`competitionInfo[${index}].introduction`]: value,
    });
  },
  bindUrlInput(e) {
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    this.setData({
      [`competitionInfo[${index}].url`]: value,
    });
  },

  gotoWeb(e) {
    const url = e.currentTarget.dataset.url;
    wx.showToast({
      title: '目前有点问题，请手动复制到浏览器中',
      icon: 'none',
    });
    return;
    if (url) {
      console.log(url);
      wx.openUrl({
        url: url,
      });
    } else {
      wx.showToast({
        title: '无效链接',
        icon: 'none',
      });
    }
  },
  toCompetitionAlready(e) {
    const teamID = this.data.joinedTeam.teamID;
    wx.navigateTo({
      url: `/pages/competitionAlready/index?teamID=${teamID}`, // 传递 teamID
    });
  }
});