const express = require('express');
const router = express.Router();
const note = require('../models').Note;

router.get('/note', function(req, res){
    note.findAll()
        .then(note => {
            console.log(note)
            res.status(200).json(note)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.get('/:idPro/note', async function (req, res) {
    const oneCommentaire = await note.findOne({ where: { ProduitId: req.param('idPro') } })
        .then(oneCommentaire => {
            res.status(200).json(oneCommentaire)
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/:idPro/note', async function (req, res) {
    if (req.body.content) {
        note.create({
            content:req.body.content,
            date: Date(),
            ProduitId:req.param('idPro'),
            UserId:req.body.UserId
        })
    }
})

router.put('/note/:id', async function (req, res) {
    if (req.body.content) {
        note.update({
            content:req.body.content
        }, {
            where: {
                id: req.param('id')
            }
        })
    }
})

router.delete('/note/:id', async function (req, res) {
    await note.destroy({
        where: {
            id: req.param('id')
        }
    })
})

module.exports = router;