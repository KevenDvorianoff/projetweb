const Chef = require('../models/chefModel')

exports.Accueil = function(req, res) {

    Chef.getPatrol().then((results) => {
        res.render('chef/accueil', {results})
    }).catch((error) => {
        switch(error) {
            case Chef.Errors.NO_RESULTS :
                norequest = {text : 'Pas de Patrouille.'}
                res.render('chef/accueil', {norequest})
                break;
            default : 
                alert = {type : 'danger', text : 'Service indisponible.'}
                res.status(503).render('chef/accueil', {alert})
                break;
        }
    });

};