const express = require('express');
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');
const db = require('./utility/dbUtiltiy');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.use(function(req, res, next){
    let myInfo = [];
    if(req.session.myInfo){
        myInfo = req.session.myInfo;
    }
    res.locals.myInfo = myInfo;
    next();
});

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.static('upload'));

app.use(cookieParser());

app.use(fileUpload());

app.engine('hbs', engine( {extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'hbs');

const routes = require('./servers/routes/user');
app.use('/', routes);

app.listen(port, () => console.log(`Listerning on port ${port}`));