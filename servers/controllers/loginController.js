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
exports.login = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;

        console.log('Connected as ID '+ connection.threadId);
        login = true;
        res.render('login', { login });
    });
}

exports.signup = (req, res) => {
    const { first_name, email, password, confirm_password } = req.body;
    pool.getConnection((err, connection) => {
        if(err) throw err;
    
        connection.query("insert into user set first_name = ?, password = ?, email = ?",[first_name, password, email], (err, rows) => {
        connection.release();
        login = true;

            if(!err){
                res.render('login', { alert: 'User added succesfully!!!', login});
            }else{
                console.log(err);
            }
        });
    });
}