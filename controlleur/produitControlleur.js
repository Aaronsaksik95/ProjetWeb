const express = require('express');
const router = express.Router();
const produit = require('../models').Produit;

router.get('/produit', function(req, res){
    produit.findAll()
        .then(produit => {
            console.log(produit)
            res.status(200).json(produit)
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/produit/:id', async function (req, res) {
    const oneProduit = await produit.findOne({ where: { id: req.param('id') } })
        .then(oneProduit => {
            res.status(200).json(oneProduit)
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/produit', async function (req, res) {
    const sameProduit = await produit.findOne({ where: { name: req.body.name } });
    if (req.body.name, req.body.description, req.body.price, req.body.image) {

        if (sameProduit === null) {
            produit.create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            })
        }
        else {
            console.log('erreur meme jeu')
        }
    }
})

router.put('/produit/:id', async function (req, res) {
    const sameProduit = await produit.findOne({ where: { name: req.body.name, id: { $not: req.param('id') } } });
    if (req.body.name, req.body.description, req.body.price, req.body.image) {
        if (sameProduit === null) {
            produit.update({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            }, {
                where: {
                    id: req.param('id')
                }
            })
        }
        else {
            console.log('erreur meme jeu')
        }
    }
    

})

router.delete('/produit/:id', async function (req, res) {
    await produit.destroy({
        where: {
            id: req.param('id')
          }
    })
})

module.exports = router;