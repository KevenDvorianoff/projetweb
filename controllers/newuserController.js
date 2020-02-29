const NewUser = require('../models/newuserModel')

exports.demande = function(req, res) {

    res.render('demande');

};

exports.traitementDemande = function(req, res) {

    NewUser.request(req.body.NomTroupe, req).then(() => {
        alert = {type : 'success', text : 'Demande envoyée.'}
        res.status(201).render('demande', {alert})
    }).catch((error) => {
        switch(error) {
            case NewUser.Errors.ALREADY_EXISTS :
                alert = {type : 'danger', text : 'Demande déjà soumise.'}
                res.status(400).render('demande', {alert})
                break;
            default : 
                alert = {type : 'danger', text : 'Oups ! Une erreur est survenue.'}
                res.status(503).render('demande', {alert})
                break;
        }
    });

};