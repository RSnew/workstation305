const app = getApp();
Page({
  data: {
    seatInfo: {
      SN: '', 
      status: '',
      room: '', 
      isOccupied: false,
      isRent: false, 
      rentTime: '' 
    },
    statusOptions: ['待审核', '审核通过/已预定', '审核不通过', '已取消', '等待预定', '无法预定'],
    statusRange:[
      'pending',
      'approved',
      'rejected',
      'canceled',
      'waiting',
      'none'
    ],
    index:0,
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
  bindSNInput(e) {
    this.setData({
      'seatInfo.SN': e.detail.value
    });
  },
  bindStatusChange(e) {
    const status = this.data.statusOptions[e.detail.value];
    this.setData({
      'seatInfo.status': status,
      index: e.detail.value
    });
  },
  bindRoomInput(e) {
    this.setData({
      'seatInfo.room': e.detail.value
    });
  },
  handleOccupiedChange(e) {
    this.setData({
      'seatInfo.isOccupied': e.detail.value
    });
  },
  handleRentChange(e) {
    this.setData({
      'seatInfo.isRent': e.detail.value
    });
  },
  bindRentTimeInput(e) {
    this.setData({
      'seatInfo.rentTime': e.detail.value
    });
  },
  submitForm() {
    const seatInfo = this.data.seatInfo;
    if (!seatInfo.SN) {
      wx.showToast({
        title: '请输入座位号',
        icon: 'none'
      });
      return;
    }
    if (!seatInfo.status) {
      wx.showToast({
        title: '请选择座位状态',
        icon: 'none'
      });
      return;
    }
    if (!seatInfo.room) {
      wx.showToast({
        title: '请输入位置',
        icon: 'none'
      });
      return;
    }
    if (!seatInfo.rentTime) {
      wx.showToast({
        title: '请输入租借时间',
        icon: 'none'
      });
      return;
    }

    console.log('提交的座位信息：', seatInfo);
    wx.request({
      url: app.globalData.RequestURL+'add_desk/',
      data:{
        SN: this.data.seatInfo.SN,
        status: this.data.statusRange[this.data.index],
        room: this.data.seatInfo.room,
        isOccupied: this.data.seatInfo.isOccupied,
        isRent: this.data.seatInfo.isRent,
        rentTime: this.data.seatInfo.rentTime,
      },
      method: 'POST',
      success: (res) => {
        console.log(res.data)
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        });
      }
    })
    wx.showToast({
      title: '提交成功',
      icon: 'success'
    });

    this.setData({
      seatInfo: {
        SN: '',
        status: '',
        room: '',
        isOccupied: false,
        isRent: false,
        rentTime: ''
      }
    });
  }
});