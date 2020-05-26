const express = require('express');
const router = express.Router();
const panier = require('../models').Panier;

router.get('/panier', function(req, res){
    panier.findAll()
        .then(panier => {
            console.log(panier)
            res.status(200).json(panier)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})


module.exports = router;