
kws = ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善']

//字符串转字节序列
function stringToBytes(str) {  
    var bytes = new Array();  
    var len, c;  
    len = str.length;  
    for(var i = 0; i < len; i++) {  
        c = str.charCodeAt(i);  
        if(c >= 0x010000 && c <= 0x10FFFF) {  
            bytes.push(((c >> 18) & 0x07) | 0xF0);  
            bytes.push(((c >> 12) & 0x3F) | 0x80);  
            bytes.push(((c >> 6) & 0x3F) | 0x80);  
            bytes.push((c & 0x3F) | 0x80);  
        } else if(c >= 0x000800 && c <= 0x00FFFF) {  
            bytes.push(((c >> 12) & 0x0F) | 0xE0);  
            bytes.push(((c >> 6) & 0x3F) | 0x80);  
            bytes.push((c & 0x3F) | 0x80);  
        } else if(c >= 0x000080 && c <= 0x0007FF) {  
            bytes.push(((c >> 6) & 0x1F) | 0xC0);  
            bytes.push((c & 0x3F) | 0x80);  
        } else {  
            bytes.push(c & 0xFF);  
        }  
    }  
    return bytes;  


}  

//字节序列转ASCII码
//[0x24, 0x26, 0x28, 0x2A] ==> "$&C*"
 function byteToString(arr) {  
    if(typeof arr === 'string') {  
        return arr;  
    }  
    var str = '',  
        _arr = arr;  
    for(var i = 0; i < _arr.length; i++) {  
        var one = _arr[i].toString(2),  
            v = one.match(/^1+?(?=0)/);  
        if(v && one.length == 8) {  
            var bytesLength = v[0].length;  
            var store = _arr[i].toString(2).slice(7 - bytesLength);  
            for(var st = 1; st < bytesLength; st++) {  
                store += _arr[st + i].toString(2).slice(2);  
            }  
            str += String.fromCharCode(parseInt(store, 2));  
            i += bytesLength - 1;  
        } else {  
            str += String.fromCharCode(_arr[i]);  
        }  
    }  
    return str;  
}  

function en(){
    var text_raw = document.getElementById("text_raw");
    var text_encrypted = document.getElementById("text_encrypted");
    text_encrypted.value = encrypt(text_raw.value);
}

function de(){
    var text_raw = document.getElementById("text_raw");
    var text_encrypted = document.getElementById("text_encrypted");
    text_raw.value=decrypt(text_encrypted.value);
}

function indexOf(word){
    var i=0;
    while(i<kws.length)
    {
        if(kws[i]==word)
        {
            return i;
        }
        i++;
    }
}

function toUnd(dec)
{
    var num = dec;
    var ns = new Array('0','1','2','3','4','5','6','7','8','9','a');
    var lefts = new Array();
    result = "";
    if(num == 0)
    {
        return "0";
    }
    else{
        var i =0;
        while(num>0)
        {
            lefts[i]=num%11
            num = parseInt(num/11);
            i++;
        }
        
        i = lefts.length-1;
        while(i>-1)
        {
            result += ns[lefts[i]];
            i--;
        }
        return result;
    }
}

function toDec(und)
{
    var i=0;
    var result=0;
    while(i<und.length)
    {
        var n=0;
        if(und[i]=='a')
        {
            n=10;
        }
        else{
            n=parseInt(und[i])
        }
        result += n*Math.pow(11,und.length-i-1);
        i++;
    }
    return result;
}

function intToEned(num)
{
    var und = toUnd(num);
    var i=0;
    result="";
    while(i<und.length)
    {
        var index=0;
        if(und[i]=='a')
        {
            index=10;
        }
        else{
            index=parseInt(und[i]);
        }
        result+=kws[index];
        i++;
    }
    return result;
}

function encrypt(text)
{
    var result="";

    var bytes = stringToBytes(text);
    var i=0;
    while(i<bytes.length){
        if(result.length!=0)
        {
            result+=kws[11];
        }
        result+=intToEned(parseInt(bytes[i]));
        i++;
    }
    return result;
}

function split(word){
    var result = new Array();
    var i=0;
    while(i<word.length/2)
    {
        result[i]=word[i*2]+word[i*2+1];
        i++;
    }
    return result;
}

function intToByte(i) {
    var b = i & 0xFF;
    var c = 0;
    if (b >= 128) {
        c = b % 128;
        c = -1 * (128 - c);
    } else {
        c = b;
    }
    return c;
}

function decrypt(text){
    if(text.length==0)
    {
        return "";
    }
    else if(text.length%2 != 0)
    {
        return "密文长度非法";
    }
    else
    {
        var words = text.split(kws[11]);
        var i=0;
        var nums = new Array();
        while(i<words.length)
        {
            var und="";
            var enbs =split(words[i]);
            var j=0;
            while(j<enbs.length)
            {
                var temn = indexOf(enbs[j])+"";
                // alert(temn);
                if (temn=='10')
                {
                    temn='a';
                }
                und+=temn;
                j++;
            }
            nums[i]=toDec(und);
            i++;
        }
        return byteToString(nums);
    }
}