// pages/uploadImg/uploadImg.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pics:[],
      imagetype:null,
      imgArr:[],
      img:'',
      touch_start:'',
      touch_end:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let imgtype = options.imagetype
    let list = JSON.parse(options.datalist)
    let arr = []
    console.log(list.data.companyimagelist)
    for (let i = 0; i < list.data.companyimagelist
.length;i++){
      if (list.data.companyimagelist[i].imagetype == imgtype){
        arr.push(list.data.companyimagelist[i].imageurl)
      }
    }
    if (imgtype == 1) {
      wx.setNavigationBarTitle({
        title: '修改企业logo'
      })
    } else if (imgtype == 2) {
      wx.setNavigationBarTitle({
        title: '添加企业相册'
      })
    } else if (imgtype == 3) {
      wx.setNavigationBarTitle({
        title: '添加员工相册'
      })
    }
    this.setData({
      imagetype:imgtype,
      imgArr:arr
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
  choose: function () {//这里是选取图片的方法
    var that = this,
      　pics = this.data.pics;

    wx.chooseImage({
      count: 9 - pics.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        pics = pics.concat(imgsrc);
        let arr = that.data.imgArr
        if (that.data.imagetype == 1) {
          arr.splice(0, 1)
        }
        console.log(pics)
        for(let i=0; i<pics.length;i++){
          arr.push(pics[i])
        }
        that.setData({
          pics: pics,
          imgArr:arr
        });
        that.uploadimg({
          url: 'https://www.jinshutong.vip/File/UploadFile',
          path: arr
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

  },
  uploadimg: function (data) {
    var that = this,
      i = data.i ? data.i : 0,//当前上传的哪张图片
      success = data.success ? data.success : 0,//上传成功的个数
      fail = data.fail ? data.fail : 0;//上传失败的个数
    let arr = []
    let id = wx.getStorageSync('id') || []
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      method: 'POST',
      name: 'file',
      success: (res) => {
        success++;
        arr.push(JSON.parse(res.data).data.saveName[0])
        console.log(arr);
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
          wx.request({
            url: 'https://www.jinshutong.vip/weixin/UpdateCompanyFile',
            method: 'POST',
            data: {
              id: id,
              imagetype:that.data.imgtype,
              img: arr
            },
            success: res => {
              console.log(11111)
              console.log(res)
              if(res.data.data == 1&res.data.ret ==0){
                let img = that.data.imgArr
                console.log(img)
                for (let i = 0; i < img.legnth; i++) {
                  arr.push(img[i])
                }
                that.setData({
                  imgArr: arr
                })
              }
            }
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
  },
  clearImg: function(e){
    let that = this
    let url = wx.getStorageSync('url') || []
    let index = e.currentTarget.dataset.num
    let imgarr = that.data.imgArr
    let imgUrl = that.data.imgArr[index]
    wx.showModal({
      title: '提示',
      content: '是否删除',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: url+'/WeiXin/DelFile',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              imgUrl: imgUrl
            },
            success: res => {
              if(res.data.ret == 0 && res.data.errcode == 0){
                imgarr.splice(index, 1)
                that.setData({
                  imgArr: imgarr
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  showImg: function (e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      img: this.data.imgList[index],
      showModal: true,
    })
  },
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  //按下事件开始  
  mytouchstart: function (e) {
    let that = this;
    that.setData({
      touch_start: e.timeStamp
    })
  },
  //按下事件结束  
  mytouchend: function (e) {
    let that = this;
    that.setData({
      touch_end: e.timeStamp
    })
  },
  editAddress: function (e) {
    var that = this
    var touchTime = that.data.touch_end - that.data.touch_start;
    var index = e.currentTarget.dataset.num
    if (touchTime > 350) {
      let url = wx.getStorageSync('url') || []
      let imgarr = that.data.imgArr
      let imgUrl = that.data.imgArr[index]
      wx.showModal({
        title: '提示',
        content: '是否删除',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              url: url + '/WeiXin/DelFile',
              header: {
                'content-type': 'application/json' // 默认值
              },
              data: {
                imgUrl: imgUrl
              },
              success: res => {
                if (res.data.ret == 0 && res.data.errcode == 0) {
                  imgarr.splice(index, 1)
                  that.setData({
                    imgArr: imgarr
                  })
                }
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      console.log(index)
      this.setData({
        img: this.data.imgArr[index],
        showModal: true,
      })
    }
  }
})