var api = require('../../utils/APIService.js')
var app = getApp()
Page({
    data:{
        loading:false
    },
    register:function(event){
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
        api.register(username,password,function(res){
            that.setData({
                loading:false
            });
            
            if(res){
                let code = res.statusCode;
                if(code == 201){
                    that.showToast("恭喜注册成功");
                    setTimeout(function(){
                        wx.navigateBack();
                    },2000);
                    
                }else if(code == 404 && res.data.code == 202){
                    that.showToast("该用户已存在");
                }else{
                    that.showToast("注册失败");
                }
                
            }else{
                that.showToast("注册失败");
            }
            
        });
    },
    login:function(){
        wx.navigateBack();
    },
    showToast:function(msg){
        wx.showToast({
            title: msg,
            icon: 'success',
            duration: 2000
        });
    },
})