'use strict'

const store = require('../store')

const success = (data) => {
}

const failure = (error) => {
}

const gameInfoSuccess = (data) => {
  $('.game-info-content').text('Total Games Played: ' + (data.games.length - 1))
}

const createGameSuccess = (data) => {
  store.current_game_id = data.game.id
}

module.exports = {
  failure,
  success,
  gameInfoSuccess,
  createGameSuccess
}
