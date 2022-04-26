function getCookie(cname){
    let name = cname + "=";
    let cookieStrs = document.cookie.split(";");
    for(let index in cookieStrs){
        let pos=cookieStrs[index].indexOf(name);
        if(pos!=-1) return unescape(cookieStrs[index].substring(pos+name.length,cookieStrs[index].length))
    }
    return "";
}

function setCookie(name,value,days,path,domain,secure){
    if(days)
    {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = date.toGMTString();
    }
    else var expires = "";
    cookieString = name + "=" +escape(value);
    if(expires) cookieString += ";expires=" +expires;
    if(path) cookieString += ";path=" + escape(path);
    if(domain) cookieString += ";domain=" + escape(domain);
    if(secure) cookieString += ";secure=" + escape(secure);
    document.cookie = cookieString;
}

function addOnload(func){
    if(document.all) {
        window.attachEvent('onload', func);
    } else {
        window.addEventListener('load', func);
    }
}

function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

function get(path, onComplete){
    post(path, null, onComplete);
}

function post(path, data, onComplete){
    var xhr = new XMLHttpRequest();
    if(data==null){
        xhr.open('GET', path);
        xhr.send()
    }else{
        xhr.open('POST',path, true);
        xhr.send(data);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            onComplete(xhr.responseText);
        }
    };
}

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getSimilarity(str1,str2) {
    let sameNum = 0
    //寻找相同字符
    for (let i = 0; i < str1.length; i++) {
        for(let j =0;j<str2.length;j++){
            if(str1[i]===str2[j]){
                sameNum ++
                break
            }
        }
    }
    let length = str1.length > str2.length ? str1.length : str2.length
    return (sameNum/length) * 100 || 0
}