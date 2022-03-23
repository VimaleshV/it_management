const mysql = require('mysql');

//mysql connection configuration
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME,
    port            : process.env.DB_PORT
});

const profile_image = 'default.png';

// view page for user details page
exports.schedule = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;

        console.log('Connected as ID '+ connection.threadId);
        res.render('event-schedule');
    });
}