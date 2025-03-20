const app = getApp();

Page({
  data: {
    userNumber: wx.getStorageSync('userNumber'), // 当前用户的编号
    joinedTeam: null, // 用户已加入的战队
    teamList: [], // 其他战队列表
    showJoinDrawer: false, // 是否显示加入战队的抽屉
    availablePositions: [], // 可用的空位置
    selectedTeamID: null, // 当前选择的战队 ID
  },

  onLoad() {
    // 页面加载时获取战队列表和用户已加入的战队
    this.fetchTeamList();
    this.fetchJoinedTeam();
  },

  // 获取战队列表
  fetchTeamList() {
    wx.request({
      url: app.globalData.RequestURL + 'list_team/',
      method: 'GET',
      success: (res) => {
        if (res.data.status === 'success') {
          // 检查每个战队是否有空位置
          const teamList = res.data.data.map(team => {
            const positions = [
              team.number_1,
              team.number_2,
              team.number_3,
              team.number_4,
              team.waiting_number_1,
              team.waiting_number_2,
            ];
            team.isFull = positions.every(pos => pos); // 如果所有位置都不为空，则战队已满
            return team;
          });
          this.setData({ teamList });
        } else {
          wx.showToast({
            title: '获取战队列表失败',
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

  // 获取用户已加入的战队
  fetchJoinedTeam() {
    if(!this.data.userNumber) {
      return;
    }
    wx.request({
      url: app.globalData.RequestURL + `get_joinedTeam_id/?userNumber=${this.data.userNumber}`,
      method: 'GET',
      success: (res) => {
        if (res.data.status === 'success') {
          this.setData({ joinedTeam: res.data.data });
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

  // 显示加入战队的抽屉
  showJoinDrawer(e) {
    const teamID = e.currentTarget.dataset.teamid;
    console.log('showJoinDrawer:', e);
    console.log('teamID:', teamID);
    const team = this.data.teamList.find(team => team.teamID === teamID);
    if(!this.data.userNumber) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
      });
      return;
    }
    if (!team) {
      wx.showToast({
        title: '战队信息错误',
        icon: 'none',
      });
      return;
    }

    // 获取可用的空位置
    const availablePositions = [];
    if (!team.number_1) availablePositions.push('申请成为队长');
    if (!team.number_2 || !team.number_3 || !team.number_4) {
      availablePositions.push('申请成为队员');
    }
    if (!team.waiting_number_1|| !team.waiting_number_2) {
      availablePositions.push('申请成为候补');
    }
    this.setData({
      showJoinDrawer: true,
      availablePositions,
      selectedTeamID: teamID,
    });
  },

  // 关闭加入战队的抽屉
  closeJoinDrawer() {
    this.setData({
      showJoinDrawer: false,
      availablePositions: [],
      selectedTeamID: null,
    });
  },

  // 加入战队
  joinTeam(e) {
    const position = e.currentTarget.dataset.position;
    const teamID = this.data.selectedTeamID;

    // number_1 是队长，其他是队员
    const roleMap = {
      '申请成为队长': 'leader',
      '申请成为队员': 'member',
      '申请成为候补': 'waiting',
    };
    const role = roleMap[position];
    // console.log("teamID:", teamID);
    // console.log("role:", role);
    // console.log("position:", position);
    wx.request({
      url: app.globalData.RequestURL + 'join_team/',
      method: 'POST',
      data: {
        teamID: teamID,
        userNumber: this.data.userNumber,
        role: role, // 用户角色（队长/队员/替补）
      },
      success: (res) => {
        if (res.data.status === 'success') {
          wx.showToast({
            title: '申请成功，等待审核',
            icon: 'success',
          });
          // 重新获取战队列表和已加入的战队
          this.fetchTeamList();
          this.fetchJoinedTeam();
          this.closeJoinDrawer();
        } else {
          wx.showToast({
            title: '加入失败',
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

  // 退出战队
  quitTeam() {
    wx.request({
      url: app.globalData.RequestURL + 'quit_team/',
      method: 'POST',
      data: {
        userNumber: this.data.userNumber,
      },
      success: (res) => {
        if (res.data.status === 'success') {
          wx.showToast({
            title: '退出成功',
            icon: 'success',
          });
          // 重新获取战队列表和已加入的战队
          this.fetchTeamList();
          this.fetchJoinedTeam();
        } else {
          wx.showToast({
            title: '退出失败',
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