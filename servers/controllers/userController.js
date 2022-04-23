const db = require('../../utility/dbUtiltiy');

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
exports.view = async(req, res) => {
    try{

        var userListQry = await db.getDbResults("SELECT * from user where status = 'active'");

        if(userListQry.success){
            userListRes = userListQry.results;
        }

        res.render('home', { rows : userListRes }); 

    }catch(err){
        console.log(err);
        res.render('home');
    }   
}

//search values based on the data value
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;

        let searchTerm = req.body.search;

        connection.query("SELECT * from user where status='active' and first_name LIKE ? or last_name LIKE ? or email LIKE ? or phone_number LIKE ? or comments LIKE ?", ['%'+searchTerm+'%', '%'+searchTerm+'%', '%'+searchTerm+'%', '%'+searchTerm+'%', '%'+searchTerm+'%'], (err, rows) => {
            connection.release();

            if(!err){
                res.render('home', { rows });
            }else{
                console.log(err);
            }
            console.log('The search data from user table: \n', rows);
        });
    });
}

exports.form = async(req, res) => {
    res.render('add-user');
}

exports.create = (req, res) => {
    const { first_name, last_name, profile_picture, email, phone_number, comments } = req.body;
    pool.getConnection((err, connection) => {
        if(err) throw err;

        let searchTerm = req.body.search;

        let profile_picture;
        let uploadPath;
    
        if(!req.files || Object.keys(req.files).length ==0){
            console.log('No files were uploaded');
        }
    
        profile_picture = req.files.profile_picture;
        uploadPath = __dirname + '../../../upload/' + profile_picture.name;
                
        profile_picture.mv(uploadPath, function(err){
            if(err) res.status(500).send(err);        
        });

        if(profile_picture.name == ''){
            profile = profile_image; 
        }else{
            profile = profile_picture.name; 
        }
        connection.query("insert into user set first_name = ?, last_name = ?, profile_picture = ?, email = ?, phone_number = ?, comments = ?",[first_name, last_name, profile, email, phone_number, comments], (err, rows) => {
            connection.release();

            if(!err){
                res.render('add-user', { alert: 'User added succesfully!!!'});
            }else{
                console.log(err);
            }
            console.log('The search data from user table: \n', rows);
        });
    });
}

// edit the user based on the id
exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;

        connection.query("SELECT * from user where id = ? and status='active'", [req.params.id], (err, rows) => {
            connection.release();

            if(!err){
                res.render('edit-user', { rows });
            }else{
                console.log(err);
            }
            //console.log('The data from user table: \n', rows);
        });
    });
}

// update the user based on id
exports.update = (req, res) => {
    
    const { first_name, last_name, profile_picture, email, phone_number, comments } = req.body;
    pool.getConnection((err, connection) => {
        if(err) throw err;

            let profile_picture;
            let uploadPath;
        
            if(!req.files || Object.keys(req.files).length ==0){
                console.log('No files were uploaded');
            }
        
            profile_picture = req.files.profile_picture;
            uploadPath = __dirname + '../../../upload/' + profile_picture.name;
                    
            profile_picture.mv(uploadPath, function(err){
                if(err) res.status(500).send(err);        
            });

            connection.query("update user set first_name = ?, last_name = ?, profile_picture = ?, email = ?, phone_number = ?, comments = ? where id = ?", [first_name, last_name, profile_picture.name, email, phone_number, comments, req.params.id], (err, rows) => {
            connection.release();

            if(!err){
                pool.getConnection((err, connection) => {
                    if(err) throw err;
            
                    connection.query("SELECT * from user where id = ? and status='active'", [req.params.id], (err, rows) => {
                        connection.release();
            
                        if(!err){
                            res.render('edit-user', { rows, alert: 'User updated succesfully!!!'});
                        }else{
                            console.log(err);
                        }
                        //console.log('The data from user table: \n', rows);
                    });
                });
            }else{
                console.log(err);
            }
            //console.log('The data from user table: \n', rows);
        });
    });
}

//delete the user 
exports.delete = (req, res) => {
    /** pool.getConnection((err, connection) => {
        if(err) throw err;

        connection.query("delete from user where id = ? and status='active'", [req.params.id], (err, rows) => {
            connection.release();

            if(!err){
                res.redirect('/');
            }else{
                console.log(err);
            }
            //console.log('The data from user table: \n', rows);
        });
    });  **/

    pool.getConnection((err, connection) => {
        if(err) throw err;

        connection.query("update user set status='inactive' where id = ?", [req.params.id], (err, rows) => {
            connection.release();

            if(!err){
                let removedUser = encodeURIComponent('User removed succesfully!!');
                res.redirect('/view/?removed=' +removedUser);
                // res.redirect('/');
            }else{
                console.log(err);
            }
            //console.log('The data from user table: \n', rows);
        });
    });
}

exports.viewall = async(req, res) => {
    try{
        const { id } = req.body;

        var viewAllQry = await db.getDbResults("SELECT * from user where id = id");

        if(viewAllQry.success){
            viewAllRes = viewAllQry.results;
        }

        res.render('view-user', { viewAllRes });

    }catch(err){
        console.log(err);
    }
    
}

/** exports.fileupload = (req, res) => {
    res.render('fileupload');
}

exports.fileuploadfunc = (req, res) => {
   let profile_picture;
   let uploadPath;

   if(!req.files || Object.keys(req.files).length ==0){
       return res.status(400).send('No files were uploaded');
   }

   profile_picture = req.files.profile_picture;
   console.log(__dirname);
   uploadPath = __dirname + '../../../upload/' + profile_picture.name;
   console.log(profile_picture);

   profile_picture.mv(uploadPath, function(err){
        if(err) res.status(500).send(err);
        res.send('File Uploaded');

   });
} **/

exports.newuser = async(req, res) => {
        res.render('new-user');
}

exports.onboarding = async(req, res) => {
    try{
        const {  user_id, username, dob, phone, email, address, city, country, exp_years, ex_company_name, ex_startDate, ex_endDate, ex_hrname, ex_hrno, sslc_name, sslc_year, sslc_percentage, hsc_name, hsc_year, hsc_percentage, ugClg_name, ugDept_name, ug_year, ug_percentage, pgClg_name, pgDept_name, pg_year, pg_percentage } = req.body;

        var userDetailQry = await db.getDbResults("INSERT INTO user_detail (user_id, username, dob, phone, email, address, city, country, exp_years, ex_company_name, ex_startDate, ex_endDate, ex_hrname, ex_hrno, sslc_name, sslc_year, sslc_percentage, hsc_name, hsc_year, hsc_percentage, ugClg_name, ugDept_name, ug_year, ug_percentage, pgClg_name, pgDept_name, pg_year, pg_percentage) values (1, username, dob, phone, email, address, city, country, exp_years, ex_company_name, ex_startDate, ex_endDate, ex_hrname, ex_hrno, sslc_name, sslc_year, sslc_percentage, hsc_name, hsc_year, hsc_percentage, ugClg_name, ugDept_name, ug_year, ug_percentage, pgClg_name, pgDept_name, pg_year, pg_percentage)");

        if(userDetailQry.success){
            userDetailRes = userDetailQry.results;
        }

        res.render('homepage'); 

    }catch(err){
        console.log(err);
        res.render('homepage');
    }   
}