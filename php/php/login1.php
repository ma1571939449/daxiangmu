<?php
  $a1 = $_GET["username"];
  $a2 = $_GET["pwd"];
  $mysql = new mysqli("localhost","root","","aiweishikong");
  if($mysql->connect_errno){
    die($mysql->connect_errno);
  };
  $mysql->query("set names utf8");
  $sqlstr = "select * from userinfo where user_name =\"" . $a1 . "\"";
  $result = $mysql->query($sqlstr);

  $myArray = array();


  while($record = $result->fetch_assoc()){
    array_push($myArray,$record);
  }

  if(count($myArray) > 0){
    if($myArray[0]["user_pwd"] == $a2){
      echo "{\"state\":\"success\"}";
    }else{
      echo "{\"state\":\"密码错误\"}";
    }
  }else{
    echo "{\"state\":\"账号不存在\"}";
  }

 ?>
