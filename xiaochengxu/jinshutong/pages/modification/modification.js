// pages/modification/modification.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
     id:'',
     str:'',
     val:'',
     focus:true,
     numType:'',
     dataList:'',
     length:null,
     arrList: ['请输入您的真实姓名', '请输入您的手机号码', '请输入您公司的电话','请输入您公司的简介']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (options){

      let str = options.str, id = options.id
      if (str == 'undefined'){str = ''}
      if (id == undefined) { id = wx.getStorageSync('id') || []}
      let datalist = JSON.parse(options.datalist)
      if (options.type == 1) {
        wx.setNavigationBarTitle({
          title: '修改姓名'
        })
      } else if (options.type == 2) {
        wx.setNavigationBarTitle({
          title: '修改手机号'
        })
      } else if (options.type == 3) {
        wx.setNavigationBarTitle({
          title: '修改公司电话'
        })
      } else if (options.type == 4) {
        wx.setNavigationBarTitle({
          title: '修改公司简介'
        })
      }
      this.setData({
        id:id,
        str: str,
        val: str,
        dataList: datalist,
        numType: options.type
      })
    },
    change: function(e){
      let value =  e.detail.value
      this.setData({
        str:value,
        val:value
      })
    },
    bindinput: function (e) {
      console.log(e)
      let value = e.detail.value
      let length = e.detail.cursor
      this.setData({
        str: value,
        val: value,
        length:length
      })
    },
    clear: function(e){
      this.setData({
        val:''
      })
    },
    cancel: function(){
      let that = this,list=''
      if (this.data.numType == 1){
        this.setName()
        list = this.data.dataList
        list.realname = this.data.str
      }else if(this.data.numType == 2){
        this.setPhone()
        list = this.data.dataList
        list.telephone = this.data.str
      } else if (this.data.numType == 3) {
        this.setComphone()
        list = this.data.dataList
        console.log(list.data.phone)
        list.data.phone = this.data.str
      } else if (this.data.numType == 4) {
        this.setIntro()
        list = this.data.dataList
        console.log(list.data.remark)
        list.data.remark = this.data.str
      }
      let pages = getCurrentPages();//当前页面
      let prevPage = pages[pages.length - 2];//上一页面
      console.log(prevPage)
      prevPage.setData({//直接给上移页面赋值
        dataList: list
      });
      wx.navigateBack({
        delta: 1
      })
    },
    setName:function(){
      let openid = wx.getStorageSync('openid') || [],
          url = wx.getStorageSync('url') || [],
          realname = this.data.str
      wx.request({
        url: url + '/weixin/UpdateName',
        method: 'GET',
        data: {
          Openid: openid,
          realname: realname
        },
        success: res => {
          console.log(res.data)
        }
      })
    },
    setPhone: function () {
      let openid = wx.getStorageSync('openid') || [],
        url = wx.getStorageSync('url') || [],
        Phone = this.data.str
      wx.request({
        url: url + '/weixin/UpdatePhone',
        method: 'GET',
        data: {
          Openid: openid,
          Phone: Phone
        },
        success: res => {
          console.log(res.data)
        }
      })
    },
    setComphone: function () {
      let id = this.data.id,
          url = wx.getStorageSync('url') || [],
          Phone = this.data.str
      wx.request({
        url: url + '/weixin/UpdateCompanyPhone',
        method: 'GET',
        data: {
          Id: id,
          Phone: Phone
        },
        success: res => {
          console.log(res.data)
        }
      })
    },
    setIntro: function () {
      let id = this.data.id,
        url = wx.getStorageSync('url') || [],
        intro = this.data.str
      wx.request({
        url: url + '/UpdateCompanyRemark',
        method: 'GET',
        data: {
          Id: id,
          Remark: intro
        },
        success: res => {
          console.log(res.data)
        }
      })
    },
  }
})
