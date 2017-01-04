$(function() {
	init();

})

function init() {

	;
	(function() {
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
	})();

	;
	(function() {
		var $loginDialog = $("#login-dialog"),
			$warnLogin = $("#warn-dialog"),
			$successDialog = $("#success-dialog"),
			$lackDialog = $("#lack-dialog");
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


		$("#exchange-btn").on('click', function() {
			//			$loginDialog.data('Dialog').open();
			//			$warnLogin.data('Dialog').open();
			$lackDialog.data('Dialog').open();
			//			openSuccessDialog();
		});

		function openSuccessDialog() {
			$successDialog.data('Dialog').open();
			//			倒计时
			countDown($("#countdown"), 10, function() {
				$successDialog.data('Dialog').close();
			});
		}
	})();

}