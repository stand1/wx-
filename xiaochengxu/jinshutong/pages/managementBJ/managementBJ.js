// pages/managementBJ/managementBJ.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:'',
      val:'',
      length:0,
      pics:[],
      imgArr:'',
      imgUrl:'',
      index:''
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      if(options != {}){
        let arr = JSON.parse(options.imgarr)
        console.log(arr)
        this.setData({
          imgArr: arr,
          val: arr.tags,
          id: arr.companyid,
          imgUrl:arr.imageurl,
          index:options.index
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
  bindinput: function(e){
    console.log(e)
    let val = e.detail.value
        length = e.detail.cursor
    this.setData({
      length:length,
      val:val
    })
  },
  add: function(e){
    let that = this,
        arr = that .data.imgArr
    let url = wx.getStorageSync('url') || []
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        var pics = []
        pics = pics.concat(imgsrc);
        var id = wx.getStorageSync('id') || [];
        that.uploadimg({
          url: url+'/File/UploadFile',
          path: pics
        });
        let list = that.data.imgArr
        list.imageurl = pics
        that.setData({
          imgArr: list,
          pics: pics
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  confirm: function(e){
    let that = this
    let url = wx.getStorageSync('url') || []
    let openid = wx.getStorageSync('openid') || []
    let arr = this.data.imgArr.imageurl
    let val = this.data.val
    let id = this.data.id
    app.Ifnull(val, "标题")
    wx.request({
      url: url + '/weixin/Editemployee',
      method: 'GET',
      data: {
        Openid: openid,
        CompanyId: id,
        imageurl: arr,
        Oldimageurl:that.data.imgUrl,
        tags: val
      },
      success: res => {
        if (res.data.data == 1 & res.data.ret == 0) {
          var pages = getCurrentPages();
          var Page = pages[pages.length - 1];
          var prevPage = pages[pages.length - 2];
          var list = that.data.imgArr
          console.log(list.imageurl == that.data.imgUrl)
          var listdata = prevPage.data.imgArr
          if(list.imageurl == that.data.imgUrl){
            list.tags = val
            list.txtStyle = ''
          }else{
            list.imageurl = arr
            list.tags = val
            list.pageview = 0
            list.love = 0
            list.txtStyle = ''
          }
          listdata[that.data.index] = list
          prevPage.setData({
            imgArr: listdata
          })
          wx.showModal({
            title: '提示',
            content: '编辑成功',
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  num: Page
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.message,
          })
        }
      }
    })
  },
  clear: function(){
    this.setData({
      val:'',
      length:0
    })
  },
  uploadimg: function (data) {
    var that = this,
      i = data.i ? data.i : 0,//当前上传的哪张图片
      success = data.success ? data.success : 0,//上传成功的个数
      fail = data.fail ? data.fail : 0;//上传失败的个数
    let arr = []
    let list = ''
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      method: 'POST',
      name: 'file',
      success: (res) => {
        success++;
        arr.push(JSON.parse(res.data).data.saveName[0])
        console.log(arr);
        list = that.data.imgArr
        list.imageurl = arr[0]
      },
      fail: (res) => {
        fail++;
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        console.log(i);
        i++;
        if (i == data.path.length) {           
          console.log('执行完毕');
          that.setData({
            imgArr:list
          })
          console.log('成功：' + success + " 失败：" + fail);
        } else {
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }

      }
    });
  }
})