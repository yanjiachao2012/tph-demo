$(function () {
	init();
	
})
function init () {
	
	$(".search-area").on('click','li',function () {
		var $this = $(this);
		$this.addClass('active').siblings('li').removeClass('active');	
	})
	$(".search-head").on('click','.fold',function () {
		var $this = $(this),
			collapse = $this.data('collapse');
		$this.closest('.search-head').toggleClass('collapse');
		if (collapse === 'true') {
			$this.html('收起');
			$this.data('collapse','false');
		}else{
			$this.html('展开');
			$this.data('collapse','true');
		}
	})
	
}

