'use strict'

const config = require('../config')
const store = require('../store')
console.log("===CONFIG======", config);

const gameInfo = () =>
  $.ajax({
    url: config.apiOrigin + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })

const createGame = () =>
  $.ajax({
    url: config.apiOrigin + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })

const updateGame = (data) =>
$.ajax({
  url: config.apiOrigin + '/games/' + store.current_game_id,
  method: 'PATCH',
  headers: {
    Authorization: 'Token token=' + store.user.token
  },
  data
})

module.exports = {
  gameInfo,
  createGame,
  updateGame
}
