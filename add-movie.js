const s = selektor => document.getElementById(selektor)

$('[name="slika"]').on('change', function () {
  $('img.preview').prop('src', this.value);
});

s("add-movie").addEventListener("submit", function (e) {
  e.preventDefault()
  const movieInfo = {
    naziv: s("naziv").value,
    godina: s("godina").value,
    slika: s("slika").value
  }
  fetch('https://baza-filmova.herokuapp.com/dodaj-film/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movieInfo)
  })
    .then(response => response.text())
    .then(response => {
      console.log(response)
      s("post-info").innerHTML = response
    })
})