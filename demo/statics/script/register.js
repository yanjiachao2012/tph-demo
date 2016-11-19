var timer = null,
	count = 20,
	flag = false;
var register = {
	toggleDropdown: function(event, obj) {
		event.stopPropagation();
		$(obj).children('.dropdown-list').slideToggle(300);
		$(obj).siblings().find('.dropdown-list').css("display", "none");
	},
	selectItem: function(obj, id) {
		var _obj = $(obj).parent().siblings('.input');

		_obj.val($(obj).text())
		_obj.attr("attr-id", id)
	},
	selectItem2: function(obj, id) {
		var _obj = $(obj).parent().siblings('.input');

		_obj.val($(obj).text())
		_obj.attr("attr-id", id)
			/**选择地市**/
		$.ajax({
			url: path() + '/foreignIndex/getCityList.do',
			type: 'post',
			dataType: 'json',
			data: {
				parent_id: id
			},
			success: function(res) {
				var html = '';
				if (res.length > 0) {
					for (var i = 0, len = res.length; i < len; i++) {
						html += '<li onclick="register.selectItem(this,\'' + res[i].id + '\')">' + res[i].name + '</li>';
					}
				}
				$("#cityDropdown").html(html);
			}
		})
	},
	registerSumbit: function(obj) {
		var _province = $("#province").val(),
			_citySelect = $("#citySelect").attr("attr-id"),
			_registerTel = $("#registerTel").val(),
			_registerPw = $("#registerPw").val(),
			_registerSure = $("#registerSure").val(),
			registerCode = $("#registerCode").val();
		var regPw = /^[a-zA-Z0-9!"\#$%&'()*+,-.:;<=>?@]{6,18}$/;
		if (_citySelect == '') {
			alert('请先选择地市')
			return;
		}
		if (_registerPw == '') {
			alert('密码不能为空')
			return;
		} else if (!regPw.test(_registerPw)) {
			alert("密码不符合格式")
			return;
		}
		if (_registerPw != _registerSure) {
			alert("两次密码不一致")
			return;
		}
		if (registerCode == '') {
			alert("请先输入验证码")
			return;
		}
		$.ajax({
			url: path() + '/foreignHall/regUser.do',
			type: 'post',
			dataType: 'json',
			data: {
				city: _citySelect,
				mobilePhone: _registerTel,
				password: _registerPw,
				code: registerCode,
				name: ''
			},
			beforeSend: function() {
				$(obj).css("display", "none");
				$("#registerImg").css("display", "block");
			},
			success: function(res) {
				if (res.returnStatus == '0') {
					window.location.href = "customer/customerCoupon.html"
					alert(res.returnDesc)
					$(obj).css("display", "block");
					$("#registerImg").css("display", "none");
				}

			}
		});
	},
	obtainCode: function(obj) {
		var _registerTel = $("#registerTel").val();
		var regTel = /^1[3|4|5|7|8][0-9]{9}$/;
		if (_registerTel == '') {
			alert("手机号码不能为空")
			return;
		} else
		if (!regTel.test(_registerTel)) {
			alert("手机号码不符合格式")
			return;
		}
		$.ajax({
			url: path() + '/foreignHall/getCheckPwd.do',
			type: 'post',
			dataType: 'json',
			data: {
				mobile: _registerTel
			},
			success: function(res) {

				alert(res.message)
				register.disabledBtn();
			}
		});
	},
	disabledBtn: function() {
		if (flag == false) {
			timer = setInterval(register.setBtnValue, 1000);
		}

	},
	setBtnValue: function() {
		if (count <= 0) {
			$("#obtain-btn").text("获取验证码");
			count = 20;
			flag = false;
			clearInterval(timer);
		} else {
			flag = true;
			count--;
			$("#obtain-btn").text(count);
		}
	}
}
$(function() {
	new funPlaceholder(document.getElementById("province"));
	new funPlaceholder(document.getElementById("citySelect"));
	new funPlaceholder(document.getElementById("registerTel"));
	new funPlaceholder(document.getElementById("registerPw"));
	new funPlaceholder(document.getElementById("registerSure"));
	new funPlaceholder(document.getElementById("registerSure"));
	//去除空格
	$("input[type='password']").on("change", function() {
		$(this).val($(this).val().replace(/\s+/g, ''));
	});
	$(document).on("click", function() {
		$("#wrap-register").find(".dropdown-list").css("display", "none");
	});
	/**选择省份**/
	$.ajax({
		url: path() + '/foreignIndex/getParent.do',
		type: 'post',
		dataType: 'json',
		success: function(res) {
			var html = '';
			if (res.length > 0) {
				for (var i = 0, len = res.length; i < len; i++) {
					html += '<li onclick="register.selectItem2(this,\'' + res[i].id + '\')">' + res[i].name + '</li>';
				}
			}
			$("#provinceDropdown").html(html);
		}
	});
})

function CheckIntensity(pwd) {
	var low = $("#low"),
		middle = $("#middle"),
		height = $("#height");
	var m = 0;
	var Modes = 0;
	for (i = 0; i < pwd.length; i++) {
		var charType = 0;
		var t = pwd.charCodeAt(i);
		if (t >= 48 && t <= 57) {
			charType = 1;
		} else if (t >= 65 && t <= 90) {
			charType = 2;
		} else if (t >= 97 && t <= 122) {
			charType = 4;
		} else {
			charType = 4;
		}
		Modes |= charType;
	}
	for (i = 0; i < 4; i++) {
		if (Modes & 1) {
			m++;
		}
		Modes >>>= 1;
	}
	if (pwd.length <= 4) {
		m = 1;
	}
	if (pwd.length <= 0) {
		m = 0;
	}
	switch (m) {
		case 1:
			low.css("display", "inline-block");
			middle.css("display", "none");
			height.css("display", "none");
			break;
		case 2:
			low.css("display", "inline-block");
			middle.css("display", "inline-block");
			height.css("display", "none");
			break;
		case 3:
			low.css("display", "inline-block");
			middle.css("display", "inline-block");
			height.css("display", "inline-block");
			break;
		default:
			low.css("display", "none");
			middle.css("display", "none");
			height.css("display", "none");
			break;
	}
}