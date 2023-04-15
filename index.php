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
    </head>
    <body>
        <div id="loginContainer">
            <div id="logo">

            </div>
            <div id="loginElements">
                <form action="login.php" id="loginForm" method="POST">
                    <input type="text" placeholder="Login lub email">
                    <input type="password" placeholder="Hasło">
                </form>
            </div>
        </div>
    </body>
</html>