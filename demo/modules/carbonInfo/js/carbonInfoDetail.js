function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
var cid = getQueryString("id");
$(function() {
	$.ajax({
		type: "post",
		url: path() + "/foreignTrading/viewTrading.do",
		dataType: "json",
		data: {
			id: cid
		},
		success: function(res) {
			var html = '';
			var createDate = new Date(res.createdDate).formatDate("yyyy-MM-dd hh:mm");
			html += '<div class="details-title"><h1>' + res.infoTitle + '</h1>';
			html += '<div class="item-info"><span class="item-time"><i class="icon-time"></i>' + createDate + '</span>';
			html += '<span class="item-watch"><i class="icon-watch"></i>' + res.focusOn + '次</span></div></div>';
			/*html += '<div class="details-info"><div class="info-left info-item"><i></i><div class="wrap-content">';
			html += '<span class="info-up">捐赠编号：</span><div class="info-down">' + res.code + '</div></div></div>';
			html += '<div class="info-middle info-item"><span class="info-up">捐赠量：</span>';
			html += '<div class="info-down">' + res.carbon + '<span>吨</span></div></div>';
			html += '<div class="info-right info-item"><span class="info-up">捐赠用途：</span>';
			html += '<div class="info-down">' + res.donationPurposes + '</div></div></div>';*/
			html += '<div class="details-article">' + res.infoText + '</div>';
			$("#carbonTradeDetail-content").append(html);
		}
	});
});