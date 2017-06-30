'use strict'

const gapi = require('./game-api')
const gui = require('./game-ui')
let currentPlayer = 'x'

const onUpdateGame = function (index, value, over) {
  let data = {}

  if (index === null && value === null) {
    data = {
      'game': {
        'over': over
      }
    }
  } else {
    data = {
      'game': {
        'cell': {
          'index': index,
          'value': value
        },
        'over': over
      }
    }
  }

  gapi.updateGame(data)
    .then(gui.success)
    .catch(gui.failure)
}

const gameState = {}
const onCellClick = function (e) {
  e.preventDefault()

  if (!($(this).data('data-mark'))) {

    const clickedCellIndex = $('.cell-content').index($(this))

    if (gameState.whichPlayerTurn() === 'x') {
      $(this).addClass('mark-x')
      $(this).data('data-mark', 'x')
    } else {
      $(this).addClass('mark-o')
      $(this).data('data-mark', 'o')
    }

    const clickedCellValue = $(this).data('data-mark')
    const currentState = gameState.stateUpdate()
    isOver = false

    if (currentState === 'draw') {
      $('.game-over-content').text('The game was a draw!')
      $('#-game-over-modal-').modal({
        backdrop: 'static',
        keyboard: false
      })
      isOver = true
    } else if (currentState !== '') {
      $('.game-over-content').text('Player ' + (currentState === 'x' ? 'RED' : 'BLUE') + 'was the winner!')
      $('#-game-over-modal-').modal({
        backdrop: 'static',
        keyboard: false
      })
      isOver = true
    }

    onUpdateGame(clicked_cell_index, clicked_cell_value, is_over)
  }
}


const playerTurn = function () {
  console.log($(this));
  $(this).text(currentPlayer)
  if (currentPlayer === 'x') {
    currentPlayer = 'o'
  } else {
    currentPlayer = 'x'
  }
}

const onCreateGame = function () {
  gapi.createGame()
    .then(gui.createGameSuccess)
    .catch(gui.failure)
}

const onRestartGame = function () {
  // gameState.gameFinished()
  onCreateGame()
}

const onGameInfo = function (e) {
  e.preventDefault()
  gapi.gameInfo()
    .then(gui.gameInfoSuccess)
    .catch(gui.failure)
}

const addHandlers = () => {
  $('.cell-content').on('click', onCellClick)
  $('#restart-button').on('click', onRestartGame)
  $('#game-info-button').on('click', onGameInfo)
}

module.exports = {
  addHandlers,
  onCreateGame,
  onRestartGame,
  onUpdateGame,
  playerTurn
}
