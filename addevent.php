<?php
header("Content-Type: application/json");
ini_set("session.cookie_httponly", 1);
require 'database.php';
session_start();

$username = htmlentities($_SESSION['username']);
//$userid = htmlentities($_SESSION['userid']);

if(!hash_equals($_SESSION['token'], $_POST['token'])){
    echo json_encode(array("success"=>false,
        "message"=> "Request forgery detected"
    ));
    exit();
}


$neweventtitle= htmlentities($_POST['title']);
$neweventcontent= htmlentities($_POST['content']);
$neweventtime= htmlentities($_POST['time']);
$neweventdate= (int)htmlentities($_POST['date']);
$neweventtag = htmlentities($_POST['category']);
$neweventtype = htmlentities($_POST['type']);
$newshareusername = htmlentities($_POST['shareusername']);

$stmt = $mysqli->prepare("INSERT INTO event 
(date, title, content, time, tag, username,shareusername,type) 
values (?,?,?,?,?,?,?,?)");
if(!$stmt){
    echo json_encode(array(
        "success"=>false,
        "message"=> "$mysqli->error"
    ));
    exit;
}

$stmt->bind_param('ssssssss', $neweventdate, $neweventtitle, $neweventcontent,$neweventtime,$neweventtag,$username,$newshareusername,$neweventtype);
$stmt->execute();
$stmt->close();

echo json_encode(array(
    "success"=>true,
    "message"=>"you have successully add an event $neweventdate !"
));
exit;