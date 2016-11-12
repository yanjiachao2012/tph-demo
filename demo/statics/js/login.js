function toggleStatus(obj) {
	var remeberCheckbox = $("#remeber-checkbox");
	if (remeberCheckbox.prop("checked") == true) {
		$(obj).removeClass("remeber-checkbox-no")
	} else {
		$(obj).addClass("remeber-checkbox-no")
	}
}