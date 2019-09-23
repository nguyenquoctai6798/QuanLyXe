const db = require('./db')
const sequelize = require('sequelize');
const seatCategory = db.define('seatCategory', {
  seattotal: sequelize.INTEGER
})

module.exports = seatCategory