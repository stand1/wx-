// pages/materialCollarList/materialCollarList.js
// const util = require('../../utils/util.js')
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//      List:''
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     var that = this
//     let url = wx.getStorageSync('url') || []
//     let openid = wx.getStorageSync('openid') || []
//     let id = wx.getStorageSync('id') || []
//     wx.request({
//       url: url + '/weixin/Getsupplies_logs?PageIndex=1&PageSize=20&openid=' + openid,
//       header: {
//         'content-type': 'application/json' // 默认值
//       },
//       success: function (res) { 
//         console.log(res.data.data)
//         console.log(util.formatTime(Date.now(res.data.data.pageList[1].updatetime)))
//         for(let i=0;i<res.data.data.pageList.length;i++){
//           res.data.data.pageList[i].updatetime = util.formatTime(Date.now(res.data.data.pageList[i].updatetime))
//         }
//         that.setData({
//           List:res.data.data
//         })
//       }
//     })
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
  
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
  
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
  
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
  
//   },
//   onReachBottom: function () {
//     var that = this;
//     // 显示加载图标  
//     wx.showLoading({
//       title: '玩命加载中',
//     })
//     // 页数+1  
//     page = page + 1;
//     wx.request({
//       url: 'https://xxx/?page=' + page,
//       method: "GET",
//       // 请求头部  
//       header: {
//         'content-type': 'application/text'
//       },
//       success: function (res) {
//         // 回调函数  
//         var moment_list = that.data.moment;

//         for (var i = 0; i < res.data.data.length; i++) {
//           moment_list.push(res.data.data[i]);
//         }
//         // 设置数据  
//         that.setData({
//           moment: that.data.moment
//         })
//         // 隐藏加载框  
//         wx.hideLoading();
//       }
//     }) 
//   }
// })

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
})