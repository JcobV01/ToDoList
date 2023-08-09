<?php
    session_start();
    $user = $_SESSION['login'];
    $file = $_POST['file'];

    $fileContent = file_get_contents('../../UsersFolder/'.$user.'/FileOfDone/'.$file."U.json");

    echo $fileContent;
?>