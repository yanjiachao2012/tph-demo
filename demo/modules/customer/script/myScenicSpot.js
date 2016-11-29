$(function() {
	$.ajax({
		url: path() + '/scenicController/queryFocusScenic.do',
		type: 'post',
		dataType: 'json',
		success: function(res) {
			var html = '';
			if (res.legnth <= 0) {
				html += '<div class="no-content no-community-binding"><div class="no-spot-remind"> ';
				html += '<i class="no-content-icon"></i>您还没有绑定景区</div><a href="infoManager.html?infoManagerid=infoManagerEdit" class="go-binding">去绑定</a></div>';
			} else {
				html += '<div class="add-scenicSpot"><a href="infoManager.html?infoManagerid=infoManagerEdit" class="addCare">关注更多景区</a></div>';
				for (var i = 0, len = res.length; i < len; i++) {
					html += '<div class="wrap-list-content scenicSpot-list-content"><div class="scenicSpot-title">' + res[i].name + '</div>';
					html += '<div class="scenicSpot-notice"><div class="scenicSpot-member"> <i class="icon-v"></i>';
					html += '<div class="member-info"><p class="info-up">已绑定用户</p>';
					if (res[i].focus > 1000) {
						html += '<div class="member"> <strong>1000+</strong>人</div></div></div>';
					} else {
						html += '<div class="member"> <strong>' + res[i].focus + '</strong>人</div></div></div>';
					}
					html += '<div class="scenicSpot-notice-content"><span class="notice-icon">公告：</span>';
					html += '<p class="notice-content">' + res[i].affiche + '</p></div></div>';
					html += '<div class="scenicSpot-list"><div class="list-title"><span class="first active-item">景区周边的商家</span data-id="1"><span>景区专属活动</span></div>';
					html += '<div class="wrapScenicSpotItem">';
					$.ajax({
						url: path() + '/scenicController/queryFocusScenic.do',
						type: 'post',
						dataType: 'json',
						data: {
							page: '1',
							pageSize: '3',
							community: res[i].id
						},
						success: function(val) {
							if (val.count > 0) {
								html += '<ul>';
								for (var n = 0, itemLen = val.rows.length; n < itemLen; n++) {
									storeList(val);
								}
								html += '</ul>'
								if (val.count > 3) {
									html += '<div class="more-store"><a href="javascript:" class="toggle-more">更多商家</a></div>';
								}
							}
						}
					})
					html += '</div>';
					html += '<div class="wrap-list-content list-content-activity" style="display:none;"></div></div></div>';
				}
			}
		}
	})
});
/**商家列表**/
function storeList(val) {
	html += '<li class="scenicSpot-item"><div class="wrap-pic">';
	html += '<a href=""><img src="' + val.rows[n].logo + '"></a></div>';
	html += '<div class="scenicSpot-intro"><h5><a href="">' + val.rows[n].bus_short_name + '</a></h5>';
	html += '<p>' + val.rows[n].bus_desc + '</p></div></li>';
}
/**商家景区转换**/
function toggleType(obj, id, spotId) {
	$(obj).addClass("active-item").siblings().removeClass("active-item");
	$(obj).parent().siblings().css("display", "none");
	$("#scenicSpot" + id).css("display", "block");
	if ($(obj).attr("data-id") && $(obj).attr("data-id") == '1') {
		alert("1")
		$(obj).attr("data-id", "0")
	}
}