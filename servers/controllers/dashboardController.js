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

// view page for user details page
exports.dashboard = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        
        res.render('dashboard-view');




        // console.log('Connected as ID '+ connection.threadId);

        // connection.query("SELECT * from user where status='active'", (err, rows) => {
        //     connection.release();

        //     if(!err){
        //         let removedUser = req.query.removed;
        //         res.render('home', { rows, removedUser });
        //     }else{
        //         console.log(err);
        //     }
        //     console.log('The data from user table: \n', rows);
        // });
    });
}
