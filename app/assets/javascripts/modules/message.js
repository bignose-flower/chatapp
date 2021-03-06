$(function() {

  function addHTML(message){
    if( message.image ){
      let html = `<div class="ChatList" data-message-id=${message.id}>
                    <div class="ChatInfo">
                      <div class="ChatInfo_name">${message.user_name}</div>
                      <div class="ChatInfo_date">${message.created_at}</div>
                    </div>
                    <p class="ChatList_message">${message.content}</p>
                    <img class="ChatList_image" src="${message.image}">
                  </div>`
      return html;
    }else {
      let html = `<div class="ChatList" data-message-id=${message.id}>
                    <div class="ChatInfo">
                      <div class="ChatInfo_name">${message.user_name}</div>
                      <div class="ChatInfo_date">${message.created_at}</div>
                    </div>
                    <p class="ChatList_message">${message.content}</p>
                  </div>`
      return html;
    };
  }

  $('.FormBox').on('submit', function(e) {
    e.preventDefault();
    let formdata = new FormData(this);
    const url = $(this).prop('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      let html = addHTML(message);

      $('.ChatLists').append(html);
      $('.FormBox')[0].reset();
      $('.FormBox_submit').prop("disabled", false);
      $('.Chat-Display').animate({ scrollTop: $('.Chat-Display')[0].scrollHeight});
      
    })
    .fail(function(){
      alert("メッセージの送信に失敗しました")
    })
  });
})