function tabToggle(obj1, obj2) {
	$("#tab-item" + obj1).addClass("active-item")
	$("#tab-item" + obj2).removeClass("active-item")
	$("#tabContent" + obj1).css("display", "block")
	$("#tabContent" + obj2).css("display", "none")
}
$(function() {
	/**title**/
	$.ajax({
		url: path() + '/foreignHall/queryRecommendInfo.do',
		type: "post",
		dataType: "json",
		success: function(res) {
			var createdDate = new Date(res.createdDate).formatDate("yyyy-MM-dd");
			var html = "";
			html += '<img src="' + path() + '/common/download_photo.jsp?path=' + res.logo + '" />';
			html += '<div class="add-dimmer"></div><div class="carbonInfo-recommend">';
			html += '<div class="wrap-recommend"><h2><a href="">' + res.title + '</a></h2>';
			html += '<p>' + res.intro + '</p>';
			html += '<div class="recommend-user"><a href=""><i class="icon-user"></i>' + res.auth + '</a>';
			html += '<span><i class="icon-time"></i>' + createdDate + '</span>';
			html += '<span><i class="icon-watch"></i>' + res.focusOn + '次</span></div></div></div>';

			$("#carbonInfoTitle").append(html);
		}
	});
	/***列表**/
	$.ajax({
		url: path() + "/foreignHall/getHallList.do",
		type: 'post',
		dataType: 'json',
		data: {

		}
	})
})