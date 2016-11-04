var top = $("#top");
var communication_between = $("#communication_between");
var nav_links = $(".nav_links");
var nav_links_subset = nav_links.children();
var nav_line = $(".nav_line");

// -------------------------------------------------------------------------
// 头部header部分导航栏的下划线
for(var i = 0; i < nav_links_subset.length; i++) {
	nav_links_subset[i].index = i;
	$(nav_links_subset[i]).on("mouseover", function() {
		nav_line.css({
			left: 96 * (this.index) + 40 + "px"
		})
	})
}
nav_links.on("mouseleave", function() {
	nav_line.css({
		left: 40 + "px"
	})
})
//ajax函数
function requestAjax(url, callBack) {
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.send();
	request.onreadystatechange = function() {
		if(request.readyState == 4 && request.status == 200) {
			var str = request.responseText;
			var obj = JSON.parse(str);
			if(callBack) {
				callBack(obj);
			}
		}
	}
}

// --------------------------------------------------------------------------第一部分
var roll = $("#roll");
var roll_image = $(".roll_image");
var roll_list = $(".roll_list");
var roll_list_subset = roll_list.children();
var timer = null; //轮播图计时器
//轮播图，自动轮播
function nav() {
	var offY = roll_image.position().left / roll.width();
	var offLeft = Math.floor(offY) * 100;
	roll_image.css({
		left: offLeft + "%"
	})
	timer = setInterval(function() {
		offLeft -= 100;
		if(offLeft == -300) {
			offLeft = 0;
		}
		roll_image.css({
			left: offLeft + "%"
		})
		for(var i = 0; i < roll_list_subset.length; i++) {
			$(roll_list_subset[i]).removeClass();
		}
		$(roll_list_subset[-offLeft / 100]).addClass("on");
	}, 3000)
}

//移入轮播
function nav_on() {
	for(var i = 0; i < roll_list_subset.length; i++) {
		roll_list_subset[i].index = i;
		$(roll_list_subset[i]).on("mouseover", function() {
			clearInterval(timer);
			for(var j = 0; j < roll_list_subset.length; j++) {
				$(roll_list_subset[j]).removeClass();
			}
			$(this).addClass("on");
			roll_image.css({
				left: -this.index * 100 + "%"
			})
			var setTimer = setTimeout(function() {
				nav();
			}, 1000)
		})
	}
}

//移动轮播调用
nav();
//移入轮播调用
nav_on();

//--------------------------------------------------------------------第2-4部分共用部分


// --------------------------------------------------------------------------第二部分
var section2_main_box = $(".section2_main_box");
//创建标签函数
function createBYdata1(oUl,href,obj){
	for (var i = 0; i < obj.length; i++) {
			var oLi = $("<li/>");
			oUl.append(oLi);
			var a1 = $("<a href=" + href +"><img src=\"../img/" + obj[i].example_image + "\"></img></a>");
			oLi.append(a1);
			var oDiv = $("<div><a href=" + href + ">" + obj[i].example_h3 + "</a></div>");
			oLi.append(oDiv);
			var p = $("<p>" + obj[i].example_p + "</p>");
			oLi.append(p);
		}
}
//使用数据库函数：调用ajax函数  调用标签创建  调用标签样式
function myajax1 (type,num,oUl,href) {
	var url = "../../php/php/index1.php?Type=" + type + "&Num=" + num;
	requestAjax(url, function(obj) {
		createBYdata1(oUl,href,obj);
	})
}
//调用使用数据库的函数
myajax1("example_type1","1",section2_main_box,"###");
// --------------------------------------------------------------------------第三部分
var section3_main_box = $(".section3_main_box");
//创建标签函数
function createBYdata2(oUl,href,obj){
	for (var i = 0; i < obj.length; i++) {
			var oLi = $("<li/>");
			oUl.append(oLi);
			var a1 = $("<a href=" + href +"><img src=\"../img/" + obj[i].example_image + "\"></img><div></div></a>");
			oLi.append(a1);
			var oDiv = $("<div><a href=" + href + ">" + obj[i].example_h3 + "</a></div>");
			oLi.append(oDiv);
		}
}
//使用数据库函数：调用ajax函数  调用标签创建  调用标签样式
function myajax2 (type,num,oUl,href) {
	var url = "../../php/php/index1.php?Type=" + type + "&Num=" + num;
	requestAjax(url, function(obj) {
		createBYdata2(oUl,href,obj);
	})
}
//调用使用数据库的函数
myajax2("example_type1","2",section3_main_box,"###");
// --------------------------------------------------------------------------第四部分
var section4_main_box = $(".section4_main_box");
//创建标签函数
function createBYdata3(oUl,href,obj){
	for (var i = 0; i < obj.length; i++) {
			var oLi = $("<li/>");
			oUl.append(oLi);
			var a1 = $("<a href=" + href +"><img src=\"../img/" + obj[i].example_image + "\"></img></a>");
			oLi.append(a1);
			var span = $("<span style=\"background:" +  obj[i].example_span + ";\"></span>");
			oLi.append(span);
			var oDiv = $("<div><a href=" + href + ">" + obj[i].example_h3 + "</a></div>");
			oLi.append(oDiv);
			var p = $("<p>" + obj[i].example_p + "</p>");
			oLi.append(p);
		}
}
//使用数据库函数：调用ajax函数  调用标签创建  调用标签样式
function myajax3 (type,num,oUl,href) {
	var url = "../../php/php/index1.php?Type=" + type + "&Num=" + num;
	requestAjax(url, function(obj) {
		createBYdata3(oUl,href,obj);
	})
}
//调用使用数据库的函数
myajax3("example_type1","3",section4_main_box,"###");
// --------------------------------------------------------------------------第五部分
var section5_main_box = $(".section5_main_box");
//创建标签函数
function createBYdata4(oUl,href,obj){
	for (var i = 0; i < obj.length; i++) {
			var oLi = $("<li/>");
			oUl.append(oLi);
			var oDiv1 = $("<div/>");
			oLi.append(oDiv1);
			var img1 = $("<img src=\"../img/" + obj[i].example_image + "\"></img>");
			oDiv1.append(img1);
			var span = $("<span>" +  obj[i].example_span + "</span>");
			oDiv1.append(span);
			var oDiv = $("<div><a href=" + href + ">" + obj[i].example_h3 + "</a></div>");
			oDiv1.append(oDiv);
			var p = $("<p><a href=" + href + ">" + obj[i].example_p + "</a></p>");
			oDiv1.append(p);
		}
}
//使用数据库函数：调用ajax函数  调用标签创建  调用标签样式
function myajax4 (type,num,oUl,href) {
	var url = "../../php/php/index1.php?Type=" + type + "&Num=" + num;
	requestAjax(url, function(obj) {
		createBYdata4(oUl,href,obj);
	})
}
//调用使用数据库的函数
myajax4("example_type1","4",section5_main_box,"###");
// --------------------------------------------------------------------------第六部分
var section6_main_box = $(".section6_main_box");



//移入移出效果
//function liHover(li,img,img1,img2){
//	li.on("mouseover",function(){
//		img[0].src = img2;
//	})
//	li.on("mouseout",function(){
//			img[0].src = img1;
//	})
//}



//创建标签函数
function createBYdata5(oUl,obj){
	for (var i = 0; i < obj.length; i++) {
			var oLi = $("<li/>");
			oUl.append(oLi);
			var oDiv = $("<div/>");
			oLi.append(oDiv);
			var oImg1 = $("<img src=\"../img/" + obj[i].example_content + "\"></img>");
			oImg1.addClass("img1");
//			var img1 = "../img/" + obj[i].example_content;
//			var img2 = "../img/" + obj[i].example_image;
			oDiv.append(oImg1);
			var oImg2 = $("<img src=\"../img/" + obj[i].example_image + "\"></img>");
			oImg2.addClass("img2");
			oDiv.append(oImg2);
//			liHover(oLi,oImg,img1,img2);
		}
}
//使用数据库函数：调用ajax函数  调用标签创建  调用标签样式
function myajax5 (type,num,oUl) {
	var url = "../../php/php/index1.php?Type=" + type + "&Num=" + num;
	requestAjax(url, function(obj) {
		createBYdata5(oUl,obj);
	})
}
//调用使用数据库的函数
myajax5("example_type1","6",section6_main_box);









