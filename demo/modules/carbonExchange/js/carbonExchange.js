/**加载效果**/
var strLoding = '<span class="loading"><i></i>加载中...</span>';
$(function() {
	$.ajax({
		url: path() + '/common/alliance/businessCategory.do',
		type: 'post',
		dataType: 'json',
		data: {
			type: '1'
		},
		success: function(res) {
			var html = '';
			html += '<div class="search-head search-area clearfix" style="border-bottom:none;"><div class="label ellipsis">区域筛选：</div>';
			html += '<div class="wrap-list"><ul class="list">';
			html += '<li class="all active" onclick="carbonExchange.couponListRender(\'1\',this)">全部</li>';
			for (var i = 0, len = res.administrativeRegion.length; i < len; i++) {
				html += '<li onclick="carbonExchange.couponListRender(\'1\',this,\'' + res.administrativeRegion[i].id + '\')">' + res.administrativeRegion[i].name + '</li>';
			}
			html += '</ul>';
			html += '<div class="fold" data-collapse="false" onClick="carbonExchange.toggleCollapse(this);">收起</div></div></div>';
			html += '<div class="search-head search-area clearfix" style="border-bottom:none;"><div class="label ellipsis">分类：</div>';
			html += '<div class="wrap-list"><ul class="list">';
			html += '<li class="all active" onclick="carbonExchange.couponListRender(\'2\',this)">全部分类(' + res.classifySUM + ')</li>';
			for (var n = 0, lenM = res.classify.length; n < lenM; n++) {
				html += '<li onclick="carbonExchange.couponListRender(\'2\',this,\'\',\'' + res.classify[n].id + '\')">' + res.classify[n].name + '(' + res.classify[n].couponssum + ')</li>'
			}
			html += '</ul><div class="fold" data-collapse="false" onClick="carbonExchange.toggleCollapse(this);">收起</div></div></div>';
			html += '<div class="search-head search-area clearfix collapses"><div class="label ellipsis">更多筛选：</div>';
			html += '<div class="wrap-list"><ul class="list">';
			html += '<li onclick="carbonExchange.couponListRender(\'3\',this,\'\',\'\',\'coupons\')">优惠券</li>';
			html += '<li onclick="carbonExchange.couponListRender(\'3\',this,\'\',\'\',\'memberscard\')">会员卡</li>';
			html += '<li class="sort-carbon" onclick="carbonExchange.couponListRender(\'4\',this,\'\',\'\',\'\',\'DESC\')">碳币</li></ul></div></div>';
			$("#searchSort").html(html);
		},
		error: function(res) {
			console.log('获取分类列表出错')
		}
	});
	//优惠券数据渲染
	carbonExchange.couponListRender();

});
var carbonExchange = {
	//展开收起
	toggleCollapse: function(obj) {
		$(obj).parents('.search-head').toggleClass('collapse');
		var collapse = $(obj).attr('data-collapse');
		if (collapse === 'true') {
			$(obj).html('收起');
			$(obj).attr('data-collapse', 'false');
		} else {
			$(obj).html('展开');
			$(obj).attr('data-collapse', 'true');
		}
	},
	//优惠券数据渲染//typeNum='1'表示行政筛选 typeNum='2'表示分类 typeNum='3'表示优惠券分类 typeNum='4'顺序 city表示行政 categoryId表示分类，carbonType-优惠券分类，order--顺序
	couponListRender: function(typeNum, obj, cityType, categoryId, carbonType, order) {
		if (typeNum == '1') {
			$("#citySort").val(cityType)
		}
		if (typeNum == '2') {
			$("#categorySort").val(categoryId)
		}
		if (typeNum == '3') {
			$("#typeSort").val(carbonType)
			$("#orderSort").val('')
		}
		if (typeNum == '4') {
			$("#orderSort").val(order)
		}
		$.ajax({
			url: path() + '/common/alliance/couponsList.do',
			type: 'post',
			dataType: 'json',
			data: {
				page: '1',
				pageSize: '10',
				city: $("#citySort").val(),
				categoryId: $("#categorySort").val(),
				type: $("#typeSort").val(),
				order: $("#orderSort").val(),
			},
			success: function(res) {
				var html = '';
				$(obj).addClass('active').siblings('li').removeClass('active');
				if (res.count > 0) {
					html += '<ul class="clearfix">';
					for (var i = 0, len = res.rows.length; i < len; i++) {
						html += carbonExchange.couponList(res.rows[i]);
					}
					html += '</ul>';
					if (res.count > 10) {
						html += '<div class="load-more" onclick="carbonExchange.couponMore(this);"><input type="hidden" class="currentRows"/><input value="2" type="hidden" class="currentPage"/><span>点击加载更多</span></div>';
					}
				} else {
					html += '<div class="no-content"><div class="no-content-remind"><i class="no-content-icon"></i>目前还没有优惠~</div></div>';
				}
				$("#couponList").html(html);
			}
		})
	},
	//优惠券数据拼凑
	couponList: function(data) {
		var html = '';
		if (data.type == 'dai') {
			html += '<li class="coupon-item cash-coupon"><div class="coupon-left">代金券</div>';
		} else if (data.type == 'ti') {
			html += '<li class="coupon-item goods-coupon"><div class="coupon-left">提货券</div>';
		} else if (data.type == 'dui') {
			html += '<li class="coupon-item exchange-coupon"><div class="coupon-left">兑换券</div>';
		} else if (data.type == '2') {
			html += '<li class="coupon-item gold-coupon">';
		} else {
			html += '<li class="coupon-item silver-coupon">';
		}
		html += '<div class="coupon-center clearfix">';
		if (data.type == 'J' || data.type == 'Y') {
			html += '<div class="inner clearfix"><i class="gold"></i><div class="text-wrap">';
		}

		if (data.type == 'J' || data.type == 'Y') {
			html += '<h4 class="ellipsis">' + data.bus_short_name + '</h4>';
			html += '<h5 class="ellipsis"><b>' + data.cou_name + '</b>折</h5>';
		} else {
			html += '<h4 class="ellipsis">' + data.cou_name + '</h4>';
			html += '<h5 class="ellipsis">' + data.bus_short_name + '</h5>';
		}
		html += '<div class="open-hours ellipsis">营业时间：<span>' + data.work_time + '</span></div>';
		if (data.type == 'J' || data.type == 'Y') {
			html += '</div></div>';
		}
		html += '<div class="expiry ellipsis">有效期：<span>' + data.end_date + '至' + data.over_date + '</span></div></div>';
		html += '<div class="coupon-right"><div class="tanbi ellipsis">';
		if (data.cd_num == null) {
			html += '￥' + data.cd_amount + '';
		} else if (data.cd_amount == null) {
			html += '<i></i>' + data.cd_num + '';
		} else {
			html += '<i></i>' + data.cd_num + '<span>+</span>￥' + data.cd_amount + '';
		}
		html += '</div><a href="carbonExchangeDetail.html?busId=' + data.bus_id + '&&couponId=' + data.id + '" class="btn btn-success">立即兑换</a>';
		html += '<p>已兑' + data.couponssum + '张</p></div></li>';
		return html;
	},
	//加载更多
	couponMore: function(obj) {
		var pageId = $(obj).find('.currentPage');
		$.ajax({
			url: path() + '/common/alliance/getBusinessCouponsList.do',
			type: 'post',
			dataType: 'json',
			data: {
				page: pageId.val(),
				pageSize: '10',
				city: $("#citySort").val(),
				categoryId: $("#categorySort").val(),
				type: $("#typeSort").val(),
				order: $("#orderSort").val(),
				name: $("#carbonCouponSearch").val()
			},
			beforeSend: function() {
				$(obj).find('span').text('加载中...');
				$(obj).addClass('loading-more');
			},
			success: function(res) {
				var html = '';
				$(obj).find('span').text('点击加载更多');
				$(obj).removeClass('loading-more');
				$(obj).find('.currentRows').val(res.rows.length);
				for (var i = 0, len = res.rows.length; i < len; i++) {
					html += carbonExchange.couponList(res.rows[i]);
				}
				$(obj).siblings('ul').append(html);
			},
			complete: function() {
				if ($(obj).find('.currentRows').val() == '0') {
					$(obj).find('span').text('没有更多数据了')
				} else {
					var _page = parseInt(pageId.val());
					pageId.val(++_page)
				}
			}
		})
	},
	//搜索关键字
	carbonCouponSearch: function() {
		$.ajax({
			url: path() + '/common/alliance/couponsList.do',
			type: 'post',
			dataType: 'json',
			data: {
				page: '1',
				pageSize: '10',
				/*	city: $("#citySort").val(),
					categoryId: $("#categorySort").val(),
					type: $("#typeSort").val(),
					order: $("#orderSort").val(),*/
				name: $("#carbonCouponSearch").val()
			},
			beforeSend: function() {
				$("#couponList").html(strLoding);
			},
			success: function(res) {
				$("#citySort").val('');
				$("#categorySort").val('');
				$("#typeSort").val('');
				$("#orderSort").val('');
				$("#couponList").html('');
				var html = '';
				if (res.count > 0) {
					html += '<ul class="clearfix">';
					for (var i = 0, len = res.rows.length; i < len; i++) {
						html += carbonExchange.couponList(res.rows[i]);
					}
					html += '</ul>';
					if (res.count > 10) {
						html += '<div class="load-more" onclick="carbonExchange.couponMore(this);"><input type="hidden" class="currentRows"/><input value="2" type="hidden" class="currentPage"/><span>点击加载更多</span></div>';
					}
				} else {
					html += '<div class="no-content"><div class="no-content-remind"><i class="no-content-icon"></i>暂时没有搜索到信息~</div></div>';
				}
				$("#couponList").html(html);
			}
		})
	},
}