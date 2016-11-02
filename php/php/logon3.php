<?php
  $a1 = $_GET["usename"];
  $a2 = $_GET["phone"];
  $a3 = $_GET["pwd"];
  $mysql = new mysqli("localhost","root","","aiweishikong");
  if($mysql->connect_errno){
    die($mysql->connect_errno);
  };
  $mysql->query("set names utf8");
  $sqlstr = "insert into userinfo (user_name,user_phone,user_pwd) values (\"" . $a1 . "\",\"". $a2 ."\",\"" . $a3 . "\")";
  $result = $mysql->query($sqlstr);
  echo "{\"state\":\"success\"}";

 ?>
