$(function() {
	myActivity.myJoinList();
	myActivity.myOriginate();

})
var myActivity = {
	/***我发起的活动**/
	myOriginate: function(sort, obj) {
		$.ajax({
			url: path() + "/sysActivityController/myInitiate.do",
			type: 'post',
			dataType: 'json',
			data: {
				page: '1',
				pageSize: '10',
				approval: sort
			},
			beforeSend: function() {
				$("#myLaunch").html(strLoding)
			},
			success: function(res) {
				$("#myLaunch").html('');
				var html = "";
				if (res.count > 0) {
					html += '<div class="sort-parts"><span class="sort-item active-item" onclick="myActivity.myOriginate(\'\',this)">全部</span>';
					html += '<span class="sort-item" onclick="myActivity.myOriginate(\'3\',this)">进行中</span>';
					html += '<span class="sort-item" onclick="myActivity.myOriginate(\'5\',this)">已结束</span>';
					html += '</div><ul>';
					for (var i = 0, len = res.rows.length; i < len; i++) {
						var startDate = new Date(res.rows[i].startDate).formatDate("yyyy-MM-dd hh:mm");
						var end_Date = new Date(res.rows[i].end_Date).formatDate("yyyy-MM-dd hh:mm");
						if (res.rows[i].actClass == '0') {
							html += '<li class="activity-item join-item">';
						} else if (res.rows[i].actClass == '1') {
							html += '<li class="activity-item exchange-item">';
						} else if (res.rows[i].actClass == '2') {
							html += '<li class="activity-item join-item">';
						} else if (res.rows[i].actClass == '3') {
							html += '<li class="activity-item car-item">';
						} else if (res.rows[i].actClass == '4') {
							html += '<li class="activity-item plant-item">';
						}
						html += '<div class="activity-right">';
						if (res.rows[i].numberOfDays == '-1') {
							html += '<a href="" class="ended">已结束</a></div>';
						} else if (res.rows[i].numberOfDays == '0') {
							html += '<a href="" class="doing">进行中</a></div>';
						} else if (res.rows[i].numberOfDays == '1') {
							html += '<a href="">即将开始</a></div>';
						}
						html += '<div class="activity-left"><div class="wrap-pic"></div>';

						html += '<div class="activity-info"><h5>' + res.rows[i].name + '</h5>';
						if (res.rows[i].actClass == '0') {
							html += '<div class="activity-common activity-time">时间：' + startDate + ' 至 ' + end_Date + '</div>';
							html += '<div class="activity-common activity-details">地点：' + res.rows[i].note + '</div></div></div></li>';
						} else if (res.rows[i].actClass == '1') {
							html += '<div class="activity-common activity-time">物体名称：' + res.rows[i].exchangeName + '</div>';
							html += '<div class="activity-common activity-details">置换物品：' + res.rows[i].exchangeName + '</div></div></div></li>';
						} else if (res.rows[i].actClass == '2') {
							html += '<div class="activity-common activity-time">时间：' + startDate + ' 至 ' + end_Date + '</div>';
							html += '<div class="activity-common activity-details">地点：' + res.rows[i].note + '</div></div></div></li>';
						} else if (res.rows[i].actClass == '3') {
							html += '<div class="activity-common activity-time">出发日期：' + startDate + '</div>';
							html += '<div class="activity-common activity-details">线路：' + res.rows[i].note + '</div></div></div></li>';
						} else if (res.rows[i].actClass == '4') {
							html += '<div class="activity-common activity-time">时间：' + startDate + ' 至 ' + end_Date + '</div>';
							html += '<div class="activity-common activity-details">主办单位：' + res.rows[i].note + '</div></div></div></li>';
						}

					}
					html += '</ul>';
					html += '<div class="click-more"><a href="" class="getMore">点击加载更多</a></div>';
				} else {
					html += '<div class="no-content"><div class="no-content-remind"><i class="no-content-icon"></i>你暂时没有发起活动</div></div>';
				}
				$("#myLaunch").html(html);
			}
		})
		$(obj).addClass("active-item").siblings().removeClass("active-item");
	},
	/**我参与的活动**/
	myJoinList: function(sort, obj) {
		$(obj).addClass("active-item").siblings().removeClass("active-item");
		$.ajax({
			url: path() + "/sysActivityController/getMyparticipate.do",
			type: 'post',
			dataType: 'json',
			data: {
				page: '1',
				pageSize: '10',
				actClass: sort
			},
			beforeSend: function() {
				$("#myJoin").html(strLoding)
			},
			success: function(res) {
				$("#myJoin").html('');
				var html = "";
				if (res.count > 0) {
					html += '<div class="sort-parts"><span class="sort-item active-item" onclick="myActivity.myJoinList(\'\',this)">全部</span>';
					html += '<span class="sort-item" onclick="myActivity.myJoinList(\'1\',this)">换物</span>';
					html += '<span class="sort-item" onclick="myActivity.myJoinList(\'3\',this)">拼车</span>';
					html += '<span class="sort-item" onclick="myActivity.myJoinList(\'4\',this)">植物认养</span>';
					html += '<span class="sort-item" onclick="myActivity.myJoinList(\'2\',this)">众筹</span>';
					html += '<span class="sort-item" onclick="myActivity.myJoinList(\'\',this)">其他</span>';
					html += '</div><ul>';
					for (var i = 0, len = res.rows.length; i < len; i++) {
						var startDate = new Date(res.rows[i].startDate).formatDate("yyyy-MM-dd hh:mm");
						var end_Date = new Date(res.rows[i].end_Date).formatDate("yyyy-MM-dd hh:mm");
						if (res.rows[i].actClass == '0') {
							html += '<li class="activity-item join-item">';
						} else if (res.rows[i].actClass == '1') {
							html += '<li class="activity-item exchange-item">';
						} else if (res.rows[i].actClass == '2') {
							html += '<li class="activity-item join-item">';
						} else if (res.rows[i].actClass == '3') {
							html += '<li class="activity-item car-item">';
						} else if (res.rows[i].actClass == '4') {
							html += '<li class="activity-item plant-item">';
						}
						html += '<div class="activity-right"><a href="">发私信</a>';
						if (res.rows[i].numberOfDays == '-1') {
							html += '<a href="" class="ended">已结束</a></div>';
						} else if (res.rows[i].numberOfDays == '0') {
							html += '<a href="" class="doing">进行中</a></div>';
						} else if (res.rows[i].numberOfDays == '1') {
							html += '<a href="">即将开始</a></div>';
						}
						html += '<div class="activity-left"><div class="wrap-pic"></div>';

						html += '<div class="activity-info"><h5>' + res.rows[i].name + '</h5>';
						if (res.rows[i].actClass == '0') {
							html += '<div class="activity-common activity-time">时间：' + startDate + ' 至 ' + end_Date + '</div>';
							html += '<div class="activity-common activity-details">地点：' + res.rows[i].note + '</div></div></div></li>';
						} else if (res.rows[i].actClass == '1') {
							html += '<div class="activity-common activity-time">物体名称：' + res.rows[i].exchangeName + '</div>';
							html += '<div class="activity-common activity-details">置换物品：' + res.rows[i].exchangeName + '</div></div></div></li>';
						} else if (res.rows[i].actClass == '2') {
							html += '<div class="activity-common activity-time">时间：' + startDate + ' 至 ' + end_Date + '</div>';
							html += '<div class="activity-common activity-details">地点：' + res.rows[i].note + '</div></div></div></li>';
						} else if (res.rows[i].actClass == '3') {
							html += '<div class="activity-common activity-time">出发日期：' + startDate + '</div>';
							html += '<div class="activity-common activity-details">线路：' + res.rows[i].note + '</div></div></div></li>';
						} else if (res.rows[i].actClass == '4') {
							html += '<div class="activity-common activity-time">时间：' + startDate + ' 至 ' + end_Date + '</div>';
							html += '<div class="activity-common activity-details">主办单位：' + res.rows[i].note + '</div></div></div></li>';
						}
					}
					html += '</ul>';
					html += '<div class="click-more"><a href="" class="getMore">点击加载更多</a></div>';
				} else {
					html += '<div class="no-content"><div class="no-content-remind"><i class="no-content-icon"></i>你暂时没有还没有活动</div></div>';
				}
				$("#myJoin").html(html);
			}
		})
	}
}