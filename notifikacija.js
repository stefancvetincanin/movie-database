$(document).ready(function() {
  const ws = new WebSocket('ws://baza-filmova.herokuapp.com')
  ws.addEventListener('message', e => {
    console.log(e.data) // TODO: prikazati notifikaciju u headeru
    $("#notifikacija").slideDown()
  })
  $("#notifikacija-close").on("click", function() {
    $("#notifikacija").slideUp()
  })
})