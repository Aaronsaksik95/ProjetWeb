const express = require('express');
const router = express.Router();
const user = require('../models').User;
var bodyParser = require('body-parser');

router.get('/user', function (req, res) {
    user.findAll()
        .then(user => {
            console.log(user)
            res.status(200).json(user)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.get('/user/:id', async function (req, res) {
    const oneUser = await user.findOne({ where: { id: req.param('id') } })
        .then(oneUser => {
            console.log(oneUser)
            res.status(200).json(oneUser)
        })
        .catch(err => {
            console.log(req.param.id)
            res.send(err)
        })
})

router.post('/user', async function (req, res) {
    const sameUser = await user.findOne({ where: { email: req.body.email } });
    if (req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.dateBirth, req.body.sold) {

        if (sameUser === null) {
            user.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                dateBirth: req.body.dateBirth,
                sold: req.body.sold
            })
        }
        else {
            console.log('erreur meme nom')
        }
    }
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


module.exports = router;
