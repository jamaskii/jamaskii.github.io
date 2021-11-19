function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
}

function onGenClick(){
    var tempList=document.getElementById('tempList');
    tempList.innerHTML='';
    var rowam=document.createElement('tr');
    var rowpm=document.createElement('tr');
    for(var i=0;i<14;i++){
        var tdam=document.createElement('td');
        tdam.innerText='36.'+randomNum(0,6);
        rowam.appendChild(tdam);

        var tdpm=document.createElement('td');
        tdpm.innerText='36.'+randomNum(0,6);
        rowpm.appendChild(tdpm);
    }
    tempList.appendChild(rowam);
    tempList.appendChild(rowpm);
}
