const connection = require('../config/database');4

const Errors = {

    BAD_REQUEST: new Error('Bad request'),
    CONNECTION_ERROR: new Error('Unable to query database'),
    TROOP_ALREADY_EXIST: new Error('Troop already exist'),
    PATROL_ALREADY_EXIST: new Error('Patrol already exist'),
    

}

const Chef = {

    Errors,

    getPatrol : function(idtroop) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM patrouille WHERE ?',{IdTroupe:idtroop}, function(error, results) {
                if (error) {
                    reject(Errors.CONNECTION_ERROR);
                    return;
                }
                if(results[0] !== undefined) {
                    resolve(results)
                } else {
                    reject(Errors.BAD_REQUEST);
                }
            });
        });
    },
}

module.exports = Chef;