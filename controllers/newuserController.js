const NewUser = require('../models/newuserModel');
const func = require('../services/cookies');
const moment = require('moment-fr');

exports.demande = function(req, res) {

    res.render('newuser/demande');

};

exports.traitementDemande = function(req, res) {

    if (req.body.NomTroupe !== undefined) {
        if (!/^[0-9]{1,3}[-][a-zA-Z0-9-]+$/.test(req.body.NomTroupe)) {
            alert = {type : 'danger', text : 'Mauvais format.'}
            res.status(400).render('newuser/demande', {alert})
            return;
        }
        else {
            NewUser.request(req.body.NomTroupe, req).then(() => {
                alert = {type : 'success', text : 'Demande envoyée.'}
                res.status(201).render('newuser/demande', {alert})
            }).catch((error) => {
                switch(error) {
                    case NewUser.Errors.ALREADY_EXISTS :
                        alert = {type : 'danger', text : 'Demande déjà soumise.'}
                        res.status(400).render('newuser/demande', {alert})
                        break;
                    default : 
                        alert = {type : 'danger', text : 'Oups ! Une erreur est survenue.'}
                        res.status(503).render('newuser/demande', {alert})
                        break;
                }
            });
        }
    } else {
        alert = {type : 'danger', text : 'Données manquantes'}
        res.status(400).render('newuser/demande', {alert})
    }

};

exports.getCompte = function(req, res) {

    const alert = func.getAlert(req);
    NewUser.getCompte(req).then((results) => {
        results[0].DateNaissance = moment(results[0].DateNaissance).format("YYYY[-]MM[-]DD")
        res.render('newuser/compte', {results,alert})
    }).catch((error) => {
        switch(error) {
            case NewUser.Errors.BAD_REQUEST :
                res.status(400).render('newuser/compte', {alert})
                break;
            default :
                res.status(503).render('newuser/compte', {alert})
                break;
        }
    });

};

exports.updateCompte = function(req, res) {

    if (
        req.body.LastName !== undefined &&
        req.body.FirstName !== undefined &&
        req.body.BirthDate !== undefined &&
        req.body.Password !== undefined &&
        req.body.VerifyPassword !== undefined 

    ) {
        if (!/^[a-zA-Zéèîâêûôëïöüä]+-?[a-zA-Zéèîâêûôëïöüä]+$/.test(req.body.LastName)) {
            func.setAlert(res, 'danger', 'Nom : caractère invalide')
            res.redirect('/newuser/compte')
            return;
        }
        if (!/^[a-zA-Zéèîâêûôëïöüä]+-?[a-zA-Zéèîâêûôëïöüä]+$/.test(req.body.FirstName)) {
            func.setAlert(res, 'danger', 'Prénom : caractère invalide')
            res.redirect('/newuser/compte')
            return;
        }
        let date = new Date(req.body.BirthDate);
        if (isNaN(date.getTime())) {
            func.setAlert(res, 'danger', 'Date : format invalide')
            res.redirect('/newuser/compte')
            return;
        }
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*@_])([-+!*@_\w]{8,15})$/.test(req.body.Password)) {
            func.setAlert(res, 'danger', 'Mot de passe invalide')
            res.redirect('/newuser/compte')
            return;
        }
        if (req.body.Password === req.body.VerifyPassword) {
            NewUser.updateCompte(req, req.body.Password, req.body.LastName.toLowerCase(), req.body.FirstName.toLowerCase(), date).then(() => {
                func.setAlert(res, 'success', 'Compte modifié')
                res.redirect('/newuser/compte')
            }).catch(() => {
                res.redirect(503,'/newuser/compte')
            }); 
        } else {
            func.setAlert(res, 'danger', 'Mots de passe différents')
            res.redirect('/newuser/compte')
        }
    } else {
        func.setAlert(res, 'danger', 'Données manquantes')
        res.redirect('/newuser/compte')
    }
    
};