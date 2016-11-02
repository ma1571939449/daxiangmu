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


// 头部header部分导航栏的下划线
for (var i = 0; i < nav_links_subset.length; i++) {
	nav_links_subset[i].index = i;
	$(nav_links_subset[i]).on("mouseover",function(){
		nav_line.css({
			left:96 * (this.index) + 40 +"px"
		})
	})
}
//轮播图，自动轮播
nav_links.on("mouseleave",function(){
	nav_line.css({
		left: 40 +"px"
	})
})
function nav(){
	var offY = roll_image.position().left / roll.width();
	var offLeft = Math.floor(offY) *100;
	roll_image.css({
		left:offLeft + "%"
	})
	timer = setInterval(function(){
		offLeft -= 100;
		if(offLeft == -300){
			offLeft = 0;
		}
		roll_image.css({
			left:offLeft + "%"
		})
		for (var i = 0; i < roll_list_subset.length; i++) {
			$(roll_list_subset[i]).removeClass();
		}
		$(roll_list_subset[ - offLeft / 100]).addClass("on");
	},3000)
}


//移入轮播
function nav_on(){
	for (var i = 0; i < roll_list_subset.length; i++) {
		roll_list_subset[i].index = i;
		$(roll_list_subset[i]).on("mouseover",function(){
			clearInterval(timer);
			for (var j = 0; j < roll_list_subset.length; j++) {
				$(roll_list_subset[j]).removeClass();
			}
			$(this).addClass("on");
			roll_image.css({
				left:-this.index * 100 + "%"
			})
			var setTimer = setTimeout(function(){
				nav();
			},1000)
		})
	}
}

//移动轮播调用
nav();

//移入轮播调用
nav_on();
