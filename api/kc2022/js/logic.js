var questions = []
var inputTitle;
var boxDisplay;

addOnload(()=>{
    inputTitle = document.getElementById('inputTitle');
    // inputTitle.value='中华人民共和国';
    boxDisplay = document.getElementById('boxDisplay');
    let dialog=layer.load(1);
    get('./questions.json',(text)=>{
        questions=JSON.parse(text);
        layer.close(dialog);
    })
})

function onQueryClick(){
    if(inputTitle.value.length == 0){
        return;
    }
    let targets = findTargets(inputTitle.value);
    boxDisplay.innerHTML='';
    for(let i=0; i<targets.length; i++){
        boxDisplay.appendChild(renderQuestion(targets[i], inputTitle.value));
    }
}

function onClearClick(){
    inputTitle.value='';
}

function findTargets(keyword){
    let targets=[];
    for(let i=0; i<questions.length; i++){
        let question=questions[i];
        if(!question['title'].indexOf(keyword)){
            targets.push(question);
            continue;
        }
        if(findSelection(question, keyword)){
            targets.push(question);
        }
    }
    return targets;
}

function findSelection(question, keyword){
    for(let j=0; j<question['selection'].length; j++){
        let selection = question['selection'][j];
        if(!(selection['title']+'').indexOf(keyword)){
            return true;
        }
    }
    return false;
}

function mele(tag){
    return document.createElement(tag);
}

function renderQuestion(question, keyword){
    let questionBox = mele('div');
    questionBox.classList.add('question', 'layui-panel');
    
    let pTitle = mele('p');
    pTitle.className='question-title';
    pTitle.innerHTML=question['title'].replace(keyword, '<span class="question-keyword">'+keyword+'</span>');
    questionBox.appendChild(pTitle);

    questionBox.appendChild(mele('hr'));

    for(let i=0; i<question['selection'].length; i++){
        let selection = question['selection'][i];
        let pSelection = mele('p');
        pSelection.className = 'question-selection';
        pSelection.innerHTML = '<strong>'+selection['index']+'.&nbsp</strong>'+(selection['title']+'').replace(keyword, '<span class="question-keyword">'+keyword+'</span>');
        if(!question['answers'].indexOf(selection['index'])){
            pSelection.classList.add('question-selection-right');
        } 
        questionBox.appendChild(pSelection);
    }

    questionBox.appendChild(mele('hr'));

    let pAnswer = mele('p');
    pAnswer.className = 'question-ans';
    pAnswer.innerText = '答案：'+ question['answers'].join(',');
    questionBox.appendChild(pAnswer);

    return questionBox;

}