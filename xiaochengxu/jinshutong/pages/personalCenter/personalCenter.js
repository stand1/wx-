// pages/personalCenter/personalCenter.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      dataList:'',
      imgLogo:'',
      nickName:'',
      avatarUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getUserInfo({
      success: function (res) {
        console.log(res.userInfo.nickName)
        that.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
        })
      }
    })    
      let openid = wx.getStorageSync('openid') || [],
          url = wx.getStorageSync('url') || []
      wx.request({
        url: url + '/WeiXin/getUserInfo',
        method: 'GET',
        data:{
          Openid:openid
        },
        success: res => {
          console.log(res.data)
          that.setData({
            dataList:res.data.data
          })
        }
      })
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
  enterprise: function () {
    wx.navigateTo({
      url: '../newEnterprise/newEnterprise'
    })
  },
  jion: function () {
    wx.navigateTo({
      url: '../join/join'
    })
  },
  enter: function(){
    wx.navigateTo({
      url: '../enter/enter?companyid=' + this.data.dataList.companyid
    })
  },
  login: function () {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  joinCompany: function () {
    wx.navigateTo({
      url: '../joinCompany/joinCompany'
    })
  },
  editName: function(){
    let datalist = JSON.stringify(this.data.dataList)
    let str = this.data.dataList.realname
    wx.navigateTo({
      url: '../modification/modification?str=' + str +'&type=1&datalist='+ datalist
    })
  },
  changePhone: function () {
    let datalist = JSON.stringify(this.data.dataList)
    let str = this.data.dataList.telephone
    wx.navigateTo({
      url: '../modification/modification?str=' + str + '&type=2&datalist=' + datalist
    })
  },
  visiting: function () {
    wx.navigateTo({
      url: '../rankinglist/rankinglist?type=0'
    })
  },
})