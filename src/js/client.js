console.log('hello world');

$(init);

function init() {
  $('.favourite').on('click', addFavourite);
}

function addFavourite() {
  const bandId = $(this).attr('data-band-id');
  console.log(bandId);

  $
    .post(`http://localhost:3000/bands/${bandId}/favourite`)
    .done(console.log('success'));
}
