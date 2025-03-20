const app = getApp();
Page({
  data: {
    teamList: [], // 战队列表
    isEdit: false, // 是否处于编辑模式
    editIndex: -1, // 当前编辑的战队索引
  },

  onLoad() {
    // 初始化战队列表
    this.getTeamList();
  },

  // 切换编辑模式
  toggleEdit(e) {
    const index = e.currentTarget.dataset.index;
    if (this.data.isEdit && this.data.editIndex === index) {
      // 保存逻辑
      this.saveTeamInfo(index);
    } else {
      // 进入编辑模式
      this.setData({
        isEdit: true,
        editIndex: index,
      });
    }
  },
  getTeamList(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.RequestURL + 'list_team/',
      method: 'GET',
      success: (res) => {
        if (res.data.data && res.data.data.length > 0) {
          this.setData({
            teamList: res.data.data
          });
        } else {
          wx.showToast({
            title: '暂无战队信息',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('获取战队列表失败：', err);
        wx.showToast({
          title: '获取战队列表失败',
          icon: 'none'
        });
      }
    })
    wx.hideLoading()
  },
  // 保存战队信息
  saveTeamInfo(index) {
    const teamList = this.data.teamList;
    console.log('保存战队信息:', teamList[index]);
    wx.request({
      url: app.globalData.RequestURL + 'update_team/',
      method: 'POST',
      data: teamList[index],
      success: (res) => {
        if (res.data.status=="success") {
          wx.showToast({
            title: '保存成功',
          });
        } else if(res.data.status=="fail") {
          wx.showToast({
            title: '战队不存在',
            icon: 'none',
          });
        }
      },
      fail: (err) => {
        console.error('保存战队信息失败：', err);
        wx.showToast({
          title: '保存失败',
          icon: 'none',
        });
      },
    })
    this.setData({
      isEdit: false,
      editIndex: -1,
      teamList,
    });
  },

  // 删除战队
  deleteTeam(e) {
    const index = e.currentTarget.dataset.index;
    const teamList = this.data.teamList;
    this.setData({
      teamList,
    });
    console.log('删除战队ID:', teamList[index].teamID);
    wx.showModal({
      title: '提示',
      content: '是否删除该战队？',
      complete: (res) => {
        if (res.cancel) {
          this.setData({
            teamList: this.data.teamList
          });
          return;
        }
    
        if (res.confirm) {
          wx.request({
            url: app.globalData.RequestURL + 'delete_team/',
            method: 'POST',
            data: {
              teamID: teamList[index].teamID
            },
            success: (res) => {
              if (res.data.status=="success") {
                wx.showToast({
                  title: '删除成功',
                });
              } else if(res.data.status=="fail") {
                wx.showToast({
                  title: '战队不存在',
                  icon: 'none',
                });
              }
            },
            fail: (err) => {
              console.error('删除战队失败：', err);
              wx.showToast({
                title: '删除失败',
                icon: 'none',
              });
            },
          })
          wx.hideLoading();
          this.getTeamList();
        }
      }
    })
    
  },

  // 绑定输入事件
  bindTeamNameInput(e) {
    this.updateTeamField(e, 'teamName');
  },
  bindTeamSloganInput(e) {
    this.updateTeamField(e, 'teamSlogan');
  },
  bindInstructorInput(e) {
    this.updateTeamField(e, 'instructor');
  },
  bindNumber1Input(e) {
    this.updateTeamField(e, 'number_1');
  },
  bindNumber2Input(e) {
    this.updateTeamField(e, 'number_2');
  },
  bindNumber3Input(e) {
    this.updateTeamField(e, 'number_3');
  },
  bindNumber4Input(e) {
    this.updateTeamField(e, 'number_4');
  },
  bindWaitingNumber1Input(e) {
    this.updateTeamField(e, 'waiting_number_1');
  },
  bindWaitingNumber2Input(e) {
    this.updateTeamField(e, 'waiting_number_2');
  },

  // 更新战队字段
  updateTeamField(e, field) {
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    const teamList = this.data.teamList;
    teamList[index][field] = value;
    this.setData({
      teamList,
    });
  },
});