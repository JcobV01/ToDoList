<?php
    session_start();
    if(!isset($_SESSION['zalogowany']) && $_SESSION['zalogowany'] != true){
        header('Location: ../index.php');
        exit();
    }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>To Do User Panel</title>
        <link rel="stylesheet" href="ToDoPanel.css">
        <link rel="stylesheet" href="media.css">
        <script src="https://kit.fontawesome.com/ffd1bd49a5.js" crossorigin="anonymous"></script>
    </head>
    <body>
        <section id="leftPanel">
            <p id="logo"><img src="LogoB.png"></p>
            <div id="userContainer">
                <div id="logoContainer" class="user">
                    <div id="userLogo"></div>
                </div>
                <div id="loginContainer" class="user"><p id="Username"><?php echo $_SESSION['login']?></p></div>
                <hr id="endOfProfile">
            </div>
            <div id="fileList">
                
            </div>
            <div id="LeftContainerOptions" style="height: 40px;">
                <hr id="startOfOptions">
                <i class="fa-solid fa-chevron-up" id="showArrow"></i>
                <button id="newView" class="actionBtn"><i class="fa-solid fa-file"></i>Nowy widok</button>
                <button id="new" class="actionBtn"><i class="fa-sharp fa-solid fa-plus"></i>Nowe zadanie</button>
                <button id="active" class="actionBtn"><i class="fa-sharp fa-solid fa-list"></i>Aktywne</button>
                <button id="done" class="actionBtn"><i class="fa-solid fa-square-check"></i>Ukończone</button>    
                <button id="removeViewBtn" class="actionBtn" style="display: none;"><i class="fa-sharp fa-solid fa-trash"></i>Usuń widok</button> 
                <form action="/Login/logout.php">
                    <button id="done" class="actionBtn"><i class="fa-solid fa-right-from-bracket"></i>Wyloguj</button>
                </form>                         
            </div>        
        </section>
        <section id="rightPanel">
            <div id="doneTask" style="display: none"></div>
            <div id="activeTask" style="display: block">
                <p id="emptyTaskPanel">Wybierz widok</p>
            </div>
        </section>
        <div id="newTask" style="display: none;">
            <p>Nowe zadanie</p>
            <form action="">
                <input type="text" placeholder="Tytuł" class="formElement" id="newTaskTitle">
                <textarea name="opis" id="opis" cols="40" rows="7" placeholder="Opis"  class="formElement"></textarea>
                <!-- <textarea name="kroki" id="kroki" cols="40" rows="7" placeholder="Lista kroków (każdy punkt zaczynaj od nowej linii)"  class="formElement"></textarea>                -->
            </form>
            <button value="Dodaj zadanie" id="submitBtn">Dodaj zadanie</button>
        </div>
        <div id="editTask" style="display: none;">
            <p>Edytuj zadanie</p>
            <form action="">
                <input type="text" placeholder="Tytuł" class="formElement" id="editTaskTitle">
                <textarea name="opis" cols="40" rows="7" placeholder="Opis" id="editTaskDesc"  class="formElement"></textarea>
            </form>
            <button value="Edytuj zadanie" id="submitEditBtn">Edytuj zadanie</button>
        </div>
        <div id="newViewWindow" style="display: none;">
            <input type="text" placeholder="Nazwa widoku" id="filenameField">
            <button id="setNewView">Stwórz widok</button>
        </div>
        <script src="ToDoPanel.js"></script>
        <script src="ajax.js"></script>
    </body>
</html>