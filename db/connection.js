const mysql = require("mysql2")
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'books_db'
  },
  console.log(`Connected to the books_db database.`)
);

db.connect(err => {
  if (err) throw err
})

module.exports = db