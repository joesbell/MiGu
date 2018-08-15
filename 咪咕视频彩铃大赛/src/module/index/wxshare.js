export default (function() {
    return {
        reset: function(data, list) {
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: list
            });
            this.ready();
        },
        ready: function() {
            wx.ready(function () {
                var shareDate = {
                    title: '视频彩铃终端检测小神器',
                    desc: '你的手机支持视频彩铃吗？—点我试试看~',
                    link: 'http://192.168.137.1:8054/migu/index.html',
                    imgUrl: 'http://192.168.137.1:8054/migu/static/img/share.png',
                    success: function (res) {
                    },
                    cancel: function (res) {
                    }
                };
                //分享给朋友接口
                wx.onMenuShareAppMessage(shareDate);
                //分享到朋友圈接口
                wx.onMenuShareTimeline(shareDate);
            });
            //处理失败验证
            // wx.error(function (res) {
            //   alert("error: " + res.errMsg);
            // });
        }
    }
}())
