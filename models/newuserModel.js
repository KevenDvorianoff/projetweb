const connection = require('../config/database');
const tokenService = require('../services/tokenService');
const func = require('../services/cookies');

const Errors = {

    ALREADY_EXISTS: new Error('Request already exists'),
    SERVICE_UNAVAILABLE: new Error('Service Unavailable')

}

const NewUser = {

    Errors,

    request : function(name, req) {
        return new Promise((resolve, reject) => {
            const token = func.getToken(req);
            tokenService.checkToken(token).then((results) => {
                connection.query('INSERT INTO demande SET ?', {NumCarte:results.NumCarte, NomTroupe:name}, function(error, result) {
                    if (error) {
                        reject(Errors.ALREADY_EXISTS);
                        return;
                    } else {
                        resolve();
                    }
                });
            }).catch(() => {
                reject(Errors.SERVICE_UNAVAILABLE);
            });
        });
    }

}

module.exports = NewUser;