$(function() {
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
  })
})