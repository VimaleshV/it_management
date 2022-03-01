const express = require('express');
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.static('upload'));

app.use(fileUpload());

app.engine('hbs', engine( {extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'hbs');

const routes = require('./servers/routes/user');
app.use('/', routes);

app.listen(port, () => console.log(`Listerning on port ${port}`));