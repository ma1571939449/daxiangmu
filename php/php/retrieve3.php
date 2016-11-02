<?php
  $a1 = $_GET["phone"];
  $a2 = $_GET["pwd"];
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

  if($myArray[0]["user_pwd"] == $a2){
    echo "{\"state\":\"success\"}";
  }else{
    echo "{\"state\":\"新密码\"}";
  }


 ?>
