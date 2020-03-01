const connection = require('../config/database');

const Errors = {

    NO_RESULTS: new Error('No results'),
    CONNECTION_ERROR: new Error('Unable to query database')

}

const Admin = {

    Errors,

    getRequest : function () {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM demande', function(error, results) {
                if (error) {
                    reject(Errors.CONNECTION_ERROR);
                    return;
                }
                if(results[0] !== undefined) {
                    resolve(results)
                } else {
                    reject(Errors.NO_RESULTS);
                }
            });
        });
    },

    deleteRequest : function(numcard) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM demande WHERE ?', {NumCarte:numcard}, function(error, results) {
                if (error) {
                    reject(Errors.CONNECTION_ERROR);
                    return;
                } else {
                    resolve();
                }
                
            });
        });
    },

    acceptRequest : function(numcard) {
        return new Promise((resolve, reject) => {
            
        });
    }

}

module.exports = Admin;