var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var user = require('./controlleur/userControlleur');
var produit = require('./controlleur/produitControlleur');
var panier = require('./controlleur/panierControlleur');
var note = require('./controlleur/noteControlleur');
var commentaire = require('./controlleur/commentaireControlleur');
var db = require('./models');
var cors = require('cors');

var port = 5000

var app = express()
app.use(cors())

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', user)
app.use('/api', produit)
app.use('/api', panier)
app.use('/api/produit', commentaire)
app.use('/api/produit', note)

db.sequelize.sync().then(() => {
    app.listen(port, function(){
        console.log('Server started on port ' + port)
    });
});

