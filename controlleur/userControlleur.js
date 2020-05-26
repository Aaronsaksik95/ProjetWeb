const express = require('express');
const router = express.Router();
const user = require('../models').User;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken');

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
router.use(express.static("public"));
router.use(bodyParser.urlencoded({ extended: false }));
router.use(passport.initialize());



router.post('/signup', checkNotAuthenticated, async function (req, res) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const sameUser = await user.findOne({ where: { email: req.body.email } });
    if (req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.dateBirth, req.body.sold) {

        if (sameUser === null) {
            user.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword,
                dateBirth: req.body.dateBirth,
                sold: req.body.sold
            })
        }
        else {
            console.log('erreur meme nom')
        }
    }
})
router.post('/login', checkNotAuthenticated, async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error('An Error occurred')
                return next(error);
            }
            req.login(user, { session: false }, async (error) => {
                if (error) return next(error)
                const body = { id: user.id, email: user.email };
                const token = jwt.sign({ user: body }, 'top_secret');
                return res.json({ token });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

router.get('/logout', async function (req, res) {
    console.log(req.user)
    req.logOut()

})





router.get('/user',checkAuthenticated ,function (req, res) {
    user.findAll()
        .then(user => {
            console.log(req.user)
            res.status(200).json(user)

        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.get('/user/:id', async function (req, res) {
    const oneUser = await user.findOne({ where: { id: req.param('id') } })
        .then(oneUser => {
            res.status(200).json(oneUser)
        })
        .catch(err => {
            console.log(req.param.id)
            res.send(err)
        })
})


router.put('/user/:id', async function (req, res) {
    const sameUser = await user.findOne({ where: { email: req.body.email, id: { $not: req.param('id') } } });
    if (req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.dateBirth, req.body.sold) {
        if (sameUser === null) {
            user.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                dateBirth: req.body.dateBirth,
                sold: req.body.sold
            }, {
                where: {
                    id: req.param('id')
                }
            })
        }
        else {
            console.log('erreur meme nom')
        }
    }
})

router.delete('/user/:id', async function (req, res) {
    user.destroy({
        where: {
            id: req.param('id')
        }
    })
})
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    else{
        console.log('il faut te connecter')
    }
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        next()
    }

  }

module.exports = router;
