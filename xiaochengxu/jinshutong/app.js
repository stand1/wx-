//app.js
App({
  onLaunch: function (options) {
    // 获取用户二维码参数
    if(options.q !== undefined){
      var scan_url = decodeURIComponent(options.q);
      console.log(scan_url)
      var scan = scan_url.split("?id=")[1]
      wx.setStorageSync('id', scan)
    }
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    var url = "https://www.jinshutong.vip"
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs) 
    wx.setStorageSync('url', url)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let code = res.code
        let url = wx.getStorageSync('url') || []
        wx.request({
          url: url+"/weixin/GetOpenId?Code="+code,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: res => {
            wx.setStorageSync('openid', JSON.parse((res.data.data)).openid)
            wx.setStorageSync('session_key', JSON.parse((res.data.data)).session_key)
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
              this.globalData.userInfo = res.userInfo

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
    // 获取用户地理位置经纬度
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(latitude, longitude, speed, accuracy)
        wx.setStorageSync('latitude', latitude)
        wx.setStorageSync('longitude', longitude)
      }
    })
  },
  globalData: {
    userInfo: null,
    imgArr:[]
  },
  Ifnull: function (name1, name2) {
    if (!name1) {
      wx.showModal({
        content: name2 + '不能为空',
      })
    }
  },
  uploadimg: function(data){
    var that= this,
    i=data.i ? data.i : 0,//当前上传的哪张图片
    success=data.success ? data.success : 0,//上传成功的个数
    fail=data.fail ? data.fail : 0;//上传失败的个数
    let arr = []
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      method: 'POST',
      formData: {
        id:data.id,
        imagetype:data.imgtype
      },//这里是上传图片时一起上传的数据
      name: 'file',//这里根据自己的实际情况改
      success: (res) => {
        success++;//图片上传成功，图片上传成功的变量+1
        console.log(JSON.parse(res.data).data.saveName[0])
        arr.push(JSON.parse(res.data).data.saveName[0])
        console.log(i);
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;//图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        console.log(i);
        i++;//这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) {   //当图片传完时，停止调用          
          console.log('执行完毕');
          console.log(arr)
          this.globalData.imgArr = arr
          console.log('成功：' + success + " 失败：" + fail);
          wx.request({
            url: 'https://www.jinshutong.vip/weixin/UpdateCompanyFile',
            method: 'POST',
            data: {
              id: data.id,
              imagetype: data.imgtype,
              img:arr
            },
            success: res => {
              console.log(11111)
              console.log(res)
            }
          })
        } else {//若图片还没有传完，则继续调用函数
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