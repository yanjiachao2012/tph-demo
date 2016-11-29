$(function() {
    funPlaceholder(document.getElementById("realName"));
    funPlaceholder(document.getElementById("realId"));
    funPlaceholder(document.getElementById("realSign"));
    ArrayIndexOf();
    /**获取社区**/
    /* $.ajax({
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
     });*/
    /**获取景区**/
    /* $.ajax({
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
     });*/
    /**获取绑定项**/
    /* $.ajax({
         url: path() + '/cardNew/queryAreaCardCategory.do',
         type: "post",
         dataType: "json",
         data: {
             pageSize: '999',
             start: '1'
         },
         success: function(res) {
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
     });*/
    /**当前部分高亮**/
    var infoId = getQueryString("infoManagerid");
    if (infoId == 'infoManagerEdit') {
        $("#infoManagerEdit").css("display", "block")
    } else if (infoId == 'infoManagerBingding') {
        $("#finished-process").css("width", "50%")
        $("#process-part2").addClass("process-active-part")
        $("#infoManagerBingding").css("display", "block")
    } else if (infoId == 'infoManagerRealName') {
        $("#finished-process").css("width", "100%")
        $("#process-part3").addClass("process-active-part")
        $("#process-part2").addClass("process-active-part")
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
 编辑个人资料部分
 **********************/
var attrid = [], //此为全局变量和customer.js里面的相连
    attrRemoveId = [];
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
        _spotRemove = _spotRemove.split(',');
        _spotRemove = Array.prototype.unique(_spotRemove).join(',');
        var reg = /^1[3|4|5|7|8][0-9]{9}$/;
        if (_editName == "") {
            alert("昵称不能为空")
            return;
        }
        if (_editTel == "") {
            alert("手机号码不能为空")
            return;
        } else if (!reg.test(_editTel)) {
            alert("手机号码格式不对")
            return;
        } else if (_editTel.length != 11) {
            alert("手机号码长度不对")
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
                        window.location.reload();
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
            str = '<li>' + $(obj).text() + '<i class="i-remove" onclick="infoManager.removeSpot(this,\'' + $(obj).attr("id") + '\')"></i></li>';
            var _spotSelect = $("#spotSelect");
            if (jQuery.inArray($(obj).attr("id"), attrid) == -1) {
                _showSelected.append(str);
                attrid.push($(obj).attr("id"));
                _spotSelect.attr("attr-id", attrid)
            } else {
                alert("不能添加相同的景区")
            }
        }

    },
    removeSpot: function(obj, id) {
        var _spotRemove = $("#spotRemove");
        var _spotSelect = $("#spotSelect");
        if (jQuery.inArray(id, attrRemoveId) == -1) {
            ArrayIndexOf();
            attrRemoveId.push(attrid.splice(attrid.indexOf(id), 1));
            _spotSelect.attr("attr-id", attrid)
                /*   if (_spotSelect.attr("attr-id").length == 0) {
                       _spotSelect.val("")
                   }*/
            _spotRemove.attr("attr-id", attrRemoveId);
        }

        $(obj).parent().remove();
    },

    upPhoto: function(obj, form, hiddenObj, showObj) {
        var form = $('#' + form);
        var options = {
            url: path() + '/component/upload.do?chunks=1&chunk=0&name=1',
            type: 'post',
            success: function(data) {
                var jsondata = eval("(" + data + ")");
                var url = jsondata.attachment.url;
                $("#" + hiddenObj).val(url);
                $("#" + showObj).attr("src", path() + '/common/download_photo.jsp?path=' + url);
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
        /**获取绑定内容**/
        $.ajax({
            url: path() + '/cardNew/queryCard.do',
            type: "post",
            dataType: "json",
            data: {
                id: id
            },
            success: function(res) {
                var html = "";

                if (res.iscities == 1) {
                    if (res.binding == 'true') {
                        html += '<div class="wrap-item"><label class="content-left" style="width:98px;">社区名称：</label>';
                        html += '<div class="content-right">';
                        html += '<input type="text" class="bingding-input" value="' + res.areaName + '" id="obtainName" readonly />';
                        html += '</div></div>';
                    } else {
                        html += '<div class="wrap-item"><label class="content-left" style="width:98px;">社区名称：</label>';
                        html += '<div class="content-right"  onclick="infoManager.toggleDropdown(this)">';
                        html += '<input type="text" id="obtainName" readonly /><i class="i-dropdown"></i>';

                        html += '<ul class="dropdown-list">';
                        for (var i = 0, len = res.areas.length; i < len; i++) {
                            html += '<li onclick="infoManager.obtainName(this,\'' + res.areas[i].id + '\')">' + res.areas[i].areaName + '</li>';
                        }
                        html += '</ul></div></div>';
                    }

                    html += '<div class="wrap-item"><label class="content-left" style="width:98px;">' + res.name + '：</label>';
                    if (res.theInput == 0) {
                        if (res.binding == 'true') {
                            html += '<div class="content-right">';
                            html += '<input type="text" class="bingding-input" value=' + res.cardNum + ' readonly />';
                            html += '</div>';
                        } else {
                            html += '<div class="content-right" onclick="infoManager.toggleDropdown(this)">';
                            html += '<input type="text" class="input" id="obtainUserCode" readonly /><i class="i-dropdown"></i>';
                            html += '<ul class="dropdown-list" style="max-height:300px;overflow-y:auto;">';
                            html += '</ul></div>';
                        }

                    } else if (res.theInput == 1) {
                        html += '<div class="content-right">';
                        if (res.binding == 'true') {
                            html += '<input class="input bingding-input" type="text" readonly value="' + res.cardNum + '" /></div>';
                        } else {
                            html += '<input class="input" type="text" value="" /></div>';
                        }

                    }
                    html += '</div>';
                } else {
                    html += '<div class="wrap-item"><label class="content-left">' + res.name + '：</label>';
                    if (res.binding == 'true') {
                        html += '<div class="content-right"><input type="text" class="bingding-input" value="' + res.cardNum + '" readonly placeholder="请输入内容" /></div></div>';
                    } else {
                        html += '<div class="content-right"><input class="input" type="text"  placeholder="请输入内容" /></div></div>';
                    }
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
        var _input = $(obj).siblings(".wrap-item").find(".input"),
            _contentRight = $(obj).siblings(".wrap-item").find(".content-right"),
            communityId;
        if ($(obj).siblings(".wrap-item").find("#obtainName")) {
            communityId = $(obj).siblings(".wrap-item").find("#obtainName").attr("attr-id");
        } else {
            communityId = ''
        }
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
                cardNum: _input.val(),
                community: communityId
            },
            success: function(res) {
                window.location.reload();
                alert(res.message)
            }
        })
    },
    obtainName: function(obj, id) {

        $(obj).parent().siblings('#obtainName').val($(obj).text());
        $(obj).parent().siblings('#obtainName').attr("attr-id", id);
        $.ajax({
            url: path() + '/cardNew/queryCardDoorplate.do',
            type: "post",
            dataType: "json",
            data: {
                id: id
            },
            success: function(res) {
                var html = '';
                for (var i = 0, len = res.length; i < len; i++) {
                    html += '<li onclick="infoManager.obtainUserCode(this,\'' + res[i].value + '\');">' + res[i].name + '</li>'
                }
                $(obj).parents(".wrap-item").next().find(".dropdown-list").html(html);
            }
        })


    },
    obtainUserCode: function(obj, id) {
        $(obj).parent().siblings('#obtainUserCode').val($(obj).text());
    }

};

/**兼容indexOF**/
function ArrayIndexOf() {
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(elt) {
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
            if (from < 0)
                from += len;
            for (; from < len; from++) {
                if (from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    }
}

/**数组去重**/
Array.prototype.unique = function(obj) {
    ArrayIndexOf();
    var arr1 = obj;
    var arr2 = [];
    for (var i = 0; i < obj.length; i++) {
        if (arr2.indexOf(obj[i]) == -1) {
            arr2.push(obj[i]);
        }
    }
    return arr2;

};
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
        _picId2 = $("#picId2").val();
    var resNum = /^\d*$/g;
    if (_realName == "") {
        alert("姓名不能为空");
        return;
    }
    if (_realId == "") {
        alert("身份证号不能为空");
        return;
    } else if (_realId.length != 18) {
        alert("身份证号码长度不对")
        return;
    } else if (!resNum.test(_realId)) {
        alert("身份证号码格式不对")
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
    $.ajax({
        url: path() + '/myInfoController/submitCert.do',
        type: "get",
        dataType: "json",
        data: {
            name: _realName,
            idNumber: _realId,
            reverseUrl: _picId1,
            idPhoto: _picId2
        },
        success: function(res) {

            if (res.success == 'true') {
                alert(res.message)
            }
            window.location.reload();
        }
    })
}