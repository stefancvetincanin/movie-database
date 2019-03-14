// document.getElementById("add-movie").addEventListener("submit", function(e) {
//   e.preventDefault()
// })

$('[name="slika"]').on('change', function () {
  $('img.preview').prop('src', this.value);
});