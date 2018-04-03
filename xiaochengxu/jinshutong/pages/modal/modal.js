Page({
  data: {
    showModal: true,
  },
  onLoad: function () {
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
    var pages = getCurrentPages()
    var num = pages.length
    wx.navigateBack({
      delta: num
    })
    this.hideModal();
  }
})