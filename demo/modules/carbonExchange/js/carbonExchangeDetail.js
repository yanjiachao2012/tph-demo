var busId = getQueryString('busId');
var couponId = getQueryString("couponId");

var $loginDialog = $("#login-dialog"),
	$warnLogin = $("#warn-dialog"),
	$successDialog = $("#success-dialog"),
	$lackDialog = $("#lack-dialog");

$(function() {

	$.ajax({
		url: path() + '/common/alliance/busCouponsDetail.do',
		type: 'post',
		dataType: 'json',
		data: {
			id: couponId
		},
		success: function(res) {
			var html = '';
			html += '<div class="detail-con"><h3><span>' + res.bus_name + '</span></h3>';
			html += '<p class="address"><i></i>' + res.mailing_addreass + '</p>';
			html += '<h4><span>券</span>' + res.cou_desc + '</h4>';
			html += '<div class="price">';
			if (res.cd_num == '0' && res.cd_amount == '0') {
				html += '<span class="rmb">免费</span>';
			} else if (res.cd_num == '0' || res.cd_num == null) {
				html += '<span class="rmb">￥' + res.cd_amount + '</span>';
			} else if (res.cd_amount == '0' || res.cd_amount == null) {
				html += '<span class="tanbi">' + res.cd_num + '</span><span class="unit">碳币</span>';
			} else {
				html += '<span class="tanbi">' + res.cd_num + '</span><span class="unit">碳币</span>+<span class="rmb">￥' + res.cd_amount + '</span>';
			}
			html += '</div>';
			html += '<div class="describe"><p>有效期：' + res.work_time + '</p>';
			html += '<p>兑换条件：' + res.use_info + '</p></div>';
			html += '<div class="operation"><div class="exchange-num"><h5>兑换数量：</h5>';
			html += '<div class="clearfix calc"><div class="reduce rect" id="reduce">-</div>';
			html += '<input class="number" id="number" value="0" placeholder="0"><div class="plus rect" id="plus">+</div></div>';
			html += '<p>温馨提示：最多选3份</p></div></div>';
			html += '<div class="spend"><h5>兑换数量：</h5><input class="number" id="spend" value="0" placeholder="0">';
			html += '<p>碳币</p> </div> <div class ="btn btn-success btn-large"id ="exchange-btn">立即兑换 </div>';
			$("#conpouDetailRight").html(html);
			exchangeDetail.couponExchange();
			exchangeDetail.couponDialog();
			$("#exchange-btn").on('click', function() {
				//			$loginDialog.data('Dialog').open();
				//			$warnLogin.data('Dialog').open();
				$lackDialog.data('Dialog').open();
				//			openSuccessDialog();
			});
		}
	});

	$.ajax({
		url: path() + '/common/alliance/getBusinessDetail.do',
		type: 'post',
		dataType: 'json',
		data: {
			businessId: busId
		},
		success: function(res) {
			var html = '';
			html += '	<h3>' + res.base.bus_name + '</h3>';
			html += '<div class="introduce">' + res.base.bus_desc + '</div>';
			html += '<div class="item">营业时间：' + res.base.work_time + '</div>';
			html += '<div class="item">地址： ' + res.base.mailing_addreass + '</div>';
			html += '<div class="item">电话： ' + res.base.tel + '</div>';
			html += '<div class="business-pic">';
			if (res.adLogo.length > 0) {
				html += '<ul class="clearfix">';
				for (var i = 0, len = res.adLogo.length; i < len; i++) {
					html += '<li><img src="' + res.adLogo[i].img_url + '"/></li>'
				}

				html += '</ul>';
			}
			html += '</div>';

			$("#businessIntroduce").html(html);
		}
	});

	//优惠券数据渲染
	$.ajax({
		url: path() + '/common/alliance/getBusinessCouponsList.do',
		type: 'post',
		dataType: 'json',
		data: {
			page: '1',
			pageSize: '1',
			busId: busId
		},
		success: function(res) {
			console.log(res)
			var html = '';
			if (res.count > 0) {
				html += '<ul class="clearfix">';
				for (var i = 0, len = res.rows.length; i < len; i++) {
					html += exchangeDetail.couponList(res.rows[i]);
				}
				html += '</ul>';
				if (res.count > 1) {
					html += '<div class="load-more" onclick="exchangeDetail.couponMore(this);"><input type="hidden" class="currentRows"/><input value="2" type="hidden" class="currentPage"/><span>点击加载更多</span></div>';
				}
			} else {
				html += '<div class="no-content"><div class="no-content-remind"><i class="no-content-icon"></i>该商家目前还没有其他优惠~</div></div>';
			}
			$("#exchangeDetailList").html(html);
		}
	})

})
var exchangeDetail = {
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
	couponMore: function(obj) {
		var pageId = $(obj).find('.currentPage');
		$.ajax({
			url: path() + '/common/alliance/getBusinessCouponsList.do',
			type: 'post',
			dataType: 'json',
			data: {
				page: pageId.val(),
				pageSize: '1',
				busId: busId
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
					html += exchangeDetail.couponList(res.rows[i]);
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
	couponExchange: function() {
		var $number = $("#number"),
			$spend = $("#spend"),
			defaultValue = 0,
			maxValue = 3,
			unitPrice = 150,
			timer = null;

		$("#plus").on('click', function() {
			operation('plus');
		})
		$("#reduce").on('click', function() {
			operation('reduce');
		})

		function operation(type, value) {
			if (type === 'plus') {
				defaultValue++;
				defaultValue = defaultValue > maxValue ? maxValue : defaultValue;

			} else if (type === 'reduce') {
				defaultValue--;
				defaultValue = defaultValue < 0 ? 0 : defaultValue;

			}
			$number.val(defaultValue);
			$spend.val(defaultValue * unitPrice);
		}
	},
	couponDialog: function() {
		//		未实登录框
		$loginDialog.dialog({
				width: 740,
				content: '<div class="no-login"><i class="icon-cry"></i>您还没有登录，请先<a href="#">登录</a>！</div>',
				buttons: [{
					text: '确定',
					className: 'btn-success close'
				}, {
					text: '取消',
					className: 'btn-default close'
				}, ],
				callback: function($btn) {
					console.log($btn);
				}
			})
			//		提示框
		$warnLogin.dialog({
				width: 740,
				content: '<div class="warn"><i class="icon-warn"></i><div class="warn-inner">您将消耗 <span class="success">1碳币</span> 兑换飞影国际电影城 <p>优惠券 <span class="danger">1</span>张</p></div></div>',
				buttons: [{
					text: '确定',
					className: 'btn-success close'
				}, {
					text: '取消',
					className: 'btn-default close'
				}, ],
				callback: function($btn) {
					console.log($btn);
				}
			})
			//		兑换成功框
		$successDialog.dialog({
				width: 740,
				content: '<div class="success-main"><div class="tip"><i class="icon-sucess"></i>兑换成功！</div><p>您的兑换码为：12345678</p><h5>您可以在<a href="#" class="success">个人中心</a>进行查看，<span class="danger" id="countdown">10</span> 秒后自动关闭</h5></div>',
				buttons: [{
					text: '确定',
					className: 'btn-success close'
				}],
				callback: function($btn) {
					console.log($btn);
					clearInterval(timer);
				}
			})
			//		碳币不足框
		$lackDialog.dialog({
			width: 740,
			content: '<div class="lack"><h3><i class="icon-cry"></i>碳币不足!</h3><p>您可以发起碳币寻集，快速获得碳币</p></div>',
			buttons: [{
				text: '我知道了',
				className: 'btn-success close'
			}],
			callback: function($btn) {
				console.log($btn);
			}
		})
	}
}


function init() {



	;
	(function() {


		function countDown($target, second, callback) {
			var count = 0;
			timer = setInterval(function() {
				if (count >= second - 1) {
					clearInterval(timer);
					callback && callback();
				} else {
					count++;
					var value = second - count;
					$target.html(value);

				}
			}, 1000);
		}

		function openSuccessDialog() {
			$successDialog.data('Dialog').open();
			//			倒计时
			countDown($("#countdown"), 10, function() {
				$successDialog.data('Dialog').close();
			});
		}
	})();

}