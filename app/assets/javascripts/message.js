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

  function addNoUser(){
    let html = `<div class="ChatMember clearfix">
                  <p class="ChatMember__name">ユーザーが見つかりません</p>
                </div>`
    $('#UserSearchResult').append(html);
  }

  $('#UserSearch__field').on('keyup', function(){
    let input = $('#UserSearch__field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: { keyword: input }
    })
    .done(function(users) {
      $('#UserSearchResult').empty();
      if (users.length !== 0){
        users.forEach(function(user) {
          addUser(user);
        });
      }else if (input.length == 0){
        addNoUser();
      }else {
        addNoUser();
      }
    })
    .fail(function(){
      alert('フォームの読み取りに失敗しました')
    })
  })

  function insertMember(id, name) {
    let html = `<div class="ChatMember">
                  <p class="ChatMember__name">${name}</p>
                  <input name="group[user_ids][]" type="hidden" value="${id}" />
                  <div class="ChatMember__remove 
                  ChatMember__button">削除</div>
                </div>`;
    $('.ChatMembers').append(html);
  }


  $('#UserSearchResult').on('click', '.ChatMember__add', function() {
    let parent = $(this).parent();
    parent.remove();
    let id = $(this).data('user-id');
    let name = $(this).data('user-name');
    insertMember(id, name);
  })
  $('.ChatMember').on('click', '.ChatMember__remove', function(){
    let parent = $(this).parent();
    parent.remove();
  })
})