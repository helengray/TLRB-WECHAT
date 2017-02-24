//收入
var api = require('../../utils/APIService.js');
var dataList = [];
var index = 1;
Page({
    data:{
        redBomb:[],
        loading:true
    },
    onLoad:function(){
        console.log('onLoad')
    },
    onShow:function(){
        if(this.data.redBomb.length === 0){
            index = 1;
            this.getDataList(index);
        }
    },
    onReachBottom: function() {//到达底部
        // Do something when page reach bottom.
        console.log("onReachBottom");
        this.setData({
            loading:true
        });
        this.getDataList();
    },
    onPullDownRefresh:function(){//下拉刷新
        console.log("onPullDownRefresh");
        dataList = [];
        index = 1;
        this.getDataList();
    },

    getDataList:function(){//加载数据，index页码
        var that = this;
        api.getRedBomList(1,index,10,function(datas){
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