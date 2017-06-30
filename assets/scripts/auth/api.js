'use strict'

const config = require('../config')
const store = require('../store')

const signUp = function (data) {
  console.log(config.apiOrigin)
  return $.ajax({
    url: config.apiOrigin.development + '/sign-up/',
    method: 'POST',
    data
  })
}

const signIn = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-in/',
    method: 'POST',
    data
  })
}

const changePassword = function (data) {
  // console.log(data)
  return $.ajax({
    url: config.apiOrigin.development + '/change-password/',
    method: 'POST',
    data
  })
}

const signOut = function () {
  $.ajax({
    url: config.host + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut

}
