var main_nav1 = document.querySelector(".main_nav1");
var main_nav2 = document.querySelector(".main_nav2");
var main_nav3 = document.querySelector(".main_nav3");
var main1 = document.querySelector("#main1");
var phone = document.querySelector("#phone");
var phone_judge = document.querySelector(".phone_judge");
var num1 = document.querySelector("#num1");
var num1_image = document.querySelector(".num1_image");
var btn_num1 = document.querySelector(".btn_num1");
var num1_judge = document.querySelector(".num1_judge");
var btn_next1 = document.querySelector(".btn_next1");
var main2 = document.querySelector("#main2");
var main2_phone_text = document.querySelector(".main2_phone_text");
var num2 = document.querySelector("#num2");
var btn_num2 = document.querySelector(".btn_num2");
var num2_judge = document.querySelector(".num2_judge");
var btn_next2 = document.querySelector(".btn_next2");
var main3_user_name_text = document.querySelector(".main3_user_name_text");
var new_pwd1 = document.querySelector("#new_pwd1");
var new_pwd1_judge1 = document.querySelector(".new_pwd1_judge1");
var new_pwd1_judge2 = document.querySelector(".new_pwd1_judge2");
var new_pwd1_judge2_text1 = document.querySelector(".new_pwd1_judge2_text1");
var new_pwd1_judge2_mark1 = document.querySelector(".new_pwd1_judge2_mark1");
var new_pwd1_judge2_text2 = document.querySelector(".new_pwd1_judge2_text2");
var new_pwd1_judge2_mark2 = document.querySelector(".new_pwd1_judge2_mark2");
var new_pwd1_judge2_text3 = document.querySelector(".new_pwd1_judge2_text3");
var new_pwd1_judge2_mark3 = document.querySelector(".new_pwd1_judge2_mark3");
var main3_success_text = document.querySelector(".main3_success_text");
var new_pwd2 = document.querySelector("#new_pwd2");
var new_pwd2_judge = document.querySelector(".new_pwd2_judge");
var btn_submit = document.querySelector(".btn_submit");
var retrieveText = null; //验证图片对应的正确字符
var bretrieveImg = null; //验证图片的图片名
var phone_number = null;//手机号记录
var timer = null;//计时器

main_nav1.style.color = "rgb(46,128,253)";
main_nav1.style.background = 'url("../img/6.png") no-repeat';

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

//随机获取一张验证码
function getImage(){
  var url = "../../php/php/retrieve1.php";
  requestAjax(url,function (obj) {
    retrieveText = obj[0].retrieve_text;
    bretrieveImg = obj[1].retrieve_img;
    num1_image.src = "../img/" + bretrieveImg;
  })
}


// 发送动态密码
function mytimer(){
  var c = 60;
  timer = setInterval(function(){
  c--;
    btn_num2.innerHTML = "重新发送(" + c + ")";
    btn_num2.disabled = true;
    if(c==0){
      btn_num2.innerHTML = "发送动态密码";
      btn_num2.disabled = false;
      clearInterval(timer);
    }
  },1000)
}

// 输入手机号
//手机号输入获取焦点
phone.onfocus = function(){
  phone_judge.style.display = "none";
}
// 手机号失去焦点
phone.onblur = function(){
  if(!(phone.value)){
    phone_judge.style.display = "inline-block";
    phone_judge.innerHTML = "请输入大陆手机号";
  }else if(!((/^[1-1][0-9]{10}$/).test(phone.value))){
    phone_judge.style.display = "inline-block";
    phone_judge.innerHTML = "请输入11位数字号码";
  }
}


//获取一张验证图片
getImage();

// 点击换一张按钮，换验证图片
btn_num1.onclick = function(){
  getImage();
}


// 输入验证码
//验证码输入获取焦点
num1.onfocus = function(){
  num1_judge.style.display = "none";
}
// 验证码失去焦点
num1.onblur = function(){
  if(!(num1.value)){
    num1_judge.style.display = "inline-block";
    num1_judge.innerHTML = "请输入验证码";
  }else if(num1.value != retrieveText){
    num1_judge.style.display = "inline-block";
    num1_judge.innerHTML = "验证码错误";
  }
}

//点击下一步，判断手机号格式是否正确，是否已经注册，验证码是否正确
btn_next1.onclick = function(){
  if(!(num1.value)){
    num1_judge.style.display = "inline-block";
    num1_judge.innerHTML = "请输入验证码";
  }
  if(!(phone.value)){
    phone_judge.style.display = "inline-block";
    phone_judge.innerHTML = "请输入大陆手机号";
  }else if(!((/^[1-1][0-9]{10}$/).test(phone.value))){
    phone_judge.style.display = "inline-block";
    phone_judge.innerHTML = "请输入11位数字号码";
  }else if(!(num1.value)){
    num1_judge.style.display = "inline-block";
    num1_judge.innerHTML = "请输入验证码";
  }else if(num1.value != retrieveText){
    num1_judge.style.display = "inline-block";
    num1_judge.innerHTML = "验证码错误";
  }else{
    var url = "../../php/php/logon2.php?phone=" + phone.value;
    requestAjax(url,function (obj) {
      if (obj.state=='success') {
        main2_phone_text.innerHTML = phone.value.substr(0,3) + "******" + phone.value.substr(9,2);
        phone_number = phone.value;
        phone.value = null;
        num1.value = null;
        getImage();
        main1.style.display = "none";
				main_nav1.style.color = "#000";
				main_nav1.style.background = null;
        main2.style.display = "block";
				main_nav2.style.color = "rgb(46,128,253)";
				main_nav2.style.background = 'url("../img/7.png") no-repeat';
        main3.style.display = "none";
				main_nav3.style.color = "#000";
				main_nav3.style.background = null;

      }else{
        phone_judge.style.display = "inline-block";
        phone_judge.innerHTML = "此手机号没有注册";
      }
    })
  }
}


// 点击，判断并获取动态密码
btn_num2.onclick = function(){
  var url = "../../php/php/login2.php?userphone=" + phone_number;
  requestAjax(url,function (obj) {
    if(!(obj.state == "账号不存在")){
      num2_judge.style.display = "inline-block";
      num2_judge.innerHTML = obj.state;
      mytimer();
    }
  })
}
btn_next2.onclick = function(){
  if(!(num2.value)){
    num2_judge.style.display = "inline-block";
    num2_judge.innerHTML = "请输入动态密码";
	}else if(!((/^[0-9]{6}$/).test(num2.value))){
    num2_judge.style.display = "inline-block";
    num2_judge.innerHTML = "请输入6为数字动态密码";
	}else{
		var url = "../../php/php/retrieve2.php?phone=" + phone_number + "&returnMessage=" + num2.value;
    requestAjax(url,function (obj) {
      if (obj.state!="动态密码错误") {
        num2_judge.style.display = "none";
        main2_phone_text.innerHTML = null;
        num2.value = null;
				main1.style.display = "none";
				main_nav1.style.color = "#000";
				main_nav1.style.background = null;
        main2.style.display = "none";
				main_nav2.style.color = "#000";
				main_nav2.style.background = null;
        main3.style.display = "block";
				main_nav3.style.color = "rgb(46,128,253)";
				main_nav3.style.background = 'url("../img/8.png") no-repeat';
        if(timer){
          clearInterval(timer);
          btn_num2.disabled = true;
          btn_num2.innerHTML = "发送动态密码"
        }
				main3_user_name_text.innerHTML = obj.state;
      }else{
        num2_judge.innerHTML = obj.state;
      }
    })
	}
}


//输入并判断密码格式是否正确，是否已存在
// 密码焦点事件
new_pwd1.onfocus = function(){
	main3_success_text.style.display = "none";
  new_pwd1_judge1.style.display = "none";
	new_pwd1_judge1.judge = false;
  new_pwd1_judge2.style.display = "inline-block";
}
// 写入判断密码格式是否正确
new_pwd1.oninput = function(){
  if(!(new_pwd1.value)){
    new_pwd1_judge2_mark1.style.background = "url(../img/5.png) -83px -113px no-repeat";
    new_pwd1_judge2_mark2.style.background = "url(../img/5.png) -83px -113px no-repeat";
    new_pwd1_judge2_mark3.style.background = "url(../img/5.png) -83px -113px no-repeat";
    new_pwd1_judge2_text1.style.color = "#666";
    new_pwd1_judge2_text2.style.color = "#666";
    new_pwd1_judge2_text3.style.color = "#666";
    new_pwd1_judge2_mark1.judge = false;
    new_pwd1_judge2_mark2.judge = false;
    new_pwd1_judge2_mark3.judge = false;
  }else{
    new_pwd1_judge2_mark1.style.background = "url(../img/5.png) -82px -130px no-repeat";
    new_pwd1_judge2_mark2.style.background = "url(../img/5.png) -82px -130px no-repeat";
    new_pwd1_judge2_mark3.style.background = "url(../img/5.png) -82px -130px no-repeat";
    new_pwd1_judge2_text1.style.color = "#666";
    new_pwd1_judge2_text2.style.color = "#666";
    new_pwd1_judge2_text3.style.color = "#666";
    new_pwd1_judge2_mark1.judge = true;
    new_pwd1_judge2_mark2.judge = true;
    new_pwd1_judge2_mark3.judge = true;
    if(!((/^.{6,14}$/).test(new_pwd1.value))){
      new_pwd1_judge2_mark1.style.background = "url(../img/5.png) -82px -146px no-repeat";
      new_pwd1_judge2_mark1.judge = false;
      new_pwd1_judge2_text1.style.color = "#fc4343";
    }
    if(!((/^\w*$/).test(new_pwd1.value))){
      new_pwd1_judge2_mark2.style.background = "url(../img/5.png) -82px -146px no-repeat";
      new_pwd1_judge2_mark2.judge = false;
      new_pwd1_judge2_text2.style.color = "#fc4343";
    }
    if(/[ ]/.test(new_pwd1.value)){
      new_pwd1_judge2_mark3.style.background = "url(../img/5.png) -82px -146px no-repeat";
      new_pwd1_judge2_mark3.judge = false;
      new_pwd1_judge2_text3.style.color = "#fc4343";
    }
  }
}




// 密码失去焦点事件
new_pwd1.onblur = function(){
	if(!(new_pwd1.value)){
    new_pwd1_judge1.style.display = "inline-block";
		new_pwd1_judge1.innerHTML = "请填写密码";
		new_pwd1_judge2.style.display = "none";
	}else if(new_pwd1_judge2_mark1.judge && new_pwd1_judge2_mark2.judge && new_pwd1_judge2_mark3.judge){
    new_pwd1_judge2.style.display = "none";
		var url = "../../php/php/retrieve3.php?phone=" + phone_number + "&pwd=" + new_pwd1.value;
    requestAjax(url,function (obj) {
      if (obj.state=="success") {
      	new_pwd1_judge1.style.display = "inline-block";
				new_pwd1_judge1.innerHTML = "新旧密码相同，请重新填写";
      }else{
				new_pwd1_judge1.judge = true;
	      new_pwd1_judge1.style.display = "none";
      }
    })
  }
}
//输入并判断两次输入密码是否相同
// 确认密码焦点事件
new_pwd2.onfocus = function(){
	main3_success_text.style.display = "none";
  new_pwd2_judge.style.display = "none";
	new_pwd2_judge.judge = false;
}
// 确认密码失去焦点事件
new_pwd2.onblur = function(){
	if(!(new_pwd2.value)){
    new_pwd2_judge.style.display = "inline-block";
		new_pwd2_judge.innerHTML = "请输入确认码";
	}else if(new_pwd2.value != new_pwd1.value){
    new_pwd2_judge.style.display = "inline-block";
		new_pwd2_judge.innerHTML = "确认码与新密码不同，请重新输入";
  }else{
    new_pwd2_judge.style.display = "none";
	}
}
//提交修改后的密码给数据库
btn_submit.onclick = function(){
	main3_success_text.style.display = "none";
	if(!(new_pwd1.value)){
    new_pwd1_judge1.style.display = "inline-block";
		new_pwd1_judge1.innerHTML = "请填写密码";
		new_pwd1_judge2.style.display = "none";
	}
	if(!(new_pwd2.value)){
    new_pwd2_judge.style.display = "inline-block";
		new_pwd2_judge.innerHTML = "请输入确认码";
	}else if(new_pwd2.value != new_pwd1.value){
    new_pwd2_judge.style.display = "inline-block";
		new_pwd2_judge.innerHTML = "确认码与新密码不同，请重新输入";
  }else if(new_pwd2.value == new_pwd1.value && new_pwd1_judge1.judge == true){
    new_pwd2_judge.style.display = "none";
		var url = "../../php/php/retrieve4.php?phone=" + phone_number + "&pwd=" + new_pwd1.value;
    requestAjax(url,function (obj) {
      if (obj.state=="success") {
      	main3_success_text.style.display = "inline-block";
				new_pwd1.value = null;
				new_pwd2.value = null;
      }
    })
	}
}
