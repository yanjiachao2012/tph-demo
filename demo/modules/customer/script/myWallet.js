$(function() {
	applyData('')
})

function applyData(sort) {
	$.ajax({
		url: path() + '/myInfoController/queryDiscount.do',
		type: 'post',
		dataType: 'json',
		data: {
			page: '1',
			pageSize: '3',
			status: sort
		},
		beforeSend: function() {
			$("#myCoupon").prepend(strLoding)
		},
		success: function(res) {
			console.log(res)
			$("#myCoupon").html('');
			var html = '';
			if (res.count > 0) {
				html += '<div class="sort-parts myWallet-sort"><span class="sort-item active-item">全部</span>';
				html += '<span class="sort-item">已使用</span><span class="sort-item">未使用</span><span class="sort-item">已过期</span></div><ul class="list-content-ul">';
				for (var i = 0, len = res.rows.length; i < len; i++) {
					if (res.rows[i].overdue > 0 || res.rows[i].STATUS == '1') {
						if (res.rows[i].COU_MOLD == 'ti') {
							html += '<li class="content-item  ti-out-item">';
						} else if (res.rows[i].COU_MOLD == 'dui') {
							html += '<li class="content-item exchange-out-item">';
						} else {
							html += '<li class="content-item dai-out-item">';
						}
					} else {
						if (res.rows[i].COU_MOLD == 'ti') {
							html += '<li class="content-item ti-item">';
						} else if (res.rows[i].COU_MOLD == 'dui') {
							html += '<li class="content-item exchange-item">';
						} else {
							html += '<li class="content-item dai-item ">';
						}
					}
					if (res.rows[i].overdue > 0) {
						html += '<i class="icon-out icon-out-time"></i>'
					} else if (res.rows[i].STATUS == '1') {
						html += '<i class="icon-out icon-out-used"></i>'
					}
					html += '<div class="item-up"><i class="coupon-type"></i>';
					if (res.rows[i].COU_MOLD == 'ti') {
						html += '<h5><strong>' + res.rows[i].CD_COUNT + '</strong><span class="coupon-name">提货券</span></h5>';
					} else if (res.rows[i].COU_MOLD == 'dui') {
						html += '<h5><strong>￥' + res.rows[i].CD_COUNT + '</strong><span class="coupon-name">兑换券</span></h5>';
					} else {
						html += '<h5><strong>￥' + res.rows[i].CD_COUNT + '</strong><span class="coupon-name">代金券</span></h5>';
					}
					html += '<p class="store-name">' + res.rows[i].BUS_SHORT_NAME + '</p>';
					html += '<div class="coupon-value">';
					if (res.rows[i].CD_AMOUNT == '0' || res.rows[i].CD_AMOUNT == null) {
						html += '<span class="value-carbon">' + res.rows[i].CD_CD_NUM + '</span>';
					} else if (res.rows[i].CD_CD_NUM == null) {
						html += '<span class="value-money">￥' + res.rows[i].CD_AMOUNT + '</span>';
					} else {
						html += '<span class="value-carbon">' + res.rows[i].CD_CD_NUM + '</span>+<span class="value-money">￥' + res.row[i].CD_AMOUNT + '</span>';
					}
					html += '</div><p class="myWallet-time">营业时间:<span>' + res.rows[i].WORK_TIME + '</span></p>';
					html += '<p class="myWallet-time">兑换时间:<span>' + res.rows[i].END_DATE + '</span></p>';
					html += '<i class="coupon-round"></i></div>';
					html += '<div class="item-down"><span class="exchange-data">有效期至:' + res.rows[i].OVER_DATE + '</span>';
					html += '<span class="exchange-out">兑换码：<strong class="code">' + res.rows[i].SEQ_NO + '</strong></span></div></li>';
				}
				html += '</ul>';

			} else {
				html += '<div class="no-content"><div class="no-content-remind"><i class="no-content-icon"></i>你暂时没有优惠券</div></div>';
			}
			$("#myCoupon").append(html);
		},
		complete: function() {

		}
	})
}