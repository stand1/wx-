// pages/join/join.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comId:'',
    userInfo:'',
    openid:'',
    name:'',
    phone:'',
    dept:'',
    pos:'',
    showModal: false,
    LogoArr:[],
    dataList:'',
    scene:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let code = res.code
        console.log(code)
        wx.request({
          url: "https://www.jinshutong.vip/weixin/GetOpenId?Code=" + code,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: res => {
            // wx.setStorageSync('openid', JSON.parse((res.data.data)).openid)
            // wx.setStorageSync('session_key', JSON.parse((res.data.data)).session_key)
            that.setData({
              openid: JSON.parse((res.data.data)).openid
            })
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.setData({
                userInfo: res.userInfo
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    let LogoArr = []
    // console.log(options.q)
    // 获取用户二维码参数
    // if (options.q !== undefined) {
    //   var scan_url = decodeURIComponent(options.q);
    //   console.log(scan_url)
    //   scan = scan_url.split("?id=")[1]
    //   this.setData({
    //     comId:scan
    //   })
    // }
    if (options.scene !== undefined) {
      var scene = decodeURIComponent(options.scene);
    }else{
      scene = wx.getStorageSync('id') || []
    }
    console.log(scene)
    this.setData({
      comId: scene
    })
    wx.request({
      url: 'https://www.jinshutong.vip/weixin/GetCompanyInfo',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:'GET',
      data:{
        id: scene
      },
      success: res => {
        that.setData({
          dataList: res.data
        })
        let imgList = res.data.data.companyimagelist
        console.log(imgList.length)
        for (var i = 0; i < imgList.length; i++) {
          if (imgList[i].imagetype == 1) {
            LogoArr.push(imgList[i].imageurl)
          }
        }
        that.setData({
          LogoArr: LogoArr
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
  bindCorName: function(e){
    this.setData({
      name:e.detail.value
    })
    app.Ifnull(e.detail.value,'姓名')
  },
  bindPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
    app.Ifnull(e.detail.value, '手机号码')
  },
  binddept: function (e) {
    this.setData({
      dept: e.detail.value
    })
    app.Ifnull(e.detail.value, '部门')
  },
  bindpos: function (e) {
    this.setData({
      pos: e.detail.value
    })
    app.Ifnull(e.detail.value, '岗位')
  },
  jion: function(){
    let that = this
    let Id = this.data.comId,
        WeixinName = this.data.userInfo.nickName,
        openId = this.data.openid,
        Name = this.data.name,
        PHONE = this.data.phone,
        DEPT = this.data.dept,
        POS = this.data.pos
    // console.log(Id, WeixinName, openId, Name, PHONE, DEPT, POS)
    app.Ifnull(Name, '姓名')
    app.Ifnull(PHONE, '手机号码')
    app.Ifnull(DEPT, '部门')
    app.Ifnull(POS, '岗位')
    wx.request({
      url: 'https://www.jinshutong.vip/weixin/CreateUser',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      data: {
        Id:Id,
        WeixinName: WeixinName,
        openId: openId,
        Name: Name,
        PHONE: PHONE,
        DEPT: DEPT,
        POS: POS
      },
      success: res => {
        if(res.data.errcode == 0 & res.data.ret == 0){
          that.setData({
            showModal: true
          })
        }else{
          wx.showModal({
            title: '',
            content: res.data.message,
          })
        }
      }  
    })  
  },
  /**
 * 弹窗
 */
  showDialogBtn: function () {
    this.setData({
      showModal: true
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
    wx.setStorageSync('id', this.data.id)
    wx.switchTab({
      url: '../index/index'
    })
    this.hideModal();
  }
})