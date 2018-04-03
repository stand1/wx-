// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    scene: '',
    txt:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let code = res.code
        wx.request({
          url: "https://www.jinshutong.vip/weixin/GetOpenId?Code=" + code,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: res => {
            that.setData({
              openid: JSON.parse((res.data.data)).openid
            })
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.setData({
                userInfo: res.userInfo
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取用户二维码参数
    if (options.scene !== undefined) {
      var scene = decodeURIComponent(options.scene);
      this.setData({
        scene: scene
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
 comify: function(){
   let that =this
   console.log(that.data.openid)
   wx.request({
     url: 'https://www.jinshutong.vip/commany/weixinLogin',
     header: {
       'content-type': 'application/json' // 默认值
     },
     method: 'GET',
     data: {
       openid: that.data.openid,
       token:that.data.scene
     },
     success: res => {
       console.log(res)
         if (res.data.errcode == 0 && res.data.ret == 0){
           console.log(rse)
           that.setData({
             txt:false
           })
           wx.showToast({
             title: '已登录成功',
           })
           wx.navigateBack({
             num:100
           })
         }else{
           wx.showModal({
             title: '',
             content: res.data.message,
             success: res =>{
               if (res.confirm){
                  
               } else if (res.cancel){
                 wx.navigateBack({
                   num:100
                 })
                //  wx.switchTab({
                //    url: '../index/index'
                //  })
               }
             }
           })
         }
     }
   })
 }
})