$(function() {
  /****导航条*/
  $.ajax({
    type: "get",
    url: path() + "/foreignMenu/nav.do",
    dataType: "html",
    success: function(res) {
      /*  var html = '<li class="nav-item active-item"><a class="item-a" href="/">首页</a></li>';
        for (var i = 0; i < res.length; i++) {
            var value = res[i];
            if (value.parent.length > 0) {
                html += '<li class="nav-item" id="' + value.id + '"><a class="item-a" href="#">' + value.name + '</a>';
                html += '<div class="wrap-sub-nav"><ul>';
                for (var n = 0; n < value.parent.length; n++) {
                    html += '<li class="sub-nav-item"><a href="' + value.parent[n].address + '">' + value.parent[n].name + '</a></li>';
                }
                html += '</ul></div></li>';
            } else {
                html += '<li class="nav-item" id="' + value.id + '"><a class="item-a" href="' + path() + value.address + '">' + value.name + '</a></li>'
            }

        }*/
      $(".wrap-nav-tph").html(res);
      //地市
      $.ajax({
        type: "post",
        url: path() + "/foreignIndex/getCityList.do",
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
      navSub();
      //
      pageFoot();
    }

  });
  //
});
/**
 * 尾部数据
 */
function pageFoot() {
  $.ajax({
    type: "get",
    url: path() + "/modules/pageFoot.html",
    dataType: "html",
    success: function(res) {
      $(".pageFooter").html(res);
      /***合作伙伴**/
      $.ajax({
        type: "get",
        url: path() + "/foreignIndex/getAdPartner.do",
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
    }
  });
}

function selectCity(obj) {
  var _selectCity = $("#selectCity");
  var _selectCityText = _selectCity.text(); //旧城市
  _selectCity.text($(obj).text()) //新城市
  $(obj).text(_selectCityText)
  $(".wrap-up").removeClass("selectStatus")
  $("#addressList").fadeOut();
}