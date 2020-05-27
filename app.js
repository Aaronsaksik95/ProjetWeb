var express = require('express');
var morgan = require('morgan');
var userModel = require('./models').User;
var passport = require('passport');
var bcrypt = require('bcrypt')
var bodyParser = require('body-parser');
var user = require('./controlleur/userControlleur');
// var auth = require('./controlleur/authControlleur')
var produit = require('./controlleur/produitControlleur');
var panier = require('./controlleur/panierControlleur');
var note = require('./controlleur/noteControlleur');
// var secureRoute = require('./controlleur/securControlleur')
var commentaire = require('./controlleur/commentaireControlleur');
const session = require('express-session')
const methodOverride = require('method-override')
var db = require('./models');
var cors = require('cors');
var port = 5000


require('./authentification/passport_config');

var app = express()
app.use(cors())

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.post('/signup', async function (req, res) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const sameUser = await userModel.findOne({ where: { email: req.body.email } });
    if (req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.dateBirth, req.body.sold) {

        if (sameUser === null) {
            userModel.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword,
                dateBirth: req.body.dateBirth,
                sold: req.body.sold
            })
            return res.json('Vous êtes bien inscrit.');
        }
        else {
            return res.json('Utilisateur déjà utilisé');
        }
    }
})
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.json('Vous êtes bien connecté!' + req.user.email);

  });

app.delete('/logout', (req, res) => {
    req.logOut()
    res.json('Vous êtes bien déconnecté!');

  })

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    userModel.findById(id, function(err, user) {
      done(err, user);
    });
  });
app.use('/api', passport.authenticate('local', { session : false }), user)
// app.use('/api', passport.authenticate('jwt', { session : false }), secureRoute )
app.use('/api', passport.authenticate('local', { session : false }), produit)
app.use('/api', passport.authenticate('local', { session : false }), panier)
app.use('/api/produit', passport.authenticate('local', { session : false }), commentaire)
app.use('/api/produit', passport.authenticate('local', { session : false }), note)


db.sequelize.sync().then(() => {
    app.listen(port, function(){
        console.log('Server started on port ' + port)
    });
});

