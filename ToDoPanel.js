let activeBtn = document.getElementById("active");
let newBtn = document.getElementById("new");
let doneBtn = document.getElementById("done");
let submitBtn = document.getElementById("submitBtn");
let activeTask = document.getElementById('activeTask');
let doneTask = document.getElementById('doneTask');
let newTaskWindow = document.getElementById('newTask');
let i = 0;

newBtn.addEventListener('click', ()=>{
    if(newTaskWindow.style.display != 'block'){
        newTaskWindow.style.display = 'block';
    }else{
        newTaskWindow.style.display = 'none';
    }   
})

doneBtn.addEventListener('click', ()=>{
    if(doneTask.style.display != 'block'){
        doneTask.style.display = 'block';
        activeTask.style.display = 'none';
    }   
})

activeBtn.addEventListener('click', ()=>{
    if(activeTask.style.display != 'block'){
        activeTask.style.display = 'block';
        doneTask.style.display = 'none';
    }   
})

submitBtn.addEventListener('click', ()=>{
    let newTaskBlock = document.createElement('div');
    newTaskBlock.classList.add('task');
    newTaskBlock.id = "task"+i;

    let newTaskBlockFP = document.createElement('p');
    newTaskBlockFP.id = "TaskTitle"+i;
    newTaskBlockFP.classList.add('TaskTitle');

    let newTaskBlockSP = document.createElement('p');
    newTaskBlockSP.id = "TaskDescribe"+i;
    newTaskBlockSP.style.display = 'none';

    
    let ListOfSteps = document.createElement('ul');
    ListOfSteps.id = 'ListOfSteps'+i;
    ListOfSteps.classList.add('ListOfSteps');
    ListOfSteps.style.display = 'none';
    
    activeTask.appendChild(newTaskBlock);
    document.getElementById('task'+i).appendChild(newTaskBlockFP);
    document.getElementById('task'+i).appendChild(newTaskBlockSP);
    document.getElementById('task'+i).appendChild(ListOfSteps);

    document.getElementById('TaskTitle'+i).innerHTML = document.getElementById('newTaskTitle').value;
    document.getElementById('TaskDescribe'+i).innerHTML = document.getElementById('opis').value;

    let Tasklist = document.getElementById('kroki').value.trim();
    if(Tasklist != ""){
        let TaskListReady = Tasklist.split("\n");

        for(const word of TaskListReady){
            let ListOfStepsLi = document.createElement('li');
            ListOfStepsLi.innerHTML = word;
            document.getElementById('ListOfSteps'+i).appendChild(ListOfStepsLi);
        }
    }
    
    
    let optionsContainer = document.createElement('div');
    let showOption = document.createElement('div');
    let moreOption = document.createElement('div');
    let doneOption = document.createElement('div');

    optionsContainer.id = 'optionsContainer'+i;
    showOption.id = 'showOption'+i;
    moreOption.id = 'moreOption'+i;
    doneOption.id = 'doneOption'+i;

    optionsContainer.classList.add('optionsContainer');
    showOption.classList.add('showOption');
    moreOption.classList.add('moreOption');
    doneOption.classList.add('doneOption');

    showOption.classList.add('taskOptions');
    moreOption.classList.add('taskOptions');
    doneOption.classList.add('taskOptions');

    showOption.setAttribute('onclick', 'showMore(event)');

    showOption.innerHTML = `<i class="fa-solid fa-eye" id="IkonOfShow${i}"></i>`
    moreOption.innerHTML = `<i class="fa-solid fa-sliders" id="IkonOfMore${i}"></i>`
    doneOption.innerHTML = `<i class="fa-solid fa-check" id="IkonOfDone${i}"></i>`

    document.getElementById('task'+i).appendChild(optionsContainer);
    document.getElementById('optionsContainer'+i).appendChild(showOption);
    document.getElementById('optionsContainer'+i).appendChild(moreOption);
    document.getElementById('optionsContainer'+i).appendChild(doneOption);
    i++;
})

function showMore(event){
    let actualClickTask = event.target.id.slice(10);

    if(document.querySelector('#TaskDescribe'+ actualClickTask).style.display != 'block'){
        document.querySelector('#TaskDescribe'+ actualClickTask).style.display = 'block';
        document.querySelector('#ListOfSteps'+ actualClickTask).style.display = 'block';
    }
    else{
        document.querySelector('#TaskDescribe'+ actualClickTask).style.display = 'none';
        document.querySelector('#ListOfSteps'+ actualClickTask).style.display = 'none';
    }
    
}
