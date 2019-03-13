const s = selektor => document.getElementById(selektor)

const getUrl = "https://baza-filmova.herokuapp.com/filmovi/"
const prikazDiv = s("movie-prikaz")

let idFilma = location.search.substring(5)
let stringPrikaz = ""
let stringKomentari = ""
let rezultati = []
let nasFilm

// prikazDiv.innerHTML = "Informacije o filmu"

if(idFilma == "") idFilma = "5be9da410f0a326f85bd120f"

fetch(getUrl)
  .then(response => response.json())
  .then(function (response) {
    rezultati = response
    // console.log(rezultati)
    nasFilm = rezultati.filter( x => {
        if(x._id == idFilma) {
            return true
        } else return false
    })
    if((nasFilm[0].comments !== undefined) && (nasFilm[0].comments !== null)) {
        nasFilm[0].comments.forEach(element => {
            stringKomentari += `
                ${element.user}:<br>
                ${element.comment}<br>
            `
        });
        stringPrikaz = `
        <img src="${nasFilm[0].slika}" class="single-slika">
        <p class="single-naziv">${nasFilm[0].naziv}</p>
        <p class="single-godina">${nasFilm[0].godina}</p>
        <p class="single-reviews">Reviews by our users:</p>
        <p class="single-komentari">${stringKomentari}</p>
    `
    } else {
        stringPrikaz = `
        <img src="${nasFilm[0].slika}" class="single-slika">
        <p class="single-naziv">${nasFilm[0].naziv}</p>
        <p class="single-godina">${nasFilm[0].godina}</p>
        <p class="single-reviews">This movie has no reviews!</p>
    `
    }
    
    prikazDiv.innerHTML = stringPrikaz
  })