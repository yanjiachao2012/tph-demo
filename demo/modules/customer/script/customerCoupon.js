/**过期优惠券**/
$.ajax({
	type: "post",
	url: path() + "/recommendController/preferentiaRemind.do",
	dataType: "json",
	data: {
		page: '1',
		pageSize: '10'
	},
	beforeSend: function() {
		$("#remindOut").html("加载中...")
	},
	success: function(res) {
		var html = '';
		if (res.rows.length > 0) {
			html += '<ul class="list-content-ul">';
			for (var i = 0, len = res.rows.length; i < len; i++) {
				if (res.rows[i].COU_MOLD == "") {
					html += '<li class="content-item member-card-item">';
					html += '<div class="item-up"><i class="coupon-type"></i><h6>优惠券</h6>';
					html += '<p class="car-type">金卡<span>8.0<b>折</b></span></p><p class="car-No">';
					html += '<span>卡号：12123134124</span><span class="car-data">发卡时间:2016-01-12</span></p>';
					html += '<i class="coupon-round"></i></div><div class="item-down">';
					html += '<span class="exchange-data">有效期:2016-10-10</span>';
				} else {
					if (res.rows[i].COU_MOLD == 'ti') {
						html += '<li class="content-item ti-item">';
					} else if (res.rows[i].COU_MOLD == 'dai') {
						html += '<li class="content-item dai-item">';
					} else if (res.rows[i].COU_MOLD == 'dui') {
						html += '<li class="content-item exchange-item">';
					}
					html += '<div class="item-up"><i class="coupon-type"></i>';
					html += '<h5>' + res.rows[i].COU_NAME + '<span>' + res.rows[i].quantity + '张</span></h5><p class="store-name">' + res.rows[i].BUS_SHORT_NAME + '</p>';
					if (res.rows[i].WORK_TIME == null || res.rows[i].WORK_TIME == undefined) {
						html += '<p class="time">营业时间:<span></span></p>';
					} else {
						html += '<p class="time">营业时间:<span>' + res.rows[i].WORK_TIME + '</span></p>';
					}
					html += '<i class="coupon-round"></i></div><div class="item-down">';
					html += '<span class="exchange-data">兑换日期:' + res.rows[i].END_DATE + '</span>';
				}
				html += '<span class="exchange-out">距失效还有<b>' + res.rows[i].intervalDay + '</b>天</span></div></li>';
			}
			html += '</ul>';
			html += '<div class="read-more"><a href="">查看更多</a></div>';

		} else {
			html += '<div class="no-content"><div class="no-content-remind">';
			html += '<i class="no-content-icon"></i>你没有即将过期的优惠券</div><div class="no-content-link">';
			html += '<a href="" class="link-left">查看我的优惠券</a><a href="" class="link-right">兑换更多的优惠</a></div></div>';
		}
		$("#remindOut").append(html);
	}
});
/***猜你需要**/
$.ajax({
	type: "post",
	url: path() + "/recommendController/recommendList.do",
	dataType: "json",
	data: {
		page: '1',
		pageSize: '10'
	},
	beforeSend: function() {
		$("#listContentLike").html("加载中...")
	},
	success: function(res) {
		var html = '';
		if (res.rows.length > 0) {
			for (var i = 0, len = res.rows.length; i < len; i++) {
				if (res.rows[i].COU_MOLD == "") {
					html += '<li class="content-item member-card-item">';
					html += '<div class="item-up"><i class="coupon-type"></i>';
					html += '<h6>聚美优品</h6>';
					html += '<p class="car-type">金卡<span>8.0<b>折</b></span></p>';
					html += '<p class="car-No"><span>卡号：12123134124</span><span class="car-data">发卡时间:2016-01-12</span></p>';
				} else {
					if (res.rows[i].COU_MOLD == 'dui') {
						html += '<li class="content-item exchange-item">';
					} else if (res.rows[i].COU_MOLD == 'dai') {
						html += '<li class="content-item dai-item">';
					} else if (res.rows[i].COU_MOLD == 'ti') {
						html += '<li class="content-item ti-item">';
					}
					html += '<div class="item-up"><div class="item-up-left">';
					html += '<div class="coupon-name"><strong>￥' + res.rows[i].CD_COUNT + '</strong>';
					if (res.rows[i].COU_MOLD == 'dui') {
						html += '<b>兑换券</b></div>'
					} else if (res.rows[i].COU_MOLD == 'dai') {
						html += '<b>代金券</b></div>'
					} else if (res.rows[i].COU_MOLD == 'ti') {
						html += '<b>提货券</b></div>'
					}

					html += '<p class="store-name">' + res.rows[i].BUS_SHORT_NAME + '</p><p class="coupon-value">';

					if (res.rows[i].CD_AMOUNT == null) {
						html += '<span class="value-carbon">' + res.rows[i].CD_NUM + '</span>';
					} else if (res.rows[i].CD_NUM == null) {
						html += '<span class="value-money">￥' + res.rows[i].CD_AMOUNT + '</span>';
					} else {
						html += '<span class="value-carbon">' + res.rows[i].CD_NUM + '</span>+<span class="value-money">￥' + res.rows[i].CD_AMOUNT + '</span>';
					}
					html += '</p></div><div class="item-up-right"><div class="couponed">已兑<span>' + res.rows[i].EXA_COUNT + '</span>张</div>';
					html += '<a class="exchange-now" href="">立即兑换</a></div>';
					html += '<i class="coupon-type"></i>';
				}
				html += '<i class="coupon-round"></i></div>';
				html += '<div class="item-down"><span class="exchange-data">有效期:' + res.rows[i].LAST_UPDATED_DATE + '至' + res.rows[i].END_DATE + '</span></div></li>';
			}
			$("#listContentLike").append(html);
		} else {
			$("#wrapContentLike").html("");
		}
	}
});
/***过期活动**/
$.ajax({
	type: "post",
	url: path() + "/sysActivityController/toActInfoHomeList.do",
	dataType: "json",
	data: {
		page: '1',
		pageSize: '10'
	},
	beforeSend: function() {
		$("#remindStart").html("加载中...")
	},
	success: function(res) {
		var html = '';
		if (res.rows.length > 0) {
			html += '<ul class="list-activity-remind">';
			for (var i = 0, len = res.rows.length; i < len; i++) {
				html += '<li class="remind-item">';
				if (res.rows[i].actClass == '0') {
					html += '<div class="remind-content-left remind-platform-left">';
				} else if (res.rows[i].actClass == '3') {
					html += '<div class="remind-content-left remind-car-left">';
				} else if (res.rows[i].actClass == '4') {
					html += '<div class="remind-content-left remind-plant-left">';
				} else if (res.rows[i].actClass == '1') {
					html += '<div class="remind-content-left remind-exchange-left">';
				}

				html += '</div><div class="remind-content-right">';
				html += '<h5><a href="#">' + res.rows[i].name + '</a></h5>';
				html += '<div class="right-common">创始人：<span class="mark">' + res.rows[i].creator + '</span></div>';
				html += '<div class="right-common">参与人数：<span class="mark">' + res.rows[i].joinLimit + '</span></div>';
				html += '<div class="right-common">距活动开始还有<b class="No">' + res.rows[i].numberOfDays + '</b>天</div></div></li>';
			}

			html += '</ul><div class="read-more"><a href="">查看全部</a></div>';
		} else {
			html += '<div class="no-content"><div class="no-content-remind"><i class="no-content-icon"></i>您没有即将开始得活动喔~</div>';
			html += '<div class="no-content-link"><a href="" class="link-left">查看我的活动</a>';
			html += '<a href="" class="link-right">参与更多活动</a></div></div>';
		}
		$("#remindStart").append(html);
	}
});