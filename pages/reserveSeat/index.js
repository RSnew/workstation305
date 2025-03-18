const app = getApp();
Page({
  data: {
    alioss : app.globalData.alioss,
    desks: {},
    desksCount: 0,
    pageSize:9,
    pageNumber:1,
  },
  onLoad(options) {

  },
  onReady() {
    this.listDesks()
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
  listDesks:async function(e){
    wx.showLoading({
      title: '加载中',
    })
    try{
      wx.request({
        url: app.globalData.RequestURL+'list_desk/',
        data:{
          isReserve: 1,//True
          page: this.data.pageNumber,
          pageSize: this.data.pageSize
        },
        success: (res) => {
          console.log(res.data.data)
          console.log(res.data.total)
          this.setData({
            desks: res.data.data,
            desksCount: res.data.total
          })
        }
      })
    }catch(e){
      console.log(e)
      wx.showModal({
        title: '提示',
        content: '加载失败，请检查网络',
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    }
    wx.hideLoading()
  },
  changePage:function(e){
    this.setData({
      pageNumber: e.detail.current
    })
  },
  reserveSeat:function(e){
    // 用当前账号将座位预定，绑定到user_tables中，然后把 tables 表的isRent变为 0，然后预定时间+1
  },
  showActionSheet:function(e){
    let that = this;
    const currentSN = e.currentTarget.dataset.sn;
    const userNumber = wx.getStorageSync('userNumber');
    console.log('当前座位编号：', currentSN);
    //pass 通过
    wx.showActionSheet({
      title: '选择预约天数',
      itemList: ['1天', '2天', '3天', '4天', '5天','6天'],
      success: function (res) {
        console.log("tapIndex:"+res.tapIndex)
        // 给管理员发送邮件去审核
        wx.showLoading()
        wx.request({
          url: app.globalData.RequestURL+'booking_desk/',
          method: 'POST',
          contentType: 'application/json',
          data:{
            userNumber: userNumber,
            desk_sn: currentSN,
            days: res.tapIndex+1
          },
          success:(res)=>{
            wx.showToast({
              title: '预约成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail:(res)=>{
            console.log(res)
            wx.showToast({
              title: '预约失败',
              icon: 'fail',
              duration: 2000
            })
          }
        })
        wx.hideLoading()
      },
      fail: function (res) {
        console.log(res.errMsg)
      },
      complete: function (res) {
        that.listDesks()
      }
    })

  },
  cancelReserve:function(e){
    let that = this;
    const currentSN = e.currentTarget.dataset.sn;
    const userNumber = wx.getStorageSync('userNumber');
    console.log('当前座位编号：', currentSN);
    wx.showModal({
      title: '提示',
      content: '确定取消预约？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading()
          wx.request({
            url: app.globalData.RequestURL+'cancel_booking_desk/',
            method: 'POST',
            contentType: 'application/json',
            data:{
              userNumber: userNumber,
              desk_sn: currentSN
            },
            success:(res)=>{
              wx.showToast({
                title: '取消预约成功',
                icon: 'success',
                duration: 2000
              })
              that.listDesks()
            },
            fail:(res)=>{
              console.log(res)
              wx.showToast({
                title: '取消预约失败',
                icon: 'fail',
                duration: 2000
              })
            },
            complete: function (res) {
              wx.hideLoading()
            }
          })
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
    })
  }
});