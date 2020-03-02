const Chef = require('../models/chefModel')

exports.Accueil = function(req, res) {

    Chef.getPatrol().then((results) => {
        res.render('chef/patrouille', {results})
    }).catch((error) => {
        switch(error) {
            case Chef.Errors.NO_RESULTS :
                norequest = {text : 'Pas de Patrouille.'}
                res.render('chef/patrouille', {norequest})
                break;
            default : 
                alert = {type : 'danger', text : 'Service indisponible.'}
                res.status(503).render('chef/patrouille', {alert})
                break;
        }
    });

};