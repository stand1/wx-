// pages/ranking/ranking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nearbyCompany:[],
    tocompanylist:[],
    mername:'',
    comArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let url = wx.getStorageSync('url') || [],
        // 获取用户地理位置经纬度
        latitude = wx.getStorageSync('latitude') || [],
        longitude = wx.getStorageSync('longitude') || []
    wx.request({
      url: url + '/weixin/NearbyCompany',
      data:{
        lan: latitude,
        lon: longitude
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:'GET',
      success: res => {
        console.log(res.data.data)
        that.setData({
          nearbyCompany: res.data.data.nearbyCompany,
          tocompanylist: res.data.data.tocompanylist
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
  getIdNearby: function(e){
    let index = e.currentTarget.dataset.index
    this.getcomId(this.data.nearbyCompany[index].id)
    wx.navigateTo({
      url: '../comshow/comshow?id=' + this.data.nearbyCompany[index].id + '&com=' + this.data.nearbyCompany[index].company,
    })
  },
  getIdTocompany: function (e) {
    let index = e.currentTarget.dataset.index
    this.getcomId(this.data.tocompanylist[index].id)
    wx.navigateTo({
      url: '../comshow/comshow?id=' + this.data.tocompanylist[index].id,
    })
  },
  getNearby: function(){
    let str = JSON.stringify(this.data.nearbyCompany)
    wx.navigateTo({
      url: '../rankinglist/rankinglist?str='+str+'&type=1',
    })
  },
  getDay: function () {
    let str = JSON.stringify(this.data.tocompanylist)
    wx.navigateTo({
      url: '../rankinglist/rankinglist?str=' + str + '&type=2',
    })
  },
  getcomId: function(id){
    let that = this
    let url = wx.getStorageSync('url') || []
    let openid = wx.getStorageSync('openid') || []
    wx.request({ 
      url: url + '/weixin/commanypv',
      data: {
        Openid:openid,
        Id:id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: res => {
        console.log(res)
        if(res.data.ret == 0 && res.data.errcode == 0){}
      }
    })
  }
})