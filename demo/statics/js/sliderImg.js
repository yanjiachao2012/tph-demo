 function sliderImg(objId) {
     var wrapBanner = $("#" + objId);
     var banner = wrapBanner.find(".banner");
     var bannerLi = banner.find("li"); //获取所有图片的li
     var index = 0,
         timer = null;

     /***左右滑动按钮**/
     var htmlBtn = '<div class="select"><a href="javascript:void(0);"class="prev"><i></i></a>';
     htmlBtn += '<a href="javascript:void(0);" class="next"><i></i></a></div>',
         wrapBanner.append(htmlBtn);
     /**dot初始化**/
     var htmlDot = "";
     htmlDot = '<div class="dot banner-dot">';
     for (var i = 0; i < bannerLi.length; i++) {
         htmlDot += '<i class="dot-item"></i>';
     }
     htmlDot += '</div>';
     wrapBanner.append(htmlDot);
     var prevA = wrapBanner.find(".prev");
     var nextA = wrapBanner.find(".next");
     var bannerDot = wrapBanner.find(".banner-dot");
     var dotI = bannerDot.find(".dot-item"); //获取所有的点
     dotI.eq(0).addClass("on");
     //配置参数
     var options = {
         speed: 400, //速度
         time: 5000 //时间间隔
     };
     //对整个wrap-banner的处理
     wrapBanner.on("mouseover", function() {
         clearInterval(timer);
     }).mouseout(function() {
         timer = setInterval(time, options.time)
     });

     //小点的鼠标滑过事件
     dotI.on("click", function() {
         clearInterval(timer);
         index = $(this).index();
         //当在当前图片时则不发生变化
         if ($(this).hasClass('on')) {
             return false;
         } else {
             toggle();
         }
     });
     //上一张
     prevA.on("click", function() {
         index--;
         if (index < 0) {
             index = bannerLi.length - 1;
         }
         toggle();
     });
     //下一张
     nextA.on("click", function() {
         index++;
         if (index > bannerLi.length - 1) {
             index = 0;
         }
         toggle();
     });
     //定时器
     timer = setInterval(time, options.time);

     /*切换图片函数*/
     function toggle() {
         dotI.removeClass("on").eq(index).addClass("on");
         bannerLi.fadeOut(options.speed).eq(index).fadeIn(options.speed);
     }

     /*定时器函数*/
     function time() {
         index++;
         if (index > bannerLi.length - 1) {
             index = 0;
         }
         toggle();
     }
 }