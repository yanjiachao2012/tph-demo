function path() {
	var localObj = window.location;
	var contextPath = localObj.pathname.split("/")[1];
	//return localObj.protocol + "//" + localObj.host + "/" + contextPath;
	return "http://10.10.10.150:8080";
	//return "http://192.168.0.104/tph-pc/json"
}
//格式化时间
Date.prototype.formatDate = function(format) //author: meizz
	{
		var o = {
			"M+": this.getMonth() + 1, //month
			"d+": this.getDate(), //day
			"h+": this.getHours(), //hour
			"m+": this.getMinutes(), //minute
			"s+": this.getSeconds(), //second
			"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
			"S": this.getMilliseconds() //millisecond
		};
		if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
			(this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(format))
				format = format.replace(RegExp.$1,
					RegExp.$1.length == 1 ? o[k] :
					("00" + o[k]).substr(("" + o[k]).length));
		return format;
	};
/***获取链接参数**/
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

function navSub() {
	var _tphNav = $("#tph-nav"),
		_NavItem = _tphNav.find(".nav-item");

	_NavItem.on("mouseover", function(e) {
		if (_tphNav.attr("attr-status") == "up") {
			$(this).find('.wrap-sub-nav').show();
			$(this).siblings().find(".wrap-sub-nav").hide();
		} else {
			_tphNav.attr("attr-status", "up");
			$(this).find('.wrap-sub-nav').fadeIn();
			$(this).siblings().find(".wrap-sub-nav").hide();
		}
		$(this).siblings().addClass("noActive-item");
		e.stopPropagation();

	});
	_tphNav.on("mouseover", function(e) {
		e.stopPropagation();
	})

	$(document).on("mouseover", function() {
		_tphNav.find(".wrap-sub-nav").fadeOut();
		_tphNav.attr("attr-status", "down");
		_NavItem.removeClass("noActive-item")
	})

	/***当前链接高亮**/
	var navItem = $("#tph-nav").find(".nav-item");
	var currentHref = document.location.href;
	$.each(navItem, function() {
		if (currentHref.indexOf($(this).attr("attr-href")) != -1) {
			$(this).addClass("active-item");
		}
	})

}
/*控制搜索框的placeholder属性*/
function funPlaceholder(element) {
	var placeholder = '';
	if (element && !("placeholder" in document.createElement("input")) && (placeholder = element.getAttribute("placeholder"))) {
		element.onfocus = function() {
			if (this.value === placeholder) {
				this.value = "";
			}
			this.style.color = '';
		};
		element.onblur = function() {
			if (this.value === "") {
				this.value = placeholder;
				this.style.color = '#a8a8a8';
			}
		};

		//样式初始化
		if (element.value === "") {
			element.value = placeholder;
			element.style.color = '#a8a8a8';
		}
	}
};