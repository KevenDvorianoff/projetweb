const Chef = require('../models/chefModel')

exports.getPatrol = function(req, res) {

    Chef.getPatrol(req).then((results) => {
        res.render('chef/patrouille', {results})
    }).catch((error) => {
        switch(error) {
            case Chef.Errors.NO_RESULTS :
                norequest = {text : 'Pas de Patrouille.'}
                res.render('chef/patrouille', {norequest})
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