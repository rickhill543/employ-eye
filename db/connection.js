// dependencies
const mysql = require('mysql2');

// connection setup
const connect = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'L0(@l|_ock123!',
  database: 'employees'
});

connect.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connect.threadId + '\n');
});

// export connection setup
module.exports = {
    connection: connect
};