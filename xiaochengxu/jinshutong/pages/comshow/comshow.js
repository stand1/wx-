// pages/comshow/comshow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: '',
    logoArr: [],
    comArr: [],
    starrArr: [],
    _num: 2,
    isA: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that = this;
      let id = options.id
      let url = wx.getStorageSync('url') || []
      let LogoArr = [], ComArr = [], StarrArr = []
      wx.request({
        url: url + "/weixin/GetCompanyInfo?id="+id,
        success: function (res) {
          console.log(res.data)
          that.setData({
            dataList: res.data
          })
          wx.setNavigationBarTitle({
            title: '微主页'
          })
          let imgList = res.data.data.companyimagelist
          console.log(imgList.length)
          for (var i = 0; i < imgList.length; i++) {
            if (imgList[i].imagetype == 1) {
              LogoArr.push(imgList[i].imageurl)
            } else if (imgList[i].imagetype == 2) {
              ComArr.push(imgList[i].imageurl)
            } else if (imgList[i].imagetype == 3) {
              StarrArr.push(imgList[i].imageurl)
            }
          }
          that.setData({
            logoArr: LogoArr,
            comArr: ComArr,
            starrArr: StarrArr
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
  clickNum: function (e) {
    let num = e.target.dataset.num
    this.setData({
      _num: num
    })
  },
  isA: function () {
    let isa = this.data.isA
    isa = !isa
    this.setData({
      isA: isa
    })
  },
  allImg: function () {
    wx.navigateTo({
      url: '../comImg/comImg?arr=' + this.data.comArr
    })
  },
})