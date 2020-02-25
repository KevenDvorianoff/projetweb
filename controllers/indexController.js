const User = require('../models/indexModel');
const bcrypt = require('bcrypt');

exports.Connection = function(req, res) {

    res.render('index');

};

exports.Inscription = function(req, res) {

    res.render('inscription');

};

exports.traitementInscription = function(req, res) {

    if (
        req.body.NumCard !== undefined &&
        req.body.LastName !== undefined &&
        req.body.FirstName !== undefined &&
        req.body.BirthDate !== undefined &&
        req.body.Password !== undefined &&
        req.body.VerifyPassword !== undefined 

    ) {
        if (!/^[A-Z1-9]{10}$/.test(req.body.NumCard)) {
            res.status(400).render('inscription', {
                error: 'Mauvais numéro'
            })
            return;
        }
        if (!/^[a-zA-Zéèîâêûôëïöüä]+-?[a-zA-Zéèîâêûôëïöüä]+$/.test(req.body.LastName)) {
            res.status(400).render('inscription', {
                error: 'Nom : caractère invalide'
            })
            return;
        }
        if (!/^[a-zA-Zéèîâêûôëïöüä]+-?[a-zA-Zéèîâêûôëïöüä]+$/.test(req.body.FirstName)) {
            res.status(400).render('inscription', {
                error: 'Prénom : caractère invalide'
            })
            return;
        }
        let date = new Date(req.body.BirthDate);
        if (isNaN(date.getTime())) {
            res.status(400).render('inscription', {
                error: 'Date invalide'
            })
            return;
        }
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*@_])([-+!*@_\w]{8,15})$/.test(req.body.VerifyPassword)) {
            res.status(400).render('inscription', {
                error: 'Mot de passe invalide'
            })
            return;
        }
        if (req.body.Password === req.body.VerifyPassword) {
            bcrypt.hash(req.body.Password, 10, function(err, hash) {
                User.create(req.body.NumCard, hash, req.body.LastName.toLowerCase(), req.body.FirstName.toLowerCase(), date).then(() => {
                    res.redirect('/')
                }).catch((err) => {
                    res.status(400).render('inscription', {
                        error: 'Numéro de carte déjà utilisé'
                    })
                });
            });
        } else {
            res.status(400).render('inscription', {
                error: 'Mots de passe différents'
            })
        }
    } else {
        res.status(400).render('inscription', {
            error: 'Données manquantes'
        })
    }
    
};