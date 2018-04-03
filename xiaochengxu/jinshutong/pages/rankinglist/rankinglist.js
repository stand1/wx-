// pages/rankinglist/rankinglist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Company:[],
    usertype:null,
    size:20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  if (options.str!=undefined){
    //    let str = JSON.parse(options.str)
    //    this.setData({
    //      Company: str
    //    })
    //  }
     let that = this
     that.setData({
       usertype:options.type
     })
     let url = wx.getStorageSync('url') || [],
     latitude = wx.getStorageSync('latitude') || [],
     longitude = wx.getStorageSync('longitude') || []
     if(options.type == 1){
       wx.setNavigationBarTitle({
         title: '附近公司排行',
       })
       // 附近排行
       wx.request({
         url: url + '/weixin/NearbyCompanyAll',
         data: {
           lan: latitude,
           lon: longitude,
           PageIndex: 1,
           PageSize: 20
         },
         header: {
           'content-type': 'application/json' // 默认值
         },
         method: 'GET',
         success: res => {
           console.log(res)
           that.setData({
             Company: res.data.data.nearbyCompany
           })
         }
       })
     } else if (options.type == 2) {
       wx.setNavigationBarTitle({
         title: '当日公司排行',
       })
       // 当日人气排行
       wx.request({
         url: url + '/weixin/TodayCompanyAll',
         data: {
           PageIndex: 1,
           PageSize: 20
         },
         header: {
           'content-type': 'application/json' // 默认值
         },
         method: 'GET',
         success: res => {
           console.log(res)
           that.setData({
             Company: res.data.data.nearbyCompany
           })
         }
       })
     }
     else if (options.type == 0) {
       let that = this
       let url = wx.getStorageSync('url') || []
       let openid = wx.getStorageSync('openid') || []
       wx.setNavigationBarTitle({
         title: '访问足迹',
       })
       wx.request({
         url: url + '/weixin/BowerCommany',
         header: {
           'content-type': 'application/json' // 默认值
         },
         data:{
           Openid:openid,
           PageIndex:1,
           PageSize:20
         },
         success: res => {
           console.log(res)
           that.setData({
             Company:res.data.data
           })
         }
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
    let that = this
    let url = wx.getStorageSync('url') || [],
        latitude = wx.getStorageSync('latitude') || [],
        longitude = wx.getStorageSync('longitude') || []
    let size = that.data.size
    size+=5
    console.log(size)
    if(this.data.usertype == 1){
      wx.request({
        url: url + '/weixin/NearbyCompanyAll',
        data: {
          lan: latitude,
          lon: longitude,
          PageIndex: 1,
          PageSize: size
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'GET',
        success: res => {
          console.log(res)
          that.setData({
            Company: res.data.data.nearbyCompany,
            size:size
          })
        }
      })
    } else if (this.data.usertype == 2){
      wx.request({
        url: url + '/weixin/TodayCompanyAll',
        data: {
          PageIndex: 1,
          PageSize: size
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'GET',
        success: res => {
          console.log(res)
          that.setData({
            Company: res.data.data.nearbyCompany,
            size: size
          })
        }
      })
    }else if(this.data.usertype == 0){
      wx.request({
        url: url + '/weixin/BowerCommany',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          Openid: openid,
          PageIndex: 1,
          PageSize: size
        },
        success: res => {
          console.log(size,res)
          that.setData({
            Company: res.data.data
          })
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getIdNearby: function (e) {
    let index = e.currentTarget.dataset.index
    console.log(e, index)
    wx.navigateTo({
      url: '../comshow/comshow?id=' + this.data.Company[index].id,
    })
  },
  getIdTocompany: function (e) {
    let index = e.currentTarget.dataset.index
    console.log(e, index)
    wx.navigateTo({
      url: '../comshow/comshow?id=' + this.data.Company[index].id,
    })
  },
})