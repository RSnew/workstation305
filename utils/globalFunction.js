let getUserInfo =async function (app,number,that) {
    return new Promise((resolve, reject) => {
        let userNumber=number
        if (userNumber){
            wx.request({
                url: app.globalData.RequestURL + 'get_userInfo/',
                data: {
                    userNumber: userNumber
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    resolve(res.data)
                }
            });
        }else{
            wx.navigateTo({
                url: 'pages/indexPage/index',
            })
        }
    })
}
let send_customer_message = async function (app, openid, message) {
    return new Promise((resolve, reject) => {
        wx.request({
            url:  app.globalData.RequestURL+'send_customer_message/',
            method: 'POST',
            data: {
              openid: openid,
              message: message
            },
            success(res) {
              console.log('发送客服消息成功:', res.data);
            },
            fail(error) {
              console.error('发送客服消息失败:', error);
            }
          });
    })
}
module.exports = {
    getUserInfo: getUserInfo
}