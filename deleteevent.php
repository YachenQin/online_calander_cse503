<?php
header("Content-Type: application/json");
ini_set("session.cookie_httponly", 1);
require 'database.php';
session_start();

$token = $_POST['token'];
$deleteeventid = (int)$_POST['eventid'];

if(!hash_equals($_SESSION['token'], $_POST['token'])){
    echo json_encode(array("success"=>false,
        "message"=> "Request forgery detected"
    ));
    exit();
}

$stmt = $mysqli->prepare("DELETE FROM event WHERE eventid = ?");

if(!$stmt){
    echo json_encode(array("success"=>false,
        "message"=>$mysqli->error));
    exit;
}
$stmt->bind_param('i',$deleteeventid);
$stmt->execute();
$stmt->close();
echo json_encode(array("success"=>true,
    "message"=>"delete succeddfully!"
));
exit;

?>