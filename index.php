<?php
    session_start();
    if(isset($_SESSION['zalogowany']) && $_SESSION['zalogowany'] == true){
        header('Location: ToDoApp/ToDoPanel.html');
        exit();
    }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ToDoList - login | WWD</title>
        <link rel="stylesheet" href="style.css">
        <script src="https://kit.fontawesome.com/ffd1bd49a5.js" crossorigin="anonymous"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
    </head>
    <body>
        <div id="loginContainer">
            <div id="logo">
                <img src="/ToDoApp/logoBiale.png">
            </div>
            <div id="loginElements">
                <form action="login.php" id="loginForm" method="POST">
                    <input type="text" placeholder="Login lub email" name="login" class="loginInput">
                    <input type="password" placeholder="Hasło" name="password" class="loginInput">
                    <input type="submit" value="Zaloguj" id="submitBtn">
                </form>
            </div>
            <p id="registerLink">Nie masz jeszcze konta? <a href="#">Stwórz je teraz!</a></p>
        </div>
    </body>
</html>