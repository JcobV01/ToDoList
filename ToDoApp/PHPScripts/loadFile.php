<?php
    session_start();
    $user = $_SESSION['login'];
    $file = $_POST['file'];

    $fileContent = file_get_contents('../../UsersFolder/'.$user."/".$file.".json");

    echo $fileContent;
?>