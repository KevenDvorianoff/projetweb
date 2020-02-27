const connection = require('../config/database');
const bcrypt = require('bcrypt');

const Errors = {

    NOT_FOUND: new Error('User not found'),
    CONNECTION_ERROR: new Error('Unable to query database'),
    INVALID_PASSWORD: new Error('Invalid password'),
    USER_ALREADY_EXISTS: new Error('User already exists')

}

const User = {

    Errors,

    create : function(numcard, pw, lastname, firstname, birthdate) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(pw, 10, function(err, hash) {
                connection.query('INSERT INTO utilisateur SET ?', {NumCarte:numcard, Motdepasse:hash, Nom:lastname, Prenom:firstname, DateNaissance:birthdate, Admin:0, IdPatrouille:null}, function(error,results) {
                    if (error) {
                        reject(Errors.USER_ALREADY_EXISTS);
                    } else {
                        resolve();
                    }
                });
            });
        });
    },

    login : function(numcard, pw) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT NumCarte,Motdepasse,Admin,IdPatrouille FROM utilisateur WHERE ?', {NumCarte:numcard}, function(error, results) {
                if (error) {
                    reject(Errors.CONNECTION_ERROR);
                    return;
                }
                if(results[0] !== undefined) {
                    bcrypt.compare(pw, results[0].Motdepasse, function(err, result) {
                        if (result == true) {
                            resolve(results);
                        } else {
                            reject(Errors.INVALID_PASSWORD)
                            return;
                        }
                    });
                } else {
                    reject(Errors.NOT_FOUND);
                }
            });
        });
    }
    
};

module.exports = User;