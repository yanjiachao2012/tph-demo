function toggleTab(obj, obj0, obj1, obj2) {
	$(obj).addClass("active-item");
	$(obj).siblings().removeClass("active-item");
	$("#" + obj0).css("display", "block");
	$("#" + obj1).css("display", "none");
	$("#" + obj2).css("display", "none");
}

/**个人信息加载**/
$.ajax({
	type: "post",
	url: path() + "/myInfoController/init.do",
	dataType: "json",
	beforeSend: function() {
		$("#customerLeftTitle").html("加载中...")
	},
	success: function(res) {
		var html = '';
		html += '<div class="user-info"><div class="wrap-pic">';
		html += '<img class="pic" src="' + res.logo + '" /></div>';
		html += '<div class="user-info-right"><h4>' + res.name + '</h4>';
		if (res.sex == null) {
			html += '<span class="sex">性别：</span>';
			$("#sexMan").addClass("select-input");
		} else {
			if (res.sex == 'M') {
				html += '<span class="sex">性别：男</span>';
				$("#sexMan").addClass("select-input");
			} else {
				html += '<span class="sex">性别：女</span>';
				$("#sexWoman").addClass("select-input");
				$("#selectSex").val('F');
			}

		}

		html += '<p class="user-carbon-number">' + res.coinCountUSE + '</p>';
		html += '<span class="address">' + res.provinceName + ' ' + res.cityName + '</span></div></div>';
		html += '<div class="carbon-rank">碳友排名：<span>' + res.rownumber + '</span></div>';
		html += '<div class="carbon-expression"><div class="expression-left">碳友印象：</div><div class="expression-right">';
		if (res.impression.length > 0) {
			for (var i = 0, len = res.impression.length; i > len; i++) {
				html += '<span class="expression' + i + '">' + res.impression[i].IMPRESSION + '</span>';
			}
		}
		html += '</div></div>';
		$("#customerLeftTitle").append(html);

		$("#editName").val(res.name)
		$("#showLogo").attr("src", res.logo);
		$("#hiddenLogo").val(res.logo);
		var birthday = new Date(res.birthday).formatDate("yyyy-MM-dd");
		$("#birthdayDate").val(birthday);
		$("#editTel").val(res.mobilePhone);
		$("#editEmail").val(res.email);
		$("#communitySelect").val(res.community.areaName);
		$("#communitySelect").attr("attr-value", res.community.id);
		var html1 = "";
		for (var n = 0, m = res.scenics.length; n < m; n++) {
			$("#spotSelect").val(res.scenics[0].areaName);
			$("#spotSelect").attr("attr-id", res.scenics[0].id);
			html1 += '<li id="' + res.scenics[n].id + '">' + res.scenics[n].areaName + '<i class="i-remove" onclick ="infoManager.removeSpot(this)"> </i></li>';
		}
		$("#showSelected").append(html1);
	}
});