//app.js

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var account = wx.getStorageSync('account');
    if(account){
      console.log("当前有用户:"+JSON.stringify(account));
      this.globalData.userInfo = account;
      this.globalData.token = account.sessionToken;
    }else{
      console.log("当前没有用户，请登录");
      wx.navigateTo({url:'pages/login/login'})
    }
    
  },
  onShow:function(){
    if(this.globalData.location != null){
      return;
    }
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        //console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        that.getLocation(longitude,latitude);
      }
    })
  },
  getLocation:function(longitude,latitude){//高德逆地理编码
    var that = this;
    wx.request({
      url: 'http://restapi.amap.com/v3/geocode/regeo',
      data: {
        output:'json',
        location:longitude+','+latitude,
        key:'4e3d705af490a1ab0af00c14aef3d842',
        radius:1000,
        extensions:'base',
        roadlevel:1,
        batch:false
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      //header: {}, // 设置请求的 header
      success: function(res){
        // success
        var info = res.data.regeocode;
        var loc = info.addressComponent;
        var location = {};
        location['address'] = info.formatted_address;
        location['province'] = loc.province;
        location['city'] = loc.city;
        location['district'] = loc.district;
        location['longitude'] = longitude;
        location['latitude'] = latitude;
        that.globalData.location = location;
        //console.log(location);
      }
    })
  },
  globalData:{
    userInfo:null,
    token:null,
    location:null
  }
})