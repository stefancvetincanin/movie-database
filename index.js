const s = selektor => document.getElementById(selektor)
const getUrl = "https://baza-filmova.herokuapp.com/filmovi/"
let stringUpis = ""

const rezultatDiv = s("slike-filmova")
let rezultati = []

fetch(getUrl)
  .then(response => response.json())
  .then(response => {
    rezultati = response
    let broj = []
    console.log(rezultati);
    let max = rezultati.length
    console.log(max);
    let min = 0
    // generating 3 random numbers, with a ceiling of movie array length
    for (let i = 0; i < 3; i++) {
      broj[i] = Math.floor(Math.random() * (max - min)) + min
      for (let j = 0; j < broj.length - 1; j++) {
        if (broj[i] == broj[j]) {
          broj.splice(i)
          i--
        }
      }
    }
    for(let i = 0; i < broj.length; i++) {
      console.log(rezultati[broj[i]])
      stringUpis += `
      <a href="single-movie.html?_id=${rezultati[broj[i]]._id}" target="_blank" class="index-slika-link">
        <img src="${rezultati[broj[i]].slika}" alt="Picture of a movie" class="index-slika">
      </a>
      `
    }
    rezultatDiv.innerHTML = stringUpis
  })