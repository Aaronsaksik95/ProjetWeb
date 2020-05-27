const userModel = require('../models').User;
const passport = require('passport');
const bcrypt = require('bcrypt')
const localStrategy = require('passport-local').Strategy;

passport.use('local', new localStrategy({
    usernameField : 'email',
    passwordField : 'password'
  }, async (email, password, done) => {
    try {
      console.log('coucouuu')
      const user = await userModel.findOne({email});
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



// passport.use(new JWTstrategy({
//   secretOrKey : 'top_secret',
//   jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
// }, async (token, done) => {
//   try {
//     return done(null, token.user);
//   } catch (error) {
//     done(error);
//   }
// }));

// const LocalStrategy = require('passport-local').Strategy
// const bcrypt = require('bcrypt')

// function initialize(passport, getUserByEmail, getUserById) {
//   const authenticateUser = async (email, password, done) => {
//     const user = getUserByEmail(email)
//     if (user == null) {
//       return done(null, false, { message: 'No user with that email' })
//     }

//     try {
//       if (await bcrypt.compare(password, user.password)) {
//         return done(null, user)
//       } else {
//         return done(null, false, { message: 'Password incorrect' })
//       }
//     } catch (e) {
//       return done(e)
//     }
//   }

//   passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
//   passport.serializeUser((user, done) => done(null, user.id))
//   passport.deserializeUser((id, done) => {
//     return done(null, getUserById(id))
//   })
// }

// module.exports = initialize