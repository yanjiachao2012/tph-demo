$(function() {
    funPlaceholder(document.getElementById("realName"));
    funPlaceholder(document.getElementById("realId"));
    funPlaceholder(document.getElementById("realSign"));
    $('.birthday_date').datetimepicker({
        language: 'zh-CN',
        minView: "month",
        format: "yyyy-mm-dd",
        todayHighlight: true,
        showMeridian: true,
        autoclose: true
    });

    /**获取社区**/
    $.ajax({
        url: path() + '/communityController/queryCommunity.do',
        type: "post",
        dataType: "json",
        success: function(res) {
            var html = "";
            for (var i = 0, len = res.length; i < len; i++) {
                html += '<li onclick="infoManager.selectItem(this)" id="' + res[i].id + '">' + res[i].areaName + '</li>';
            }
            $("#communityDropdown").append(html);
        }
    });
    /**获取景区**/
    $.ajax({
        url: path() + '/scenicController/queryScenic.do',
        type: "post",
        dataType: "json",
        success: function(res) {
            var html = "";
            for (var i = 0, len = res.length; i < len; i++) {
                html += '<li onclick="infoManager.selectItem2(this)" id="' + res[i].id + '">' + res[i].areaName + '</li>';
            }
            $("#spotDropdown").append(html);
        }
    });
    /**获取绑定项**/
    $.ajax({
        url: path() + '/cardNew/queryAreaCardCategory.do',
        type: "post",
        dataType: "json",
        data: {
            pageSize: '999',
            start: '1'
        },
        success: function(res) {
            console.log(res)
            var html = "";
            for (var i = 0, len = res.length; i < len; i++) {
                html += '<div class="bingding-item">';
                html += '<h6 class="item-title" onclick="infoManager.toggleShow(this,\'' + res[i].id + '\');">' + res[i].name;
                if (res[i].binding == 'true') {
                    html += '<span class="bingding-tip">已绑定</span>';
                }
                html += '<a href="javascript:" onclick="modifyContent(event,this);" class="modify">解除</a></h6>';
                html += '<div class="item-content"></div></div>';
            }
            $("#wrapManagerBingding").append(html);

        }
    });
    /**当前部分高亮**/
    var infoId = getQueryString("infoManagerid");
    if (infoId == 'infoManagerEdit') {
        $("#infoManagerEdit").css("display", "block")
    } else if (infoId == 'infoManagerBingding') {
        $("#infoManagerBingding").css("display", "block")
    } else if (infoId == 'infoManagerRealName') {
        $("#infoManagerRealName").css("display", "block")
    }

    var infoItem = $("#leftInfoManager").find(".left-item");
    var currentHref = document.location.href;
    $.each(infoItem, function() {
        if (currentHref.indexOf($(this).children('a').attr("href")) != -1) {
            $(this).addClass("active-item");
        }
    })

});

/*************************************
 编辑部分
 **********************/
/**选择男女**/
var infoManager = {
    selectSex: function(obj) {
        var _attrValue = $(obj).attr("attr-value"),
            _selectSex = $("#selectSex");
        _selectSex.val(_attrValue);
        $(obj).addClass("select-input");
        $(obj).siblings().removeClass("select-input");
    },
    toggleDropdown: function(obj) {
        $(obj).children('.dropdown-list').slideToggle(300);
    },
    selectItem: function(obj) {
        var _communitySelect = $("#communitySelect");
        _communitySelect.val($(obj).text())
        _communitySelect.attr("attr-value", $(obj).attr("id"))
    },
    /**提交编辑资料并跳到下一步**/
    nextStep: function() {
        var _editName = $("#editName").val(),
            _hiddenLogo = $("#hiddenLogo").val(),
            _selectSex = $("#selectSex").val(),
            _birthdayDate = $("#birthdayDate").val(),
            _editTel = $("#editTel").val(),
            _editEmail = $("#editEmail").val(),
            _communitySelect = $("#communitySelect").attr("attr-value"),
            _spotSelect = $("#spotSelect").attr("attr-id"),
            _spotRemove = $("#spotRemove").attr("attr-id");
        if (_editName == "") {
            alert("昵称不能为空")
            return;
        }
        if (_editTel == "") {
            alert("手机号码不能为空")
            return;
        }
        $.ajax({
                url: path() + '/myInfoController/updateInfo.do',
                type: 'get',
                dataType: 'json',
                data: {
                    name: _editName,
                    sex: _selectSex,
                    birthday: _birthdayDate,
                    mobilePhone: _editTel,
                    email: _editEmail,
                    community: _communitySelect,
                    scenics: _spotSelect,
                    delScenics: _spotRemove,
                    logo: _hiddenLogo
                },
                success: function(res) {
                    if (res.success) {
                        alert(res.message)
                            /* $("#infoManagerEdit").css("display", "none");
                             $("#infoManagerBingding").css("display", "block");*/
                    } else {
                        alert(res.message)
                    }

                },
                error: function(res) {
                    alert(res.message)
                }
            })
            /**/
    },

    selectItem2: function(obj) {
        var _showSelected = $("#showSelected");
        var str = '';
        if (_showSelected.find("li").length >= 5) {
            alert("不能超过五个景区")
        } else {
            str = '<li id=' + $(obj).attr("id") + '>' + $(obj).text() + '<i class="i-remove" onclick="infoManager.removeSpot(this)"></i></li>';
            _showSelected.prepend(str);
            var _spotSelect = $("#spotSelect");
            _spotSelect.val($(obj).text())
            _spotSelect.attr("attr-id", $(obj).attr("id"))
        }

    },
    removeSpot: function(obj) {
        $(obj).parent().remove();
    },

    upPhoto: function(obj) {
        var form = $("#pcedit_form");
        var options = {
            url: path() + '/component/upload.do?chunks=1&chunk=0',
            type: 'post',
            success: function(data) {
                var jsondata = eval("(" + data + ")");
                var url = jsondata.attachment.url;
                $("#hiddenLogo").val(url);
                $("#showLogo").attr("src", path() + '/common/download_photo.jsp?path=' + url);
            }
        };
        form.ajaxSubmit(options);
    },
    /**隐藏展示页面**/
    toggleShow: function(obj, id) {
        $(obj).parent().siblings().removeClass("active-item");
        if ($(obj).siblings().css("display") == "block") {
            $(obj).parent().removeClass("active-item");
        } else {
            $(obj).parent().addClass("active-item");
        }
        /**获取景区**/
        $.ajax({
            url: path() + '/cardNew/queryCard.do',
            type: "post",
            dataType: "json",
            data: {
                id: id
            },
            success: function(res) {
                console.log(res)
                var html = "";

                html += '<div class="wrap-item"><label class="content-left">' + res.name + '：</label>';
                if (res.binding == 'true') {
                    html += '<div class="content-right"><input type="text" value="' + res.cardNum + '" readonly placeholder="请输入内容" /></div></div>';
                } else {
                    html += '<div class="content-right"><input type="text"  placeholder="请输入内容" /></div></div>';
                }

                html += '<p class="tip">' + res.memo + '</p>';
                if (res.binding == 'true') {
                    html += '<a class="save-bingding" href="javascript:" onclick="infoManager.delBingding(\'' + res.cardId + '\')" ">解除绑定</a>';
                } else {
                    html += '<a class="save-bingding" href="javascript:" onclick="infoManager.saveContent(this,\'' + res.id + '\');">保存</a>';
                }

                $(obj).next().html(html);

            }
        });
    },
    /**解除绑定**/
    delBingding: function(id) {
        $.ajax({
            url: path() + '/cardNew/deleteCard.do',
            type: "post",
            dataType: "json",
            data: {
                id: id
            },
            success: function(res) {
                window.location.reload();
                alert(res.message)
            }
        })
    },
    /**保存*/
    saveContent: function(obj, id) {
        var _input = $(obj).siblings(".wrap-item").find("input"),
            _contentRight = $(obj).siblings(".wrap-item").find(".content-right");
        if (_input.val() == "") {
            alert("亲，内容还没有填完整")
        } else {
            _contentRight.css("border-color", "#fff");
            _input.attr("readonly", true);
        }
        $.ajax({
            url: path() + '/cardNew/addCard.do',
            type: "post",
            dataType: "json",
            data: {
                cardType: id,
                cardNum: _input.val()
            },
            success: function(res) {
                window.location.reload();
                alert(res.message)
            }
        })
    },
    obtainName: function(obj) {
        var _obtainName = $("#obtainName");
        _obtainName.val($(obj).text());
    },
    obtainUserCode: function(obj) {
        var _obtainUserCode = $("#obtainUserCode");
        _obtainUserCode.val($(obj).text());
    }

};
/**跳转到下一步**/
/*************************************
 
 
 **********************/



/**修改**/
function modifyContent(event, obj) {
    var _input = $(obj).parent().siblings(".item-content").find("input"),
        _contentRight = $(obj).parent().siblings(".item-content").find(".content-right");

    event.stopPropagation();
}
/*************************************
 
 
 **********************/
/**实名认证提交**/
function realSave() {
    var _realName = $("#realName").val(),
        _realId = $("#realId").val(),
        _picId1 = $("#picId1").val(),
        _picId2 = $("#picId2").val(),
        _realSign = $("#realSign").val(),
        _realTime = $("#realTime").val();
    if (_realName == "") {
        alert("姓名不能为空");
        return;
    }
    if (_realId == "") {
        alert("身份证号不能为空");
        return;
    }
    if (_picId1 == "") {
        alert("正面照不能为空");
        return;
    }
    if (_picId2 == "") {
        alert("反面照不能为空");
        return;
    }
}