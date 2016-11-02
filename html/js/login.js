var login_name = document.querySelector("#login_name");
var login_phone = document.querySelector("#login_phone");
var phonePass = document.querySelector(".phonePass");
var namePass = document.querySelector(".namePass");
var username = document.querySelector("#name");
var pwd = document.querySelector("#pwd");
var n_btn = document.querySelector(".n_btn");
var n_back = document.querySelector(".n_back");
var login_title = document.querySelector(".login_title");
var phone = document.querySelector("#phone");
var returnMessage = document.querySelector("#returnMessage");
var p_send = document.querySelector(".p_send");
var p_btn = document.querySelector(".p_btn");
var p_back = document.querySelector(".p_back");
var check_box = document.querySelector("#checkbox");
var timer = null;

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

// 自动登录
function auto_login(){
	if(document.cookie){
		var a = document.cookie.split(";");
		if(a.length > 0){
			for(var i = 0; i < a.length; i++){
				a[i] = a[i].replace(" ","");
		    if(a[i].split("=")[0] == "userName"){
		      username.value = a[i].split("=")[1];
		    }
				if(a[i].split("=")[0] == "Pwd"){
		      pwd.value = a[i].split("=")[1];
		    }
		  }
		}
	}
  
  if(username.value && pwd.value){
    var url = "../../php/php/login1.php?username=" + username.value + "&pwd=" + pwd.value;
    requestAjax(url,function (obj) {
      if (obj.state=='success') {
        var date = new Date();
        date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * 7);
        if(check_box.checked){
          document.cookie = "userName=" + username.value + ";expires=" + date.toGMTString();
          document.cookie = "Pwd=" + pwd.value + ";expires=" + date.toGMTString();
        }else{
          document.cookie = "userName=;expires=" + date.toGMTString();
          document.cookie = "Pwd=;expires=" + date.toGMTString();
        }
        n_back.innerHTML = "登录成功";
        // location.assign("../../10.12/html/xiezi.html");
      }else{
        n_back.innerHTML = obj.state;
      }
    })
  }
}

auto_login();





// 判断用户名字符数或汉字数
function user_name(){
	var reg = /[\u4e00-\u9fa5]{1}/g;
	var str = username.value;
	var m = 0;
	for (var i = 0; i < str.length; i++) {
		if (reg.exec(str)){
			m++;
		}else{
			break;
		}
	}
	var reg1 = /\w{1}/g
	var str1 = username.value;
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

// 发送动态密码
function mytimer(){
  if(timer){
    clearInterval(timer);
  }
  var c = 60;
  timer = setInterval(function(){
  c--;
    p_send.innerHTML = "重新发送(" + c + ")";
    p_send.disabled = true;
    if(c==0){
      p_send.innerHTML = "发送动态密码"
      p_send.disabled = false;
      clearInterval(timer);
    }
  },1000)
}


// 点击进入短信登录界面
phonePass.onclick = function(){
  login_name.style.display = "none";
  login_phone.style.display = "block";
  login_title.innerHTML = "短信登录";
  n_back.innerHTML = "";
  username.value = "";
  pwd.value = "";
  login_name.style.animation = "rock 1.5s linear 1";
}

// 点击进入短账号登录界面
namePass.onclick = function(){
  login_name.style.display = "block";
  login_phone.style.display = "none";
  login_title.innerHTML = "爱维时空账号登录"
  p_back.innerHTML = "";
  if(timer){
    clearInterval(timer);
  }
  phone.value = "";
  returnMessage.value = "";
  p_send.innerHTML = "发送动态密码"
  login_phone.style.animation = "rock 1.5s linear 1";
}


//点击，判断并实现账号登录
n_btn.onclick = function(){
	if(!(username.value)){
    n_back.innerHTML = "请输入账号";
	}else if(!((/^[0-9a-zA-Z_\u4e00-\u9fa5]*$/).test(username.value))){
    n_back.innerHTML = "账号格式不正确，请重新输入";
	}else if(user_name() > 14 ){
    n_back.innerHTML = "请输入最多14个字符(数字、大小写字母、下滑线)或最多7个汉字";
	}else if(!(pwd.value)){
    n_back.innerHTML = "请输入密码";
	}else if(!((/^\w{6,12}$/).test(pwd.value))){
    n_back.innerHTML = "密码格式不正确，请重新输入";
	}else{
		var url = "../../php/php/login1.php?username=" + username.value + "&pwd=" + pwd.value;
    requestAjax(url,function (obj) {
      if (obj.state=='success') {
        var date = new Date();
        date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * 7);
        if(check_box.checked){
          document.cookie = "userName=" + username.value + ";expires=" + date.toGMTString();
          document.cookie = "Pwd=" + pwd.value + ";expires=" + date.toGMTString();
        }else{
          document.cookie = "userName=;expires=" + date.toGMTString();
          document.cookie = "Pwd=;expires=" + date.toGMTString();
        }
        n_back.innerHTML = "登录成功";
        // location.assign("../../10.12/html/xiezi.html");
      }else{
        n_back.innerHTML = obj.state;
      }
    })
	}
}


// 点击，判断并获取动态密码
p_send.onclick = function(){
  if(!(phone.value)){
    p_back.innerHTML = "请输入手机号";
  }else if(!((/^[1-1][0-9]{10}$/).test(phone.value))){
    p_back.innerHTML = "手机号格式错误，请重新输入";
  }else{
    var url = "../../php/php/login2.php?userphone=" + phone.value;
    requestAjax(url,function (obj) {
        p_back.innerHTML = obj.state;
        if(!(obj.state == "账号不存在")){
          mytimer();
        }
    })
  }
}

// 点击，判断并实现短信登录
p_btn.onclick = function(){
  console.log(pwd.value);
  if(!(phone.value)){
    p_back.innerHTML = "请输入手机号";
  }else if(!((/^[1-1][0-9]{10}$/).test(phone.value))){
    p_back.innerHTML = "请输入11位数字号码";
  }else if(!(returnMessage.value)){
    p_back.innerHTML = "请输入动态密码";
	}else if(!((/^[0-9]{6}$/).test(returnMessage.value))){
    p_back.innerHTML = "请输入6为数字动态密码";
	}else{
		var url = "../../php/php/login3.php?phone=" + phone.value + "&returnMessage=" + returnMessage.value;
    requestAjax(url,function (obj) {
      if (obj.state=='success') {
        p_back.innerHTML = "登录成功";
        // location.assign("../../10.12/html/xiezi.html");
      }else{
        p_back.innerHTML = obj.state;
      }
    })
	}
}
