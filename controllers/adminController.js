const Admin = require('../models/adminModel')

exports.getRequest = function(req, res) {

    Admin.getRequest().then((results) => {
        res.render('admin/demande', {results})
    }).catch((error) => {
        switch(error) {
            case Admin.Errors.NO_RESULTS :
                norequest = {text : 'Pas de demande.'}
                res.render('admin/demande', {norequest})
                break;
            default : 
                alert = {type : 'danger', text : 'Service indisponible.'}
                res.status(503).render('admin/demande', {alert})
                break;
        }
    });

};

exports.deleteRequest = function(req, res) {

    const numcard = req.params.NumCard;
    Admin.deleteRequest(numcard).then(() => {
        res.redirect('/admin/demande')
    }).catch(() => {
        res.redirect(503, '/admin/demande')
    });

};

exports.acceptRequest = function(req, res) {

    const numcard = req.params.NumCard;
    Admin.acceptRequest(numcard).then(() => {
        res.redirect('/admin/demande')
    }).catch(() => {
        switch(error) {
            case Admin.Errors.TROOP_ALREADY_EXIST :
                res.redirect(400, '/admin/demande')
                break;
            case Admin.Errors.PATROL_ALREADY_EXIST : 
                res.redirect(400, '/admin/demande')
                break;
            case Admin.Errors.BAD_REQUEST :
                res.redirect(400, '/admin/demande')
                break;
            default : 
                res.redirect(503, '/admin/demande')
                break;
        }
    });
    
};

exports.getTroop = function(req, res) {

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

exports.deleteTroop = function(req, res) {

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