const Scout = require('../models/scoutModel');
const func = require('../services/cookies');

exports.getScout = function(req, res) {

    Scout.getScout(req).then((results) => {
        res.render('scout/patrouille', {results})
    }).catch((error) => {
        switch(error) {
            case Scout.Errors.NO_RESULTS :
                norequest = {text : 'Pas de scouts dans la patrouille.'}
                res.render('scout/patrouille', {norequest,alert})
                break;
            case Scout.Errors.BAD_REQUEST :
                alert = {type : 'danger', text : 'Requête impossible.'}
                res.status(400).render('scout/patrouille', {alert})
                break;
            default : 
                alert = {type : 'danger', text : 'Service indisponible.'}
                res.status(503).render('scout/patrouille', {alert})
                break;
        }
    });
    
};

exports.getEvent = function(req, res) {

    Scout.getEvent(req).then((results) => {
        res.render('scout/evenement', {results})
    }).catch((error) => {
        switch(error) {
            case Scout.Errors.NO_RESULTS :
                norequest = {text : 'Pas d\'évènement.'}
                res.render('scout/evenement', {norequest,alert})
                break;
            case Scout.Errors.BAD_REQUEST :
                alert = {type : 'danger', text : 'Requête impossible.'}
                res.status(400).render('scout/evenement', {alert})
                break;
            default : 
                alert = {type : 'danger', text : 'Service indisponible.'}
                res.status(503).render('scout/evenement', {alert})
                break;
        }
    });
};

exports.getMateriel = function(req, res) {

    Scout.getMateriel(req).then((results) => {
        res.render('scout/materiel', {results})
    }).catch((error) => {
        switch(error) {
            case Scout.Errors.NO_RESULTS :
                norequest = {text : 'Pas de matériels.'}
                res.render('scout/materiel', {norequest,alert})
                break;
            case Scout.Errors.BAD_REQUEST :
                alert = {type : 'danger', text : 'Requête impossible.'}
                res.status(400).render('scout/materiel', {alert})
                break;
            default : 
                alert = {type : 'danger', text : 'Service indisponible.'}
                res.status(503).render('scout/materiel', {alert})
                break;
        }
    });

};

exports.moreMateriel = function(req, res) {

    const idmat = req.params.IdMateriel;
    Scout.moreMateriel(req, idmat).then(() => {
        res.redirect('/scout/materiel')
    }).catch((error) => {
        switch(error) {
            case Scout.Errors.NO_RESULTS :
                res.redirect(400,'/scout/materiel')
                break;
            case Scout.Errors.BAD_REQUEST :
                res.redirect(400,'/scout/materiel')
                break;
            default : 
                res.redirect(503,'/scout/materiel')
                break;
        }
    });

};

exports.lessMateriel = function(req, res) {

    const idmat = req.params.IdMateriel;
    Scout.lessMateriel(req, idmat).then(() => {
        res.redirect('/scout/materiel')
    }).catch((error) => {
        switch(error) {
            case Scout.Errors.NO_RESULTS :
                res.redirect(400,'/scout/materiel')
                break;
            case Scout.Errors.BAD_REQUEST :
                res.redirect(400,'/scout/materiel')
                break;
            default : 
                res.redirect(503,'/scout/materiel')
                break;
        }
    });

};

exports.getCompte = function(req, res) {

    const alert = func.getAlert(req);
    Scout.getCompte(req).then((results) => {
        res.render('scout/compte', {results,alert})
    }).catch((error) => {
        switch(error) {
            case Scout.Errors.BAD_REQUEST :
                res.status(400).render('scout/compte', {alert})
                break;
            default :
                res.status(503).render('scout/compte', {alert})
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
            res.redirect('/scout/compte')
            return;
        }
        if (!/^[a-zA-Zéèîâêûôëïöüä]+-?[a-zA-Zéèîâêûôëïöüä]+$/.test(req.body.FirstName)) {
            func.setAlert(res, 'danger', 'Prénom : caractère invalide')
            res.redirect('/scout/compte')
            return;
        }
        let date = new Date(req.body.BirthDate);
        if (isNaN(date.getTime())) {
            func.setAlert(res, 'danger', 'Date : format invalide')
            res.redirect('/scout/compte')
            return;
        }
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*@_])([-+!*@_\w]{8,15})$/.test(req.body.Password)) {
            func.setAlert(res, 'danger', 'Mot de passe invalide')
            res.redirect('/scout/compte')
            return;
        }
        if (req.body.Password === req.body.VerifyPassword) {
            Scout.updateCompte(req, req.body.Password, req.body.LastName.toLowerCase(), req.body.FirstName.toLowerCase(), date).then(() => {
                func.setAlert(res, 'success', 'Compte modifié')
                res.redirect('/scout/compte')
            }).catch(() => {
                res.redirect(503,'/scout/compte')
            }); 
        } else {
            func.setAlert(res, 'danger', 'Mots de passe différents')
            res.redirect('/scout/compte')
        }
    } else {
        func.setAlert(res, 'danger', 'Données manquantes')
        res.redirect('/scout/compte')
    }
    
};