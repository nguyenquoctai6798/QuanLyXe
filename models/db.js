const sequelize = require('sequelize');
const db = new sequelize({
  database: 'bookingTicket',
  username: 'postgres',
  password: 'nguyen_tai_9',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
})

db.authenticate().then(() => {
  console.log("Success!");
}).catch((err) => {
  console.log(err);
});
db.sync()

module.exports = db
