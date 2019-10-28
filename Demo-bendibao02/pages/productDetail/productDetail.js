// pages/productDetail.js
Page({

// 加和减得分析
/**
 * 1.点击 减 当数字是1的时候，不能再减，如果不是1，则按需求减1
 * 2.点击 加 按需求加1
 * 3.可以输入值 此时再按加减 可以在这基础上加减 所有在加减要绑定好一个自定义属性把输入框的值存起来
 */

/**
 * 二 加入购物车的分析
 * 1.要组装的数据 img price info num 放到一个对象
 * 2.组装好的数据要存储放到数组里面  再把数组放到本地
 *  2.1 如果这个对象已经在本地
 */



  /**
   * 页面的初始数据
   */
  data: {
    productId: "",
    // 假的后台数据
    detailList: [
      {
        detailId: "001",
        productImg: "http://img5.imgtn.bdimg.com/it/u=360930211,517368292&fm=26&gp=0.jpg",
        info: "金钱酥-广州情-酥饼礼盒",
        price: "29.00",
        comments: [
          {
            user: "小明",
            time: "2019-10-10",
            form: "本地宝",
            usercomment: "#包装结实，日期新，味道好，价格实惠##包装结实，日期新，味道好，价格实惠#"
          },
          {
            user: "23wxhas88",
            time: "2018-10-10",
            form: "本地宝",
            usercomment: "太好吃了，脆脆香香的，会继续回购。太好吃了，脆脆香香的，会继续回购。太好吃了，脆脆香香的，会继续回购。"
          },
          {
            user: "wcm888888",
            time: "2018-10-10",
            form: "本地宝",
            usercomment: "送礼好品，爸爸妈妈都喜欢吃，下次再来买。"
          }
        ]
      },
      {
        detailId: "002",
        productImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571168373643&di=d3f3d556c170c21891601a0caaa2b2c7&imgtype=0&src=http%3A%2F%2Fimg5.21food.cn%2Fimg%2Falbum%2F2017%2F9%2F21%2Ffood13548241428042Pe.jpg",
        info: "广式腊肠广东皇上皇特产添福400g香肠腊肉广州甜味送礼腊味煲仔饭",
        price: "24.00",
        comments: [
          {
            user: "小明",
            time: "2019-10-10",
            form: "本地宝",
            usercomment: "#八错不错，I like#"
          },
          {
            user: "23wxhas88",
            time: "2018-10-10",
            form: "本地宝",
            usercomment: "太好吃了，脆脆香香的，会继续回购。太好吃了，脆脆香香的，会继续回购。太好吃了，脆脆香香的，会继续回购。"
          }
        ]
      },
      {
        detailId: "003",
        productImg: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1770282035,2654745903&fm=15&gp=0.jpg",
        info: "肉松酥-广州特产手信礼盒",
        price: "29.00",
        comments: [
          {
            user: "小明",
            time: "2019-10-10",
            form: "本地宝",
            usercomment: "#包装结实，日期新，味道好，价格实惠##包装结实，日期新，味道好，价格实惠#"
          },
          {
            user: "23wxhas88",
            time: "2018-10-10",
            form: "本地宝",
            usercomment: "太好吃了，脆脆香香的，会继续回购。太好吃了，脆脆香香的，会继续回购。太好吃了，脆脆香香的，会继续回购。"
          }
        ]
      },
      {
        detailId: "004",
        productImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571168646810&di=ead4c51ee7404da18f5c45d6d34bb02d&imgtype=0&src=http%3A%2F%2Fwww.xplian.net%2FtuxpJDA0JDI0L1RCMXFJRFlScCQ2YUphRiQ1JDM.jpg",
        info: "肉松酥-广州特产手信礼盒",
        price: "29.00",
        comments: [
          {
            user: "小明",
            time: "2019-10-10",
            form: "本地宝",
            usercomment: "#包装结实，日期新，味道好，价格实惠##包装结实，日期新，味道好，价格实惠#"
          },
          {
            user: "23wxhas88",
            time: "2018-10-10",
            form: "本地宝",
            usercomment: "太好吃了，脆脆香香的，会继续回购。太好吃了，脆脆香香的，会继续回购。太好吃了，脆脆香香的，会继续回购。"
          }
        ]
      }
    ],
    // 当前页面的详情信息
    detailObj:{},
    // sang
    num:1,
    // 默认可以减1
    flagBtn:true
  },

  /**
   * 添加到购物车的处理
   */
  handleAddCart(){
    var obj = {
      img:this.data.detailObj.productImg,
      price: this.data.detailObj.price,
      info: this.data.detailObj.info,
      num:this.data.num,
      detailId:this.data.detailObj.detailId
    };
    // 先从本地获取商品数据
    wx.getStorage({
      key: 'cartList',
      success: (res)=> {
        // console.log(res);
        var arr = res.data;
        // 假设flag为true表示 本地数据不存在相同的情况
        var flag = true;
        //遍历本地数组
        arr.forEach((v,i) => {
          if(v.detailId == obj.detailId){
            //obj.num 表示的是当前点击加入购物车所组装的一个对象信息
            // v.num 表示的是本地存储的相同的商品的num
            obj.num += v.num;
            // 把改造完的num值，再写会arr
            arr[i].num = obj.num;
            // 推翻假设  改为flase 本地存在相同的情况,不能直接追加到本地
            flag=false;
          }
        })

        if(flag){
          // //把组装好的obj追加到arr里面 再写入到本地存储
          arr.push(obj);
        }
        //把arr存储到本地 
        wx.setStorage({
          key: 'cartList',
          data: arr,
          success:()=>{
            wx.showToast({
              title: '你已经添加到购物车',
            })
          }
          
        })
      },
      fail:(err)=>{
        // console.log(err);
        // 如果代码运行到这里 证明本地里面没有商品数据，可以直接把Obj放到数组后存到本地
        if(err.errMsg =="getStorage:fail data not found"){
          wx.setStorage({
            key: 'cartList',
            data: [obj],
            success:()=>{
              wx.showToast({
                title: '你已经添加到本地',
              })
            }
          })
        }
       
      },
    })
  },

  /**
   * 加
   */
  handleAdd(e){
    var num = e.currentTarget.dataset.num;
    // console.log(num);
    if(num < 20){
      num++;
      this.setData({
        num,
        flagBtn: false
      })
    }else{
      wx.showToast({
        title: '库存不足',
        icon:'none'
      })
    }
  },

  /**
   * 减
   */
  handleSub(e) {
    var num = e.currentTarget.dataset.num;
    // console.log(num);
    if(num == 1){
      this.setData({
        flagBtn:true
      })
      return
    }
    num--;
    this.setData({
      num
    })
    if (this.data.num > 1) {
      this.setData({
        flagBtn: false
      })
    } else if (this.data.num < 2){
      this.setData({
        flagBtn: true
      })
    }

  },

  
  /**
   * 处理输入框内容的函数
   */
  handleNum(e){
    this.setData({
      num: parseInt(e.detail.value)
    })
    if(this.data.num > 1){
      this.setData({
        flagBtn:false
      })
    
    } else if (this.data.num < 2){
      this.setData({
        flagBtn: true
      })
    } 


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      productId: options.id,
      // detailObj:detailList[options.id]
    });
    // 在这个位置获取到所有的商品信息
    var arr = this.data.detailList;
    //for 循环  arr.forEach
    arr.forEach((v,i) =>{
      // 跟for循环一样的功能 v:数组的每一项 i:数组的索引
      if(v.detailId == options.id){
        this.setData({
          detailObj:v
        });
        console.log(this.data.detailObj);
        return;
      }
    })

    // 设置动态导航栏
    wx.setNavigationBarTitle({
      title: options.title
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

  }
})