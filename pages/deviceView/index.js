const app = getApp();
Page({
  data: {
    deviceList: [], // 设备列表
  },

  onLoad() {
    this.getDeviceList();
  },

  // 获取设备列表
  getDeviceList() {
    wx.showLoading({
      title: '加载中...',
    });

    wx.request({
      url: app.globalData.RequestURL+'list_device',
      method: 'GET',
      success: (res) => {
        wx.hideLoading();
        if (res.statusCode === 200) {
          this.setData({
            deviceList: res.data.data
          });
        } else {
          wx.showToast({
            title: '加载失败：' + (res.data.error || '未知错误'),
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('加载失败：', err);
        wx.showToast({
          title: '网络错误，请重试',
          icon: 'none'
        });
      }
    });
  },

  // 租借设备
  rentDevice(e) {
    const index = e.currentTarget.dataset.index;
    const device = this.data.deviceList[index];
    const userNumber=wx.getStorageSync('userNumber')
    wx.showModal({
      title: '提示',
      content: `确定租借设备 ${device.deviceName} 吗？`,
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '租借中...',
          });
          if(userNumber==null){
            wx.hideLoading();
            wx.showToast({
              title: '请先登录',
              icon: 'none'
            });
            return;
          }
          wx.request({
            url: app.globalData.RequestURL+'rent_device/', 
            method: 'POST',
            header: {
              'Content-Type': 'application/json'
            },
            data: {
              deviceID: device.deviceID,
              userNumber: userNumber,
              rentTime: 7 // 默认租借7天
            },
            success: (res) => {
              
              if (res.statusCode === 200) {
                wx.showToast({
                  title: '租借成功,等待管理员审核',
                  icon: 'success',
                  duration: 2000
                });
                // 刷新设备列表
                this.getDeviceList();
              } else {
                wx.showToast({
                  title: '租借失败：' + (res.data.error || '未知错误'),
                  icon: 'none'
                });
              }
            },
            fail: (err) => {
              wx.hideLoading();
              console.error('租借失败：', err);
              wx.showToast({
                title: '网络错误，请重试',
                icon: 'none'
              });
            }
          });
          wx.hideLoading();
        }
      }
    });
  }
});