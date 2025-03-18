const app = getApp();

Page({
  data: {
    seatList: [], // 座位列表
    statusMap: {
      pending: '待审核',
      approved: '审核通过/已预定',
      rejected: '审核不通过',
      canceled: '已取消',
      waiting: '等待预定',
      none: '无法预定'
    },
    flatSeatList :[],
    pageSize: 9,
    pageNumber: 1,
    deskCount: 0
  },

  onLoad() {
    // 初始化时获取座位列表
    this.getSeatList();
  },

  // 获取座位列表
  getSeatList() {
    wx.request({
      url: app.globalData.RequestURL + 'list_desk/',
      method: 'GET',
      data:{
        pageSize: this.data.pageSize,
        pageNumber: this.data.pageNumber
      },
      success: (res) => {
        if (res.data.data && res.data.total > 0) {
          this.setData({
            seatList: res.data.data,
            deskCount:res.data.total
          });
          console.log('座位列表：', this.data.seatList);
        } else {
          wx.showToast({
            title: '暂无座位信息',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('获取座位列表失败：', err);
        wx.showToast({
          title: '获取座位列表失败',
          icon: 'none'
        });
      }
    });
  },

  // 删除座位
  deleteSeat(e) {
    const index = e.currentTarget.dataset.index;
    // console.log('删除的座位索引：', index);
    const SN = this.data.seatList[this.data.pageNumber-1][index].SN;
    // console.log('删除的座位 sn：', SN);

    wx.showModal({
      title: '提示',
      content: '确定删除该座位信息吗？',
      success: (res) => {
        if (res.confirm) {
          wx.request({
            url: app.globalData.RequestURL + 'delete_desk/',
            method: 'POST',
            data: {
              SN: SN
            },
            success: (res) => {
              if (res.data.status==200) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success'
                });
                // 从本地数据中移除该座位
                const seatList = this.data.seatList;
                seatList.splice(index, 1);
                this.setData({
                  seatList
                });
                this.getSeatList();
              } else {
                wx.showToast({
                  title: '删除失败',
                  icon: 'none'
                });
              }
            },
            fail: (err) => {
              console.error('删除座位失败：', err);
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
  changePage:function(e){
    this.setData({
      pageNumber: e.detail.current
    })
  },
});