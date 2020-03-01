const Admin = require('../models/adminModel')

exports.Accueil = function(req, res) {

    Admin.getRequest().then((results) => {
        res.render('admin/accueil', {results})
    }).catch((error) => {
        switch(error) {
            case Admin.Errors.NO_RESULTS :
                norequest = {text : 'Pas de demande'}
                res.render('admin/accueil', {norequest})
                break;
            default : 
                alert = {type : 'danger', text : 'Service indisponible'}
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
        res.redirect(503, '/admin')
    });
    
};