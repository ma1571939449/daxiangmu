<?php
  $a1 = $_GET["phone"];
  $a2 = $_GET["returnMessage"];
  $mysql = new mysqli("localhost","root","","aiweishikong");
  if($mysql->connect_errno){
    die($mysql->connect_errno);
  };
  $mysql->query("set names utf8");
  $sqlstr = "select * from userinfo where user_phone =\"" . $a1 . "\"";
  $result = $mysql->query($sqlstr);

  $myArray = array();


  while($record = $result->fetch_assoc()){
    array_push($myArray,$record);
  }

  if(count($myArray) > 0){
    if($myArray[0]["returnMessage"] == $a2){
      $b = $myArray[0]["user_name"];
      echo "{\"state\":\"$b\"}";
    }else{
      echo "{\"state\":\"动态密码错误\"}";
    }
  }
 ?>
