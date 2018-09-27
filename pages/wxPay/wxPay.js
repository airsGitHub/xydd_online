// pages/wxPay/wxPay.js
Page({

  /**
   * 页面的初始数据 
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //页面加载调取微信支付（原则上应该对options的携带的参数进行校验）
    that.requestPayment(options);
  },
  //根据 obj 的参数请求wx 支付
  requestPayment: function(obj) { 
    //获取options的订单Id
    var orderId = obj.orderId;
    console.log(obj);
    //调起微信支付
    wx.requestPayment({
      //相关支付参数
      'timeStamp': obj.timestamp,
      'nonceStr': obj.nonceStr,
      'package': 'prepay_id=' + obj.prepay_id,
      'signType': obj.signType,
      'paySign': obj.paySign,
      'total_fee':1,
      //小程序微信支付成功的回调通知
      'success': function(res) {
        //定义小程序页面集合
        var pages = getCurrentPages();
        //当前页面 (wxpay page)
        var currPage = pages[pages.length - 1];
        //上一个页面 （index page） 
        var prevPage = pages[pages.length - 2];
        //通过page.setData方法使index的webview 重新加载url  有点类似于后台刷新页面
        //此处有点类似小程序通过加载URL的方式回调通知后端 该订单支付成功。后端逻辑不做赘述。
        prevPage.setData({
            url: "https://xxxxxxxxxx.com/wx_isPayment.jhtml?orderId=" + orderId + '&ispay=0',

          }),
          //小程序主动返回到上一个页面。即从wxpay page到index page。此时index page的webview已经重新加载了url 了
          //微信小程序的page 也有栈的概念navigateBack 相当于页面出栈的操作
          wx.navigateBack();
      },
      //小程序支付失败的回调通知
      'fail': function(res) {
        console.log("支付失败"),
          console.log(res)
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];
        var prevPage = pages[pages.length - 2];
        console.log("准备修改数据")
        prevPage.setData({
            url: "https://xxxxxxxxxx/wx_isPayment.jhtml?orderId=" + orderId + '&ispay=0',
          }),
          console.log("准备结束页面")
        wx.navigateBack();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})