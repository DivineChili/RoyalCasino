<?php
session_start();

require_once "config.php"; /*Hente ut variablene lagret i config.php filen*/

$username = $password = "";
$username_err = $password_err = "";

if(!isset($_SESSION['firstTimeLogin'])) {
    $_SESSION['firstTimeLogin'] = FALSE;
}

/*Skjemaet som behandler informasjonen når det blir submita*/
if($_SERVER["REQUEST_METHOD"] == "POST"){

    /*Sjekke om brukernavnet er tomt*/
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter username.";
    } else{
        $username = trim($_POST["username"]);
    }

    /*Sjekke om passordet er tomt*/
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter your password.";
    } else{
        $password = trim($_POST["password"]);
    }

    /*Valider brukernavn og passord*/
    if(empty($username_err) && empty($password_err)){
        $sql = "SELECT id, username, password FROM users WHERE username = ?";

        if($stmt = mysqli_prepare($link, $sql)){
            mysqli_stmt_bind_param($stmt, "s", $param_username);

            $param_username = $username;

            if(mysqli_stmt_execute($stmt)){
                mysqli_stmt_store_result($stmt);

                /*Sjekke om brukernavnet eksisterer, hvis det gjør det skal det validere passordet*/
                if(mysqli_stmt_num_rows($stmt) == 1){
                    mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password);
                    if(mysqli_stmt_fetch($stmt)){
                        if(password_verify($password, $hashed_password)){
                            /*Hvis passordet også er korrekt skal session starte og man ledes til huben*/
                            session_start();

                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $id;
                            $_SESSION["username"] = $username;

                            $sql22 = "SELECT * FROM users WHERE id=$id";
                            $result69 = mysqli_query($link, $sql22);
                            $row2 = mysqli_fetch_assoc($result69);

                            /*Lagring av variabler*/
                            $_SESSION["mail"] = $row2['mail'];
                            $_SESSION["balance"] = $row2['balance'];
                            $_SESSION["profilePicture"] = $row2['profilePicture'];
                            $_SESSION["amountInvites"] = $row2['amountInvites'];

                            header("location: getLogin.php"); /*Alt er riktig for login og du føres til index.php*/
                        } else {
                            $password_err = "The password you entered was not valid."; /*Melding om feil passord*/
                        }
                    }
                } else{
                    $username_err = "No account found with that username."; /*Melding om at brukernavnet ikke er registrert*/
                }
            } else{
                echo "Oops! Something went wrong. Please try again later."; /*Noe gikk galt et eller annet sted*/
            }
        }

        mysqli_stmt_close($stmt);
    }

    mysqli_close($link); /*Lukking av variabler*/
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Casino Royale | Login</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <style type="text/css">
        body{ font: 14px sans-serif; }
        ._8bitBorder{ width: 350px; padding: 20px; }
    </style>
    <script src="/0JS/RoyaleSubsystem.js"></script>
</head>
<body>
<script>

    validateLogin((result, resolve) => {
        if(result) {
            resolve(true);
        } else {
            resolve(false);
        }
    }).then((promise) => {
        if(promise) window.location.replace("/0PHP/getLogin.php");
    })

</script>
<div class="wrapper" style="text-align:center;text-align-last:center; margin-left:auto;margin-right:auto">
    <h2>Login</h2>
    <p>Fill out the fields below to login.</p>
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
        <div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
            <label>Username</label>
            <input type="text" name="username" class="form-control" value="<?php echo $username; ?>"> <!-- Input felt for brukernavn -->
            <span class="help-block"><?php echo $username_err; ?></span> <!-- Feilmeldinger til brukernavn -->
        </div>
        <div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
            <label>Password</label>
            <input type="password" name="password" class="form-control"> <!-- Input felt for passord -->
            <span class="help-block"><?php echo $password_err; ?></span> <!-- Feilmeldingsfelt for passordet -->
        </div>
        <div class="form-group">
            <input type="submit" class="btn btn-primary" value="Login"> <!-- Knapp for å logge seg inn -->
        </div>
        <p>Dont you have an user? <a href="register.php" style="color:blue;">Register</a>.</p> <!-- Alternativ registrer knapp -->
    </form>
</div>
</body>
</html>
