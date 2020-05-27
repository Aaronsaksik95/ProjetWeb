const express = require('express');
const router = express.Router();
const user = require('../models').User;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken');

router.use(express.static("public"));
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/signup', async function (req, res) {
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
            return res.json('Vous êtes bien inscrit.');
        }
        else {
            return res.json('Utilisateur déjà utilisé');
        }
    }
})
router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    console.log('vous êtes bien connecté')
  });

router.get('/logout', async function (req, res) {
    req.logout()
    return res.json('Vous êtes bien déconnecté!');
})

module.exports = router;