var top = $("#top");
var communication_between = $("#communication_between");
var nav_links = $(".nav_links");
var nav_links_subset = nav_links.children();
var nav_line = $(".nav_line");
var roll = $("#roll");
var roll_image = $(".roll_image");
var roll_list = $(".roll_list");
var roll_list_subset = roll_list.children();
var timer = null; //轮播图计时器

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
//轮播图，自动轮播
nav_links.on("mouseleave", function() {
	nav_line.css({
		left: 40 + "px"
	})
})

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
//封装ajax函数



// --------------------------------------------------------------------------第二部分
var section2_content = $(".section2_content");
var section2_main_box = $(".section2_main_box");

//创建标签函数
function createBYdata(href,obj){
	for (var i = 0; i < obj.length; i++) {
			var oLi = $("<li/>");
			section2_main_box.append(oLi);
			var a1 = $("<a href=" + href +"><img src=\"../img/" + obj[i].example_image + "\"></img></a>");
			oLi.append(a1);
			var oDiv = $("<div><a href=" + href + "\">" + obj[i].example_h3 + "</a></div>");
			oLi.append(oDiv);
			if(obj[i].example_p){
				var p = $("<p>" + obj[i].example_p + "</p>");
				oLi.append(p);
			}
		}
}

//标签样式函数
function section2_style(){
	var oLi = section2_main_box[0].children;
	console.log(oLi);
	if($(document).width() >= 1200){
		section2_content.css({
			width:1200 + "px"
		}),
		section2_main_box.css({
			width:1260 + "px"
		})
	}else{
		section2_content.css({
			width:968 + "px"
		}),
		section2_main_box.css({
			width:1028 + "px"
		})
	}
}

//使用数据库函数：调用ajax函数  调用标签创建  调用标签样式
function myajax (type,num,href) {
	var url = "../../php/php/index1.php?Type=" + type + "&Num=" + num;
	requestAjax(url, function(obj) {
		createBYdata(href,obj);
		section2_style();
	})
}

//调用使用数据库的函数
myajax("example_type1","1","###");













