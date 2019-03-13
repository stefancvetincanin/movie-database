
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
const naziv = s("title")
const brojPrikaza = s("broj-prikaza")
const brojPrikaza2 = s("broj-prikaza2")

let rezultati = []
let rezultatiTemp = []
let rezultatiZaPrikaz = []

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
  if (a.naziv.toLowerCase() < b.naziv.toLowerCase())
    return -1;
  if (a.naziv.toLowerCase() > b.naziv.toLowerCase())
    return 1;
  return 0;
}

function uporediND(b, a) {
  if (a.naziv.toLowerCase() < b.naziv.toLowerCase())
    return -1;
  if (a.naziv.toLowerCase() > b.naziv.toLowerCase())
    return 1;
  return 0;
}

function prikazi(rezultati) {
  let display
  switch (brojPrikaza.selectedIndex) {
    case 0:
      display = rezultati.length
      break
    case 1:
      display = 4
      break
    case 2:
      display = 8
      break
    case 3:
      display = 12
      break
    default:
      break
  }
  if (display > rezultati.length) display = rezultati.length
  console.log(display)
  stringUpis = ""
  for (let i = 0; i < display; i++) {
    stringUpis += `
      <div class="film-info"><a href="single-movie.html?_id=${rezultati[i]._id}" target="_blank"><img src="${rezultati[i].slika}" alt="" width="300" height="400"  class="movie-thumb" data-id="${rezultati[i]._id}"></a>
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
    // console.log(response)
    prikazi(rezultati)
    rezultatiZaPrikaz = rezultati
    $("#loader-gif").hide()
  })

$('[name="slika"]').on('change', function () {
  $('img.preview').prop('src', this.value);
});

godinaGore.addEventListener("click", function () {
  rezultatiTemp.sort(uporediGG)
  rezultatiZaPrikaz = rezultatiTemp
  prikazi(rezultatiTemp)
})

godinaDole.addEventListener("click", function () {
  rezultatiTemp.sort(uporediGD)
  rezultatiZaPrikaz = rezultatiTemp
  prikazi(rezultatiTemp)
})

naslovGore.addEventListener("click", function () {
  rezultatiTemp.sort(uporediNG)
  rezultatiZaPrikaz = rezultatiTemp
  prikazi(rezultatiTemp)
})

naslovDole.addEventListener("click", function () {
  rezultatiTemp.sort(uporediND)
  rezultatiZaPrikaz = rezultatiTemp
  prikazi(rezultatiTemp)
})

naziv.addEventListener("input", function () {
  const prikazNaziv = rezultati.filter(film =>
    film.naziv.toLowerCase().includes(naziv.value.toLowerCase())
  )
  rezultatiZaPrikaz = prikazNaziv
  prikazi(prikazNaziv)
})

brojPrikaza.addEventListener("change", function () {
  // alert("promena " + brojPrikaza.selectedIndex)
  brojPrikaza2.selectedIndex = brojPrikaza.selectedIndex
  prikazi(rezultatiZaPrikaz)
})
brojPrikaza2.addEventListener("change", function () {
  // alert("promena " + brojPrikaza.selectedIndex)
  brojPrikaza.selectedIndex = brojPrikaza2.selectedIndex
  prikazi(rezultatiZaPrikaz)
})