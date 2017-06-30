'use strict'

const authEvents = require('./auth/events.js')
const gameEvents = require('./game/game-events.js')

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
// const api = require('./api')
// const events = require('./events')
// const ui = require('./ui')

$(function () {
  console.log(config)
  setAPIOrigin(location, config)
  $('form').on('submit', function (event) {
    event.preventDefault()
    const input = $('#name').val()
    console.log(input)
    $('#myModal').modal('hide')
  })
})
// On document ready
$(() => {
  // $('#-welcome-modal-').modal({backdrop: 'static'})
  $('#spots li').click(gameEvents.playerTurn)
  authEvents.addHandlers()
  gameEvents.addHandlers()
})
