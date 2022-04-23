const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const db = require('../../utility/dbUtiltiy');

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
exports.login = async(req, res) => {
    login = true;
    res.render('login', { login });
}

exports.signup = async(req, res) => {
    const { first_name, email, password, confirm_password } = req.body;
    login = true;
    danger_flag = 'danger';
    if(first_name == ''){
        res.render('login', { signup_alert: 'Please give User name', login, danger_flag}); return false;
    }

    if(email == ''){
        res.render('login', { signup_alert: 'Please give Email', login, danger_flag}); return false;
    }

    if(password == ''){
        res.render('login', { signup_alert: 'Please give Password', login, danger_flag}); return false;
    }

    if(confirm_password == ''){
        res.render('login', { signup_alert: 'Please give Confirm Password', login, danger_flag}); return false;
    }

    if(password != '' && confirm_password != '' && password != confirm_password){
        res.render('login', { signup_alert: 'Please give same Password and Confirm Password', login, danger_flag}); return false;
    }

    var signupQry = await db.getDbResults("insert into user set first_name = first_name, password = password, email = email");

    if(signupQry.success){
        danger_flag = 'success';
        res.render('login', { signup_alert: 'User added succesfully!!!', login, danger_flag});
    }
}

// exports.signin = async(req, res) => {
//     const { signInEmail, signInPassword } = req.body;
//     login = true;

//     if(signInEmail == '' || signInPassword == ''){
//         res.render('login', { signin_alert: 'Please check Email and Password!!!', login}); return false;
//     }

//     var loginQry = await db.getDbResults("SELECT * from user where status='active' and email = signInEmail and password = signInPassword");
//     if(loginQry.success &&  loginQry.length != 0){
//         rows = loginQry.results;

//         const id = rows[0].id;
//         const token = jwt.sign({id}, "jwtSecret", {
//             expiresIn : 300,
//         })
//         req.session = rows;
//         res.render('homepage', {auth: true, token: token, rows});
//     }

// }

exports.signin = (req, res) => {
    const { signInEmail, signInPassword } = req.body;
    
    if(signInEmail == '' || signInPassword == ''){
        res.render('login', { signin_alert: 'Please check Email and Password!!!', login}); return false;
    }

    pool.getConnection((err, connection) => {
        if(err) throw err;

        connection.query("SELECT * from user where status='active' and email = ? and password = ? ", [signInEmail, signInPassword], (err, rows) => {

            connection.release();
            if(!err && rows.length != 0){

                const id = rows[0].id;
                const token = jwt.sign({id}, "jwtSecret", {
                    expiresIn : 300,
                })
                req.session = rows;
                res.render('homepage', {auth: true, token: token, rows});
            }else{
                login = true;
                res.render('login', { signin_alert: 'Please check Email and Password!!!', login});
            }
        });
    });
}

// view page for user details page
exports.logout = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;

        login = true;
        res.render('login', { login });
    });
}

// const verifyJWT = (req, res, next) => {
//     const token = req.headers['x-access-token'];

//     if(!token){
//         res.send("youw u need to token, please give it to the next time!");
//     }else{
//         jwt.verify(token, "jwtSecret", (err, decoded) => {
//             if(!err){
//                 console.log('success');
//                 // res.render('login', { alert: 'User added succesfully!!!', login});
//             }else{
//                 console.log(err);
//             }
//         })
//     }
// }

// app.get('/isUserAuth', verifyJWT, (req, res) => {
//     res.send('you are authenticated, congrats');
// })


