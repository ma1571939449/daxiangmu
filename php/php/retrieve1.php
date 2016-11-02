<?php
  $a1 = rand(1,15);
  $mysql = new mysqli("localhost","root","","aiweishikong");
  if($mysql->connect_errno){
    die($mysql->connect_errno);
  };
  $mysql->query("set names utf8");
  $sqlstr1 = "select retrieve_text from retrieve where retrieve_id =\"" . $a1 . "\"";
  $result1 = $mysql->query($sqlstr1);
  $sqlstr2 = "select retrieve_img from retrieve where retrieve_id =\"" . $a1 . "\"";
  $result2 = $mysql->query($sqlstr2);


  $myArray = array();


  while($record1 = $result1->fetch_assoc()){
    array_push($myArray,$record1);
  }
  while($record2 = $result2->fetch_assoc()){
    array_push($myArray,$record2);
  }

  echo json_encode($myArray);


 ?>
