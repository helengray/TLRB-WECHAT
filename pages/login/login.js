var api = require('../../utils/APIService.js')
var app = getApp()
Page({
    data:{
        loading:false
    },
    login:function(event){
        var username = event.detail.value.user;
        var password = event.detail.value.pswd;
        if(username =='' || password == ''){
            this.showToast('请输入用户名和密码');
            return;
        }
        this.setData({
            loading:true
        });
        var that = this;
        api.login(username,password,function(res){
            that.setData({
                loading:false
            });
            if(res){
                var code = res.statusCode;
                if(code === 200){
                    var account = res.data;
                    wx.setStorageSync('account',account);
                    app.globalData.userInfo = account;
                    app.globalData.token = account.sessionToken;
                    //wx.switchTab({url:'/pages/out/out'});
                    wx.navigateBack();
                }else if(code === 404){
                    that.showToast('用户名或密码错误');
                }
            }else{
                that.showToast('请求失败');
            }
            
        });
    },
    register:function(){
        this.showToast('去注册')
    },
    showToast:function(msg){
        wx.showToast({
            title: msg,
            icon: 'success',
            duration: 2000
        });
    },
})