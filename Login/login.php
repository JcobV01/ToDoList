<?php
    session_start();

    if(!isset($_POST['login']) || !isset($_POST['password'])){
        header('Location: ../index.php');
        exit();
    }

    require_once('../connect.php');

    $polaczenie = mysqli_connect($host, $databaseLogin, $databasePass, $databaseName);

    if(mysqli_connect_errno()){
        echo "Błąd połączenia z bazą danych";
        die();
    }
    else{
        $login = $_POST['login'];
        $password = $_POST['password'];

        $login = htmlentities($login, ENT_QUOTES, "UTF-8");

        $zapytanie = "SELECT * FROM users WHERE login = '$login' OR email = '$login'";

        $wynik = mysqli_query($polaczenie, $zapytanie);
        
        $tablicaWynik = mysqli_fetch_assoc($wynik);

        if(mysqli_affected_rows($polaczenie) > 0){           
            if(password_verify($password, $tablicaWynik['password'])){
                $_SESSION['zalogowany'] = true;
                $_SESSION['login'] = $tablicaWynik['login'];
                $_SESSION['email'] = $tablicaWynik['email'];
                unset($_SESSION['Error']);
            
                header('Location: ../ToDoApp/ToDoPanel.php');
            }
            else{
                $_SESSION['Error'] = '<span style="color:red">Nieprawidłowy login lub hasło</span>';
                header('Location: ../index.php');
            }      	
        }
        else{
            $_SESSION['Error'] = "<p style='color: red;' id='Error'>Nieprawidłowy login lub hasło</p>";
          	header('Location: ../index.php');
        }
    }
?>