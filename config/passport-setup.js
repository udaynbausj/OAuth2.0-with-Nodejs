const passport = require('passport');
const google_strategy = require('passport-google-oauth20');
const keys = require('./keys');

passport.use(
    new google_strategy({
        //options
        callbackURL : '/auth/google/redirect',
        clientID : keys.google.clientID,
        clientSecret : keys.google.clientSecret
    }, (accessToken,refreshToken,profile,done) => {
        console.log('Callback fired');
        console.log(profile);

    })
);