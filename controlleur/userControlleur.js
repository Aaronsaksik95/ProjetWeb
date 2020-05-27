const express = require('express');
const router = express.Router();
const user = require('../models').User;


router.get('/user', function (req, res) {
    user.findAll()
        .then(user => {
            res.status(200).json(user)

        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.get('/user/auth', async function (req, res) {
    await user.findOne({ where: { id: req.user.id } })
        .then(oneUser => {
            res.status(200).json(oneUser)
        })
        .catch(err => {
            res.send(err)
        })
})


router.put('/user/auth', async function (req, res) {
    const sameUser = await user.findOne({ where: { email: req.body.email, id: { $not: req.user.id } } });
    console.log(req.user.email)
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
                    id: req.user.id
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
