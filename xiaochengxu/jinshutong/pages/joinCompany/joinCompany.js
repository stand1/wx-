// pages/joinCompany/joinCompany.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    comArr:[],
    isShow:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  corName: function(e){
    let that = this
    that.setData({
      isShow:true
    })
    let value = e.detail.value
    let url = wx.getStorageSync('url') || []
    wx.request({
      url:  url + '/commany/searchCompany',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        key:value
      },
      success: res => {
        that.setData({
          comArr:res.data.data,
          value:value
        })
      }
    })
  },
  tap: function(e){
    wx.showModal({
      title: '请联系管理人员',
      content: e.currentTarget.dataset.name,
    })
  },
  newCom: function(){
    wx.navigateTo({
      url: '../newEnterprise/newEnterprise?value='+this.data.value,
    })
  }
})