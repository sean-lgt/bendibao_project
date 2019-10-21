// pages/list/list.js
Page({

  /**
   * 1.要在list获取我们index的九宫格对应的一个id值
   * 2.要在list
   */


  /**
   * 页面的初始数据
   */
  data: {
    // 列表数据
    list:[],
    // 定义一个存储id 的变量
    id:"",
    // 分页请求的页数
    page:1,
    // 每一页的显示条数
    limit:8,
    // 定义一个标识
    flag:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // POTIONS里面携带页面跳转过来携带的信息
    // console.log(options)
    // 把options 的id 写入data的id里面
    this.setData({
      id:options.id
    })
    // 发送请求获取数据
    // 模板字符串`` 在里面如果有变量 就使用${}包裹
    wx.setNavigationBarTitle({
      title: options.title,
    })
    wx.request({
      url: `https://locally.uieee.com/categories/${options.id}/shops`,
      method:'get',
      data:{
        _page:this.data.page,
        _limit :this.data.limit
      },
      success:(res)=>{
        // 箭头函数  this指向外层
        // console.log(res.data)
        // 把数据写入data里的list
        this.setData({
          list:res.data
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
    // 1.每次上拉的时候 发送请求 获取数据
    // 2.拿到数据，先把list从data里面获取出来，追加到list后面，最后写入data
    // 3.每次往上拉的时候，this.data.page就要+1 加完继续写回data
    // 4.当上拉加载值，返回res.data的长度如果小于1

    // 定义一个标识,如果每次上滑就会重新执行 flag重新设置为true  这个需要定义在data里
    if(!this.data.flag){
      wx.showToast({
        title: '所有数据已经加载完毕啦',
        icon: "none",
        duration: 2000
      })
      return;
    }
    
    if(this.data.flag){
      // console.log(123);

      var page = this.data.page;
      page++;
      this.setData({
        page
      })
    }

    



    wx.request({
      url: `https://locally.uieee.com/categories/${this.data.id}/shops`,
      method: 'get',
      // 传递给后台  懒加载
      data: {
        _page: this.data.page,
        _limit: this.data.limit
      },
      success: (res) => {
        // 箭头函数  this指向外层
        // console.log(res.data)
        // 拿数据 追加 写入
         var list= this.data.list;

        //  ES6语法  推荐使用
        var list=[...this.data.list,...res.data]


        // for(var i =0;i<res.data.length;i++){
        //   list.push(res.data)
        // }
        
        // 把数据写入data里的list
        this.setData({
          list
        })

        // console.log(this.data.list)

        if(res.data.length < this.data.limit){
            this.setData({
              flag:false
            })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})