<?php
$mysqli = new mysqli('localhost', 'qinyachen', 'qinyachen', 'module5group');

if($mysqli->connect_errno) {
    printf("Connection Failed: %s\n", $mysqli->connect_error);
    exit;
}
?>