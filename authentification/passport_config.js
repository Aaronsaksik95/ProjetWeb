const userModel = require('../models').User;
const passport = require('passport');
const bcrypt = require('bcrypt')
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use('login', new localStrategy({
    usernameField : 'email',
    passwordField : 'password'
  }, async (email, password, done) => {
    try {
      const user = await userModel.findOne({ email });
      if( user ){
        if( await bcrypt.compare(password, user.password )){
            return done(null, user, { message : 'Logged in Successfully'});          }
          else{
            return done(null, false, { message : 'Wrong Password'});
          }    
      }
      else{
        return done(null, false, { message : 'User not found'});
      }
        
    } catch (error) {
      return done(error);
    }
  }));



passport.use(new JWTstrategy({
  secretOrKey : 'top_secret',
  jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));