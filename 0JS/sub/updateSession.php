<?php

require_once($_SERVER['DOCUMENT_ROOT'].'/0PHP/config.php');

session_start();
$username = $_SESSION['username'];

$sql = "SELECT mail,balance,tokensGained,tokensLost,profilePicture,amountInvites FROM users WHERE username='$username'";

$result = $link->query($sql);

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo 0;
}