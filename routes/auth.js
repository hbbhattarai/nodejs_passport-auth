
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const models = require('../src/models');
const passport = require('passport');

require('../src/config/passport_setup')(passport);


const generateHash = function (password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8), null)
}


router.post('/register', function (req, res, next) {
    const newUser = models.users.build({
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        password: generateHash(req.body.password)
    });
    return newUser.save().then(result => {
        passport.authenticate('local', {
            successRedirect: "/",
            failureRedirect: "/register",
            failureFlash: true
        })(req, res, next);
    })
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next)
});

module.exports = router;