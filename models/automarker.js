const db = require('./db')
const sequelize = require('sequelize');
const bus = require('./bus')
const automarker = db.define('automarker', {
  name: sequelize.STRING
},
  {
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ]
  })
automarker.hasMany(bus)
module.exports = automarker
