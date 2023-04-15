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
    newTaskBlock.classList.add('normal');
    newTaskBlock.id = "task"+i;

    let contentContainer = document.createElement('div');
    contentContainer.classList.add('contentContainer');
    contentContainer.id = "contentContainer"+i;
    contentContainer.style.display = 'none';

    let newTaskBlockFP = document.createElement('p');
    newTaskBlockFP.id = "TaskTitle"+i;
    newTaskBlockFP.classList.add('TaskTitle');

    let newTaskBlockSP = document.createElement('p');
    newTaskBlockSP.id = "TaskDescribe"+i;
    // newTaskBlockSP.style.display = 'none';

    
    let ListOfSteps = document.createElement('ul');
    ListOfSteps.id = 'ListOfSteps'+i;
    ListOfSteps.classList.add('ListOfSteps');
    // ListOfSteps.style.display = 'none';
    
    activeTask.appendChild(newTaskBlock);
    document.getElementById('task'+i).appendChild(newTaskBlockFP);
    document.getElementById('task'+i).appendChild(contentContainer);


    document.getElementById('contentContainer'+i).appendChild(newTaskBlockSP);
    document.getElementById('contentContainer'+i).appendChild(ListOfSteps);

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

    //tworzenie menu edycji zadania

    let editOptionsContainer = document.createElement('div');
    let editOptionImportant = document.createElement('p');
    let editOptionReallyImportant = document.createElement('p');
    let editOptionEdition = document.createElement('p');
    let editOptionRemove = document.createElement('p');

    editOptionsContainer.classList.add('editOptionsContainer');
    editOptionsContainer.id = 'editOptionsContainer'+i;
    editOptionsContainer.style.display = 'none'

    document.getElementById('task'+i).appendChild(editOptionsContainer);

    editOptionImportant.classList.add('editOptionImportant');
    editOptionImportant.id = 'eOI'+i;
    editOptionImportant.innerHTML = '<i class="fa-solid fa-exclamation"></i> Ustaw jako ważne';
    editOptionImportant.setAttribute('onclick', 'switchToImportant(event)');

    document.getElementById('editOptionsContainer'+i).appendChild(editOptionImportant);

    editOptionReallyImportant.classList.add('editOptionReallyImportant');
    editOptionReallyImportant.id = 'eRI'+i;
    editOptionReallyImportant.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Ustaw jako bardzo ważne';
    editOptionReallyImportant.setAttribute('onclick', 'switchToReallyImportant(event)');

    document.getElementById('editOptionsContainer'+i).appendChild(editOptionReallyImportant);

    editOptionEdition.classList.add('editOptionEdition');
    editOptionEdition.id = 'edt'+i;
    editOptionEdition.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edytuj';

    document.getElementById('editOptionsContainer'+i).appendChild(editOptionEdition);

    editOptionRemove.classList.add('editOptionRemove');
    editOptionRemove.id = 'rmv'+i;
    editOptionRemove.innerHTML = '<i class="fa-solid fa-trash"></i> Usuń';
    editOptionRemove.setAttribute('onclick', 'removeTask(event)');

    document.getElementById('editOptionsContainer'+i).appendChild(editOptionRemove);
    
    
    //tworzenie menu opcji w każdym nowym zadaniu
    
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
    doneOption.setAttribute('onclick', 'moveToDone(event)');
    moreOption.setAttribute('onclick', 'moreOptions(event)');

    showOption.innerHTML = `<i class="fa-solid fa-eye" id="IkonOfShow${i}"></i>`
    moreOption.innerHTML = `<i class="fa-solid fa-sliders" id="IkonOfMore${i}"></i>`
    doneOption.innerHTML = `<i class="fa-solid fa-check" id="IkonOfDone${i}"></i>`

    document.getElementById('task'+i).appendChild(optionsContainer);
    document.getElementById('optionsContainer'+i).appendChild(showOption);
    document.getElementById('optionsContainer'+i).appendChild(moreOption);
    document.getElementById('optionsContainer'+i).appendChild(doneOption);


    document.querySelector('#task'+i).style.height = document.querySelector('#task'+i).clientHeight + "px";
    i++;
})

function showMore(event){
    let actualClickTask = event.target.id.slice(10);
    let listSize = 0;


    if(document.querySelector('#contentContainer'+ actualClickTask).style.display != 'block'){
        document.querySelector('#contentContainer'+ actualClickTask).style.display = 'block';
        
        document.querySelector('#task'+actualClickTask).style.height = (document.querySelector('#task'+actualClickTask).clientHeight + document.querySelector('#contentContainer'+actualClickTask).clientHeight + 16) + 'px';
    }
    else{
        document.querySelector('#task'+actualClickTask).style.height = (document.querySelector('#task'+actualClickTask).clientHeight - (document.querySelector('#contentContainer'+actualClickTask).clientHeight + 16)) + 'px';

        document.querySelector('#contentContainer'+ actualClickTask).style.display = 'none';
        
    }  
}

function moveToDone(event){
    let actualClickTask = event.target.id.slice(10);
    let actualTaskHTML = document.querySelector(`#task`+actualClickTask).innerHTML;

    activeTask.removeChild(document.getElementById('task'+actualClickTask));

    let newDoneTask = document.createElement('div');
    newDoneTask.id = 'task'+actualClickTask;
    newDoneTask.classList.add('task');
    newDoneTask.innerHTML = actualTaskHTML;
    doneTask.appendChild(newDoneTask);
}

function moreOptions(event){
    let actualClickTask = event.target.id.slice(10);
    
    if(document.querySelector('#editOptionsContainer'+ actualClickTask).style.display != 'block'){
        document.querySelector('#editOptionsContainer'+ actualClickTask).style.display = 'block';
        document.querySelector('#task'+actualClickTask).style.height = (document.querySelector('#task'+actualClickTask).clientHeight + document.querySelector('#editOptionsContainer'+ actualClickTask).clientHeight) + "px";
    }
    else if(document.querySelector('#editOptionsContainer'+ actualClickTask).style.display == 'block'){
        document.querySelector('#task'+actualClickTask).style.height = (document.querySelector('#task'+actualClickTask).clientHeight - document.querySelector('#editOptionsContainer'+ actualClickTask).clientHeight) + "px";
        document.querySelector('#editOptionsContainer'+ actualClickTask).style.display = 'none';
    }

}

function switchToImportant(event){
    let actualClickTask = event.target.id.slice(3);
    document.querySelector('#task'+actualClickTask).classList.remove('normal');
    document.querySelector('#task'+actualClickTask).classList.remove('reallyImportant');
    document.querySelector('#task'+actualClickTask).classList.add('important');
}

function switchToReallyImportant(event){
    let actualClickTask = event.target.id.slice(3);
    document.querySelector('#task'+actualClickTask).classList.remove('normal');
    document.querySelector('#task'+actualClickTask).classList.remove('important');
    document.querySelector('#task'+actualClickTask).classList.add('reallyImportant');
}

function removeTask(event){
    let actualClickTask = event.target.id.slice(3);
    activeTask.removeChild(document.querySelector('#task'+actualClickTask));
}