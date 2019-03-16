const passport = require('passport');
const google_strategy = require('passport-google-oauth20');
const keys = require('./keys');
const UserModel = require("../Repository/user_model");

passport.use(
    new google_strategy({
        //options
        callbackURL : '/auth/google/redirect',
        clientID : keys.google.clientID,
        clientSecret : keys.google.clientSecret
    }, (accessToken,refreshToken,profile,done) => {
        console.log('Callback fired');
        console.log(profile);
        let googleProfile = new UserModel({
            username : profile.displayName,
            googleId : profile.id
        });
        googleProfile.save().then( (resolvedResult) =>{
            console.log("Successfuly saved to DB");
        }, (err) => {
            console.log("Error occured in saving to DB");
        });
    })
);