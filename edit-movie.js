const s = selektor => document.getElementById(selektor)

let idFilma = location.search.substring(5)

if (idFilma == "") idFilma = "5be9da410f0a326f85bd120f"

const naziv = s("naziv")
const godina = s("godina")
const slika = s("slika")

console.log(idFilma);

fetch(`https://baza-filmova.herokuapp.com/pokazi-film/${idFilma}`)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        godina.value = response.godina
        naziv.value = response.naziv
        slika.value = response.slika
    })