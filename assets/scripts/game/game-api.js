// 'use strict'
//
// const config = require('../config')
// const store = require('../store')
//
// const gameInfo = () =>
//   $.ajax({
//     url: config.host + '/games',
//     method: 'GET',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     }
//   })
//
// const createGame = () =>
//   $.ajax({
//     url: config.host + '/games',
//     method: 'POST',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     }
//   })
//
// const updateGame = (data) =>
// $.ajax({
//   url: config.host + '/games/' + store.current_game_id,
//   method: 'PATCH',
//   headers: {
//     Authorization: 'Token token=' + store.user.token
//   },
//   data
// })
//
// module.exports = {
//   gameInfo,
//   createGame,
//   updateGame
// }
