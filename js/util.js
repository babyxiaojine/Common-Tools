/** 获取url中的get参数
* @param url -> url字符串
* @return ret- > url中的get参数对象
*/
function parseQueryString(url) {
    var reg_url = /^[^\?]+\?([\w\W]+)$/,
    reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
    arr_url = reg_url.exec(decodeURIComponent(decodeURIComponent(url))),
    ret = {};
    if (arr_url && arr_url[1]) {
        var str_para = arr_url[1], result;
        while ((result = reg_para.exec(str_para)) != null) {
            ret[result[1]] = result[2];
        }
    }
    return ret;
}
/** 图片base64转blob
* @param dataurl -> 图片base64字符
* @return Blob对象
*/
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

/** 序列化表单
* @param formObj[dom object]->表单DOM元素
* @return arr[object]->表单object
*/
function formatForm(form){
  var arr={};
  for (var i = 0; i < form.elements.length; i++) {
    var feled=form.elements[i];
    if(!feled.name) continue;
    switch(feled.type) {
      case undefined:
      case 'button':
      case 'file':
      case 'reset':
      case 'submit':
      break;
      case 'checkbox':
      case 'radio':
      if (!feled.checked) {
      break;
      }
      default:
      if (arr[feled.name]) {
        arr[feled.name]=arr[feled.name]+','+feled.value;
      }else{
        arr[feled.name]=feled.value;
      } 
    }
    console.log(arr[feled.name])
  }
  return arr
}

/** 格式化Object为url参数
* @param obj[object]
* @return [string]->a=1&b=2
*/
function objectToParams(obj){
    var params = [];
    for (var key in obj){
        params.push(key + '=' + obj[key]);
    }
    return params.join('&');
}

/*
* 格式化日期
* @param timestamp->验证的字符
* @param format-> null=年月日时分秒 , 'ymd格式'=年月日
 */
function formatDate(timestamp,format = 'yyyy-MM-dd hh:mm:ss') {
    if (/^\d{10}$/.test(timestamp)) {
        timestamp *= 1e3
    } else if (/^\d{13}$/.test(timestamp)) {
        timestamp = parseInt(timestamp)
    } else {
        console.log("时间戳格式不正确！");
        return
    }
    var time = new Date(timestamp);
     var o = {  
        "M+" : time.getMonth()+1,                 //月份 
        "d+" : time.getDate(),                    //日 
        "h+" : time.getHours(),                   //小时 
        "m+" : time.getMinutes(),                 //分 
        "s+" : time.getSeconds(),                 //秒 
        "q+" : Math.floor((time.getMonth()+3)/3), //季度 
        "S"  : time.getMilliseconds()             //毫秒 
    }; 
    if(format){
        if(/(y+)/.test(format)) {
                format=format.replace(RegExp.$1, (time.getFullYear()+"").substr(4 - RegExp.$1.length)); 
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(format)){
                format = format.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
    }

    return format
}

/**
 * 防抖函数
 * @param method 事件触发的操作
 * @param delay 多少毫秒内连续触发事件，不会执行
 * @returns {Function}
 */
function debounce(method, delay) {
    var timer = null;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            method.apply(context, args);
        }, delay);
    };
}


/**
 * 节流函数
 * @param method 事件触发的操作
 * @param mustRunDelay 间隔多少毫秒需要触发一次事件
 */
function throttle(method, mustRunDelay) {
    let timer,
        args = arguments,
        start;
    return function loop() {
        let self = this;
        let now = Date.now();
        if(!start){
            start = now;
        }
        if(timer){
            clearTimeout(timer);
        }
        if(now - start >= mustRunDelay){
            method.apply(self, args);
            start = now;
        }else {
            timer = setTimeout(function () {
                loop.apply(self, args);
            }, 50);
        }
    }
}