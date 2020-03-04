const Chef = require('../models/chefModel');
const func = require('../services/cookies');

exports.getPatrol = function(req, res) {

    const alert = func.getAlert(req);
    Chef.getPatrol(req).then((results) => {
        res.render('chef/patrouille', {results,alert})
    }).catch((error) => {
        switch(error) {
            case Chef.Errors.NO_RESULTS :
                norequest = {text : 'Pas de Patrouille.'}
                res.render('chef/patrouille', {norequest,alert})
                break;
            case Chef.Errors.BAD_REQUEST :
                alert = {type : 'danger', text : 'Requête impossible.'}
                res.status(400).render('chef/patrouille', {alert})
                break;
            default : 
                alert = {type : 'danger', text : 'Service indisponible.'}
                res.status(503).render('chef/patrouille', {alert})
                break;
        }
    });

};

exports.deletePatrol = function(req, res) {

    const namepatrol = req.params.NomPatrouille;
    Chef.deletePatrol(req, namepatrol).then(() => {
        res.redirect('/chef/patrouille')
    }).catch((error) => {
        switch(error) {
            case Chef.Errors.NO_RESULTS :
                res.redirect(400,'/chef/patrouille')
                break;
            case Chef.Errors.BAD_REQUEST :
                res.redirect(400,'/chef/patrouille')
                break;
            default : 
                res.redirect(503,'/chef/patrouille')
                break;
        }
    });

};

exports.createPatrol = function(req, res) {

    const namepatrol = req.body.NomPatrouille;
    if (req.body.NomPatrouille !== undefined) {
        if (!/^[a-z]+$/.test(req.body.NomPatrouille)) {
            func.setAlert(res, 'danger', 'Mauvais format de nom.')
            res.redirect('/chef/patrouille')
        }
        else {
            Chef.createPatrol(req, namepatrol).then(() => {
                res.redirect('/chef/patrouille')
            }).catch((error) => {
                switch(error) {
                    case Chef.Errors.PATROL_ALREADY_EXIST :
                        func.setAlert(res, 'danger', 'Cette patrouille existe déjà.')
                        res.redirect('/chef/patrouille')
                        break;
                    case Chef.Errors.NO_RESULTS :
                        res.redirect(400,'/chef/patrouille')
                        break;
                    case Chef.Errors.BAD_REQUEST :
                        res.redirect(400,'/chef/patrouille')
                        break;
                    default : 
                        res.redirect(503,'/chef/patrouille')
                        break;
                }
            });
        }
    } else {
        func.setAlert(res, 'danger', 'Donnée manquante.')
        res.redirect('/chef/patrouille')
    }
};


exports.getScout = function(req, res) {

    const alert = func.getAlert(req);
    const namepatrol = req.params.NomPatrouille;
    Chef.getScout(req, namepatrol).then((results) => {
        res.render('chef/modificationPat', {results,namepatrol,alert})
    }).catch((error) => {
        switch(error) {
            case Chef.Errors.NO_RESULTS :
                norequest = {text : 'Pas de scout dans la patrouille.'}
                res.render('chef/modificationPat', {norequest,namepatrol,alert})
                break;
            case Chef.Errors.BAD_REQUEST :
                alert = {type : 'danger', text : 'Requête impossible.'}
                res.status(400).render('chef/modificationPat', {alert,namepatrol})
                break;
            default : 
                alert = {type : 'danger', text : 'Service indisponible.'}
                res.status(503).render('chef/modificationPat', {alert,namepatrol})
                break;
        }
    });

};

exports.addScout = function(req, res) {

    const namepatrol = req.params.NomPatrouille;
    const numcard = req.body.NumCarte;
    if (req.body.NumCarte !== undefined) {
        if (!/^[A-Z0-9]{10}$/.test(req.body.NumCarte)) {
            func.setAlert(res, 'danger', 'Mauvais format de numéro de carte.')
            res.redirect('/chef/patrouille/modifier/'+namepatrol)
        }
        else {
            Chef.addScout(req, namepatrol, numcard).then(() => {
                res.redirect('/chef/patrouille/modifier/'+namepatrol)
            }).catch((error) => {
                switch(error) {
                    case Chef.Errors.SCOUT_ALREADY_EXIST :
                        func.setAlert(res, 'danger', 'Ce scout est déjà dans une patrouille.')
                        res.redirect('/chef/patrouille/modifier/'+namepatrol)
                        break;
                    case Chef.Errors.NO_RESULTS :
                        res.redirect(400,'/chef/patrouille/modifier/'+namepatrol)
                        break;
                    case Chef.Errors.BAD_REQUEST :
                        res.redirect(400,'/chef/patrouille/modifier/'+namepatrol)
                        break;
                    default : 
                        res.redirect(503,'/chef/patrouille/modifier/'+namepatrol)
                        break;
                }
            });
        }
    } else {
        func.setAlert(res, 'danger', 'Donnée manquante.')
        res.redirect('/chef/patrouille/modifier/'+namepatrol)
    }

};

exports.deleteScout = function(req, res) {

    const namepatrol = req.params.NomPatrouille;
    const numcard = req.params.NumCarte;
    Chef.deleteScout(req, numcard).then(() => {
        res.redirect('/chef/patrouille/modifier/'+namepatrol)
    }).catch((error) => {
        switch(error) {
            case Chef.Errors.NO_RESULTS :
                res.redirect('/chef/patrouille/modifier/'+namepatrol)
                break;
            case Chef.Errors.BAD_REQUEST :
                res.redirect('/chef/patrouille/modifier/'+namepatrol)
                break;
            default : 
                res.redirect('/chef/patrouille/modifier/'+namepatrol)
                break;
        }
    });

};

exports.getEvents = function(req, res) {

    const alert = func.getAlert(req);
    Chef.getEvents(req).then((results) => {
        res.render('chef/evenement', {results,alert})
    }).catch((error) => {
        switch(error) {
            case Chef.Errors.NO_RESULTS :
                norequest = {text : 'Pas d\'évènement.'}
                res.render('chef/evenement', {norequest,alert})
                break;
            case Chef.Errors.BAD_REQUEST :
                alert = {type : 'danger', text : 'Requête impossible.'}
                res.status(400).render('chef/evenement', {alert})
                break;
            default : 
                alert = {type : 'danger', text : 'Service indisponible.'}
                res.status(503).render('chef/evenement', {alert})
                break;
        }
    });

};

exports.deleteEvents = function(req, res) {

    const idevent = req.params.IdEvent;
    Chef.deleteEvents(req, idevent).then(() => {
        res.redirect('/chef/evenement')
    }).catch((error) => {
        switch(error) {
            case Chef.Errors.NO_RESULTS :
                res.redirect(400,'/chef/evenement')
                break;
            case Chef.Errors.BAD_REQUEST :
                res.redirect(400,'/chef/evenement')
                break;
            default : 
                res.redirect(503,'/chef/evenement')
                break;
        }
    });

};

exports.createEvents = function(req, res) {

    const date = new Date(req.body.DateEvenement);
    const idtypeE = req.body.IdType_E;
    if (req.body.DateEvenement !== undefined && req.body.IdType_E !== undefined) {
        if (isNaN(date.getTime())) {
            func.setAlert(res, 'danger', 'Mauvais format de date.')
            res.redirect('/chef/evenement')
        }
        else {
            Chef.createEvents(req, date, idtypeE).then(() => {
                res.redirect('/chef/evenement')
            }).catch((error) => {
                switch(error) {
                    case Chef.Errors.NO_RESULTS :
                        res.redirect(400,'/chef/evenement')
                        break;
                    case Chef.Errors.BAD_REQUEST :
                        res.redirect(400,'/chef/evenement')
                        break;
                    default : 
                        res.redirect(503,'/chef/evenement')
                        break;
                }
            });
        }
    } else {
        func.setAlert(res, 'danger', 'Donnée manquante.')
        res.redirect('/chef/patrouille')
    }
};

exports.getCompte = function(req, res) {

    const alert = func.getAlert(req);
    Chef.getCompte(req).then((results) => {
        res.render('chef/compte', {results,alert})
    }).catch((error) => {
        switch(error) {
            case Chef.Errors.BAD_REQUEST :
                res.status(400).render('chef/compte', {alert})
                break;
            default :
                res.status(503).render('chef/compte', {alert})
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
            res.redirect('/chef/compte')
            return;
        }
        if (!/^[a-zA-Zéèîâêûôëïöüä]+-?[a-zA-Zéèîâêûôëïöüä]+$/.test(req.body.FirstName)) {
            func.setAlert(res, 'danger', 'Prénom : caractère invalide')
            res.redirect('/chef/compte')
            return;
        }
        let date = new Date(req.body.BirthDate);
        if (isNaN(date.getTime())) {
            func.setAlert(res, 'danger', 'Date : format invalide')
            res.redirect('/chef/compte')
            return;
        }
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*@_])([-+!*@_\w]{8,15})$/.test(req.body.Password)) {
            func.setAlert(res, 'danger', 'Mot de passe invalide')
            res.redirect('/chef/compte')
            return;
        }
        if (req.body.Password === req.body.VerifyPassword) {
            Chef.updateCompte(req, req.body.Password, req.body.LastName.toLowerCase(), req.body.FirstName.toLowerCase(), date).then(() => {
                func.setAlert(res, 'success', 'Compte modifié')
                res.redirect('/chef/compte')
            }).catch(() => {
                res.redirect(503,'/chef/compte')
            }); 
        } else {
            func.setAlert(res, 'danger', 'Mots de passe différents')
            res.redirect('/chef/compte')
        }
    } else {
        func.setAlert(res, 'danger', 'Données manquantes')
        res.redirect('/chef/compte')
    }
    
};

