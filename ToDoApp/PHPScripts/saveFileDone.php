<?php
    session_start();
    $user = $_SESSION['login'];
    $filename = $_POST['plik'];
    $fileContent = $_POST['zawartosc'];

    echo "Nazwa pliku: ".$filename." Zawartość ".$fileContent;

    file_put_contents('../../UsersFolder/'.$user.'/FileOfDone/'.$filename."U.json", $fileContent);
?>