let getUserInfo =async function (app, that) {
    return new Promise((resolve, reject) => {
        let userNumber=wx.getStorageSync('userNumber')
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
module.exports = {
    getUserInfo: getUserInfo
}