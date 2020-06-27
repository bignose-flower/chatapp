$(function(){

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

  let reloadMessages = function(){
    let last_message_id = $('.ChatList:last').data("message-id");

    $.ajax({
      url: "api/messages",
      type: "GET",
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0){
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += addHTML(message);
        })
        $('.ChatLists').append(insertHTML);
        $('.Chat-Display').animate({ scrollTop: $('.Chat-Display')[0].scrollHeight});
      }
      
    })
    .fail(function(){
      alert('error');
    });
  }
  setInterval(reloadMessages, 7000);
})