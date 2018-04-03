// pages/enter/enter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    dataList:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.companyid
    })
    let url = wx.getStorageSync('url') || []
    let that = this
    let LogoArr = [], ComArr = [], StarrArr = []
    wx.request({
      url: url + "/weixin/GetCompanyInfo?id=" + options.companyid,
      success: function (res) {
        console.log(res.data)
        that.setData({
          dataList: res.data
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
        // that.setData({
        //   logoArr: LogoArr,
        //   comArr: ComArr,
        //   starrArr: StarrArr
        // })
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
  UpdataImg: function(e){
    let imagetype = e.target.dataset.num
    let datalist = JSON.stringify(this.data.dataList)
    wx.navigateTo({
      url: '../uploadImg/uploadImg?imagetype=' + imagetype + '&datalist=' + datalist
    })
  },
  intro: function(){
    let datalist = JSON.stringify(this.data.dataList)
    let str = this.data.dataList.remark
    wx.navigateTo({
      url: '../modification/modification?str=' + str + '&id=' + this.data.id + '&datalist=' + datalist + '&type=4'
    })
  },
  Phone: function(){
    let datalist = JSON.stringify(this.data.dataList)
    let str = this.data.dataList.phone
    wx.navigateTo({
      url: '../modification/modification?str=' + this.data.dataList.phone + '&id=' + this.data.id + '&datalist=' + datalist+'&type=3'
    })
  },
  management: function (e) {
    let datalist = JSON.stringify(this.data.dataList)
    wx.navigateTo({
      url: '../management/management?datalist=' + datalist + '&id=' + this.data.id
    })
  },
})