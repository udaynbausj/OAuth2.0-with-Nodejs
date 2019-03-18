const passport = require('passport');
const google_strategy = require('passport-google-oauth20');
const keys = require('./keys');
const UserModel = require("../Repository/user_model");

passport.serializeUser((user,done) => {
    done(null,user.id);
});


passport.deserializeUser((user,done) => {
    UserModel.findById(user.id).then(
        (user) => {
            console.log(user);
    },
        (err) =>{
            console.log("Error occured");
        }
    );
    done(null,user.id);
});

passport.use(
    new google_strategy({
        //options
        callbackURL : '/auth/google/redirect',
        clientID : keys.google.clientID,
        clientSecret : keys.google.clientSecret
    }, (accessToken,refreshToken,profile,done) => {
        console.log('Callback fired');
        console.log(profile);
        var googleProfile = new UserModel({
            username : profile.displayName,
            googleId : profile.id
        });

        //to avoid same records in db....lets have a check
        UserModel.findOne({
            googleId : profile.id
        }).then( (resolvedResult) => {
            if(resolvedResult ){
                console.log("User profile already exists");
                done(null,resolvedResult);
            }else {
                googleProfile.save().then( (resolvedResult) =>{
                    console.log("Successfuly saved to DB");
                }, (err) => {
                    console.log("Error occured in saving to DB");
                });
                done(null,resolvedResult);
            }
        }, (err) => {
            console.log("Error in saving user profile to DB");
        });


    })
);