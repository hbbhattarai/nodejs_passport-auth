
let localStrategy = require('passport-local').Strategy;
let bcrypt = require('bcrypt');

const models = require('../models')

module.exports = function (passport) {
  passport.serializeUser((user,done)=> {
    return done(null,user.id)
  });
  passport.deserializeUser((id, done) => {
    models.users.findOne({
      where: {
        'id': id
      }
    }).then(user => {
      if (user == null) {
        return done(new Error("Wrong credientails"))
      }
      return  done(null,user);
    })
  });

  passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    
    function (req, email, password, done) {
      return models.users.findOne({
        where: {
          'email':email
        },
      }).then(user => { 
          return done(null, user)
      }).catch(err => {
        return done(err, false)
      })
    }
  
  
  ))
}