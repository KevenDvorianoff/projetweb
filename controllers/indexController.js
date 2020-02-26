const User = require('../models/indexModel');
const bcrypt = require('bcrypt');
const func = require('../function/cookies');

exports.Connexion = function(req, res) {

    const alert = func.getAlert(req);
    res.render('index', {alert});

};

exports.traitementConnexion = function(req, res) {

    res.render('index');

}

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
        if (!/^[A-Z0-9]{10}$/.test(req.body.NumCard)) {
            alert = {type : 'danger', text : 'Mauvais numéro'}
            res.status(400).render('inscription', {alert})
            return;
        }
        if (!/^[a-zA-Zéèîâêûôëïöüä]+-?[a-zA-Zéèîâêûôëïöüä]+$/.test(req.body.LastName)) {
            alert = {type : 'danger', text : 'Nom : caractère invalide'}
            res.status(400).render('inscription', {alert})
            return;
        }
        if (!/^[a-zA-Zéèîâêûôëïöüä]+-?[a-zA-Zéèîâêûôëïöüä]+$/.test(req.body.FirstName)) {
            alert = {type : 'danger', text : 'Prénom : caractère invalide'}
            res.status(400).render('inscription', {alert})
            return;
        }
        let date = new Date(req.body.BirthDate);
        if (isNaN(date.getTime())) {
            alert = {type : 'danger', text : 'Date : caractère invalide'}
            res.status(400).render('inscription', {alert})
            return;
        }
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*@_])([-+!*@_\w]{8,15})$/.test(req.body.Password)) {
            alert = {type : 'danger', text : 'Mot de passe invalide'}
            res.status(400).render('inscription', {alert})
            return;
        }
        if (req.body.Password === req.body.VerifyPassword) {
            bcrypt.hash(req.body.Password, 10, function(err, hash) {
                User.create(req.body.NumCard, hash, req.body.LastName.toLowerCase(), req.body.FirstName.toLowerCase(), date).then(() => {
                    func.setAlert(res, 'success', "Compte créé")
                    res.redirect('/')
                }).catch((err) => {
                    alert = {type : 'danger', text : 'Numéro de carte déjà utilisé'}
                    res.status(400).render('inscription', {alert})
                });
            });
        } else {
            alert = {type : 'danger', text : 'Mots de passe différents'}
            res.status(400).render('inscription', {alert})
        }
    } else {
        alert = {type : 'danger', text : 'Données manquantes'}
        res.status(400).render('inscription', {alert})
    }
    
};