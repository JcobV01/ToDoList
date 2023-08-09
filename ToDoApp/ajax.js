let setNewViewBtn = document.getElementById('setNewView');
let filenameFiled = document.getElementById('filenameField');
let newViewPanel = document.getElementById('newViewWindow');
let removeFileBtn = document.getElementById('removeViewBtn');

window.addEventListener('load', () => {
    listOfFiles();
})

setNewViewBtn.addEventListener('click', () => {
    const req = new XMLHttpRequest();

    filename = filenameFiled.value;
    par = "name="+filename;

    console.log('fc works');

    req.open('POST', '/ToDoApp/PHPScripts/newFile.php', true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    req.onload = () =>{
        console.error(req.responseText);
    }
    req.send(par);


    newViewPanel.style.display = 'none';

    listOfFiles();

    document.getElementById('filenameField').value = '';
});


const listOfFiles = () => {
    const req = new XMLHttpRequest();

    req.open('POST', '/ToDoApp/PHPScripts/showFiles.php', true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    req.onload = ()=>{
        let files = JSON.parse(req.responseText);

        let output = "";

        for(let i in files){
            if(files[i].length > 5){
                output += `<div class="fileListComponent" id="file${i}"onclick="loadTask(event)">`+ files[i].slice(0, -5) + `</div>`;
            }    
        }

        if(output == ''){
            output = '<p id="emptyListOfFile">Brak widoków</p>'
        }

        document.getElementById('fileList').innerHTML = output;
    }

    req.send();
}

const saveTasks = () => {
    let howManyTasks = document.querySelectorAll('.task');
    let titles = document.querySelectorAll('.TaskTitle');
    let descs = document.querySelectorAll('.TaskDescribe');
    let objToSave;
    let waitToSave = {}; 

    for(let i=0; i<howManyTasks.length; i++){
        objToSave = {
            ["task"+i]:{
                title: titles[i].innerHTML,
                describe: descs[i].innerHTML,
                state: howManyTasks[i].classList[1]
            }
        }
        console.log(i);
        console.log(document.querySelectorAll('.task')[i].className.slice(5))
        waitToSave = Object.assign(waitToSave, objToSave);
    }

    const req = new XMLHttpRequest();

    req.open('POST', '/ToDoApp/PHPScripts/saveFile.php', true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    req.onload = () =>{
        console.log(req.responseText);
    }
    

    req.send("zawartosc="+JSON.stringify(waitToSave)+"&plik="+localStorage.getItem('activeView'));
}

const saveDoneTasks = () => {
    let howManyTasks = document.querySelectorAll('.taskDone');
    let titles = document.querySelectorAll('.DoneTaskTitle');
    let descs = document.querySelectorAll('.DoneTaskDescribe');
    let objToSave;
    let waitToSave = {}; 

    for(let i=0; i<howManyTasks.length; i++){
        objToSave = {
            ["taskDone"+i]:{
                title: titles[i].innerHTML,
                describe: descs[i].innerHTML,
                state: howManyTasks[i].classList[1]
            }
        }
        waitToSave = Object.assign(waitToSave, objToSave);
    }

    const req = new XMLHttpRequest();

    req.open('POST', '/ToDoApp/PHPScripts/saveFileDone.php', true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    req.onload = () =>{
        console.log(req.responseText);
    }
    

    req.send("zawartosc="+JSON.stringify(waitToSave)+"&plik="+localStorage.getItem('activeView'));
}

const loadTask = (event) => {
    let file = event.target.innerHTML;
    let activeTasksArea = document.getElementById('activeTask');
    let tasks = document.querySelectorAll('.fileListComponent');
    localStorage.removeItem('activeView');
    localStorage.setItem('activeView', file);

    //---------------------------------automatyczne ukrywanie menu
    
    let showArrow = document.getElementById('showArrow');
    let optionsBlock = document.getElementById('LeftContainerOptions');

    optionsBlock.style.height = '40px';
    showArrow.style.transform = '';

    //---------------------------------kolorki dla aktywnych widoków
    let actualView = event.target.id;

    for(let i of tasks){
        document.querySelector('#'+i.id).style.backgroundColor = '#1a1a1a'
        
    }

    document.querySelector('#'+actualView).style.backgroundColor = '#2a7fff';

    //----------------------------------
    //----------------------------------Pokazywanie guzika do usuwania widoków

    removeFileBtn.style.display = 'block';

    //----------------------------------

    const req = new XMLHttpRequest();

    req.open('POST', '/ToDoApp/PHPScripts/loadFile.php', true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    req.onload = () =>{
        let files = JSON.parse(req.responseText);
        let output = "";

        
        const tablica = Object.entries(files);

        for(let i=0; i<tablica.length; i++){
            output += `
                <div class="task ${tablica[i][1]['state']}" id="task${i}" style="height: 120px;">
                    <p id="TaskTitle${i}" class="TaskTitle">${tablica[i][1]['title']}</p>
                    <div class="contentContainer" id="contentContainer${i}" style="display: none;">
                        <p id="TaskDescribe${i}" class="TaskDescribe">${tablica[i][1]['describe']}</p>
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
        }

        activeTasksArea.innerHTML = output;
    }

    req.send("file="+file);

    loadDoneTask(file);
}

const loadDoneTask = (file) => {
    const doneTasksArea = document.getElementById('doneTask');

    const req = new XMLHttpRequest();

    req.open('POST', '/ToDoApp/PHPScripts/loadFileDone.php', true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    req.onload = () =>{
        let files = JSON.parse(req.responseText);
        let output = "";

        
        const tablica = Object.entries(files);

        for(let i=0; i<tablica.length; i++){
            output += `  <div class="taskDone" id="taskDone${i}" style="height: 120px;">
                            <p id="DoneTaskTitle${i}" class="DoneTaskTitle">${tablica[i][1]['title']}</p>
                            <div class="contentDoneContainer" id="contentDoneContainer${i}" style="display: none;">
                                <p id="DoneTaskDescribe${i}" class="DoneTaskDescribe">${tablica[i][1]['describe']}</p>
                            </div>
                            <div class="optionsDoneContainer" id="optionsDoneContainer${i}">
                                <div id="showDoneOption${i}" class="showDoneOption taskDoneOptions" onclick="showMoreDone(event)"><i class="fa-solid fa-eye" id="IkonOfShowDone${i}"></i></div>
                                <div id="deleteDoneOption${i}" class="deleteDoneOption taskDoneOptions" onclick="moveToDelete(event)"><i class="fa-solid fa-x" id="IkonOfDeleOption${i}"></i></div>
                            </div>
                        </div>`;
        }

        doneTasksArea.innerHTML = output;
    }

    req.send("file="+file);
}

removeFileBtn.addEventListener('click', () => {
    const req = new XMLHttpRequest();
    console.log('dziala')

    req.open('POST', '/ToDoApp/PHPScripts/removeFile.php', true); 
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.onload = () =>{
        console.log(req.responseText);
    }
    req.send("file="+localStorage.getItem('activeView'));

    document.getElementById('activeTask').innerHTML = '<p id="emptyTaskPanel">Wybierz widok</p>';
    localStorage.removeItem('activeView');

    listOfFiles();

    document.getElementById('LeftContainerOptions').style.height = '40px';

    removeFileBtn.style.display = 'none';

    closeWindow('newTask');
    closeWindow('editTask');
    closeWindow('newViewWindow');
})
