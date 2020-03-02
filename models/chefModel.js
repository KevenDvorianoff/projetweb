const connection = require('../config/database');
const tokenService = require('../services/tokenService');
const func = require('../services/cookies');

const Errors = {

    NO_RESULTS: new Error('No results'),
    BAD_REQUEST: new Error('Bad request'),
    CONNECTION_ERROR: new Error('Unable to query database'),
    TROOP_ALREADY_EXIST: new Error('Troop already exist'),
    PATROL_ALREADY_EXIST: new Error('Patrol already exist'),
    
}

const Chef = {

    Errors,

    getPatrol : function(req) {
        return new Promise((resolve, reject) => {
            const token = func.getToken(req);
            tokenService.checkToken(token).then((result) => {
                connection.query('SELECT IdTroupe FROM patrouille WHERE ?',{IdPatrouille:result.IdPatrouille}, function(error1, results1) {
                    if (error1) {
                        reject(Errors.CONNECTION_ERROR);
                        return;
                    }
                    if(results1[0] !== undefined) {
                        connection.query('SELECT * FROM patrouille WHERE ? AND NomPatrouille != ?',[{IdTroupe:results1[0].IdTroupe},'Maîtrise'], function(error2, results2) {
                            if (error2) {
                                reject(Errors.CONNECTION_ERROR);
                                return;
                            }
                            if(results2[0] !== undefined) {
                                resolve(results2)
                            } else {
                                reject(Errors.NO_RESULTS);
                                return;
                            }
                        });
                    } else {
                        reject(Errors.NO_RESULTS);
                        return;
                    }
                });
            }).catch(() => {
                reject(Errors.BAD_REQUEST);
            });
        });
    },

    deletePatrol : function(req, namepatrol) {
        return new Promise((resolve, reject) => {
            const token = func.getToken(req);
            tokenService.checkToken(token).then((result) => {
                connection.query('SELECT IdTroupe FROM patrouille WHERE ?',{IdPatrouille:result.IdPatrouille}, function(error1, results1) {
                    if (error1) {
                        console.log('erreur1');
                        reject(Errors.CONNECTION_ERROR);
                        return;
                    }
                    if(results1[0] !== undefined) {
                        console.log(namepatrol);
                        connection.query('SELECT IdPatrouille FROM patrouille WHERE ? AND ?',[{IdTroupe:results1[0].IdTroupe}, {NomPatrouille:namepatrol}], function(error2, results2) {
                            if (error2) {
                                console.log('erreur2');
                                reject(Errors.CONNECTION_ERROR);
                                return;
                            }
                            if(results2[0] !== undefined) {
                                connection.query('UPDATE utilisateur SET ? WHERE ?', [{IdPatrouille:null},{IdPatrouille:results2[0].IdPatrouille}], function(error3, results3) {
                                    if (error3) {
                                        console.log('erreur3');
                                        reject(Errors.CONNECTION_ERROR);
                                        return;
                                    }
                                });
                                connection.query('DELETE FROM posseder WHERE ?',{IdPatrouille:results2[0].IdPatrouille}, function(error4, result4) {
                                    if (error4) {
                                        console.log('erreur4');
                                        reject(Errors.CONNECTION_ERROR);
                                        return;
                                    }
                                });
                                connection.query('DELETE FROM patrouille WHERE ?',{IdPatrouille:results2[0].IdPatrouille}, function(error5, result5) {
                                    if (error5) {
                                        console.log('erreur5');
                                        reject(Errors.CONNECTION_ERROR);
                                        return;
                                    } else {
                                        resolve();
                                    }
                                });
                            } else {
                                reject(Errors.NO_RESULTS);
                                return;
                            }
                        });
                    } else {
                        reject(Errors.NO_RESULTS);
                        return;
                    }
                });
            }).catch(() => {
                reject(Errors.BAD_REQUEST);
            });
        });
    }

}

module.exports = Chef;