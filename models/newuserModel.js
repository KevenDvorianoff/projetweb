const connection = require('../config/database');
const tokenService = require('../services/tokenService');
const func = require('../services/cookies');
const bcrypt = require('bcrypt');

const Errors = {

    NO_RESULTS: new Error('No results'),
    BAD_REQUEST: new Error('Bad request'),
    CONNECTION_ERROR: new Error('Unable to query database'),
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
    },

    getCompte : function(req) {
        return new Promise((resolve, reject) => {
            const token = func.getToken(req);
            tokenService.checkToken(token).then((result) => {
                connection.query('SELECT Nom, Prenom, DateNaissance FROM utilisateur WHERE ?',{NumCarte:result.NumCarte}, function(error1, results1) {
                    if (error1) {
                        reject(Errors.CONNECTION_ERROR);
                        return;
                    }
                    if(results1[0] !== undefined) {
                        resolve(results1)
                    } else {
                        reject(Errors.BAD_REQUEST);
                        return;
                    }
                });
            }).catch(() => {
                reject(Errors.BAD_REQUEST);
            });
        });
    },

    updateCompte : function(req, pw, lastname, firstname, birthdate) {
        return new Promise((resolve, reject) => {
            const token = func.getToken(req);
            tokenService.checkToken(token).then((result) => {
                bcrypt.hash(pw, 10, function(err, hash) {
                    connection.query('UPDATE utilisateur SET ? WHERE ?', [{Motdepasse:hash, Nom:lastname, Prenom:firstname, DateNaissance:birthdate},{NumCarte:result.NumCarte}], function(error,results) {
                        if (error) {
                            reject(Errors.CONNECTION_ERROR);
                        } else {
                            resolve();
                        }
                    });
                });
            }).catch(() => {
                reject(Errors.BAD_REQUEST);
            });
        });
    }

}

module.exports = NewUser;