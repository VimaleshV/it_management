const mysql = require('mysql');

// mysql connection configuration
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : '127.0.0.1',
    user            : 'root',
    password        : '',
    database        : 'it_management_system',
    port            : '3307'
});

// //mysql connection configuration
// const pool = mysql.createPool({
//   connectionLimit : 100,
//   host            : process.env.DB_HOST,
//   user            : process.env.DB_USER,
//   password        : process.env.DB_PASS,
//   database        : process.env.DB_NAME,
//   port            : process.env.DB_PORT
// });

const getDbResults=async (queryStr)=>{
    return await new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
            // Use the connection
            connection.query(queryStr, function (error, results, fields) {
              if (error) reject({
                success:false,
                error
              });
              resolve({
                  success:true,
                  results,
                  fields
              })
              connection.release();
              

              // Don't use the connection here, it has been returned to the pool.
            });
          });
    })
}

module.exports = {getDbResults};
