const db = require('./db')
const sequelize = require('sequelize');
const seat = db.define('seat', {
  seatcode: sequelize.TEXT,
  numberfloor: sequelize.STRING
})

module.exports = seat