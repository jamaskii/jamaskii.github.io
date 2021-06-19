/*
window.onload=function(){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'http://api.v6x.wht.dgwht.top/text/f731c2fb2ad44cd1/c4a940e36ba0bd10', true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var obj= JSON.parse(window.atob(JSON.parse(httpRequest.responseText)['data']['text']));
            if(obj[pageId]==null){
                obj[pageId]=0;
            }
            obj[pageId]++;
            document.getElementById('views').innerText='当前页浏览量：'+obj[pageId];
            updateViews(obj)
        }
    };
}

function updateViews(obj){
    var formData=new FormData();
    formData.append("appid","f731c2fb2ad44cd1");
    formData.append('text_id','c4a940e36ba0bd10');
    formData.append('text',window.btoa(JSON.stringify(obj)));
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'http://api.v6x.wht.dgwht.top/text/update');
    httpRequest.send(formData);
}
*/
