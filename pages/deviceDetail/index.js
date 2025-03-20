const app = getApp();
Page({
  data: {
    deviceList: [], // 设备列表
  },
  onLoad(options) {
    this.getDeviceList();
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
  getDeviceList() {
    wx.request({
      url: app.globalData.RequestURL + 'list_device/',
      method: 'GET',
      success: (res) => {
        if (res.data.data && res.data.data.length > 0) {
          this.setData({
            deviceList: res.data.data
          });
        } else {
          wx.showToast({
            title: '暂无设备信息',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('获取设备列表失败：', err);
        wx.showToast({
          title: '获取设备列表失败',
          icon: 'none'
        });
      }
    });
  },
  // 切换编辑状态
  toggleEdit(e) {
    const index = e.currentTarget.dataset.index;
    if (this.data.isEdit && this.data.editIndex === index) {
      // 保存逻辑
      this.saveDeviceInfo(index);
    }
    this.setData({
      isEdit: !this.data.isEdit,
      editIndex: index
    });
  },
  // 删除设备
  deleteDevice(e) {
    const index = e.currentTarget.dataset.index;
    const deviceID = this.data.deviceList[index].deviceID;
    console.log('删除设备ID：', deviceID);
    wx.showModal({
      title: '提示',
      content: '确定删除该设备信息吗？',
      success: (res) => {
        if (res.confirm) {
          wx.request({
            url: app.globalData.RequestURL + 'delete_device/',
            method: 'POST',
            data: { 
              deviceID:deviceID 
            },
            success: (res) => {
              if (res.data.success) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success'
                });
                // 刷新设备列表
                this.getDeviceList();
              } else {
                wx.showToast({
                  title: '删除失败',
                  icon: 'none'
                });
              }
            },
            fail: (err) => {
              console.error('删除设备失败：', err);
              wx.showToast({
                title: '删除失败，请重试',
                icon: 'none'
              });
            }
          });
        }
      }
    });
  },
  // 保存设备信息
  saveDeviceInfo(index) {
    const deviceList = this.data.deviceList;
    const updatedDevice = deviceList[index];
    // 解构设备信息
    const { deviceName, status, type ,rentTime,occupiedNumber} = updatedDevice;
    console.log('解构的设备信息：', deviceName, status, type ,rentTime,occupiedNumber);
    if (!occupiedNumber){
      updatedDevice.occupiedNumber = "";
    }
    // 验证必填字段
    if (!deviceName || !status || !type || rentTime!=0 && !rentTime) {
      wx.showToast({
        title: '请填写完整信息（设备名称、状态、类型）',
        icon: 'none'
      });
      return; // 如果验证失败，直接返回
    }
    console.log('保存的设备信息：', updatedDevice);
    wx.showLoading()
    wx.request({
      url: app.globalData.RequestURL + 'update_device/',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      //  updateDevice已是字典
      data: updatedDevice,
      success: (res) => {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
        this.getDeviceList();
      },
      fail: (err) => {
        console.error('保存失败：', err);
      }
    });
    wx.hideLoading();
  },
  // 绑定设备名称输入
  bindDeviceNameInput(e) {
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    this.setData({
      [`deviceList[${index}].deviceName`]: value
    });
  },

  // 绑定设备状态输入
  bindStatusInput(e) {
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    this.setData({
      [`deviceList[${index}].status`]: value
    });
  },

  // 绑定是否租借开关
  bindIsRentChange(e) {
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    this.setData({
      [`deviceList[${index}].isRent`]: value
    });
  },

  // 绑定是否被占用开关
  bindIsOccupiedChange(e) {
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    this.setData({
      [`deviceList[${index}].isOccupied`]: value
    });
  },

  // 绑定租借时间输入
  bindRentTimeInput(e) {
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    this.setData({
      [`deviceList[${index}].rentTime`]: value
    });
  },

  // 绑定占用编号输入
  bindOccupiedNumberInput(e) {
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    this.setData({
      [`deviceList[${index}].occupiedNumber`]: value
    });
  }
});