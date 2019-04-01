
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
const pagesDiv = s("pages")

let rezultati = []
let rezultatiTemp = []
let rezultatiZaPrikaz = []
let mnozilacStranice = 1

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
  if (a.naziv.toLowerCase().trim() < b.naziv.toLowerCase().trim())
    return -1;
  if (a.naziv.toLowerCase().trim() > b.naziv.toLowerCase().trim())
    return 1;
  return 0;
}

function uporediND(b, a) {
  if (a.naziv.toLowerCase().trim() < b.naziv.toLowerCase().trim())
    return -1;
  if (a.naziv.toLowerCase().trim() > b.naziv.toLowerCase().trim())
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
      display = 8
      break
    case 2:
      display = 12
      break
    case 3:
      display = 16
      break
    default:
      break
  }

  stringUpis = ""
  if (display > rezultati.length) display = rezultati.length

  if (brojPrikaza.selectedIndex !== 0) {
    let brojStranica = prikaziSelektore(rezultati.length, display)
    let brojac = 0
    if (mnozilacStranice > 1) {
      brojac = (mnozilacStranice * display) - display
    }
    console.log("Broj Stranica " + brojStranica)
    console.log("Mnozilac: " + mnozilacStranice)
    for (let i = brojac; i < mnozilacStranice * display; i++) {
      if (rezultati[i] !== undefined) {
        stringUpis += `
        <div class="film-info">
          <a href="single-movie.html?_id=${rezultati[i]._id}" target="_blank">
            <img src="${rezultati[i].slika}" alt="" width="300" height="400"  class="movie-thumb" data-id="${rezultati[i]._id}">
          </a>
          <p>${rezultati[i].naziv}</p>
          <p>${rezultati[i].godina}</p>
        </div>
      `

        rezultatDiv.innerHTML = stringUpis

        $(`.page-selector:nth-child(${mnozilacStranice})`).addClass("active-selector")
        $(`.page-selector:nth-child(${mnozilacStranice})`).siblings().removeClass("active-selector")
      }
    }
  } else {
    pagesDiv.innerHTML = `<div class="page-selector active-selector">1</div>`
    for (let i = 0; i < display; i++) {
      stringUpis += `
        <div class="film-info">
          <a href="single-movie.html?_id=${rezultati[i]._id}" target="_blank">
            <img src="${rezultati[i].slika}" alt="" width="300" height="400"  class="movie-thumb" data-id="${rezultati[i]._id}">
          </a>
          <p>${rezultati[i].naziv}</p>
          <p>${rezultati[i].godina}</p>
        </div>
      `
    }
    rezultatDiv.innerHTML = stringUpis
  }
}

function prikaziSelektore(duzinaNiza, displayPoStrani) {
  let pagesString = `<div class="page-selector active-selector">1</div>`
  let brojStranica = Math.floor(duzinaNiza / displayPoStrani)
  if (duzinaNiza % displayPoStrani !== 0) brojStranica++
  for (let i = 1; i < brojStranica; i++) {
    pagesString += `<div class="page-selector">${i + 1}</div>`
  }
  pagesDiv.innerHTML = pagesString

  $(".page-selector").on("click", function () {
    mnozilacStranice = Number($(this).html())
    prikazi(rezultatiZaPrikaz)
  })

  return brojStranica
}

fetch(getUrl)
  .then(response => response.json())
  .then(function (response) {
    rezultati = rezultatiTemp = response
    prikazi(rezultati)
    rezultatiZaPrikaz = rezultati
    $("#loader-gif").hide()
  })

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
  rezultatiTemp = prikazNaziv
  mnozilacStranice = 1
  prikazi(prikazNaziv)
})

brojPrikaza.addEventListener("change", function () {
  brojPrikaza2.selectedIndex = brojPrikaza.selectedIndex
  mnozilacStranice = 1
  prikazi(rezultatiZaPrikaz)
})
brojPrikaza2.addEventListener("change", function () {
  brojPrikaza.selectedIndex = brojPrikaza2.selectedIndex
  mnozilacStranice = 1
  prikazi(rezultatiZaPrikaz)
})

