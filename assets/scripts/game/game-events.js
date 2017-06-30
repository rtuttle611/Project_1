'use strict'

const gapi = require('./game-api')
const gui = require('./game-ui')
let currentPlayer = 'x'
let gameArray = []

const onUpdateGame = function(index, value, over) {
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
const onCellClick = function(e) {
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


const playerTurn = function(spot) {
  gameArray = []
  $(this).text(currentPlayer)

  $('#spots li').each((i, e) => {
    gameArray.push(e.textContent)
  })

  console.log("DO WE HAVE A WINNER", checkForWinner(currentPlayer))

  if (currentPlayer === 'x') {
    currentPlayer = 'o'
  } else {
    currentPlayer = 'x'
  }
}

const checkForWinner = function(player) {
  console.log('is the player here', player)
  console.log('gameArray', gameArray)
  return winningRow(player) || winningCol(player) || winnningDiag(player)
}

const allThree = function(player, spot1, spot2, spot3) {
  return (spot1 === player) && (spot2 === player) && (spot3 === player)
}
const winningRow = function(player) {
  return allThree(player, gameArray[0], gameArray[1], gameArray[2]) ||
    allThree(player, gameArray[3], gameArray[4], gameArray[5]) ||
    allThree(player, gameArray[6], gameArray[7], gameArray[8])
}
const winningCol = function(player) {
  return allThree(player, gameArray[0], gameArray[3], gameArray[6]) ||
    allThree(player, gameArray[1], gameArray[4], gameArray[7]) ||
    allThree(player, gameArray[2], gameArray[5], gameArray[8])
}
const winnningDiag = function(player) {
  return allThree(player, gameArray[0], gameArray[4], gameArray[8]) ||
    allThree(player, gameArray[2], gameArray[4], gameArray[6])
}

const onCreateGame = function() {
  gapi.createGame()
    .then(gui.createGameSuccess)
    .catch(gui.failure)
}

const onRestartGame = function() {
  // gameState.gameFinished()
  onCreateGame()
}

const onGameInfo = function(e) {
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
