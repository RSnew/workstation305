const app = getApp();
Page({
  data: {
    deviceList: [] // 从后端获取的设备预定列表
  },

  onLoad: function () {
    // 从后端获取设备预定列表
    this.getDeviceList();
  },

  getDeviceList: function () {
    // 假设通过 API 获取设备预定列表
    wx.request({
      url: app.globalData.RequestURL+'get_pending_device/',
      method: 'GET',
      success: (res) => {
        console.log('设备预定列表：', res.data.data);
        this.setData({
          deviceList: res.data.data
        });
      }
    });
  },

  acceptPendingDevice: function (e) {
    const index = e.currentTarget.dataset.index;
    const device = this.data.deviceList[index];
    
    console.log('接受预定的设备：', device);
    wx.request({
      url: app.globalData.RequestURL + "admin_review/",
      method: 'POST',
      contentType: 'application/json',
      data: {
        deviceID: device.deviceID,
        action: 'accept',
        type: "device"
      },
      success: (res) => {
        if (res.data.status=="success") {
          wx.showToast({
            title: '接受成功',
            icon: 'success'
          });
          this.getDeviceList();
        } else {
          wx.showToast({
            title: '接受失败',
            icon: 'none'
          });
        }
      }
    });
  },

  rejectPendingDevice: function (e) {
    const index = e.currentTarget.dataset.index;
    const device = this.data.deviceList[index];
    wx.request({
      url: app.globalData.RequestURL+'admin_review/',
      method: 'POST',
      data: {
        deviceID: device.deviceID,
        action: 'reject',
        type: "device"
      },
      success: (res) => {
        if (res.data.status=="success") {
          wx.showToast({
            title: '拒绝成功',
            icon: 'success'
          });
          this.getDeviceList();
        } else {
          wx.showToast({
            title: '拒绝失败',
            icon: 'none'
          });
        }
      }
    });
  }
});