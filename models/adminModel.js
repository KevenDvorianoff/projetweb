const connection = require('../config/database');

const Errors = {

    NO_RESULTS: new Error('No results'),
    BAD_REQUEST: new Error('Bad request'),
    CONNECTION_ERROR: new Error('Unable to query database'),
    TROOP_ALREADY_EXIST: new Error('Troop already exist'),
    PATROL_ALREADY_EXIST: new Error('Patrol already exist'),
    

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
            connection.query('SELECT NomTroupe FROM demande WHERE ?', {NumCarte:numcard}, function(error1, results1) {
                if (error1) {
                    reject(Errors.CONNECTION_ERROR);
                    return;
                }
                if(results1[0] !== undefined) {
                    connection.query('SELECT NomTroupe FROM troupe WHERE ?', {NomTroupe:results1[0].NomTroupe}, function(error6, results6) {
                        if (error6) {
                            reject(Errors.CONNECTION_ERROR);
                            return;
                        }
                        if(results6[0] !== undefined) {
                            reject(Errors.TROOP_ALREADY_EXIST);
                        } else {
                            connection.query('INSERT INTO troupe SET ?', {NomTroupe:results1[0].NomTroupe}, function(error2, results2) {
                                if (error2) {
                                    reject(Errors.CONNECTION_ERROR);
                                    return;
                                } else {
                                    connection.query('INSERT INTO patrouille SET ?', {NomPatrouille:"Maîtrise", IdTroupe:results2.insertId}, function(error3, results3) {
                                        if (error3) {
                                            reject(Errors.CONNECTION_ERROR);
                                            return;
                                        } else {
                                            connection.query('UPDATE utilisateur SET ? WHERE ?', [{IdPatrouille:results3.insertId},{NumCarte:numcard}], function(error4, results4) {
                                                if (error4) {
                                                    reject(Errors.CONNECTION_ERROR);
                                                    return;
                                                } else {
                                                    connection.query('DELETE FROM demande WHERE ?', {NumCarte:numcard}, function(error5, results5) {
                                                        if (error5) {
                                                            reject(Errors.CONNECTION_ERROR);
                                                            return;
                                                        } else {
                                                            resolve();
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
                    reject(Errors.NO_RESULTS);
                }
            });
        });
    }, 

    getTroop : function() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT NomTroupe FROM troupe ORDER BY NomTroupe', function(error, results) {
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

    delTroop : function(nametroop) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT IdTroupe FROM troupe WHERE ?',{NomTroupe:nametroop}, function(error1, results1) {
                if (error1) {
                    reject(Errors.CONNECTION_ERROR);
                    return;
                }
                if(results1[0] !== undefined) {
                    connection.query('SELECT IdPatrouille FROM patrouille WHERE ?',{IdTroupe:results1[0].IdTroupe}, function(error2, results2) {
                        if (error2) {
                            reject(Errors.CONNECTION_ERROR);
                            return;
                        } 
                        if(results2[0] !== undefined) {
                            results2.forEach(element => {
                                connection.query('UPDATE utilisateur SET ? WHERE ?', [{IdPatrouille:null},{IdPatrouille:element.IdPatrouille}], function(error3, results3) {
                                    if (error3) {
                                        reject(Errors.CONNECTION_ERROR);
                                        return;
                                    }
                                });
                                connection.query('DELETE FROM posseder WHERE ?',{IdPatrouille:element.IdPatrouille}, function(error4, result4) {
                                    if (error4) {
                                        reject(Errors.CONNECTION_ERROR);
                                        return;
                                    }
                                });
                            });
                            connection.query('DELETE FROM patrouille WHERE ?', {IdTroupe:results1[0].IdTroupe}, function(error5, results5) {
                                if (error5) {
                                    reject(Errors.CONNECTION_ERROR);
                                    return;
                                } else {
                                    connection.query('DELETE FROM troupe WHERE ?', {IdTroupe:results1[0].IdTroupe}, function(error6, results6) {
                                        if (error6) {
                                            reject(Errors.CONNECTION_ERROR);
                                            return;
                                        } else {
                                            resolve();
                                        }
                                    });
                                }
                            });
                        } else {
                            reject(Errors.BAD_REQUEST);
                            return;
                        }
                    });
                } else {
                    reject(Errors.BAD_REQUEST);
                }
            });
        });
    }

}

module.exports = Admin;