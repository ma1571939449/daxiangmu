var main = document.querySelector("#main");


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

var url = "../../php/php/agreement1.php?document_Name=\"agreement\"";
requestAjax(url,function (obj) {
    main.innerHTML = obj;
})
