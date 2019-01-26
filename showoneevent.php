<?php
header("Content-Type: application/json");
ini_set("session.cookie_httponly", 1);
require 'database.php';
session_start();
$username = $_SESSION['username'];
//$username = $_SESSION['userid'];
$eventid=(int)$_POST['eventid'];

$stmt = $mysqli->prepare("SELECT date,title,content,time,tag,type FROM event WHERE eventid = ?");
if(!$stmt){
    echo json_encode(array("success"=>false, "message"=>$mysqli->error));
    exit;
}

$stmt->bind_param('i',$eventid);
$stmt->execute();
$stmt->bind_result($date,$title,$content,$time,$tag,$type);
$stmt->execute();
$stmt->fetch();
$stmt->close();

echo json_encode(array(
	"success" => true,
	"title" => $title,
	"content" => $content,
	"date" => $date,
	"category" => $tag,
    "time"=> $time,
    "type"=>$type,
));

?>


