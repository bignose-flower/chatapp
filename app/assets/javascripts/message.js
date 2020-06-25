$(function() {

  function addHTML(message){
    if( message.image ){
      let html = `<div class="ChatList">
                    <div class="ChatInfo">
                      <div class="ChatInfo_name">${message.user_name}</div>
                      <div class="ChatInfo_date">${message.created_at}</div>
                    </div>
                    <p class="ChatList_message">${message.content}</p>
                    <img class="ChatList_image" src="${message.image}">
                  </div>`
      return html;
    }else {
      let html = `<div class="ChatList">
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
      $('.Chat-Display').animate({ scrollTop: $('.Chat-Display')[0].scrollHeight});
      $('.FormBox')[0].reset();
      $('.FormBox_submit')[0].disabled = false;
    })
    .fail(function(){
      alert("メッセージの送信に失敗しました")
    })
  });

  function addUser(user){
    let html = `<div class="ChatMember clearfix">
                  <p class="ChatMember__name">${user.name}</p>
                  <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>`
    $('#UserSearchResult').append(html);
  }

  function addNoUser(user){
    let html = `<div class="ChatMember clearfix">
                  <p class="ChatMember__name">ユーザーが見つかりません</p>
                </div>`
    $('#UserSearchResult').append(html);
  }

  $('.SettingGroupForm__input').on('keyup', function(){
    let input = $(this).val();
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: { keyword: input }
    })
    .done(function(users) {
      $(this).empty();
      if (input != ''){
        $.each(users, function(index, user) {
          addUser(user);
        })
      }
    })
    .fail(function(){
      alert('フォームの読み取りに失敗しました')
    })
  })
})