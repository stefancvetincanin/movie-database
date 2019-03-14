const s = selektor => document.getElementById(selektor)

const getUrl = "https://baza-filmova.herokuapp.com/filmovi/"
const prikazDiv = s("movie-prikaz")
const apiKey = "b09e257"

let omdbInfo
let idFilma = location.search.substring(5)
let stringPrikaz = ""
let stringKomentari = ""
let rezultati = []
let nasFilm

// prikazDiv.innerHTML = "Informacije o filmu"

if (idFilma == "") idFilma = "5be9da410f0a326f85bd120f"

function render(nasFilm) {
    let plotFilma = ""
    if(omdbInfo.Response == "False") {
        plotFilma = omdbInfo.Error
    } else plotFilma = omdbInfo.Plot
    
    if ((nasFilm[0].comments !== undefined) && (nasFilm[0].comments !== null)) {
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
        <button id="spoiler">Synopsis - Spoiler!</button>
        <div id="spoiler-text" class="spoiler-text invisible-spoiler">${plotFilma}</div>
        <p class="single-reviews">Reviews by our users:</p>
        <p class="single-komentari">${stringKomentari}</p>
    `
    } else {
        stringPrikaz = `
        <img src="${nasFilm[0].slika}" class="single-slika">
        <p class="single-naziv">${nasFilm[0].naziv}</p>
        <p class="single-godina">${nasFilm[0].godina}</p>
        <button id="spoiler">Synopsis - Spoiler!</button>
        <div id="spoiler-text" class="spoiler-text invisible-spoiler">${plotFilma}</div>
        <p class="single-reviews">This movie has no reviews!</p>
    `
    }
    prikazDiv.innerHTML = stringPrikaz

    document.getElementById("spoiler").addEventListener("click", function () {
        document.getElementById("spoiler-text").classList.toggle("invisible-spoiler")
    })
}


fetch(getUrl)
    .then(response => response.json())
    .then(function (response) {
        rezultati = response
        nasFilm = rezultati.filter(x => {
            if (x._id == idFilma) {
                return true
            } else return false
        })
        // fetch plot info-a
        fetch(`http://www.omdbapi.com/?t=${nasFilm[0].naziv}&y=${nasFilm[0].godina}&plot=full&apikey=${apiKey}`)
            .then(omdb => omdb.json())
            .then(omdb => {
                omdbInfo = omdb
                // console.log(omdbInfo.Plot)

                render(nasFilm)
            })



    })

s("login-form").addEventListener("submit", function(e) {
    e.preventDefault();
    if(s("del-username").value == "admin") {
        alert("Successfully logged in!")
        $("#login-div").hide()
        $("#delete-div").show()
    } else {
        alert("Incorrect username or password.")
    }
})

s("delete-button").addEventListener("click", function() {
    console.log("DELETED")
    // fetch(`https://baza-filmova.herokuapp.com/obrisi-film/`)
    // setTimeout(function() {
    //     document.location.href = newUrl;
    // }, 3000)
})

let myObj = {
    id: idFilma
}

console.log(myObj);

console.log(JSON.stringify(myObj))