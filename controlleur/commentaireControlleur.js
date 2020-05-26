const express = require('express');
const router = express.Router();
const commentaire = require('../models').Commentaire;

router.get('/commentaire', function (req, res) {
    commentaire.findAll()
        .then(commentaire => {
            console.log(commentaire)
            res.status(200).json(commentaire)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.get('/:idPro/commentaire', async function (req, res) {
    const oneCommentaire = await commentaire.findOne({ where: { ProduitId: req.param('idPro') } })
        .then(oneCommentaire => {
            res.status(200).json(oneCommentaire)
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/:idPro/commentaire', async function (req, res) {
    if (req.body.content) {
        commentaire.create({
            content:req.body.content,
            date: Date(),
            ProduitId:req.param('idPro'),
            UserId:req.body.UserId
        })
    }
})

router.put('/commentaire/:id', async function (req, res) {
    if (req.body.content) {
        commentaire.update({
            content:req.body.content
        }, {
            where: {
                id: req.param('id')
            }
        })
    }
})

router.delete('/commentaire/:id', async function (req, res) {
    await commentaire.destroy({
        where: {
            id: req.param('id')
        }
    })
})

module.exports = router;