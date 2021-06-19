var loading = false;

function createXml(str)
{
　　if(document.all){//IE浏览器
    　　var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
    　　xmlDoc.loadXML(str);
    　　return xmlDoc;
　　}
　　else{//非IE浏览器
　　        return new DOMParser().parseFromString(str, "text/xml");
    }
}

function loadPower(){
    if(!loading){
        loading = true;
        var btnLoad = document.getElementById('btn-load');
        btnLoad.innerText = "加载中...";
        var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
        httpRequest.open('GET', 'http://xfewm.gxmu.edu.cn/ICBS_WeiXinPay/PurchaseWebService.asmx/getReserveHKAM?AmMeter_ID=3002.004290.1', true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
        httpRequest.send();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                obj=createXml(httpRequest.responseText);
                var rp=obj.getElementsByTagName("remainPower")[0].firstChild.nodeValue;
                var rt=obj.getElementsByTagName("readTime")[0].firstChild.nodeValue;
                document.getElementById("remain").innerHTML="剩余电量："+rp+"度";
                document.getElementById("readtime").innerHTML="读表时间："+rt;
                btnLoad.innerText = "加载";
                loading = false;
            }
        };
    }
}