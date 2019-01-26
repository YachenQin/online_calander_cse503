<?php
header("Content-Type: application/json");
ini_set("session.cookie_httponly", 1);
require 'database.php';
session_start();
$username = $_POST['username'];
$pwd_guess = $_POST['password'];

if( !preg_match('/^[\w_\.\-]+$/', $username) ){
	echo json_encode(array(
		"success" => false,
		"message" => "Invalid username"
	));
	exit;
}

if( !preg_match('/^[\w_\.\-]+$/', $pwd_guess) ){
	echo json_encode(array(
		"success" => false,
		"message" => "Invalid Password"
	));
	exit;
}


$stmt = $mysqli->prepare("SELECT COUNT(*), userid, password FROM username WHERE username=?");
$stmt->bind_param('s', $username);

$stmt->execute();

$stmt->bind_result($cnt, $userid, $pwd_hash);
$stmt->fetch();

if($cnt == 1 && password_verify($pwd_guess, $pwd_hash)){
    $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));
    $_SESSION['username'] = $username;
    $_SESSION['userid'] = $userid;
    echo json_encode(array(
        "success" => true,
        "username" => $_SESSION['username'],
        "token"=> $_SESSION['token']
        ));
    exit;
}
else{
    echo json_encode(array(
        "success"=>false,
        "message"=> "Incorrect Username or Password"));
    exit;
}

?>