const app = getApp();
const statusMap = {
  pending: '待审核',
  approved: '审核通过/已预定',  
  rejected: '审核不通过',
  canceled: '已取消',
  waiting: '等待预定',
  none: '无法预定',
};
function objectValues(obj) {
  return Object.keys(obj).map(key => obj[key]);
}
Page({
  data: {
    sn:"",
    deskInfo:{},
    isEdit:false,
    isChange:true,
    range: [
      'pending',
      'approved',
      'rejected',
      'canceled',
      'waiting',
      'none'
    ],
    room:[
      '理工楼 A 809',
      '理工楼 A 810',
      '理工楼 A 811',
    ],
    rangeZH:objectValues(statusMap),
    statusMap: statusMap,
    index:0,
    indexRoom:0,
  },
  onLoad(options) {
    this.setData({
      sn:options.sn
    })
    console.log("InfoPage:"+this.data.sn)
  },
  onReady() {
    wx.request({
      url: app.globalData.RequestURL+'get_deskInfo/',
      data:{
        SN: this.data.sn
      },
      success: (res) => {
        console.log(res.data)
        this.setData({
          deskInfo: res.data
        })
        const status = res.data.status; 
        const index = this.data.range.findIndex(item => item === status);
        if (index !== -1) {
          this.setData({
            index: index // 更新 picker 的选中项
          });
        }
      }
    })
    console.log("现在的 index 值："+this.data.index)
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
  // 修改用户信息
  toggleEdit() {
    if (this.data.isEdit) {
      this.saveDeskInfo();
    }
    this.setData({
      isEdit: !this.data.isEdit
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      'deskInfo.status': this.data.range[e.detail.value]
    })
  },
  bindPickerChangeLocation: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexRoom: e.detail.value,
      'deskInfo.room': this.data.room[e.detail.value]
    })
  },
  saveDeskInfo: function(e){
    wx.request({
      url: app.globalData.RequestURL+'update_desk/',
      data:{
        SN: this.data.sn,
        status: this.data.range[this.data.index],
        room: this.data.deskInfo.room,
        isOccupied: this.data.deskInfo.isOccupied,
        isRent: this.data.deskInfo.isRent,
        rentTime: this.data.deskInfo.rentTime,
      },
      method: 'POST',
      success: (res) => {
        console.log(res.data)
        wx.showModal({
          title: '提示',
          content: '修改成功',
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      }
    })
  },
  // 处理长期占用开关切换
  handleOccupiedChange(e) {
    const isOccupied = e.detail.value;
    this.setData({
      'deskInfo.isOccupied': isOccupied
    });
  },

  // 处理可租借开关切换
  handleRentChange(e) {
    const isRent = e.detail.value;
    this.setData({
      'deskInfo.isRent': isRent
    });
  },
  bindTimeInput(e) {
    this.setData({
      'deskInfo.rentTime': e.detail.value
    });
  }
});