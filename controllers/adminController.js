const Admin = require('../models/adminModel')

exports.Accueil = function(req, res) {

    Admin.getRequest().then((results) => {
        res.render('admin/accueil', {results})
    }).catch((error) => {
        switch(error) {
            case Admin.Errors.NO_RESULTS :
                norequest = {text : 'Pas de demande.'}
                res.render('admin/accueil', {norequest})
                break;
            default : 
                alert = {type : 'danger', text : 'Service indisponible.'}
                res.status(503).render('admin/accueil', {alert})
                break;
        }
    });

};

exports.deleteRequest = function(req, res) {

    const numcard = req.params.NumCard;
    Admin.deleteRequest(numcard).then(() => {
        res.redirect('/admin')
    }).catch(() => {
        res.redirect(503, '/admin')
    });

};

exports.acceptRequest = function(req, res) {

    const numcard = req.params.NumCard;
    Admin.acceptRequest(numcard).then(() => {
        res.redirect('/admin')
    }).catch(() => {
        switch(error) {
            case Admin.Errors.TROOP_ALREADY_EXIST :
                res.redirect(400, '/admin')
                break;
            case Admin.Errors.PATROL_ALREADY_EXIST : 
                res.redirect(400, '/admin')
                break;
            case Admin.Errors.BAD_REQUEST :
                res.redirect(400, '/admin')
                break;
            default : 
                res.redirect(503, '/admin')
                break;
        }
    });
    
};

exports.Troupe = function(req, res) {

    Admin.getTroop().then((results) => {
        res.render('admin/troupe', {results})
    }).catch((error) => {
        switch(error) {
            case Admin.Errors.NO_RESULTS :
                norequest = {text : 'Pas de troupe.'}
                res.render('admin/troupe', {norequest})
                break;
            default : 
                alert = {type : 'danger', text : 'Service indisponible.'}
                res.status(503).render('admin/troupe', {alert})
                break;
        }
    });

};

exports.deleteTroupe = function(req, res) {

    const nametroop = req.params.NomTroupe;
    Admin.delTroop(nametroop).then(() => {
        res.redirect('/admin/troupe')
    }).catch((error) => {
        switch(error) {
            case Admin.Errors.BAD_REQUEST :
                res.redirect(400, '/admin/troupe')
                break;
            default : 
                res.redirect(503, '/admin/troupe')
                break;
        }
    });

};