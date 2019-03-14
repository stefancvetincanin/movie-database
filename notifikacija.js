$(document).ready(function() {
  const ws = new WebSocket('wss://baza-filmova.herokuapp.com')
  ws.addEventListener('message', e => {
    console.log(e.data) // TODO: prikazati notifikaciju u headeru
    $("#notifikacija").slideDown()

    //reject unauthorized false
  })
  $("#notifikacija-close").on("click", function() {
    $("#notifikacija").slideUp()
  })
})

//dodati jedan s za secure u ws