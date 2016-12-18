$(function() {
	init();

})

function init() {
	$("#funding-scroll").slide({
		titCell: ".hd ul",
		mainCell: ".bd ul",
		autoPage: false,
		effect: "left",
		autoPlay: true,
		vis: 4,
		trigger: "click"
	});

	$(".search-area").on('click', 'li', function() {
		var $this = $(this);
		$this.addClass('active').siblings('li').removeClass('active');
	})
	$(".search-head").on('click', '.fold', function() {
		var $this = $(this),
			collapse = $this.data('collapse');
		$this.closest('.search-head').toggleClass('collapse');
		if (collapse === 'true') {
			$this.html('收起');
			$this.data('collapse', 'false');
		} else {
			$this.html('展开');
			$this.data('collapse', 'true');
		}
	})
}
var _carbonFundingItem = $("#carbonFundingList").find(".item");
_carbonFundingItem.on("mouseover", function() {
	$(this).find(".wrap-item").addClass("hover-item");
	$(this).siblings().find(".wrap-item").removeClass("hover-item");
});
_carbonFundingItem.on("mouseout", function() {
	$(this).find(".wrap-item").removeClass("hover-item");
})