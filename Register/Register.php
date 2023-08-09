<?php
    session_start();

    if(isset($_POST['login'])){
        $success = true;

        //error loginu:
        $RegLogin = $_POST['login'];

        if(strlen($RegLogin)<5 || strlen($RegLogin)>30){
            $success = false;
            $_SESSION['Err_Login']='<span style="color:red">Login musi zawierać od 5 do 30 znaków </span>';
        }

        if(ctype_alnum($RegLogin) == false){
            $success = false;
            $_SESSION['Err_Login']='<span style="color:red">Login może składać się tylko z liter i cyfr, bez poslskich znaków </span>';
        }

        //error emaila:

        $RegEmail = $_POST['email'];
        $RegEmailS = filter_var($RegEmail, FILTER_SANITIZE_EMAIL);

        if(filter_var($RegEmailS, FILTER_VALIDATE_EMAIL) == false || $RegEmailS!=$RegEmail){
            $success = false;
            $_SESSION['Err_Email']='<span style="color:red">Niepoprawny adres email </span>';
        }

        //error hasla:

        $RegPass1 = $_POST['password'];
        $RegPass2 = $_POST['password2'];

        if(strlen($RegPass1)<8){
            $success = false;
            $_SESSION['Err_Pass']='<span style="color:red">Hasło musi składać się z co najmniej 8 znaków </span>';
        }

        if($RegPass1!=$RegPass2){
            $success = false;
            $_SESSION['Err_Pass']='<span style="color:red">Hasła nie są identyczne </span>';
        }

        $RegPassHash = password_hash($RegPass1, PASSWORD_DEFAULT);


        //regulamin error:

        if(!isset($_POST['PPCheckbox'])){
            $success = false;
            $_SESSION['Err_Rulebook']='<span style="color:red">Zaakceptuj regulamin </span>';
        }

        //duplikaty w bazie:

        require_once "../connect.php"; 
        $pol = new mysqli($host, $databaseLogin, $databasePass, $databaseName);
            
        $kwerenda_email = $pol->query("SELECT id FROM users WHERE email ='$RegEmail'");
        $kwerenda_login = $pol->query("SELECT id FROM users WHERE login ='$RegLogin'");
       
        $emailsNR = $kwerenda_email->num_rows;
        if($emailsNR>0){
            $success = false;
            $_SESSION['Err_Email']='<span style="color:red">Email już istnieje </span>';
        }

        $LoginsNR = $kwerenda_login->num_rows;
        if($LoginsNR>0){
            $success = false;
            $_SESSION['Err_Login']='<span style="color:red">Login już istnieje </span>';
        }

        //sukces

        if($success == true){
            if($pol->query("INSERT INTO users VALUES (NULL, '$RegLogin', '$RegPassHash', '$RegEmail')")){
                $_SESSION['RegSuccess'] = true;

                mkdir("../UsersFolder/".$RegLogin, 0755);

                $_SESSION['Comment'] = '<p id="registerSuccess">Stworzono konto</p>';

                header('Location: ../index.php');
            }
            else{
                $_SESSION['Err_Register']='<span style="color:red">Nieudana próba rejestracji, spróbuj ponownie </span>';
            }
        }

        $pol->close();
    }
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ToDoList - register | WWD</title>
        <link rel="stylesheet" href="RegisterStyles.css">
        <script src="https://kit.fontawesome.com/ffd1bd49a5.js" crossorigin="anonymous"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
    </head>
    <body>
        <div id="loginContainer">
            <div id="logo">
                <img src="/ToDoApp/LogoB.png">
            </div>
            <div id="loginElements">
                <?php
                    if(isset($_SESSION['Err_Login'])){
                        echo $_SESSION['Err_Login'];
                        unset($_SESSION['Err_Login']);
                    }

                    if(isset($_SESSION['Err_Email'])){
                        echo $_SESSION['Err_Email'];
                        unset($_SESSION['Err_Email']);
                    }

                    if(isset($_SESSION['Err_Pass'])){
                        echo $_SESSION['Err_Pass'];
                        unset($_SESSION['Err_Pass']);
                    }

                    if(isset($_SESSION['Err_Rulebook'])){
                        echo $_SESSION['Err_Rulebook'];
                        unset($_SESSION['Err_Rulebook']);
                    }

                    if(isset($_SESSION['Err_reCaptcha'])){
                        echo $_SESSION['Err_reCaptcha'];
                        unset($_SESSION['Err_reCaptcha']);
                    }

                    if(isset($_SESSION['Err_Register'])){
                        echo $_SESSION['Err_Register'];
                        unset($_SESSION['Err_Register']);
                    }
                ?>
                <form id="loginForm" method="POST">
                    <input type="text" placeholder="Email" name="email" class="loginInput">
                    <input type="text" placeholder="Login" name="login" class="loginInput">
                    <input type="password" placeholder="Hasło" name="password" class="loginInput">
                    <input type="password" placeholder="Hasło" name="password2" class="loginInput">

                    <div id="ChechBoxContainer">
                        <div class="CHB" id="CHB1"><input type="checkbox" name="PPCheckbox" id="PPCheckbox"></div>
                        <div class="CHB" id="CHB2"><p>Akceptuję Regulamin i politykę prywatności <span style="color: #2a7fffff; font-weight: bold">WWD - ToDoList</span></p></div>
                    </div>
                    
                    <!-- <label id="PPCheckboxLabel"> Akceptuję Regulamin i politykę prywatności WWD - ToDoList</label> -->
                    <input type="submit" value="Zarejestruj" id="submitBtn">
                </form>
                <p>lub</p>
                <p>Wróć do <a href="../index.php" id="loginLink">strony logowania</a></p>
            </div>
        </div>
    </body>
</html>