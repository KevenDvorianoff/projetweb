const connection = require('../config/database');

const User = {

    create : function(numcard, pw, lastname, firstname, birthdate) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO utilisateur SET ?', {NumCarte:numcard, Motdepasse:pw, Nom:lastname, Prenom:firstname, DateNaissance:birthdate, Admin:0, IdPatrouille:null}, function(error,results) {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
    
};

module.exports = User;