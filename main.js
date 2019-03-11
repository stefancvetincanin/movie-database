const s = selektor => document.getElementById(selektor)
const getUrl = "https://baza-filmova.herokuapp.com/filmovi/"
const getNaslov = "https://baza-filmova.herokuapp.com/pokazi-film/5be9da410f0a326f85bd120f"
const postUrl = "https://baza-filmova.herokuapp.com/dodaj-film/"
const deleteUrl = "https://baza-filmova.herokuapp.com/obrisi-film/"
let stringUpis = ""

const rezultatDiv = s(rezultat)

fetch(getUrl)
  .then( response => response.json() )
  .then( function (response) {
    console.log(response)
    for( let i = 0; i < 10; i++) {
      stringUpis += response[i].naslov
    }
  })