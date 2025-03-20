const app=getApp()
Page({
  data: {
    // 设备信息
    deviceInfo: {
      deviceName: '',
      type: '',
      status: '',
      isOccupied: false, 
      isRent: false, 
      rentTime: 0, 
      occupiedNumber: '' 
    },
    // 设备类型选项
    typeOptions: [
      '存储', 
      '计算卡', 
      '网络设备', 
      '投影仪',
      '其他'],
    // 设备状态选项
    statusOptions: ['可用', '不可用', '维修中','租借中']
  },

  // 绑定设备名称输入
  bindDeviceNameInput(e) {
    this.setData({
      'deviceInfo.deviceName': e.detail.value
    });
  },

  // 绑定设备类型选择
  bindTypeChange(e) {
    const selectedType = this.data.typeOptions[e.detail.value];
    this.setData({
      'deviceInfo.type': selectedType
    });
  },

  // 绑定设备状态选择
  bindStatusChange(e) {
    const selectedStatus = this.data.statusOptions[e.detail.value];
    this.setData({
      'deviceInfo.status': selectedStatus
    });
  },

  // 处理是否被占用开关
  handleOccupiedChange(e) {
    this.setData({
      'deviceInfo.isOccupied': e.detail.value
    });
  },

  // 处理是否可租借开关
  handleRentChange(e) {
    this.setData({
      'deviceInfo.isRent': e.detail.value
    });
  },

  // 绑定租借时间输入
  bindRentTimeInput(e) {
    this.setData({
      'deviceInfo.rentTime': e.detail.value
    });
  },

  // 绑定占用编号输入
  bindOccupiedNumberInput(e) {
    this.setData({
      'deviceInfo.occupiedNumber': e.detail.value
    });
  },

  // 提交表单
  submitForm() {
    const { deviceName, type, status, rentTime, occupiedNumber } = this.data.deviceInfo;
    if(!occupiedNumber){
      this.setData({
          'deviceInfo.occupiedNumber':""
      });
    }
    // 验证必填字段
    if (!deviceName || !type || !status) {
      wx.showToast({
        title: '请填写完整信息（设备名称、类型、状态等）',
        icon: 'none'
      });
      return;
    }

    // 验证租借时间是否为有效数字
    if (isNaN(rentTime)) {
      wx.showToast({
        title: '租借时间必须为有效数字',
        icon: 'none'
      });
      return;
    }

    // 提交设备信息
    wx.showLoading({
      title: '提交中...',
    });

    wx.request({
      url: app.globalData.RequestURL+'add_device/', // 替换为实际接口地址
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: this.data.deviceInfo,
      success: (res) => {
        wx.hideLoading();
        if (res.statusCode === 200) {
          console.log('提交成功：', res.data.data);
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          });
          // 清空表单
          this.setData({
            deviceInfo: {
              deviceName: '',
              type: '',
              status: '',
              isOccupied: false,
              isRent: false,
              rentTime: 0,
              occupiedNumber: ''
            }
          });
        } else {
          wx.showToast({
            title: '提交失败：' + (res.data.error || '未知错误'),
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('提交失败：', err);
        wx.showToast({
          title: '网络错误，请重试',
          icon: 'none'
        });
      }
    });
  }
});