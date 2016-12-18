$(function() {
    navSub();
    /*   /****导航条
       $.ajax({
           type: "get",
           url: path() + "/foreignMenu/getCategoryList.do",
           //url: path() + "/indexNav.json",
           dataType: "json",
           success: function(res) {
               console.log(res)
               var html = '<li class="nav-item active-item"><a class="item-a" href="/">首页</a></li>';
               for (var i = 0; i < res.length; i++) {
                   var value = res[i];
                   if (value.parent.length > 0) {
                       html += '<li class="nav-item" id="' + value.id + '"><a class="item-a" href="#">' + value.name + '</a>';
                       html += '<div class="wrap-sub-nav"><ul>';
                       for (var n = 0; n < value.parent.length; n++) {
                           html += '<li class="sub-nav-item"><a href="' + value.parent[n].address + '?parentId=' + value.parent[n].id + '">' + value.parent[n].name + '</a></li>';
                       }
                       html += '</ul></div></li>';
                   } else {
                       html += '<li class="nav-item" id="' + value.id + '"><a class="item-a" href="' + path() + value.address + '">' + value.name + '</a></li>'
                   }

               }
               $("#tph-nav").append(html);
               navSub();

           }

       });*/
    /**低碳统计***/
    $.ajax({
        type: "post",
        url: path() + "/foreignMenu/getLowcarbonCount.do",
        dataType: "json",
        success: function(res) {
            var html = '<li class="item text-left"><div class="item-icon"><img src="statics/image/icon-co2.png" class="icon-co2"/></div>';
            html += '<div class="item-right"><h4><strong>' + res.carbon + '</strong><span>万吨</span></h4>';
            html += '<p>累计减碳量</p></div></li>';
            html += '<li class="item text-left"><div class="item-icon"><img src="statics/image/icon-member.png" class="icon-member"/></div><div class="item-right">';
            html += '<h4><strong>' + res.members + '</strong><span>人</span></h4><p>累计会员</p></div></li>';
            html += '<li class="item text-left"><div class="item-icon"><img src="statics/image/icon-company.png" class="icon-company"></div>';
            html += '<div class="item-right"><h4><strong>' + res.enterprise + '</strong><span>家</span></h4><p>低碳联盟</p></div></li>';
            html += '<li class="item text-left no-margin"><div class="item-icon"><img src="statics/image/icon-platform.png" class="icon-platform"></div>';
            html += '<div class="item-right"><h4><strong>' + res.achievement + '</strong><span>个</span></h4><p>减碳项目</p></div></li>';


            $("#carbonStatistics").append(html)
        }
    });
    /*低碳联盟*/
    $.ajax({
        type: "get",
        url: path() + "/foreignIndex/getAdBusiness.do",
        dataType: "json",
        success: function(res) {
            html = '';
            for (var i = 0; i < res.length; i++) {
                var value = res[i];
                html += '<li class="union-item"><a href=""><div class="wrap-pic">';
                html += '<img class="pic" src="' + path() + '/common/download_photo.jsp?path=' + value.logo + '" /></div>';
                html += '<div class="item-details"><h5>' + value.name + '</h5>';
                html += '<p>' + value.memo + '</p></div></a></li>';
            }
            $("#unionUl").append(html);
            lowCarbonSlibar("unionUl");

        }
    });
    /***合作伙伴**/
    $.ajax({
        type: "get",
        url: path() + "/foreignIndex/getAdBusiness.do",
        dataType: "json",
        success: function(res) {
            var html = "";
            for (var i = 0; i < res.length; i++) {
                var value = res[i];
                html += '<li><a href="' + value.address + '">' + value.name + '</a></li>';
            }
            $("#partnerList").append(html);
        }
    });
    /**低碳活动***/
    $.ajax({
        type: "post",
        url: path() + "/foreignIndex/getRecommend.do",
        dataType: "json",
        success: function(res) {
            var htmlLeft = "";
            var htmlRight = "";
            for (var i = 0; i < res.length; i++) {
                var value = res[i];
                var stateDate = new Date(value.stateDate).formatDate("yyyy-MM-dd hh:mm");
                var stateDate1 = new Date(value.stateDate).formatDate("yyyy-MM-dd");
                var endDate = new Date(value.endDate).formatDate("hh:mm");
                var remark15 = strOpearte(value.remark, 18);
                if (i == 0) {
                    htmlLeft += '<img src="' + path() + '/common/download_photo.jsp?path=' + value.propaganda + '" />';
                    htmlLeft += '<div class="hover-content"><h3>' + value.subject + '</h3>';
                    htmlLeft += '<div class="activity-address">';
                    htmlLeft += '<span class="plat">' + value.way + '</span><span>' + value.cities + '</span></div>';
                    htmlLeft += '<div class="activity-info">';
                    htmlLeft += '<p><span>【活动主题】:</span>' + value.subject + '</p>';
                    htmlLeft += '<p><span>【活动时间】:</span>' + stateDate + '-' + endDate + '</p>';
                    htmlLeft += '<p><span>【活动对象】:</span>全体</p>';
                    htmlLeft += '<p><span>【活动地点】:</span>' + value.address + '</p>	</div>';
                    htmlLeft += '<div class="address-intro">' + value.remark + '</div></div>';
                    htmlLeft += '<div class="activity-details"><div class="details-left">';
                    htmlLeft += '<h4>' + value.address + '</h4><span>' + stateDate1 + '</span></div>';
                    htmlLeft += '<div class="details-right"><i class="icon-member"></i><span>' + value.participationSum + '</span></div></div>'
                } else {
                    htmlRight += '<li class="item">';
                    htmlRight += '<img src="' + path() + '/common/download_photo.jsp?path=' + value.propaganda + '" />';
                    htmlRight += '<div class="hover-content"><h3>' + value.subject + '</h3>';
                    htmlRight += '<div class="activity-address">';
                    htmlRight += '<span class="plat">' + value.way + '</span><span>' + value.cities + '</span></div>';
                    htmlRight += '<div class="activity-info">';
                    htmlRight += '<p><span>【活动主题】:</span>' + value.subject + '</p>';
                    htmlRight += '<p><span>【活动时间】:</span>' + stateDate + '-' + endDate + '</p>';
                    htmlRight += '<p><span>【活动对象】:</span>全体</p>';
                    htmlRight += '<p><span>【活动地点】:</span>' + value.address + '</p>	</div>';
                    htmlRight += '<div class="address-intro">' + remark15 + '</div></div>';
                    htmlRight += '<div class="activity-details"><div class="details-left">';
                    htmlRight += '<h4>' + value.address + '</h4><span>' + stateDate1 + '</span></div>';
                    htmlRight += '<div class="details-right"><i class="icon-member"></i><span>' + value.participationSum + '</span></div></div></li>';

                }
            }
            $("#activityLeft").append(htmlLeft);
            $("#activityRight").append(htmlRight);
        }
    });
    $.ajax({
        type: "post",
        url: path() + "/foreignIndex/getAdBusiness.do",
        dataType: "json",
        success: function(res) {
            var html = '';
            for (var i = 0; i < res.length; i++) {
                var value = res[i];
                html += '<li class="item" onclick="selectCity(this);">' + value.name + '</li>';
            }
            $("#addressList").append(html);
        }
    });

    /**选择城市**/
    $("#wrapSelectAddress").on("click", function() {
        var addressList = $("#addressList");
        if (addressList.css("display") == "none") {
            $(this).addClass("selectStatus");
            addressList.fadeIn();

        } else {
            $(this).removeClass("selectStatus");
            addressList.fadeOut();
        }

    })

});

/***截取字符串**/
function strOpearte(obj, length) {
    var _str = obj.trim();
    return _str.substr(0, length).concat("...")
}

/**低碳联盟轮播图**/

function lowCarbonSlibar(obj) {
    var unionUl = $("#" + obj);
    var unionItem = unionUl.find(".union-item");
    var unionItem0 = unionItem.eq(0).outerWidth(true);
    var unionItem3 = unionItem0 * 3;
    var _rank = Math.ceil(unionItem0 * unionItem.length / unionItem3);
    var index = 1,
        timer1 = null;

    function scrollAuto() {
        unionUl.animate({
            left: '-' + unionItem3 * (index - 1)
        }, 600);
    }
    timer1 = setInterval(time, 5000)

    function time() {
        if (unionItem <= 3) {
            clearInterval(timer1);
        } else {
            index++;
            if (index > _rank) {
                index = 1;
            }
            scrollAuto();
        }

    }
    unionUl.on("mouseover", function() {
        clearInterval(timer1);
    })
    unionUl.on("mouseout", function() {
        timer1 = setInterval(time, 5000)
    })
    $("#turnLeft").on("click", function() {
        index++;
        clearInterval(timer1);
        if (index > _rank) {
            index = 1;
        }
        if (!unionUl.is(":animated")) {

            scrollAuto();
            timer1 = setInterval(time, 5000)
        }
    });
    $("#turnRight").on("click", function() {
        index--;
        clearInterval(timer1);
        if (index <= 0) {
            index = _rank;
        }
        if (!unionUl.is(":animated")) {
            scrollAuto();
            timer1 = setInterval(time, 5000)
        }
    });
}
/**选择城市**/
$("#wrapSelectAddress").on("click", function() {
    var addressList = $("#addressList");
    if (addressList.css("display") == "none") {
        $(this).addClass("selectStatus");
        addressList.fadeIn();

    } else {
        $(this).removeClass("selectStatus");
        addressList.fadeOut();
    }

})

function selectCity(obj) {
    var _selectCity = $("#selectCity");
    var _selectCityText = _selectCity.text(); //旧城市
    _selectCity.text($(obj).text()) //新城市
    $(obj).text(_selectCityText)
    $(".wrap-up").removeClass("selectStatus")
    $("#addressList").fadeOut();
}