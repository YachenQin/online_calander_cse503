<?php
header("Content-Type: application/json");
ini_set("session.cookie_httponly", 1);
require 'database.php';
session_start();
$username = (String)$_POST['newuser'];
$password = (String)$_POST['password'];

$stmt = $mysqli->prepare("SELECT COUNT(*) FROM username WHERE username=?");

if(!$stmt){
    echo json_encode(array(
        "success"=> false,
        "message"=> "Query Prep Failed"+$mysqli->error));
    exit;
}

$stmt->bind_param('s',$username);
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();

//check if the username has been used
if ($count == 1) {
    echo json_encode(array(
        "success"=>false,
        "message"=> "This username has been registered. Please try another one."));
    exit;
}
$stmt->close();

$user_name=strlen($username);
$pass_word=strlen($password);

//the username length should be larger than 0 and smaller than 20.
if ($user_name < 5 || $pass_word<5) {
    echo json_encode(array(
        "success"=>false,
        "message"=> "The username should be larger than 5 and the password should be larger than 5"));
    exit;
}
    //store password into sql as hashpassword
    $hashpass = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $mysqli->prepare("insert into username (username, password) values (?, ?)");
    if (!$stmt) {
        echo json_encode(array(
            "success"=>false,
            "message"=> "Query Prep Failed"+$mysqli->error));
        exit;
    }

    $stmt->bind_param('ss', $username, $hashpass);
    $stmt->execute();
    $stmt->close();


    echo json_encode(array("success"=>true, "message"=>$username));
    exit;

?>
