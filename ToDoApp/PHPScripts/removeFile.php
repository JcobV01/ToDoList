<?php
    session_start();
    $file = $_POST['file'];
    $user = $_SESSION['login'];


    unlink('../../UsersFolder/'.$user."/".$file.".json");
?>