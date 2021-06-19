function swOnClick(){
    var list = document.getElementById('list');
    if(list.className == "list"){
        list.className = "hide";
    }else{
        list.className = "list";
    }
}

function sw(api){
    var power = document.getElementById("power");
    var fdyy = document.getElementById("fdyy");
    var kogrnn = document.getElementById("kogrnn");
    var list = document.getElementById('list');
    var title = document.getElementById('title');

    switch(api){
        case 'power':
            power.className = 'power';
            fdyy.className = 'hide';
            kogrnn.className = 'hide';
            title.innerText = '电费余额';
            break;
        case 'fdyy':
            power.className = 'hide';
            fdyy.className = 'fdyy';
            kogrnn.className = 'hide';
            title.innerText = '飞登云印下载';
            break;
        case 'kogrnn':
            power.className = 'hide';
            fdyy.className = 'hide';
            kogrnn.className = 'kogrnn';
            title.innerText = '王者荣耀重复昵称';
            break;
    }
    list.className = 'hide';
}

