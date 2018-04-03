// pages/materialCollar/materialCollar.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     id:'',
     list:[],   //刷新页面数据
     datalist:[],  //储存临时数据赋值
     totalNum:'',  //已选物资总数
     showModal: false,
     newList: [],   //已选物资
     _num:1,
     List:[],
     PageIndex:1,
     PageSize:12,
     pageCount:0,
     totalCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.id!=undefined){
      that.setData({
        id: options.id
      })
    }
    if (options.scene !== undefined) {
      var id = options.scene
      this.setData({
        id: id
      })
    } 
    console.log(this.data.id)
    let url = wx.getStorageSync('url') || []
    wx.request({
      url: url + '/weixin/Getsupplies_supplies?id='+that.data.id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          list: res.data.data,
          datalist: res.data.data
        })
        var List = res.data.data;
        var sum=0;
        for(let i=0;i<List.length;i++){
          sum += List[i].amount
        }
        that.setData({
          totalNum:sum
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log("onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log("onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log("onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log("onUnload")
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
    let url = wx.getStorageSync('url') || []
    let openid = wx.getStorageSync('openid') || []
    let index = that.data.PageIndex
    index++
    let PageSize = that.data.PageSize
    let pageCount = that.data.pageCount
    let totalCount = that.data.totalCount
    if (index <= pageCount){
      // 显示加载图标  
      wx.showLoading({
        title: '玩命加载中'
      })
      wx.request({
        url: url + '/weixin/Getsupplies_logs?PageIndex=' + index + '&PageSize=' + PageSize + '&openid=' + openid,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          for (let i = 0; i < res.data.data.pageList.length; i++) {
            res.data.data.pageList[i].updatetime = util.formatTime(Date.now(res.data.data.pageList[i].updatetime))
          }
          that.setData({
            List: res.data.data
          })
          wx.hideLoading();
          that.setData({
            PageIndex: index
          })
        }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  // 减少物资
  reduce: function(e){
    var index = e.target.dataset.reduce
    var list_s = this.data.list
    var sum = this.data.totalNum
    var num = list_s[index].amount
    if (num < 1) {
      return;
    }
    num--;
    sum--;
    var arr = this.data.list
    console.log(arr)
    // arr.splice(index,1)
    list_s[index].amount = num
    this.setData({
      list: list_s,
      totalNum:sum
    })
  },
  // 增加物资
  add: function(e){
    console.log(e)
    var index = e.target.dataset.add
    var sum = this.data.totalNum
    var list_s = this.data.list
    var num = parseInt(list_s[index].amount)
    if(!list_s[index].para){
      return
    }
    num++
    sum++
    var arr = []
    arr.push(list_s[index])
    var n = index
    list_s[index].amount=num
    this.setData({
      list: list_s,
      totalNum: sum
    })
  },
  // 新增物资栏
  custom: function(e){
    var List = this.data.list
    List.push({id:'',para:'',amount:0})
    this.setData({
      list:List
    })
  },
  changePare: function(e){
    var index = e.target.dataset.text
    var para = e.detail.value
    var List =this.data.list
    List[index].para = para
    this.setData({
      list:List
    })
  },
  getMaterials: function(){
    wx.request({
      url: url + '',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {}
    })
  },
  // 确认物资
  selected: function(){
     this.setData({
       showModal: true
     })
     let arr = []
     for(let i=0;i<this.data.list.length;i++){
       if (this.data.list[i].amount > 0){
         arr.push(this.data.list[i])
       }
     }
     this.setData({
       newList:arr
     })
  },
  // 模态框
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  // 清空物资列表
  clear: function(){
    this.hideModal()
    this.setData({
      newList:[]
    })
    let datalist = this.data.list
    for(let i=0;i<datalist.length;i++){
      datalist[i].amount = 0
    }
    this.setData({
      list:datalist,
      totalNum:0
    })
  },
  // 提交已选物资
  cof: function(){
    let that = this
    let openid = wx.getStorageSync('openid') || []
    let id = that.data.id
    let url = wx.getStorageSync('url') || []
    let arr = []
    for (let i = 0; i < this.data.list.length; i++) {
      if (this.data.list[i].amount > 0) {
        arr.push(this.data.list[i])
      }
    }
    if(arr.length>0){
      wx.request({
        url: url + '/weixin/Creatematerial?openid=' + openid + '&companyid=' + id + '&Remark=beizhu',
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        data: arr,
        success: res => {
          if (res.data.ret == 0 && res.data.errcode == 0) {
            that.setData({
              showModal: false
            })
            wx.showToast({
              title: '已经成功领用',
            })
            that.setData({
              list: that.data.datalist,
              newArr: [],
              totalNum: 0
            })
          } else {
            wx.showModal({
              title: '物资领用失败',
              content: res.data.message,
            })
          }
        }
      })
    }else{
      wx.showModal({
        title: '请选择物资',
      })
    }
    
  },
  // 物资 物资列表切换加载
  idNum: function(e){
    let num = e.currentTarget.dataset.num
    this.setData({
      _num:num
    })
    if(num = 2){
      var that = this
      let url = wx.getStorageSync('url') || []
      let openid = wx.getStorageSync('openid') || []
      wx.request({
        url: url + '/weixin/Getsupplies_logs?PageIndex=1&PageSize=12&openid=' + openid,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          for (let i = 0; i < res.data.data.pageList.length; i++) {
            res.data.data.pageList[i].updatetime = util.formatTime(Date.now(res.data.data.pageList[i].updatetime))
          }
          that.setData({
            List: res.data.data,
            PageIndex: 1,
            PageSize:12,
            pageCount:res.data.data.pageCount,
            totalCount:res.data.data.totalCount
          })
        }
      })
    }
  },
  //提交物资中的减减
  itemAdd: function(e){
    let that = this
    let sum = that.data.totalNum
    let id = e.target.dataset.id
    let list = that.data.list
    let tjList = that.data.newList
    let thisNum = e.target.dataset.amount
    thisNum++
    sum++
    for(let i=0;i<tjList.length;i++){
      if(tjList[i].id == id){
        tjList[i].amount++
      }
    }
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        list[i].amount++
      }
    }
    that.setData({
      newList:tjList,
      list:list,
      totalNum:sum
    })
  },
  //提交物资中的加加
  itemReduce: function (e) {
    let that = this
    let sum = that.data.totalNum
    let id = e.target.dataset.id
    let list = that.data.list
    let tjList = that.data.newList
    let thisNum = e.target.dataset.amount
    thisNum--
    sum--
    for (let i = 0; i < tjList.length; i++) {
      if (tjList[i].id == id) {
        tjList[i].amount--
      }
    }
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        list[i].amount--
      }
    }
    that.setData({
      newList: tjList,
      list: list,
      totalNum: sum
    })
  },
})