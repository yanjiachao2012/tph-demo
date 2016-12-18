$(function () {
	init();
	
})
function init () {
	
	;(function () {
		var $payType = $(".pay-type"),
			$payBtn = $("#pay-btn");
		$payType.on('click','label',function () {
			var $this = $(this);
			$this.addClass('active').siblings('label').removeClass('active');
			$payBtn.html($this.data('info'));
		});
	})();
}

