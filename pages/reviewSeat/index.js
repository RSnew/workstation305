const app = getApp();
Page({
  data: {
    seatList: []
  },
  onLoad(options) {
    this.listPenddingSeat();
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
  listPenddingSeat() {
    wx.request({
      url: app.globalData.RequestURL + 'list_pending_desk/',
      success: (res) => {
        this.setData({
          seatList: res.data.data
        });
        console.log(this.data.seatList)
      }
    });
  },
  acceptPenddingSeat(e) {
    wx.showLoading({
      title: '正在处理',
    })
    wx.request({
      url: app.globalData.RequestURL + 'admin_review/',
      method: 'POST',
      data: {
        SN: this.data.seatList[e.currentTarget.dataset.index].SN,
        action: 'accept',
        type: 'desk'
      },
      success: (res) => {
        if (res.data.status=="success"){
          wx.showToast({
            title: '已通过',
            icon: 'success',
            duration: 2000
          })
        }
        else if(res.data.status=="fail"){
          wx.showToast({
            title: '已驳回',
            icon: 'success',
            duration: 2000
          })
        }
        this.listPenddingSeat();
      },
      fail: (res) => {
        wx.showToast({
          title: '操作失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
    wx.hideLoading();
  }
});