//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
      id:'27',                
      imgUrls: [],
      indicatorDots: false,
      autoplay: false,
      interval: 3000,
      duration: 1000,
      indicatorColor:"white",
      indicatorActiveColor: "#37c6cf",
      circular: true,
      dataList:'',
      logoArr: [], 
      comArr: [], 
      starrArr: [],
      _num: 2,
      isA:true
    },
    //事件处理函数
    visiting: function () {
        wx.navigateTo({
          url: '../visitorRegistration/visitorRegistration?id=' + this.data.id
        })
    },
    material: function () {
      wx.navigateTo({
        url: '../materialCollar/materialCollar?id='+this.data.id
      })
    },
    allImg: function () {
      wx.navigateTo({
        url: '../comImg/comImg?arr=' + this.data.comArr
      })
    },
    // onPullDownRefresh: function () {
    //   wx.showToast({
    //     title: 'loading...',
    //     icon: 'loading',
    //     opacity: '0',
    //     mask: 'true',
    //     // image: '../../../../image/green_tri.png',

    //   })
    //   wx.stopPullDownRefresh()
    //   console.log('onPullDownRefresh', new Date())
    // },
   
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '金书僮',
            path: 'pages/index/index?id='+id,
            desc:'金书僮',
            success: function (res) {
                // 转发成功
                wx.showToast({
                    title: "分享成功",
                    duration: 1000,
                    icon: "success"
                }) 
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
    // 掃一掃
    // click: function () {
    //   var that = this;
    //   var show;
    //   var washId;
    //   var washUrl="xcj.houdezhihui.com";
    //   wx.scanCode({
    //     success: (res) => {
    //       console.log(res)
    //       this.show = "result:" + res.result ;
    //       this.washId = getWash(res.result);
    //       console.log(this.washId);
    //       function getWash(str) {
    //         var id= str.substr(str.lastIndexOf('=') + 1);
    //         return id
    //       }
    //       // that.setData({
    //       //   show: this.show
    //       // })
    //       if(this.show.indexOf(washUrl)>= 0){
    //         wx.showToast({
    //           title: '成功',
    //           icon: 'success',
    //           duration: 2000
    //         })
    //         wx.navigateTo({
    //           url: '../washCar/washCar?id='+this.washId 
    //         })
    //       }else{
    //         wx.showToast({
    //           title: '暂不支持二维码',
    //           icon: 'success',
    //           duration: 2000
    //         })
    //       }

    //     },
    //     fail: (res) => {
    //       wx.showToast({
    //         title: '失败',
    //         icon: 'success',
    //         duration: 2000
    //       })
    //     },
    //     complete: (res) => {
    //     }
    //   })
    // },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let id=''
      if (options.q !== undefined) {
        id = decodeURIComponent(options.q)
        this.setData({
          id: id
        })
      }
      if (options.scene!==undefined){
        id = options.scene
        id = decodeURIComponent(options.scene)
      }else{
        id = wx.getStorageSync('id') || []
      }
      if(id != ''){
        this.setData({
          id: id
        })
      }
      let url = wx.getStorageSync('url') || []
      let that = this
      let LogoArr = [], ComArr = [], StarrArr = []
      console.log(that.data.id)
      wx.request({
        url: url + "/weixin/GetCompanyInfo?id="+that.data.id,
        success:function(res){
          console.log(res.data)
          that.setData({
            dataList: res.data
          })
          let imgList = res.data.data.companyimagelist
          for (var i = 0; i < imgList.length; i++){
            if (imgList[i].imagetype == 1){
              LogoArr.push(imgList[i].imageurl)
            } else if (imgList[i].imagetype == 2){
              ComArr.push(imgList[i].imageurl)
            } else if (imgList[i].imagetype == 3){
              StarrArr.push(imgList[i])
            }
          }
          console.log(StarrArr)
          that.setData({
              logoArr:LogoArr,
              comArr:ComArr,
              starrArr:StarrArr
          })
        }
      }) 
    },
    clickNum: function(e){
      let num = e.target.dataset.num
      this.setData({
        _num: num
      })
    },
    isA: function(){
      let isa = this.data.isA
      isa = !isa
      this.setData({
        isA:isa
      })
    },
    employeesShow: function(e){
      let str = JSON.stringify(this.data.dataList.data.companyimagelist)
      wx.navigateTo({
        url: '../employeesShow/employeesShow?str=' + str + '&index=' + e.currentTarget.dataset.index
      })
    },
    isture: function(){
      let that = this
      that.setData({
        isA:!that.data.isA
      })
    },
    ceshi: function (e) {
      wx.navigateTo({
        // url: '../management/management'
        url: '../intro/intro'
      })
    },
})
