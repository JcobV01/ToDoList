<?php
    session_start();
    
    $filename = $_POST['name'];
    $user = $_SESSION['login'];

    if(file_exists("../../UsersFolder/".$user."/".$filename.".json") == 1){
        echo "Widok o takiej nazwie już istnieje...";
    }
    else{
        $f = fopen("../../UsersFolder/".$user."/".$filename.".json", "w");
        fwrite($f, "{}");
        fclose($f);
    
        $fD = fopen("../../UsersFolder/".$user."/FileOfDone/".$filename."U.json", "w");
        fwrite($fD, "{}");
        fclose($fD);
    }
?>