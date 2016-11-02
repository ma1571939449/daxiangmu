<?php
  $a1 = $_GET["userphone"];
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
  $b = rand(100000,999999);
  if(count($myArray) > 0){
    $sqlstr = "update userinfo set returnMessage = \"{$b}\" where user_phone =\"" . $a1 . "\"";
    $result = $mysql->query($sqlstr);
    echo "{\"state\":\"{$b}\"}";
  }else{
    echo "{\"state\":\"账号不存在\"}";
  }

 ?>
