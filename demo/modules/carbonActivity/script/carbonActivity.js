var $authentication = $("#authentication-dialog"),
	$activityTabs = $("#activity-tabs"),
	$activityTypeDialog = $("#activity-type-dialog");

var $cancelBtn = $(".cancel-button"),
    $activityCancelDialog = $("#activity-cancel-dialog");

var minus = $(".num-minus"),
    num   = $(".num-text").find("input"),
    plus  = $(".num-plus");

var $carpool = $(".carpool"),
    $activitySuccessDialog = $("#activity-success-dialog");

var $exchange = $(".exchange-button"),
    $activityChangeDialog = $("#activity-change-dialog");


$(function () {
	init();
	bindEvent();
	
   

	function init () {

        // 计算人数
        num_count(10);

		Carousel.init($("#J_Poster"));
		$("#activity-tabs").tabs({
			callback : function ($menu) {
				console.log($menu);
			}
		})
//		未实名认证框
		$authentication.dialog({
			width : 740,
			content : '<div class="authentication"><i class="icon-cry"></i>发起拼车需要实名认证，你还没有实名认证喔~</div>',
			buttons : [
				{
					text : '去实名认证',
					className : 'btn-success'
				},
				{
					text : '取消',
					className : 'btn-default close'
				},
			],
			callback : function ($btn) {
				console.log($btn);
			}
		})
//		活动类型认证框
		var activityTypeContent = '<div class="activity-type-list">'+
									'<form>'+
										'<label>'+
											'<img src="../../statics/image/icons/icon-activity-car88.png"/>'+
											'<h4>拼车</h4>'+
											'<input type="radio" name="activi-type"  value="拼车" />'+
											'<i></i>'+
										'</label>'+
										'<label>'+
											'<img src="../../statics/image/icons/icon-activity-car88.png"/>'+
											'<h4>换物</h4>'+
											'<input type="radio" name="activi-type"  value="换物" />'+
											'<i></i>'+
										'</label>'+
										'<label>'+
											'<img src="../../statics/image/icons/icon-activity-car88.png"/>'+
											'<h4>平台活动</h4>'+
											'<input type="radio" name="activi-type"  value="平台活动" />'+
											'<i></i>'+
										'</label>'+
									'</form>'+
								'</div>';	
		$activityTypeDialog.dialog({
			width : 800,
			title : '请选择活动类型',
			content : activityTypeContent,
			buttons : [
				{
					text : '下一步',
					className : 'btn-success'
				},
				{
					text : '取消',
					className : 'btn-default close'
				},
			],
			callback : function ($btn) {
				console.log($btn);
			}
		})
	}

	var CancelContent = '<div class="cancal-text"><i class="ico-warn"></i>撤销将不再恢复，您确定要撤销此活动</div>';
	$activityCancelDialog.dialog({
		width : 800,
		content : CancelContent,
		buttons : [
			{
				text : '确定',
				className : 'btn-success'
			},
			{
				text : '取消',
				className : 'btn-default close'
			},
		],
		callback : function ($btn) {
			console.log($btn);
		}
	})


	/*成功发送弹出框*/
	var sendContent = '<div class="cancal-text"><i class="ico-success"></i>申请已发送给车主，等待车主回复</div>';
	$activitySuccessDialog.dialog({
		width : 800,
		content : sendContent,
		buttons : [
			{
				text : '确定',
				className : 'btn-success'
			},
			{
				text : '取消',
				className : 'btn-default close'
			},
		],
		callback : function ($btn) {
			console.log($btn);
		}
	})

	/*交换弹出框*/
	var exchangeSendContent = '<div class="cancal-text"><i class="ico-success"></i>申请已发送，等待物主回复</div>';
	var exchangeContent = '<div class="change-text">'+
	                           '<div class="change-select">'+
	                               '我的物品名称：'+
	                               	'<div class="input-item address-item "  onclick="register.toggleDropdown(event,this)">'+
			                        	'<input type="text" class="input" id="province" placeholder="广东省" value="" readonly/>'+
			                        	'<i class="icon-down"></i>'+
			                        	'<ul class="dropdown-list" id="provinceDropdown">'+
			                        		'<li onclick="register.selectItem(this)">广东1</li>'+
			                        		'<li onclick="register.selectItem(this)">广东2</li>'+
			                        		'<li onclick="register.selectItem(this)">广东3</li>'+
			                        		'<li onclick="register.selectItem(this)">广东4</li>'+
			                        	'</ul>'+
			                        '</div>'+
			                    '</div>'+
	                       '</div>';
	$activityChangeDialog.dialog({
		width : 800,
		content : exchangeContent,
		buttons : [
			{
				text : '确定',
				className : 'btn-success success-send-button'
			},
			{
				text : '取消',
				className : 'btn-default close'
			},
		],
		callback : function ($btn) {
			console.log($btn);
			/*修改为发送成功内容*/
            $(this).removeClass('success-send-button');
            $(".dialog-body").html(exchangeSendContent);

		}
	})

	function bindEvent () {
		$activityTabs.on('click','.btn-active',function () {
//			$authentication.data('Dialog').open();
			$activityTypeDialog.data('Dialog').open();
		});

		$cancelBtn.on("click",function(){
			$activityCancelDialog.data('Dialog').open();
		});
  
		$carpool.on("click",function(){
			$activitySuccessDialog.data('Dialog').open();
		});

		$exchange.on("click",function(){
			$activityChangeDialog.data('Dialog').open();
		});		
       

       /*支付方式选择*/
       pay_method();
       
       choose("select-plan-item");

       private();
	}
})


/*数量添加*/
var frihtml =   '<div class="add-fri-box">'+
					'<div class="fri-text">'+
						'<i class="icon-warn-little"></i>'+
						'对方还不是您的碳友！'+
					'</div>'+
					'<p class="fri-note">'+
						'请先添<span class="add-fri-note">加好友~</span>'+
					'</p>'+
				'</div>';

function num_count(max){
   minus.on("click",function(){
   	   plus.removeClass('useless')
       var number = parseInt(num.val());
       number = --number;
       console.log(number);
       if(number == 1){
       	  minus.addClass('useless');
       }else{
       	  plus.removeClass("useless");
       }
       number = number <= 1 ? 1 :number;
       num.val(number);
   });
   plus.on("click",function(){
   	   minus.removeClass("useless");
       var number = parseInt(num.val());
       max = parseInt(max);
       number = ++number;
       console.log(number);
       if(number == max){
       	  plus.addClass('useless');
       }
       number = number >= max ? max :number;
       num.val(number);
   })
}
/*支付方式选择方法*/
function pay_method(){
    $(".method-item").on("click",function(){
    	$(this).addClass("active").siblings(".method-item").removeClass("active");
    	var method = $(this).attr("data-name");
    	$(".pay-method-name").text(method);
    });
}
/*私信弹出框*/
function private(){
    $(".private-chat").on("click",function(){
    	var pop = $(this).find(".add-fri-box");
    	console.log("btn")
    	if(!pop.length){
    		$(this).append(frihtml);
            fribox();
    	}else{
    		pop.remove();
    	}
    	return false;
    });

    $(document).on("click",function(){
    	console.log("333");
    	$(".add-fri-box").remove();
    });
}
/*加好友框内部事件*/
function fribox(){
    $(".add-fri-box").on("click",function(e){
    	e.stopPropagation();
    })	
}
/*选择方法*/
function choose(obj){
	var obj = "." + obj;
	$(obj).on("click",function(){
		$(this).addClass("active").siblings(obj).removeClass("active");
	})
}