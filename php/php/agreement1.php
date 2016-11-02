<?php
  $a1 = $_GET["document_Name"];
  $a1 = "agreement";
  $mysql = new mysqli("localhost","root","","aiweishikong");
  if($mysql->connect_errno){
    die($mysql->connect_errno);
  };
  $mysql->query("set names utf8");
  $sqlstr = "select * from Document where Document_name =\"" . $a1 . "\"";
  $result = $mysql->query($sqlstr);

  $myArray = array();


  while($record = $result->fetch_assoc()){
    array_push($myArray,$record);
  }

  if(count($myArray) > 0){
    $b = $myArray[0]["Document_text"];
    echo json_encode($b);
  }

?>
