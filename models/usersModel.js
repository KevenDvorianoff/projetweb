const connection = require('../config/database');

const Errors = {

    NOT_FOUND: new Error('Patrol not found'),
    CONNECTION_ERROR: new Error('Unable to query database')

}

const Users = {

    getNamePat : function(idpat) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT NomPatrouille FROM patrouille WHERE ?', {IdPatrouille:idpat}, function(error, results) {
                if (error) {
                    reject(Errors.CONNECTION_ERROR);
                    return;
                }
                if(results[0] !== undefined) {
                    resolve(results);
                } else {
                    reject(Errors.NOT_FOUND);
                }
            });
        });
    }

};

module.exports = Users;