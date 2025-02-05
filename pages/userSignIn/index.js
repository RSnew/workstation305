const app=getApp()
Page({
  data: {
    number:"",
    name:"",
    major:"",
    degree:"本科",
    inYear:"",
    isAdmin:false,
    user:{}
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
  change(e){
    let isAdmin = e.detail.value;
    this.setData({
      isAdmin: isAdmin
    });
  },
  submit:function(e){
    let that=this
    this.setData({
      user:{
        number:this.data.number,
        name:this.data.name,
        major:this.data.major,
        degree:this.data.degree,
        inYear:this.data.inYear,
        isAdmin:this.data.isAdmin
      }
    })
    wx.showToast({
      title: '注册中',
      icon: 'loading',
      duration: 5000
    })
    wx.request({
      url: app.globalData.RequestURL+'add_user/',
      method: 'POST',
      data: this.data.user,
      success: function (res) {
        if(res.data.status==200){
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/adminPage/index'
            });
          }, 2000)
        }else{
          wx.showToast({
            title: '注册失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
    console.log(this.data.user);
  }
});