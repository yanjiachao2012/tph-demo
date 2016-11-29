$(function() {
  var inpress_btn = $('.impress');

  inpress_btn.toggle(function() {
    $(this).find('.impress-box').show();
  }, function() {
    $(this).find('.impress-box').hide();
  });

  $('.send-coins').toggle(function() {
    $(this).children().show();
  }, function() {
    $(this).children().hide();
  });


  $('#send-coins').click(function(e) {
    e.stopPropagation();
    $(this).parent().hide();
    $('.send-success').show();
    setTimeout(function() {
      $('.input-coin').show();
      $('.send-success').hide();
    }, 3000)
  });


  $('#send-chat-msg').val("具体的你").focus();

  $('#chat-seach-inp').on('keyup', function(event) {
    event.preventDefault();
    if ($(this).val().length > 1) {
      $('.avatar-feeds').hide()
    } else {
      $('.avatar-feeds').show()
    }
  });
  //去除空格
  $("textarea").on("change", function() {

    $(this).val($(this).val().replace(/\s+/g, ''));
  });
});

function sendContent() {
  var _sendChatMsg = $("#send-chat-msg");
  if (_sendChatMsg.val().length <= 0) {
    alert("输入内容不能为空")
  } else {
    var strChat = '';
    strChat += '<li class="me-say"><img src="../../statics/image/atvatar.png">';
    strChat += '<div class="say-box">' + _sendChatMsg.val() + '<i></i></div></li>';
    $("#chatBoxContent").append(strChat);
    _sendChatMsg.val('');
  }

}