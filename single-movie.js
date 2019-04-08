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

if (idFilma == "") idFilma = "5be9da410f0a326f85bd120f"

function render(nasFilm) {
    let plotFilma = ""
    let director = ""
    let starring = ""
    if (omdbInfo.Response == "False") {
        director = starring = plotFilma = omdbInfo.Error
    } else {
        plotFilma = omdbInfo.Plot
        director = omdbInfo.Director
        starring = omdbInfo.Actors
    }

    if ((nasFilm[0].comments !== undefined) && (nasFilm[0].comments !== null)) {
        nasFilm[0].comments.forEach(element => {
            stringKomentari += `
                <p class="comment-user-name">${element.user}:</p>
                <p class="comment-user-review">${element.comment}</p>
            `
        });
        stringPrikaz = `
        <img src="${nasFilm[0].slika}" class="single-slika">
        <p class="single-naziv">${nasFilm[0].naziv}</p>
        <p class="single-godina">${nasFilm[0].godina}</p>
        <p class="director">Director: ${director}</p>
        <p class="starring">Starring: ${starring}</p>
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
        <p class="director">Director: ${director}</p>
        <p class="starring">Starring: ${starring}</p>
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

function addEditButton() {
    s("delete-div").innerHTML += 
        `
            <button class="delete-container" title="Edit movie">
                <a href="edit-movie.html?_id=${idFilma}" target="_blank">
                    <img src="https://img.icons8.com/ios/50/000000/multi-edit-filled.png" alt="Delete button" class="delete-button" id="edit-button">
                </a>
            </button>
        `
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
        fetch(`https://www.omdbapi.com/?t=${nasFilm[0].naziv}&y=${nasFilm[0].godina}&plot=full&apikey=${apiKey}`)
            .then(omdb => omdb.json())
            .then(omdb => {
                omdbInfo = omdb
                render(nasFilm)
            })
    })

addEditButton()

s("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    if (s("del-username").value == "admin") {
        alert("Successfully logged in!")
        $("#login-div").hide()
        $("#delete-div").show()
    } else {
        alert("Incorrect username or password.")
    }
})

s("delete-button").addEventListener("click", function () {
    fetch('https://baza-filmova.herokuapp.com/obrisi-film/', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: idFilma })
    })
        .then(response => response.text())
        .then(text => {
            console.log(text)
            s("delete-div").innerHTML += `<br>The entry with the ID: ${idFilma} has been successfully deleted.`
        })
})

