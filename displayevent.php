<?php
header("Content-Type: application/json");
ini_set("session.cookie_httponly", 1);
require 'database.php';
session_start();

if(!isset($_SESSION['username'])){
    $a="public";
    $username="null";
}

else{
  $username = $_SESSION['username'];
  $a="public";
}


$stmt = $mysqli->prepare("SELECT distinct(eventid), date, title, content, Time, tag FROM event WHERE username = ? or shareusername = ? or type = ?");
if(!$stmt){
    echo json_encode(array("success"=>false, "message"=>$mysqli->error));
    exit;
}

$stmt->bind_param('sss',$username,$username,$a);

$stmt->execute();
$stmt->bind_result($eventid,$date,$title,$content,$eventtime,$tag);
$nums=0;

$output=array();
while($stmt->fetch()){
    array_push($output,
               array("eventid"=>$eventid,
                     "event_date"=>$date,
                     "title"=>$title,
                     "category"=>$tag,
                     "event_time"=>$eventtime,
	));
}
$stmt->close();
echo json_encode(array(
	"success" => true,
	"events" => $output
));
exit;
?>


