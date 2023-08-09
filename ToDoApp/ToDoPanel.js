const activeBtn = document.getElementById("active");
const newBtn = document.getElementById("new");
const doneBtn = document.getElementById("done");
const submitBtn = document.getElementById("submitBtn");
const activeTask = document.getElementById('activeTask');
const doneTask = document.getElementById('doneTask');
const newTaskWindow = document.getElementById('newTask');
const editBtn = document.getElementById('submitEditBtn');
const editTaskWindow = document.getElementById('editTask');


//---------------------Funckja do zamykania wybranego w argumencie okienka

const closeWindow = (element) => {
    let elementToClose = document.getElementById(element);

    if(elementToClose.style.display == 'block'){
        elementToClose.style.display = 'none'
    }
}

newBtn.addEventListener('click', () => {

    closeWindow('editTask');
    closeWindow('newViewWindow');

    if(newTaskWindow.style.display != 'block'){
        newTaskWindow.style.display = 'block';
    }else{
        newTaskWindow.style.display = 'none';
    }  
    document.getElementById('LeftContainerOptions').style.height = '40px'; 
    document.getElementById('showArrow').style.transform = '';
})

doneBtn.addEventListener('click', () => {
    if(doneTask.style.display != 'block'){
        doneTask.style.display = 'block';
        activeTask.style.display = 'none';
    }   
    document.getElementById('LeftContainerOptions').style.height = '40px';

    closeWindow('newTask');
    closeWindow('editTask');
    closeWindow('newViewWindow');
})

activeBtn.addEventListener('click', () => {
    if(activeTask.style.display != 'block'){
        activeTask.style.display = 'block';
        doneTask.style.display = 'none';
    }   
    document.getElementById('LeftContainerOptions').style.height = '40px';
})

submitBtn.addEventListener('click', () => {
    if(localStorage.getItem('activeView') != null && document.getElementById('newTaskTitle').value != ''){
        let i = document.querySelectorAll('.task').length;

        let output = activeTask.innerHTML;

        output += `
                    <div class="task normal" id="task${i}" style="height: 120px;">
                        <p id="TaskTitle${i}" class="TaskTitle">${document.getElementById('newTaskTitle').value}</p>
                        <div class="contentContainer" id="contentContainer${i}" style="display: none;">
                            <p id="TaskDescribe${i}" class="TaskDescribe">${document.getElementById('opis').value}</p>
                        </div>
                        <div class="editOptionsContainer" id="editOptionsContainer${i}" style="display: none;">
                            <p class="editOptionImportant" id="eOI${i}" onclick="switchToImportant(event)"><i class="fa-solid fa-exclamation"></i> Ustaw jako ważne</p>
                            <p class="editOptionReallyImportant" id="eRI${i}" onclick="switchToReallyImportant(event)"><i class="fa-solid fa-triangle-exclamation"></i> Ustaw jako bardzo ważne</p>
                            <p class="editOptionEdition" id="edt${i}" onclick="editTask(event)"><i class="fa-solid fa-pen-to-square"></i> Edytuj</p>
                            <p class="editOptionRemove" id="rmv${i}" onclick="removeTask(event)"><i class="fa-solid fa-trash"></i> Usuń</p>
                        </div>
                        <div class="optionssContainer" id="optionsContainer${i}">
                            <div id="showOption${i}" class="showOption taskOptions" onclick="showMore(event)"><i class="fa-solid fa-eye" id="IkonOfShow${i}"></i></div>
                            <div id="moreOption${i}" class="moreOption taskOptions" onclick="moreOptions(event)"><i class="fa-solid fa-sliders" id="IkonOfMore${i}"></i></div>
                            <div id="doneOption${i}" class="doneOption taskOptions" onclick="moveToDone(event)"><i class="fa-solid fa-check" id="IkonOfDone${i}"></i></div>
                        </div>
                    </div>`;

        activeTask.innerHTML = output;
        

        newTaskWindow.style.display = 'none';

        saveTasks();

        document.getElementById('newTaskTitle').value = '';
        document.getElementById('opis').value = '';
    }
    else{
        console.log('Wybierz widok lub podaj tytuł');
    }
})

const showMore = (event) => {
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

const showMoreDone = (event) => {
    let actualClickTask = event.target.id.slice(14);
    let listSize = 0;


    if(document.querySelector('#contentDoneContainer'+ actualClickTask).style.display != 'block'){
        document.querySelector('#contentDoneContainer'+ actualClickTask).style.display = 'block';
        
        document.querySelector('#taskDone'+actualClickTask).style.height = (document.querySelector('#taskDone'+actualClickTask).clientHeight + document.querySelector('#contentDoneContainer'+actualClickTask).clientHeight + 16) + 'px';
    }
    else{
        document.querySelector('#taskDone'+actualClickTask).style.height = (document.querySelector('#taskDone'+actualClickTask).clientHeight - (document.querySelector('#contentDoneContainer'+actualClickTask).clientHeight + 16)) + 'px';

        document.querySelector('#contentDoneContainer'+ actualClickTask).style.display = 'none';
        
    }  
}

const moveToDone = (event) => {
    let actualClickTask = event.target.id.slice(10);
    let actualTaskTitle = document.querySelector('#TaskTitle'+actualClickTask).innerHTML;
    let actualTaskDescribe = document.querySelector('#TaskDescribe'+actualClickTask).innerHTML;
    let output = document.getElementById('doneTask').innerHTML;
    let i = document.querySelectorAll('.taskDone').length;

    activeTask.removeChild(document.getElementById('task'+actualClickTask));

    output += `  <div class="taskDone" id="taskDone${i}" style="height: 120px;">
                    <p id="DoneTaskTitle${i}" class="DoneTaskTitle">${actualTaskTitle}</p>
                    <div class="contentDoneContainer" id="contentDoneContainer${i}" style="display: none;">
                        <p id="DoneTaskDescribe${i}" class="DoneTaskDescribe">${actualTaskDescribe}</p>
                    </div>
                    <div class="optionsDoneContainer" id="optionsDoneContainer${i}">
                        <div id="showDoneOption${i}" class="showDoneOption taskDoneOptions" onclick="showMoreDone(event)"><i class="fa-solid fa-eye" id="IkonOfShowDone${i}"></i></div>
                        <div id="deleteDoneOption${i}" class="deleteDoneOption taskDoneOptions" onclick="moveToDelete(event)"><i class="fa-solid fa-x" id="IkonOfDeleOption${i}"></i></div>
                    </div>
                </div>`;
    
    document.getElementById('doneTask').innerHTML = output;
    saveTasks()
    saveDoneTasks()
}

const moreOptions = (event) => {
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

const switchToImportant = (event) => {
    let actualClickTask = event.target.id.slice(3);
    document.querySelector('#task'+actualClickTask).classList.remove('normal');
    document.querySelector('#task'+actualClickTask).classList.remove('reallyImportant');
    document.querySelector('#task'+actualClickTask).classList.add('important');

    saveTasks();
}

const switchToReallyImportant = (event) => {
    let actualClickTask = event.target.id.slice(3);
    document.querySelector('#task'+actualClickTask).classList.remove('normal');
    document.querySelector('#task'+actualClickTask).classList.remove('important');
    document.querySelector('#task'+actualClickTask).classList.add('reallyImportant');
    
    saveTasks();
}

const removeTask = (event) => {
    let actualClickTask = event.target.id.slice(3);
    activeTask.removeChild(document.querySelector('#task'+actualClickTask));

    saveTasks();
}

//---------------------Wysuwane menu z dołu

const showArrow = document.getElementById('showArrow');
const optionsBlock = document.getElementById('LeftContainerOptions');

showArrow.addEventListener('click', () => {
    let actualHeight = parseInt(optionsBlock.style.height.slice(0, -2));
    let removeViewBtn = document.getElementById('removeViewBtn');
    let maxHeight;

    if(removeViewBtn.style.display == 'block'){
        maxHeight = 410;
    }
    else{
        maxHeight = 350;
    }

    if(actualHeight == 40){
        optionsBlock.style.height = maxHeight + 'px';
        showArrow.style.transform = 'rotate(180deg)';
    }
    else if(actualHeight == maxHeight){
        optionsBlock.style.height = '40px';
        showArrow.style.transform = '';
    }  
})

//---------------------Pokazywanie okna z tworzeniem nowego widoku

const newViewWindow = document.getElementById('newViewWindow');
const newViewBtn = document.getElementById('newView');

newViewBtn.addEventListener('click', () => {

    closeWindow('newTask');
    closeWindow('editTask');

    if(newViewWindow.style.display == 'none'){
        newViewWindow.style.display = 'block';
    }
    else if(newViewWindow.style.display == 'block'){
        newViewWindow.style.display = 'none';
    }
    document.getElementById('LeftContainerOptions').style.height = '40px';
    document.getElementById('showArrow').style.transform = '';
})

//---------------------Edycja istniejącego zadania

let actualClickTask;

const editTask = (event) => {
    actualClickTask = event.target.id.slice(3);
    let actualTaskTitle = document.getElementById('TaskTitle'+actualClickTask).innerHTML;
    let actualTaskDescribe = document.getElementById('TaskDescribe'+actualClickTask).innerHTML;
    

    editTaskWindow.style.display = 'block';

    console.log(actualTaskTitle)

    document.getElementById('editTaskTitle').value = actualTaskTitle;
    document.getElementById('editTaskDesc').value = actualTaskDescribe;

    closeWindow('newTask');
    closeWindow('newViewWindow');
}

editBtn.addEventListener('click', () => {
    document.getElementById('TaskTitle'+actualClickTask).innerHTML = document.getElementById('editTaskTitle').value;
    document.getElementById('TaskDescribe'+actualClickTask).innerHTML = document.getElementById('editTaskDesc').value;

    editTaskWindow.style.display = 'none';

    actualClickTask = null;
    saveTasks();
})

const moveToDelete = (event) => {
    let actualClickTask = event.target.id.slice(16);
    console.log(actualClickTask)
    doneTask.removeChild(document.getElementById(`taskDone${actualClickTask}`));
    saveDoneTasks();
}