<?php
    session_start();

    if(!isset($_POST['login']) || !isset($_POST['password'])){
        header('Location: index.php');
        exit();
    }

    require_once('connect.php');

    $polaczenie = mysqli_connect($host, $databaseLogin, $databasePass, $databaseName);

    if(mysqli_connect_errno()){
        echo "Błąd połączenia z bazą danych";
        die();
    }
    else{
        $login = mysqli_real_escape_string($polaczenie, $_POST['login']);
        $password = mysqli_real_escape_string($polaczenie, $_POST['password']);

        $login = htmlentities($login, ENT_QUOTES, "UTF-8");

        $zapytanie = "SELECT * FROM users WHERE login = '$login' AND password = '$password'";

        $wynik = mysqli_query($polaczenie, $zapytanie);

        if(mysqli_affected_rows($polaczenie) > 0){
            echo "User istnieje";
        }
        else{
            echo "Ni ma takiego";
        }

        // $tablica_wyniku = mysqli_fetch_assoc($wynik);

        // echo $tablica_wyniku['login'];

        // $wynik = mysqli_query()
    }
?>