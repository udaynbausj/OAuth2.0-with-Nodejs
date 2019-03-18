const express = require('express');
const mongoose = require("mongoose");
const passport = require('passport');
const cookie_session = require('cookie-session');
const auth_routes = require('./routes/auth-routes');
const mongoose_connect = require("./Repository/mongoose-connect");

const app = express();

app.set('view engine','ejs');

app.use(cookie_session({
    maxAge : 24*60*60*1000,
    keys : ['hellorock']
}));


app.use(passport.initialize());
app.use(passport.session());
app.use('/auth',auth_routes);

app.get('/',(req,res) => {
    res.render('home');
});


app.listen(3000, () => {
    console.log("Miracle is open at :  3000.....Waiting for you");
});