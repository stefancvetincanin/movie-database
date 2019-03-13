
const s = selektor => document.getElementById(selektor)
const getUrl = "https://baza-filmova.herokuapp.com/filmovi/"
const getNaslov = "https://baza-filmova.herokuapp.com/pokazi-film/5be9da410f0a326f85bd120f"
const postUrl = "https://baza-filmova.herokuapp.com/dodaj-film/"
const deleteUrl = "https://baza-filmova.herokuapp.com/obrisi-film/"
let stringUpis = ""

const rezultatDiv = s("rezultat")
const godinaGore = s("godinaGore")
const godinaDole = s("godinaDole")
const naslovGore = s("naslovGore")
const naslovDole = s("naslovDole")

let rezultati = []
let rezultatiTemp = []

function uporediGG(a, b) {
  if (a.godina < b.godina)
    return -1;
  if (a.godina > b.godina)
    return 1;
  return 0;
}

function uporediGD(b, a) {
  if (a.godina < b.godina)
    return -1;
  if (a.godina > b.godina)
    return 1;
  return 0;
}

function uporediNG(a, b) {
  if (a.naziv < b.naziv)
    return -1;
  if (a.naziv > b.naziv)
    return 1;
  return 0;
}

function uporediND(b, a) {
  if (a.naziv < b.naziv)
    return -1;
  if (a.naziv > b.naziv)
    return 1;
  return 0;
}

function prikazi(rezultati) {
  stringUpis = ""
  for (let i = 0; i < rezultati.length; i++) {
    stringUpis += `
      <div class="film-info"><img src="${rezultati[i].slika}" alt="" height="400">
      <p>${rezultati[i].naziv}</p>
      <p>${rezultati[i].godina}</p></div>
      `
  }
  rezultatDiv.innerHTML = stringUpis
}

fetch(getUrl)
  .then(response => response.json())
  .then(function (response) {
    rezultati = rezultatiTemp = response
    console.log(response)
    for (let i = 0; i < rezultati.length; i++) {
      stringUpis += `
      <div class="film-info"><img src="${rezultati[i].slika}" alt="" width="300" height="400">
      <p>${rezultati[i].naziv}</p>
      <p>${rezultati[i].godina}</p>
      </div>
      `
    }
    rezultatDiv.innerHTML = stringUpis
    $("#loader-gif").hide()
  })

$('[name="thumbnail"]').on('change', function () {
  $('img.preview').prop('src', this.value);
});

godinaGore.addEventListener("click", function() {
  rezultatiTemp.sort(uporediGG)
  prikazi(rezultatiTemp)
})

godinaDole.addEventListener("click", function() {
  rezultatiTemp.sort(uporediGD)
  prikazi(rezultatiTemp)
})

naslovGore.addEventListener("click", function () {
  rezultatiTemp.sort(uporediNG)
  prikazi(rezultatiTemp)
})

naslovDole.addEventListener("click", function () {
  rezultatiTemp.sort(uporediND)
  prikazi(rezultatiTemp)
})


