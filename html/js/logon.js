var pass_text = document.querySelector(".pass_text");
var pass_marks = document.querySelector(".pass_marks");
var logon_Name = document.querySelector("#logon_Name");
var name_mark = document.querySelector(".name_mark");
var logon_name_judge = document.querySelector(".logon_name_judge");
var phone = document.querySelector("#phone");
var phone_mark = document.querySelector(".phone_mark");
var logon_phone_judge = document.querySelector(".logon_phone_judge");
var num = document.querySelector("#num");
var num_mark = document.querySelector(".num_mark");
var logon_num_judge = document.querySelector(".logon_num_judge");
var pwd = document.querySelector("#pwd");
var pwd_mark = document.querySelector(".pwd_mark");
var arrow = document.querySelector(".arrow");
var logon_pwd_judge = document.querySelector(".logon_pwd_judge");
var logon_pwd_judge_text1 = document.querySelector(".logon_pwd_judge_text1");
var logon_pwd_judge_mark1 = document.querySelector(".logon_pwd_judge_mark1");
var logon_pwd_judge_text2 = document.querySelector(".logon_pwd_judge_text2");
var logon_pwd_judge_mark2 = document.querySelector(".logon_pwd_judge_mark2");
var logon_pwd_judge_text3 = document.querySelector(".logon_pwd_judge_text3");
var logon_pwd_judge_mark3 = document.querySelector(".logon_pwd_judge_mark3");
var check = document.querySelector("#check");
var btn_logon = document.querySelector("#btn_logon");


function requestAjax(url,callBack){
	var request = new XMLHttpRequest();
	request.open("GET",url,true);
	request.send();
	request.onreadystatechange = function(){
		if (request.readyState == 4 && request.status == 200) {
			var str = request.responseText;
			var obj = JSON.parse(str);
			if (callBack) {
				callBack(obj);
			}
		}
	}
}


// 判断用户名字符数或汉字数
function user_name(){
	var reg = /[\u4e00-\u9fa5]{1}/g;
	var str = logon_Name.value;
	var m = 0;
	for (var i = 0; i < str.length; i++) {
		if (reg.exec(str)){
			m++;
		}else{
			break;
		}
	}
	var reg1 = /\w{1}/g
	var str1 = logon_Name.value;
	var n = 0;
	for (var i = 0; i < str1.length; i++) {
		if (reg1.exec(str1)){
			n++;
		}else{
			break;
		}
	}
	return (2 * m + n) ;
}
//输入并判断用户名格式是否正确，是否已存在
// 用户名焦点事件
logon_Name.onfocus = function(){
  pass_marks.style.display = "none";
	btn_logon.judge = false;
  name_mark.judge = false;
	logon_name_judge.style.display = "inline-block";
  name_mark.style.display = "none";
  logon_name_judge.style.lineHeight = "16px";
	logon_name_judge.innerHTML = "设置后不可更改<br>中英文均可，最长14个英文或7个汉字";
  logon_name_judge.style.color = "#666";
}
// 用户名失去焦点事件
logon_Name.onblur = function(){
	if(!(logon_Name.value)){
    name_mark.style.display = "none";
		logon_name_judge.style.display = "none";
	}else{
  	name_mark.style.display = "inline-block";
    logon_name_judge.style.lineHeight = "32px";
    if(!((/^[0-9a-zA-Z_\u4e00-\u9fa5]*$/).test(logon_Name.value))){
  		name_mark.style.background = "url(../img/5.png) -80px -22px no-repeat";
  		logon_name_judge.style.display = "inline-block";
  		logon_name_judge.innerHTML = "账号格式不正确,请重新输入";
      logon_name_judge.style.color = "#fc4343";
  	}else if(user_name() > 14 ){
  		name_mark.style.background = "url(../img/5.png) -80px -22px no-repeat";
  		logon_name_judge.style.display = "inline-block";
  		logon_name_judge.innerHTML = "请输入最多14个字符或最多7个汉字";
      logon_name_judge.style.color = "#fc4343";
  	}else{
      var url = "../../php/php/logon1.php?username=" + logon_Name.value;
      requestAjax(url,function (obj) {
        if (obj.state=='success') {
      		name_mark.style.background = "url(../img/5.png) -80px -22px no-repeat";
      		logon_name_judge.style.display = "inline-block";
          logon_name_judge.innerHTML = "此账号已存在";
          logon_name_judge.style.color = "#fc4343";
        }else{
      		name_mark.style.background = "url(../img/5.png) -80px 2px no-repeat";
          logon_name_judge.style.display = "none";
          name_mark.judge = true;
        }
      })
    }
  }
}
//输入并判断手机号格式是否正确，是否已存在
// 手机号焦点事件
phone.onfocus = function(){
  pass_marks.style.display = "none";
	btn_logon.judge = false;
  phone_mark.judge = false;
	logon_phone_judge.style.display = "inline-block";
  phone_mark.style.display = "none";
  logon_phone_judge.innerHTML = "请输入中国大陆手机号";
  logon_phone_judge.style.color = "#666";
  num_mark.style.display = "none";
	logon_num_judge.innerHTML = null;
  num.value = null;
}
// 手机号失去焦点事件
phone.onblur = function(){
	if(!(phone.value)){
    phone_mark.style.display = "none";
		logon_phone_judge.style.display = "none";
	}else{
  	phone_mark.style.display = "inline-block";
    if(!((/^[1-1][0-9]{10}$/).test(phone.value))){
  		phone_mark.style.background = "url(../img/5.png) -80px -22px no-repeat";
  		logon_phone_judge.style.display = "inline-block";
  		logon_phone_judge.innerHTML = "请输入11位数字号码";
      logon_phone_judge.style.color = "#fc4343";
  	}else{
      var url = "../../php/php/logon2.php?phone=" + phone.value;
      requestAjax(url,function (obj) {
        if (obj.state=='success') {
      		phone_mark.style.background = "url(../img/5.png) -80px -22px no-repeat";
      		logon_phone_judge.style.display = "inline-block";
          logon_phone_judge.innerHTML = "此手机号已绑定账户";
          logon_phone_judge.style.color = "#fc4343";
        }else{
      		phone_mark.style.background = "url(../img/5.png) -80px 2px no-repeat";
          logon_phone_judge.style.display = "none";
          logon_num_judge.style.display = "inline-block";
          logon_num_judge.innerHTML = obj.state;
          var date = new Date();
          date.setTime(date.getTime() + 1000 * 60 * 30);
          document.cookie = "num=" + obj.state + ";expires=" + date.toGMTString();
          phone_mark.judge = true;
        }
      })
    }
  }
}
//输入并判断验证码格式是否正确，是否已存在
// 验证码焦点事件
num.onfocus = function(){
  pass_marks.style.display = "none";
	btn_logon.judge = false;
  num_mark.judge = false;
	logon_num_judge.style.display = "inline-block";
  num_mark.style.display = "none";
  if(logon_num_judge.innerHTML == "请输入6位数字验证码"){
    logon_num_judge.innerHTML = "请输入验证码";
  }
  logon_num_judge.style.color = "#666";
}
// 验证码失去焦点事件
num.onblur = function(){
	if(!(num.value)){
    num_mark.style.display = "none";
		logon_num_judge.style.display = "none";
	}else{
  	num_mark.style.display = "inline-block";
    if(!((/^[0-9]{6}$/).test(num.value))){
  		num_mark.style.background = "url(../img/5.png) -80px -22px no-repeat";
  		logon_num_judge.style.display = "inline-block";
  		logon_num_judge.innerHTML = "请输入6位数字验证码";
      logon_num_judge.style.color = "#fc4343";
  	}else{
      if(document.cookie){
        var a = document.cookie.split(";");
        if(a.length > 0){
          for(var i = 0; i < a.length; i++){
        		a[i] = a[i].replace(" ","");
            if(a[i].split("=")[0] == "num"){
              var cookie_num = a[i].split("=")[1];
            }
          }
          if(cookie_num == null){
            num_mark.style.background = "url(../img/5.png) -80px -22px no-repeat";
            logon_num_judge.style.display = "inline-block";
            logon_num_judge.innerHTML = "您还没获取验证码";
            logon_num_judge.style.color = "#fc4343";
          }else if (num.value == cookie_num) {
        		num_mark.style.background = "url(../img/5.png) -80px 2px no-repeat";
            logon_num_judge.style.display = "none";
            num_mark.judge = true;
          }else{
            num_mark.style.background = "url(../img/5.png) -80px -22px no-repeat";
            logon_num_judge.style.display = "inline-block";
            logon_num_judge.innerHTML = "验证码错误";
            logon_num_judge.style.color = "#fc4343";
          }
        }else{
          num_mark.style.background = "url(../img/5.png) -80px -22px no-repeat";
          logon_num_judge.style.display = "inline-block";
          logon_num_judge.innerHTML = "您还没获取验证码";
          logon_num_judge.style.color = "#fc4343";
        }
      }else{
        num_mark.style.background = "url(../img/5.png) -80px -22px no-repeat";
        logon_num_judge.style.display = "inline-block";
        logon_num_judge.innerHTML = "您还没获取验证码";
        logon_num_judge.style.color = "#fc4343";
      }
    }
  }
}
//输入并判断密码格式是否正确，是否已存在
// 密码焦点事件
pwd.onfocus = function(){
  pass_marks.style.display = "none";
	btn_logon.judge = false;
	pwd_mark.style.width = "0px";
  pwd_mark.judge = false;
  arrow.style.display = "inline-block";
	logon_pwd_judge.style.display = "inline-block";
  pwd_mark.style.display = "none";
}
// 写入判断密码格式是否正确
pwd.oninput = function(){
  if(!(pwd.value)){
    logon_pwd_judge_mark1.style.background = "url(../img/5.png) -83px -113px no-repeat";
    logon_pwd_judge_mark2.style.background = "url(../img/5.png) -83px -113px no-repeat";
    logon_pwd_judge_mark3.style.background = "url(../img/5.png) -83px -113px no-repeat";
    logon_pwd_judge_text1.style.color = "#666";
    logon_pwd_judge_text2.style.color = "#666";
    logon_pwd_judge_text3.style.color = "#666";
    logon_pwd_judge_mark1.judge = false;
    logon_pwd_judge_mark2.judge = false;
    logon_pwd_judge_mark3.judge = false;
  }else{
    logon_pwd_judge_mark1.style.background = "url(../img/5.png) -82px -130px no-repeat";
    logon_pwd_judge_mark2.style.background = "url(../img/5.png) -82px -130px no-repeat";
    logon_pwd_judge_mark3.style.background = "url(../img/5.png) -82px -130px no-repeat";
    logon_pwd_judge_text1.style.color = "#666";
    logon_pwd_judge_text2.style.color = "#666";
    logon_pwd_judge_text3.style.color = "#666";
    logon_pwd_judge_mark1.judge = true;
    logon_pwd_judge_mark2.judge = true;
    logon_pwd_judge_mark3.judge = true;
    if(!((/^.{6,14}$/).test(pwd.value))){
      logon_pwd_judge_mark1.style.background = "url(../img/5.png) -82px -146px no-repeat";
      logon_pwd_judge_mark1.judge = false;
      logon_pwd_judge_text1.style.color = "#fc4343";
    }
    if(!((/^\w*$/).test(pwd.value))){
      logon_pwd_judge_mark2.style.background = "url(../img/5.png) -82px -146px no-repeat";
      logon_pwd_judge_mark2.judge = false;
      logon_pwd_judge_text2.style.color = "#fc4343";
    }
    if(/[ ]/.test(pwd.value)){
      logon_pwd_judge_mark3.style.background = "url(../img/5.png) -82px -146px no-repeat";
      logon_pwd_judge_mark3.judge = false;
      logon_pwd_judge_text3.style.color = "#fc4343";
    }
  }
}
// 密码失去焦点事件
pwd.onblur = function(){
	if(!(pwd.value)){
    arrow.style.display = "none";
		logon_pwd_judge.style.display = "none";
    pwd_mark.style.display = "none";
	}else if(logon_pwd_judge_mark1.judge && logon_pwd_judge_mark2.judge && logon_pwd_judge_mark3.judge){
    arrow.style.display = "none";
    logon_pwd_judge.style.display = "none";
    pwd_mark.style.display = "inline-block";
    pwd_mark.style.background = "url(../img/5.png) -80px 2px no-repeat";
    pwd_mark.judge = true;
  }
}

//注册点击事件
btn_logon.onclick = function(){
	if(!(logon_Name.value)){
		name_mark.style.display = "inline-block";
    logon_name_judge.style.lineHeight = "32px";
		name_mark.style.background = "url(../img/5.png) -80px -22px no-repeat";
		logon_name_judge.style.display = "inline-block";
		logon_name_judge.innerHTML = "请输入账号";
    logon_name_judge.style.color = "#fc4343";
	}
	if(!(phone.value)){
		phone_mark.style.display = "inline-block";
		phone_mark.style.background = "url(../img/5.png) -80px -22px no-repeat";
		logon_phone_judge.style.display = "inline-block";
		logon_phone_judge.innerHTML = "请输入手机号";
    logon_phone_judge.style.color = "#fc4343";
	}
	if(!(num.value)){
		num_mark.style.display = "inline-block";
		num_mark.style.background = "url(../img/5.png) -80px -22px no-repeat";
		logon_num_judge.style.display = "inline-block";
		logon_num_judge.innerHTML = "请输入验证码";
    logon_num_judge.style.color = "#fc4343";
	}
	if(!(pwd.value)){
		pwd_mark.style.display = "inline-block";
		pwd_mark.style.background = "url(../img/5.png) -80px -22px no-repeat";
		pwd_mark.style.width = "200px";
	}
  if(btn_logon.judge){
    pass_marks.style.display = "none";
    btn_logon.judge = false;
  }
  if(name_mark.judge && phone_mark.judge && num_mark.judge && pwd_mark.judge && check.checked){
		var url='../../php/php/logon3.php?usename='+logon_Name.value+'&pwd='+pwd.value + '&phone=' + phone.value;
      requestAjax(url,function (obj) {
        if (obj.state=='success') {
					pass_marks.style.display = "inline-block";
			    name_mark.judge = false;
			    phone_mark.judge = false;
			    num_mark.judge = false;
			    pwd_mark.judge = false;
			    logon_Name.value = null;
			    phone.value = null;
			    num.value = null;
			    pwd.value = null;
			    name_mark.style.display = "none";
			    phone_mark.style.display = "none";
			    num_mark.style.display = "none";
			    pwd_mark.style.display = "none";
			    btn_logon.judge = true;
        }
    })
  }
}
