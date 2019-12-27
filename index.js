
if (typeof App !== 'object') { App = {}; }

(function appInit() {

    var isReady = false;
    var appReadyCallBack = null;

    //连接IOS成功
    App.Ready = function (callBack) {
        if (callBack != undefined) {
            appReadyCallBack = callBack;

            if (isReady || window.Android)
                callBack();
        }
    }

    App.getBarHeight = function () {
        return 88;
    }

    //打开新页
    App.pageShow = function (url, title, haveBar, referer) {
        if (url.toLowerCase().substr(0, 4) != 'http')
            url = document.location.protocol + '//' + document.location.host + '/' + url;

        var param = { 'contentUrl': url, 'title': title };
        if (haveBar)
            param.haveBar = true;
        if (referer != undefined)
            param.referer = referer;

        App.call('pageShow', param);
    }

    //关闭页面
    App.pageHide = function () {
        App.call('pageHide', {});
    }

    //广播回调
    App.notifyCallback = function (msg) {
    }

    //分享回调
    App.shareCallBack=function(msg) {
    }

    //顶部工具栏事件
    App.topStatusClickCallBack=function(msg){ 
    }

   //取得权限
    App.getAuths=function(callback){
        App.call('getAuths', {}, function (res) {
            callback(res);
        });
    }

    //打开应用设置 
    App.openAppSetting=function(){
         if (window.Android) 
            window.Android.openAppSetting("nomarl");
         else
             App.call('openAppSetting', {});
    }

    //广播稍息
    App.notify = function (msg) {
        App.call('notify', { 'msg': msg });
    }
    //支付完成回调
    App.payCallBack = function (data) {

    }

    //key1=['Share','Scan','Action'] moreMenu=['子菜单1','子菜单2']
    App.showBar = function (title, key1, moreMenu, callback, key2, key3) {
        var param = { title: title };
        if (key1 != '')
            param.key1 = key1;

        if (key2 != undefined)
            param.key2 = key2;

        if (key3 != undefined)
            param.key3 = key3;

        if (moreMenu != undefined) {
            //param.key3 = "More";
            param.MoreMenu = moreMenu;
        }

        if (callback != undefined)
            App.moreMenuItemClick = callback;
        if (window.Android) {
            if (!window.Android.getVersion) {
                App.call('pageBar', { title: title });
            } else {
                App.call('pageBar', param);
            }

        }
        else {
            App.call('setBar', param);

        }
    }

    App.hideBar = function () {
        if (window.Android)
            window.Android.hideBar('');
        else
            App.call('setBar', {});
    }

    App.downApk = function (url) {
        if (window.Android)
            App.call('downApk', { url: encodeURI(url) });
    }

    //yes,ng
    App.haveBar = function (callBack) {
        App.call('haveBar', {}, function (res) {
            callBack(res);
        });
    }

    //子菜单事件
    App.moreMenuItemClick = function (res) {

    }

    //扫描
    App.scanQRCode = function (callback) {
        if (callback != undefined)
            App.scanQRCodeCallBack = callback;


        App.call('scanQRCode', {});
    }

    //扫描二维码
    App.scanQRCodeCallBack = function (code) {
    }

    App.getVersion = function (callBack) {

        if (window.Android) {
            try {
                App.call("getVersion", {}, callBack)
            }
            catch (e) {
                return callBack("Android");
            }
        }
        else {
            try {
                App.call('getVersion', {}, callBack);
            } catch (e) { }
        }
    }

    //取得值
    App.getValue = function (key, callBack) {
        App.call('getValue', { "key": key }, function (res) {
            callBack(res);
        });
    }

    //设置信息
    App.setValue = function (key, value) {
        if (value == undefined)
            value = '';
        App.call('setValue', { "key": key, "value": value });
    }

    //qq 授权登录回调用
    App.qqLoginCallBack = function (res) {
    }

    //weibo 授权登录回调用
    App.weiboLoginCallBack = function (res) {
    }

    //weixin 授权登录回调用
    App.weixinLoginCallBack = function (res) {
    }


    //通用分享数据格式 type:webpage,image
    App.newShareData = function () {
        return { "title": "", "summary": "", "url": "", "imgUrl": "", "ext": "", "imgBase64": "", "type": "webpage" };
    }


    //下载进度 
    App.downloadProcess = function (res) {
    }

    //播放进度
    App.audioProcess = function (res) {
    }

    //播放完成
    App.audioComplete = function (res) {
    }

    //锁屏命令
    App.audioLockScreenCallback = function (res) {
    }

    //获取个推消息推送clientid
    App.getPushMsgClientId = function (callback) {
        App.call('pushClientId', {}, function (res) {
            callback(res);
        });
    }


    //收到个推推送信息
    App.pushMsg = function (res) {

    }

    //保存图片
    //imgsrc:url/base64
    App.imageSave = function (imgsrc, callback) {
        if (imgsrc != undefined && imgsrc != null) {
            var regex = 'data:image/png;base64,';
            var isbase64 = imgsrc.indexOf(regex) > -1 ? true : false;

            var imgurl = "";
            var imgbase64 = "";

            if (isbase64) {
                imgsrc = imgsrc.replace(regex, ''); //imgBase64的值需要去除 data:image/png;base64, 头
                imgurl = "";
                imgbase64 = imgsrc;
            }
            else {
                imgurl = imgsrc;
                imgbase64 = "";
            }
            if (callback != undefined)
                App.imageSaveCallback = callback;
            App.call("imageSave", { 'imgUrl': imgurl, 'imgBase64': imgbase64 })

        }
    }


    //保存图片回调
    App.imageSaveCallback = function (res) {
    }

    //调用移动端方法
    App.call = function (method, param, callBack) {
        try {
            if (window.Android) {
                if (param == undefined)
                    param = '';

                if (typeof (param) != "string")
                    param = JSON.stringify(param);

                var result = window.Android[method](param);
                if (callBack != undefined)
                    callBack(result);
            }
            else {
                if (window.WebViewJavascriptBridge) {
                    window.WebViewJavascriptBridge.callHandler(method, param, function (response) {

                        if (callBack != undefined)
                            callBack(response);
                    });
                }
            }
        }
        catch (e) {
            //alert("App.Call('" + method + "')\r\n" + e);
        }
    }

    //连接到IOS
    function connectIOS(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge);
        }
        else {
            document.addEventListener('WebViewJavascriptBridgeReady', function () {
                callback(WebViewJavascriptBridge)
            }, false)
        }
    }

    connectIOS(function (bridge) {
        var uniqueId = 1
        bridge.init(function (message, ck) {
            responseCallback(data)
        });

        bridge.registerHandler('qqLoginCallBack', function (data, ck) {
            App.qqLoginCallBack(data);
        });

        bridge.registerHandler('weiboLoginCallBack', function (data, ck) {
            App.weiboLoginCallBack(data);
        });

        bridge.registerHandler('weixinLoginCallBack', function (data, ck) {
            App.weixinLoginCallBack(data);
        });

        bridge.registerHandler('downloadProcess', function (data, ck) {
            App.downloadProcess(data);
        });

        bridge.registerHandler('audioProcess', function (data, ck) {
            App.audioProcess(data);
        });

        bridge.registerHandler('audioComplete', function (data, ck) {
            App.audioComplete(data);
        });

        bridge.registerHandler('moreMenuItemClick', function (data, ck) {
            App.moreMenuItemClick(data);
        });

        bridge.registerHandler('scanQRCodeCallBack', function (data, ck) {
            App.scanQRCodeCallBack(data);
        });

        bridge.registerHandler('pushMsg', function (data, ck) {
            App.pushMsg(data);
        });

        bridge.registerHandler('audioLockScreenCallback', function (data, ck) {
            App.audioLockScreenCallback(data);
        });

        bridge.registerHandler('imageSaveCallback', function (data, ck) {
            App.imageSaveCallback(data);
        });

        bridge.registerHandler('notifyCallBack', function (data, ck) {
            App.notifyCallback(data);
        });

        bridge.registerHandler('shareCallBack', function (data, ck) {
            App.shareCallBack(data);
        });

        bridge.registerHandler('topStatusClickCallBack', function (data, ck) {
            App.topStatusClickCallBack(data);
        });
        bridge.registerHandler('payCallBack', function (data, ck) {
            App.payCallBack(data);
        });
        isReady = true;
        if (appReadyCallBack)
            appReadyCallBack();
    });

    return App;
}());

//qq
var _appQQ = _appQQ || {};
(function qqIint() {
    var loginCallBack = null;
    _appQQ.login = function (callBack, force) {
        var param = (force == undefined) ? { 'force': 'false' } : { 'force': 'true' };
        App.call('qqLogin', param);
        loginCallBack = callBack;
    }

    _appQQ.shareToQQ = function (data) {
        App.call('qqShareToQQ', data);
    }

    _appQQ.shareToZone = function (data) {
        App.call('qqShareToZone', data);
    }

    App.qqLoginCallBack = function (res) {
        if (loginCallBack != null)
            loginCallBack(JSON.parse(res));
    }
}());

//weibo
var _appWeibo = _appWeibo || {};
(function weiboInit() {
    var loginCallBack = null;
    _appWeibo.login = function (callBack, force) {
        var param = (force == undefined) ? { 'force': 'false' } : { 'force': 'true' };
        App.call("weiboLogin", param);
        loginCallBack = callBack;
    }

    App.weiboLoginCallBack = function (res) {
        if (loginCallBack != null)
            loginCallBack(JSON.parse(res));
    }

    _appWeibo.share = function (data) {
        App.call("weiboShare", data);
    }

}());


//weixin
var _appWeiXin = {};
(function weixinIint() {
    var loginCallBack = null;

    _appWeiXin.login = function (callBack, force) {
        var param = (force == undefined) ? { 'force': 'false' } : { 'force': 'true' };
        App.call('weixinLogin', param);
        loginCallBack = callBack;
    }

    App.weixinLoginCallBack = function (res) {
        if (loginCallBack != null)
            loginCallBack(JSON.parse(res));
    }

    _appWeiXin.shareSession = function (data) {
        App.call('weixinShareSession', data);
    }

    _appWeiXin.shareTimeline = function (data) {
        App.call('weixinShareTimeline', data);
    }

    _appWeiXin.shareFavorite = function (data) {
        App.call('weixinShareFavorite', data);
    }
}());


//_appAudio
var _appAudio = _appAudio || {};
(function audioInit() {

    _appAudio.start = function (url, callback) {
        App.call('audioStart', { 'url': encodeURI(url) }, function (res) {
            if (callback != null) {
                callback(JSON.parse(res.replace(/'/g, '"')));
            }
        });
    }

    _appAudio.stop = function (callback) {
        App.call('audioStop', {}, function (res) {
            if (callback != null) {
                callback(JSON.parse(res.replace(/'/g, '"')));
            }
        });
    }

    _appAudio.reset = function (callback) {
        App.call('audioReset', {}, function (res) {
            if (callback != null) {
                callback(JSON.parse(res.replace(/'/g, '"')));
            }
        });
    }

    _appAudio.seek = function (seek, callback) {
        App.call('audioSeek', { 'seek': seek }, function (res) {
            if (callback != null) {
                callback(JSON.parse(res.replace(/'/g, '"')));
            }
        });
    }

    _appAudio.position = function (callback) {
        App.call('audioPosition', {}, function (res) {
            if (callback != null) {
                callback(JSON.parse(res.replace(/'/g, '"')));
            }
        });
    }

    _appAudio.process = function (callback) {
        App.audioProcess = function (res) {
            if (callback != null) {
                callback(JSON.parse(res.replace(/'/g, '"')));
            }
        }
    }

    _appAudio.audioComplete = function (callback) {
        App.audioComplete = function (res) {
            if (callback != null) {
                callback(JSON.parse(res.replace(/'/g, '"')));
            }
        }
    }

    _appAudio.audioLockScreenSeek = function (seek) {
        App.call('audioLockScreenSeek', { 'seek': seek });
    }

    _appAudio.audioLockScreenInfo = function (name, singer, album, imgUrl, seek, duration, isPay) {
        App.call('audioLockScreenInfo', { 'name': name, 'singer': singer, 'album': album, 'imgUrl': imgUrl, 'seek': seek, 'duration': duration, 'isPay': isPay });
    }

    _appAudio.audioLockScreenCallback = function (callback) {
        App.audioLockScreenCallback = function (res) {
            if (callback != null) {
                callback(JSON.parse(res.replace(/'/g, '"')));
            }
        }
    }

}());

//alam
var _appAlarm = _appAlarm || {};
(function appAlarmInit() {

    _appAlarm.start = function (url, callback) {
        App.call('alarmStart', { 'url': encodeURI(url) }, function (res) {
            if (callback != null) {
                callback(JSON.parse(res.replace(/'/g, '"')));
            }
        });
    }

    _appAlarm.stop = function (callback) {
        App.call('alarmStop', {}, function (res) {
            if (callback != null) {
                callback(JSON.parse(res.replace(/'/g, '"')));
            }
        });
    }

    _appAlarm.reset = function (callback) {
        App.call('alarmReset', {}, function (res) {
            if (callback != null) {
                callback(JSON.parse(res.replace(/'/g, '"')));
            }
        });
    }
}());

//down
var _appDownload = _appDownload || {};
(function fileDownInit() {

    _appDownload.start = function (url, callback) {
        App.call("download", { 'url': encodeURI(url) }, function (res) {
            if (callback != null) {
                callback(JSON.parse(res.replace(/'/g, '"')));
            }
        });
    }

    _appDownload.process = function (callback) {
        if (callback != null) {
            App.downloadProcess = function (res) {
                callback(JSON.parse(res.replace(/'/g, '"')));
            };
        }
    }

    _appDownload.exist = function (url, callback) {
        if (callback != null) {
            App.call('fileExists', { 'url': encodeURI(url) }, function (res) {
                callback(JSON.parse(res.replace(/'/g, '"')));
            });
        }
    }


    _appDownload.stop = function (url, callback) {
        App.call("stopDownload", { 'url': encodeURI(url) }, function (res) {
            if (callback != null) {
                callback(JSON.parse(res.replace(/'/g, '"')));
            }
        });
    }

    _appDownload.delete = function (url, callback) {
        App.call("deleteFile", { 'url': encodeURI(url) }, function (res) {
            if (callback != null) {
                callback(res);
            }
        });
    }


    _appDownload.size = function (url, callback) {
        if (callback != null) {
            App.call('getFileSize', { 'url': encodeURI(url) }, function (res) {
                callback(res);
            });
        }
    }

    _appDownload.sumSize = function (callback) {
        if (callback != null) {
            App.call('getFilesSize', {}, function (res) {
                callback(res);
            });
        }
    }

    _appDownload.deleteAll = function (callback) {
        App.call("deleteFiles", {}, function (res) {
            if (callback != null) {
                callback(res);
            }
        });
    }

}());

module.exports={
    CurrentApp:App,
    QQApp:_appQQ,
    WeiboApp:_appWeibo,
    WeixinApp:_appWeiXin,
    DownloadApp:_appDownload,
    AlarmApp:_appAlarm,
    AudioApp:_appAudio
}