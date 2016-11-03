<?php
$a1 = $_GET["Type"];
$a2 = $_GET["Num"];
//$a1 = "example_type1";
//$a2 = "1";
$mysql = new mysqli("localhost","root","","aiweishikong");
if($mysql->connect_errno){
    die($mysql->connect_errno);
};
$mysql->query("set names utf8");
$sqlstr = "select * from example where {$a1} = \"$a2\"";
$result = $mysql->query($sqlstr);

$myArray = array();


while($record = $result->fetch_assoc()){
    array_push($myArray,$record);
}

if(count($myArray) > 0){
    echo json_encode($myArray);
}
//echo "{\"state\":\"$a1\"}";
 ?>
