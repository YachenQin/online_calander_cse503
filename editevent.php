<?php
header("Content-Type: application/json");
ini_set("session.cookie_httponly", 1);
require 'database.php';
session_start();
$username=$_SESSION['username'];

if(!hash_equals($_SESSION['token'], $_POST['token'])){
    echo json_encode(array("success"=>false,
        "message"=> "Request forgery detected"
    ));
    exit();
}

$editid = (int)trim(htmlentities($_POST['id']));
$edittitle = (string)trim(htmlentities($_POST["title"]));
$editcontent = (string)trim(htmlentities($_POST["content"]));
$edittime = (string)trim(htmlentities($_POST["time"]));
$edittag= (string)trim(htmlentities($_POST["category"]));


$stmt = $mysqli->prepare("UPDATE event SET title=?, content=?, time=?, tag=? 
		WHERE eventid = ?");

if(!$stmt){

    echo json_encode(array("success"=>false,
                            "message"=>$mysqli->error
    ));
    exit();
}

$stmt->bind_param('ssssi',$edittitle,$editcontent,$edittime,$edittag,$editid);
$stmt->execute();
$stmt->close();

echo json_encode(array("success"=>true,
    "message"=>"edit successful!"
));
exit;
?>