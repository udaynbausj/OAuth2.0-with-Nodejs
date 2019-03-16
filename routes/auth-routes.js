const router = require('express').Router();
const passport = require("passport");
const passport_setup = require('../config/passport-setup');

//auth login
router.get('/login', (req,res) => {
    //render a login screen
    res.render('login');
});

//auth with google

router.get('/google', passport.authenticate('google',{
    scope : ["profile"]
}));


//auth logout
router.get('/logout',(req,res) =>{
    res.send("Logging out");
});

//auth redirect url
router.get('/google/redirect',passport.authenticate('google'),(req,res) => {
    console.log(req);
    res.send({
        'status' : 'success'
    })
});

module.exports = router;