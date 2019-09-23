const db = require('./db')
const sequelize = require('sequelize');
const seat = require('./seat')
const bus = db.define('bus', {
  name: sequelize.STRING,
  img: sequelize.STRING,
  description: sequelize.STRING,
  seattotal: sequelize.STRING
},
  {
    indexes: [
      {
        fields: ['name', 'seattotal']
      }
    ]
  })

bus.hasMany(seat)
module.exports = bus