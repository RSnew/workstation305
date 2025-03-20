Page({
  data: {
    showDeviceDrawer: false,
    showSeatDrawer: false,
    showTeamDrawer: false,
    itemSeatList:[
      '修改座位信息',
      '添加座位',
      '删除座位',
      '座位预定审核'
    ],
    itemDeviceList:[
      '添加设备',
      '修改/删除/查看设备',
      '设备预定审核'
    ],
    itemTeamList:[
      '添加战队',
      '修改/删除/查看战队',
      '战队加入/退出审核'
    ],
  },
  onLoad(options) {

  },
  onReady() {

  },
  onShow() {

  },
  onHide() {

  },
  onUnload() {

  },
  onShareAppMessage() {
    return {
      title: '',
    };
  },
  //用户注册
  toUserSignIn(){
    wx.navigateTo({
      url: '/pages/userSignIn/index'
    });
  },
    //调用此方法显示抽屉
  showDeviceDrawer(type) {
    this.setData({
      showDeviceDrawer: true
    })
  },
  closeDeviceDrawer(type) {
    this.setData({
      showDeviceDrawer: false
    })
  },
  showSeatDrawer(type) {
    this.setData({
      showSeatDrawer: true
    })
  },
  closeSeatDrawer(type) {
    this.setData({
      showSeatDrawer: false
    })
  },
  showTeamDrawer(type) {
    this.setData({
      showTeamDrawer: true
    })
  },
  closeTeamDrawer(type) {
    this.setData({
      showTeamDrawer: false
    })
  },
  toSeatDetail(e){
    console.log(e.currentTarget.dataset.index)
    switch(e.currentTarget.dataset.index){
      case 0:
        //修改座位信息
        wx.navigateTo({
          url: '/pages/changeSeat/index'
        });
        break;
      case 1:
        //添加座位
        wx.navigateTo({
          url: '/pages/addSeat/index'
        });
        break;
      case 2:
        //删除座位
        wx.navigateTo({
          url: '/pages/deleteSeat/index'
        });
        break;
      case 3:
        //座位预定审核
        wx.navigateTo({
          url: '/pages/reviewSeat/index'
        });
        break;
    }
  },
  toDeviceDetail(e){
    console.log(e.currentTarget.dataset.index)
    switch(e.currentTarget.dataset.index){
      case 0:
        //添加设备
        wx.navigateTo({
          url: '/pages/addDevice/index'
        });
        break;
      case 1:
        //查看/修改/删除设备
        wx.navigateTo({
          url: '/pages/deviceDetail/index'
        });
        break;
      case 2:
        //设备预定审核
        wx.navigateTo({
          url: '/pages/reviewDevice/index'
        });
        break;
    }
  },
  toTeamDetail(e){
    console.log(e.currentTarget.dataset.index)
    switch(e.currentTarget.dataset.index){
      case 0:
        //添加战队
        wx.navigateTo({
          url: '/pages/addTeam/index'
        });
        break;
      case 1:
        //查看/修改/删除战队
        wx.navigateTo({
          url: '/pages/teamDetail/index'
        });
        break;
      case 2:
        //战队加入/退出审核
        wx.navigateTo({
          url: '/pages/reviewTeam/index'
        });
        break;
    }
  }
});