<?php
  $a1 = $_GET["phone"];
  $a2 = $_GET["pwd"];
  $mysql = new mysqli("localhost","root","","aiweishikong");
  if($mysql->connect_errno){
    die($mysql->connect_errno);
  };
  $mysql->query("set names utf8");
  $sqlstr = "update userinfo set user_pwd = \"$a2\" where user_phone = \"$a1\"";
  $result = $mysql->query($sqlstr);

  echo "{\"state\":\"success\"}";



 ?>
