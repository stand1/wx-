// pages/newEnterprise/newEnterprise.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    city:'请输入公司地理位置',
    address: '',
    latitude:'',
    longitude:'',
    Industryid:23,
    showModal:false,
    industryName:[],
    index:'',
    dataList:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.value!=undefined){
      this.setData({
        name:options.value
      })
    }
    let that = this,
        url = wx.getStorageSync('url') || [],
        arr = []
    wx.request({
      url: url + '/weixin/Getindustry',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res){
        console.log(res)
        for(let i=0; i<res.data.data.length; i++){
          arr.push(res.data.data[i].industryname)
        }
        that.setData({
          industryName:arr,
          dataList:res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload")
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
  industryName: function(e){
    this.setData({
      index: e.detail.value
    })
  },
  bindblurCorName: function(e){
    let corName = e.detail.value
    this.setData({
      name:corName
    })
    app.Ifnull(corName,e.target.dataset.name)
  },
  bindfocusCity: function(e){
    let name,address,latitude,longitude
    let that = this
    wx.chooseLocation({
      success: function(res) {
        name = res.name
        address = res.address
        latitude = res.latitude
        longitude = res.longitude
        that.setData({
          city:name,
          address: address,
          latitude:latitude,
          longitude:longitude
        })
      },
    })
  },
  getInformation: function(){
    let that = this
    let openid = wx.getStorageSync('openid') || []
    let url = wx.getStorageSync('url') || []
    let nickName = app.globalData.userInfo.nickName
    let name = this.data.name,
        city = this.data.city,
        address = this.data.address,
        latitude = this.data.latitude,
        longitude = this.data.longitude,
        Industryid = this.data.dataList[this.data.index].id
    console.log(name, city, address, latitude, longitude, Industryid)
    wx.request({
      url: url + "/weixin/CreateCompany",
      method:"GET",
      header: {
        'content-type': 'application/json' 
      },
      data:{
        Openid:openid,
        name:name,
        lan:latitude,
        lon:longitude,
        Industryid: Industryid,
        nickname: nickName,
        City:city,
        address: address
      },
      success:res=>{
        console.log(res)
        if(res.data.errcode == 0 &res.data.ret == 0){
          wx.setStorageSync('id', res.data.data)
          that.setData({
            showModal: true
          })
        }else{
          wx.showModal({
            title: '',
            content: res.data.message,
          })
        }
      },
      fail:function(){
        wx.showModal({
          title: '',
          content: message,
        })
      }
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  onConfirm: function () {
    wx.switchTab({
      url: '../index/index'
    })
    this.hideModal();
  }
})
