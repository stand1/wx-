//获取应用实例
const app = getApp()

Page({
  data: {
    arrTodept: [],
    indexTodept: null,
    arrBusiness:[],
    indexBusiness: null,
    dscheduretime: '',
    Companyid: '',
    business: '',
    todept: '',
    visit_Phone: '',
    visitname: '',
    visitingUnit: '',
    corName:'',
    showTodept:null,
    showDate:null,
    showBusiness:null,
    scene:'',
    title:''
  },
  onLoad: function (options){
    let that = this
    let url = wx.getStorageSync('url') || []
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let code = res.code
        wx.request({
          url: url + "/weixin/GetOpenId?Code=" + code,
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
    // 获取用户二维码参数
    if (options.q !== undefined) {
      var scan_url = decodeURIComponent(options.q);
      console.log(scan_url)
      scan = scan_url.split("?id=")[1]
      this.setData({
        Companyid:scan
      })
    }
    if (options.scene !== undefined) {
      var scene = decodeURIComponent(options.scene);
      console.log(scene)
      this.setData({
        Companyid: scene
      })
    }
    if (options.id !== undefined) {
      this.setData({
        Companyid: options.id
      })
    }
    let id = that.data.Companyid
        url = wx.getStorageSync('url') || []
    wx.request({
      url: url + '/weixin/GetTitle/?id='+id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        var todept=[]
        for (let i = 0; i < res.data.data.deptlist.length;i++){
          todept.push(res.data.data.deptlist[i].para)
        }
        var business=[]
        for (let i = 0; i < res.data.data.businesslist.length; i++) {
          business.push(res.data.data.businesslist[i].para)
        }
        wx.setNavigationBarTitle({
          title: '来访信息登记表',
        })
        that.setData({
          corName: res.data.data.comanyName,
          title: res.data.data.title,
          arrTodept: todept,
          arrBusiness: business,
          showTodept: res.data.data.is_dept,
          showDate: res.data.data.is_visit_time,
          showBusiness: res.data.data.is_business
        })
      }
    })
  },
  //获取时间
  bindDateChange: function (e) {
    this.setData({
      scheduretime: e.detail.value
    })
  },
  // 设置部门
  bindPickerChange: function (e) {
    this.setData({
      indexTodept: e.detail.value
    })
  },
  // 设置访客姓名
  bindchangeName: function (e) {
    this.setData({
      visitname: e.detail.value
    })
    this.Ifnull(e.detail.value, e.target.dataset.name)
  },
  // 设置访客电话
  bindchangePhone: function (e) {
    this.setData({
      visit_Phone: e.detail.value
    })
    this.Ifnull(e.detail.value, e.target.dataset.name)
  },
  // 设置来访事项
  bindBusinessChange: function (e) {
    this.setData({
      indexBusiness: e.detail.value
    })
  },
  getData: function (e) {
    this.setData({
      business: e.target.dataset.name
    })
  },
  // 提交来访登记信息
  getInformation: function (e) {
    var that = this
    var url = wx.getStorageSync('url') || []
    var pram = {}
    pram.openId = wx.getStorageSync('openid')
    pram.Companyid = this.data.Companyid
    pram.scheduretime = this.data.scheduretime
    if (pram.scheduretime == undefined) { pram.scheduretime = ' ' }
    pram.business = this.data.arrBusiness[this.data.indexBusiness]
    if (pram.business == undefined) { pram.business = ' '}
    pram.todept = this.data.arrTodept[this.data.indexTodept]
    if (pram.todept == undefined) { pram.todept = ' ' }
    pram.visitname = this.data.visitname
    pram.visit_Phone = this.data.visit_Phone
    this.Ifnull(pram.visitname, "访客姓名")
    this.Ifnull(pram.visit_Phone, "访客电话")
    if (pram.visitname != '' & pram.visit_Phone != '')
      wx.request({
        url: url + '/weixin/VisitUser',
        data: pram,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if(res.data.ret == 0 && res.data.errcode == 0){
            wx.showToast({
              title: '来访登记成功',
              duration: 2000,
              icon: "success"
            })
            that.setData({
              visitname: '',
              visit_Phone: ''
            })
          }else{
            wx.showModal({
              title: res.data.message,
            })
          }
        }
      })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  Ifnull: function (name1, name2) {
    if (!name1) {
      wx.showModal({
        content: name2 + '不能为空',
      })
    }
  }
})
