<?php
    session_start();
    $user = $_SESSION['login'];

    $pliki = scandir('../../UsersFolder/'.$user.'/');

    foreach ($pliki as $key => $link) {
        if(is_dir('../../UsersFolder/'.$user.'/'.$link)){
            unset($pliki[$key]);
        }
    }

    echo json_encode($pliki);
?>