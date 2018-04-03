// pages/employeesShow/employeesShow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str:'',
    starrArr:[],
    indicatorDots:false,
    circular:true,
    autoplay: false,
    duration: 200,
    index:1,
    arrLength:'',
    idImg:true,
    dianzan:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let arr = []
   if(options.str!=undefined){
     let str = JSON.parse(options.str)
     for (let i = 0; i < str.length; i++) {
       if (str[i].imagetype == 3) {
         str[i].isShow = 0
         arr.push(str[i])
       }
     }
   }
    console.log(arr)
    if (options.index != '') {
      let that =this
      let index = options.index
      let arrSp = arr.splice(0, index)
      for (let i = 0; i < arrSp.length; i++) {
        arr.push(arrSp[i])
      }
      console.log(arr[index].isShow)
      let imgurl = arr[0].imageurl
      let list = arr
      console.log(index)
      console.log(imgurl)
      var openid = wx.getStorageSync('openid') || []
      var url = wx.getStorageSync('url') || []
      wx.request({
        url: url + '/weixin/Isemployeelove',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          Openid: openid,
          imageurl: imgurl,
        },
        success: res => {
          if(res.data.ret == 0 && res.data.errcode == 0){
            console.log(res.data.data)
            list[0].isShow = res.data.data
            console.log(list[0].idShow,list)
            that.setData({
              starrArr: list,
              arrLength: arr.length
            })
          }
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  onSlideChangeEnd: function (e) {
    var that = this;
    that.setData({
      index: e.detail.current + 1
    })
  },
  dianzan: function(e){
    let that = this
    console.log(e)
    // let index = this.data.index
    let index = that.data.index
    console.log(index)
    let imgurl = this.data.starrArr[index-1].imageurl
    console.log(this.data.starrArr)
    console.log(imgurl)
    var openid = wx.getStorageSync('openid') || []
    var url = wx.getStorageSync('url') || []
    wx.request({
      url: url + '/weixin/employeelove',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        Openid: openid,
        imageurl: imgurl
      },
      success: res => {
        console.log(res)
        if (res.data.ret == 0 && res.data.errcode == 0) {
          let list = that.data.starrArr
          list[index-1].isShow = res.data.data
          that.setData({
            starrArr:list
          })
        }
      }
    })  
  },
  getIndex: function (index,arr) {
    console.log(11111)
    let that = this
    if (index > 0) {
      let arrSp = arr.splice(index, index + 1)
      console.log(arrSp)
      for (let i = 0; i < arrSp.length; i++) {
        arr.push(arrSp[i])
      }
      console.log(arr)
      return arr
    }
  }
})