
module.exports.isAuthorized  = function(req, res, next) {

    // if(req.session.myInfo){
        return next();
    // }else{
    //     // req.session.destroy();
    //     res.redirect('/login');
    // }

}