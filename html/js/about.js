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
		left: 136 + "px"
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
var about_banner_link1 = $(".about_banner_link1");
var about_banner_link2 = $(".about_banner_link2");
about_banner_link1.on("mouseover",function(){
	about_banner_link1.css({
		height:"100px",
		lineHeight:"100px"
	})
	about_banner_link2.css({
		height:"40px",
		lineHeight:"40px"
	})
})
about_banner_link2.on("mouseover",function(){
	about_banner_link2.css({
		height:"100px",
		lineHeight:"100px"
	})
	about_banner_link1.css({
		height:"40px",
		lineHeight:"40px"
	})
})