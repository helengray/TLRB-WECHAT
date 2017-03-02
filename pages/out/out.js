//支出
var api = require('../../utils/APIService.js');
var dataList = [];
var index = 1;
Page({
    data:{
        redBomb:[],
        loading:true
    },
    // onLoad:function(option){//页面加载
    //     //一个页面只会调用一次。
    //     //接收页面参数可以获取wx.navigateTo和wx.redirectTo及<navigator/>中的 query。
    //     index = 1;
    //     this.getDataList(index);
    // },
    onReady: function() {//页面初次渲染完成
        // Do something when page ready.
        //一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
        //对界面的设置如wx.setNavigationBarTitle请在onReady之后设置
    },
    onShow: function() {//页面显示,每次打开页面都会调用一次。
        if(this.data.redBomb.length === 0){
            index = 1;
            this.getDataList(index);
        }
    },
    onHide: function() {//页面隐藏,当navigateTo或底部tab切换时调用
        // Do something when page hide.
    },
    onUnload: function() {//页面卸载,当redirectTo或navigateBack的时候调用。
        // Do something when page close.
    },
    onReachBottom: function() {//到达底部
        // Do something when page reach bottom.
        //console.log("onReachBottom");
        this.setData({
            loading:true
        });
        this.getDataList();
    },
    onPullDownRefresh:function(){//下拉刷新
        //console.log("onPullDownRefresh");
        dataList = [];
        index = 1;
        this.getDataList();
    },
    getDataList:function(){//加载数据，index页码
        var that = this;
        api.getRedBomList(2,index,10,function(datas){
            wx.stopPullDownRefresh();
            if(datas != null && datas.length > 0){
                index++;
            }
            dataList = dataList.concat(datas);
            console.log(dataList);
            that.setData({
                redBomb:dataList,
                loading:false
            });
        });
    }
})