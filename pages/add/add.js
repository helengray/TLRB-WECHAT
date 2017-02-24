//添加红包
var api = require('../../utils/APIService.js')
Page({
    data:{
        date:'',
        categoryNames:['默认'],
        categoryIndex:'',
        type:2
    },
    onLoad:function(option){
        //api.login('test','123456');
        this.setData({
            type:option.type
        });
    },
    onShow:function(){
        // var that = this;
        // api.getCategoryList(function(categoryNames){
        //     that.setData({
        //         categoryNames:categoryNames
        //     });
        // });
    },
    bindDateChange:function(event){//时间选择
        console.log(event.detail);
        this.setData({
            date:event.detail.value
        });
    },
    bindCategoryChange:function(event){//关系
        this.setData({
            categoryIndex:event.detail.value
        })
    },
    bindAddCategory:function(){//添加组别

    },
    submit:function(event){//提交
        var redBomb = event.detail.value;
        if(redBomb.categoryName ===''){
            redBomb.categoryName = '默认';
        }
        redBomb.type = Number(this.data.type);
        if(redBomb.name === ''){
            this.showToast('请输入姓名');
            return;
        }
        var money = Number(redBomb.money);
        if(money){
            redBomb.money = money;
        }else{
            this.showToast('金额格式错误');
            return;
        }
        console.log(redBomb);
        api.addRedBomb(redBomb,this.addCallback);
    },
    showToast:function(msg){
        wx.showToast({
            title: msg,
            icon: 'success',
            duration: 2000
        });
    },
    addCallback:function(result){
        if(result == true){
            this.showToast('添加成功');
            wx.navigateBack();
        }else{
            this.showToast('添加失败');
        }
    }
})