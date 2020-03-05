const connection = require('../config/database');
const tokenService = require('../services/tokenService');
const func = require('../services/cookies');
const bcrypt = require('bcrypt');

const Errors = {

    NO_RESULTS: new Error('No results'),
    BAD_REQUEST: new Error('Bad request'),
    CONNECTION_ERROR: new Error('Unable to query database')
    
}

const Scout = {

    Errors,

    getScout : function(req) {
        return new Promise((resolve, reject) => {
            const token = func.getToken(req);
            tokenService.checkToken(token).then((result) => {
                connection.query('SELECT Nom, Prenom, DateNaissance FROM utilisateur WHERE ? ORDER BY Nom',{IdPatrouille:result.IdPatrouille}, function(error1, results1) {
                    if (error1) {
                        reject(Errors.CONNECTION_ERROR);
                        return;
                    }
                    if(results1[0] !== undefined) {
                        resolve(results1);
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

    getEvent : function(req) {
        return new Promise((resolve, reject) => {
            const token = func.getToken(req);
            tokenService.checkToken(token).then((result) => {
                connection.query('SELECT IdTroupe FROM patrouille WHERE ?',{IdPatrouille:result.IdPatrouille}, function(error1, results1) {
                    if (error1) {
                        reject(Errors.CONNECTION_ERROR);
                        return;
                    }
                    if(results1[0] !== undefined) {
                        connection.query('SELECT DateEvenement, NomType_E FROM evenements NATURAL JOIN type_e WHERE ? ORDER BY DateEvenement',{IdTroupe:results1[0].IdTroupe}, function(error2, results2) {
                            if (error2) {
                                reject(Errors.CONNECTION_ERROR);
                                return;
                            }
                            if(results2[0] !== undefined) {
                                resolve(results2);
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

    getMateriel : function(req) {
        return new Promise((resolve, reject) => {
            const token = func.getToken(req);
            tokenService.checkToken(token).then((result) => {
                connection.query('SELECT IdMateriel, Quantite, NomMateriel, NomType_M FROM posseder NATURAL JOIN materiel NATURAL JOIN type_m WHERE ? ORDER BY NomMateriel',{IdPatrouille:result.IdPatrouille}, function(error1, results1) {
                    if (error1) {
                        reject(Errors.CONNECTION_ERROR);
                        return;
                    }
                    if(results1[0] !== undefined) {
                        resolve(results1);
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

    moreMateriel : function(req, idmat) {
        return new Promise((resolve, reject) => {
            const token = func.getToken(req);
            tokenService.checkToken(token).then((result) => {
                connection.query('SELECT Quantite FROM posseder WHERE ? AND ?',[{IdPatrouille:result.IdPatrouille}, {IdMateriel:idmat}], function(error1, results1) {
                    console.log(results1)
                    if (error1) {
                        reject(Errors.CONNECTION_ERROR);
                        return;
                    }
                    if(results1[0] !== undefined) {
                        results1[0].Quantite += 1;
                        connection.query('UPDATE posseder SET ? WHERE ? AND ?', [{Quantite:results1[0].Quantite},{IdPatrouille:result.IdPatrouille}, {IdMateriel:idmat}], function(error2, results2) {
                            if (error2) {
                                reject(Errors.CONNECTION_ERROR);
                                return;
                            } else {
                                resolve();
                            }
                        });
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

    lessMateriel : function(req, idmat) {
        return new Promise((resolve, reject) => {
            const token = func.getToken(req);
            tokenService.checkToken(token).then((result) => {
                connection.query('SELECT Quantite FROM posseder WHERE ? AND ?',[{IdPatrouille:result.IdPatrouille}, {IdMateriel:idmat}], function(error1, results1) {
                    console.log(results1)
                    if (error1) {
                        reject(Errors.CONNECTION_ERROR);
                        return;
                    }
                    if(results1[0] !== undefined) {
                        results1[0].Quantite -= 1;
                        if (results1[0].Quantite < 0) {
                            results1[0].Quantite = 0;
                        }
                        connection.query('UPDATE posseder SET ? WHERE ? AND ?', [{Quantite:results1[0].Quantite},{IdPatrouille:result.IdPatrouille}, {IdMateriel:idmat}], function(error2, results2) {
                            if (error2) {
                                reject(Errors.CONNECTION_ERROR);
                                return;
                            } else {
                                resolve();
                            }
                        });
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

module.exports = Scout;