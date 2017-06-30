'use strict'

const gevents = require('../game/game-events')
const store = require('../store')

const signUpSuccess = (data) => {
  $('#messages-sign-up').text("You're all signed up! Now sign in below!")
}

const signUpFailure = (data) => {
  console.log("======ERROR=======", data);
  $('#messages-sign-up').text("Uh-oh! Something went wrong- try again!")
}

const signInSuccess = (data) => {
  $('#messages-sign-in').text("LET'S PLAY SOME MUH-FUGGIN TRIPLE T!")
  store.user = data.user
  gevents.onRestartGame()
  $('#-welcome-modal-').modal('hide')
}

const signInFailure = (data) => {
  $('#messages-sign-in').text("Uh-oh! Something went wrong- try again!");
}

const changePasswordSuccess = (data) => {
  $('#-change-password-modal-').modal('hide')
}

const signOutSuccess = () => {
  store.user = null
  $('#-sign-out-modal-').modal('hide')
  $('#-welcome-modal-').modal({
    backdrop: 'static'
  })
}

const failure = (error) => {}

module.exports = {
  failure,
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
  changePasswordSuccess,
  signOutSuccess
}
