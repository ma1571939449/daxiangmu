<?php
  $a1 = $_GET["username"];
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
      echo "{\"state\":\"success\"}";
  }else{
    echo "{\"state\":\"此账号可以注册\"}";
  }

 ?>
