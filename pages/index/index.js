Page({
  data: {},
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '意兰服装'
    });

    //OpenId
    wx.login({
      //获取code
      success: (res) => {
        wx.request({
          method: "GET",
          url: 'https://xxx.xxx.xxx/GetOpenID.aspx', //仅为示例，并非真实的接口地址    
          data: {
            scode: res.code   // 使用wx.login得到的登陆凭证，用于换取openid
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: (res) => {
            if (res.data != '0') {
              this.setData({
                sopenid: res.data,
                url: 'https://xxxx.xxx.xxx/?openid=' + res.data
              });
            }
            console.log(this.data.sopenid)
          }
        })
        console.log(res.code) //这里只是为了在微信小程序客户端好查看结果，找寻问题
      }
    });

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})