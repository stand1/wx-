var initdata = function (that) {
  var list = that.data.imgArr
  for (var i = 0; i < list.length; i++) {
    list[i].txtStyle = ""
  }
  that.setData({ imgArr: list })
}

Page({
  data: {
    delBtnWidth: 360, 
    imgArr:[],
    id:''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数   
    let datalist = JSON.parse(options.datalist)
    console.log(options.id)
    let arr = datalist.data.companyimagelist
    console.log(arr)
    let imgArr = []
    for(let i=0;i<arr.length;i++){
      if(arr[i].imagetype == 3){
        arr[i].txtStyle = ""
        imgArr.push(arr[i])
      }
    }
    console.log(imgArr)
    this.setData({
      imgArr: imgArr,
      id: options.id
    })
    this.initEleWidth();
  },
  onReady: function () {
    // 页面渲染完成  
  },
  onShow: function () {
    // 页面显示  
  },
  onHide: function () {
    // 页面隐藏  
  },
  onUnload: function () {
    // 页面关闭  
  },
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置  
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    var that = this
    initdata(that)
    if (e.touches.length == 1) {
      //手指移动时水平方向位置  
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值  
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变  
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离  
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度  
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一项  
      var index = e.target.dataset.index;
      var list = this.data.imgArr;
      list[index].txtStyle = txtStyle;
      //更新列表的状态  
      this.setData({
        imgArr: list
      });
    }
  },

  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置  
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离  
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮  
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项  
      var index = e.target.dataset.index;
      var list = this.data.imgArr;
      list[index].txtStyle = txtStyle;
      //更新列表的状态  
      this.setData({
        imgArr: list
      });
    }
  },
  //获取元素自适应后的实际宽度  
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应  
      // console.log(scale);  
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error  
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  //点击删除按钮事件  
  delItem: function (e) {
    var that = this
    console.log(that.data.imgArr)
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function (res) {
        if (res.confirm) {
          //获取列表中要删除项的下标  
          var index = e.target.dataset.index;
          var list = that.data.imgArr;
          let url = wx.getStorageSync('url') || []
          let openid = wx.getStorageSync('openid') || []
          let id = list[index].companyid
          let img = list[index].imageurl
          wx.request({
            url: url + '/weixin/Delemployee',
            method: 'GET',
            data: {
              Openid: openid,
              CompanyId: id,
              imageurl: img,
            },
            success: res => {
              console.log(res)
              if (res.data.data == 1 & res.data.ret == 0) {
                //移除列表中下标为index的项  
                list.splice(index, 1);
                //更新列表的状态  
                that.setData({
                  imgArr: list
                });
                wx.showToast({
                  title: '删除成功',
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: res.data.message,
                })
              }
            }
          })
        } else {
          initdata(that)
        }
      }
    })

  },
  // 点击编辑事件
  bjItem: function(e){
    console.log(e)
    let index = e.target.dataset.index
    wx.navigateTo({
      url: '../managementBJ/managementBJ?index=' + index + '&imgarr=' + JSON.stringify(this.data.imgArr[index]),
    })
  },
  confirm: function(e){
    console.log(this.data.id)
    wx.navigateTo({
      url: '../managementTJ/managementTJ?id=' + this.data.id,
    })
  }

})  