const connection = require('../config/database');
const tokenService = require('../services/tokenService');
const func = require('../services/cookies');

const Errors = {

    NO_RESULTS: new Error('No results'),
    BAD_REQUEST: new Error('Bad request'),
    CONNECTION_ERROR: new Error('Unable to query database'),
    PATROL_ALREADY_EXIST: new Error('Patrol already exist'),
    SCOUT_ALREADY_EXIST: new Error('Scout already exist')
    
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
                        connection.query('SELECT * FROM patrouille WHERE ? AND NomPatrouille != ? ORDER BY NomPatrouille',[{IdTroupe:results1[0].IdTroupe},'Maîtrise'], function(error2, results2) {
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
                        reject(Errors.CONNECTION_ERROR);
                        return;
                    }
                    if(results1[0] !== undefined) {
                        connection.query('SELECT IdPatrouille FROM patrouille WHERE ? AND ?',[{IdTroupe:results1[0].IdTroupe}, {NomPatrouille:namepatrol}], function(error2, results2) {
                            if (error2) {
                                reject(Errors.CONNECTION_ERROR);
                                return;
                            }
                            if(results2[0] !== undefined) {
                                connection.query('UPDATE utilisateur SET ? WHERE ?', [{IdPatrouille:null},{IdPatrouille:results2[0].IdPatrouille}], function(error3, results3) {
                                    if (error3) {
                                        reject(Errors.CONNECTION_ERROR);
                                        return;
                                    }
                                });
                                connection.query('DELETE FROM posseder WHERE ?',{IdPatrouille:results2[0].IdPatrouille}, function(error4, result4) {
                                    if (error4) {
                                        reject(Errors.CONNECTION_ERROR);
                                        return;
                                    }
                                });
                                connection.query('DELETE FROM patrouille WHERE ?',{IdPatrouille:results2[0].IdPatrouille}, function(error5, result5) {
                                    if (error5) {
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
    },

    createPatrol : function(req, namepatrol) {
        return new Promise((resolve, reject) => {
            const token = func.getToken(req);
            tokenService.checkToken(token).then((result) => {
                connection.query('SELECT IdTroupe FROM patrouille WHERE ?',{IdPatrouille:result.IdPatrouille}, function(error1, results1) {
                    if (error1) {
                        reject(Errors.CONNECTION_ERROR);
                        return;
                    }
                    if(results1[0] !== undefined) {
                        connection.query('SELECT NomPatrouille FROM patrouille WHERE ? AND ?',[{IdTroupe:results1[0].IdTroupe},{NomPatrouille:namepatrol}], function(error4, results4) {
                            if (error4) {
                                reject(Errors.CONNECTION_ERROR);
                                return;
                            }
                            if(results4[0] !== undefined) {
                                reject(Errors.PATROL_ALREADY_EXIST);
                                return;
                            } else {
                                connection.query('INSERT INTO patrouille SET ?', {NomPatrouille:namepatrol, IdTroupe:results1[0].IdTroupe}, function(error2, results2) {
                                    if (error2) {
                                        reject(Errors.CONNECTION_ERROR);
                                        return;
                                    } else {
                                        for (let index = 1; index <= 35; index++) {
                                            connection.query('INSERT INTO posseder SET ?', {IdPatrouille:results2.insertId,IdMateriel:index, Quantite:0}, function(error3, results3) {
                                                if (error3) {
                                                    reject(Errors.CONNECTION_ERROR);
                                                    return;
                                                }
                                            });
                                        }
                                        resolve();
                                    }
                                });
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

    getScout : function(req, namepatrol) {
        return new Promise((resolve, reject) => {
            const token = func.getToken(req);
            tokenService.checkToken(token).then((result) => {
                connection.query('SELECT IdTroupe FROM patrouille WHERE ?',{IdPatrouille:result.IdPatrouille}, function(error1, results1) {
                    if (error1) {
                        reject(Errors.CONNECTION_ERROR);
                        return;
                    }
                    if(results1[0] !== undefined) {
                        connection.query('SELECT IdPatrouille FROM patrouille WHERE ? AND ?',[{IdTroupe:results1[0].IdTroupe}, {NomPatrouille:namepatrol}], function(error2, results2) {
                            if (error2) {
                                reject(Errors.CONNECTION_ERROR);
                                return;
                            }
                            if(results2[0] !== undefined) {
                                connection.query('SELECT NumCarte, Nom, Prenom FROM utilisateur WHERE ? ORDER BY Nom',{IdPatrouille:results2[0].IdPatrouille}, function(error3, results3) {
                                    if (error3) {
                                        reject(Errors.CONNECTION_ERROR);
                                        return;
                                    }
                                    if(results3[0] !== undefined) {
                                        resolve(results3);
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

    addScout : function(req, namepatrol, numcard) {
        return new Promise((resolve, reject) => {
            const token = func.getToken(req);
            tokenService.checkToken(token).then((result) => {
                connection.query('SELECT IdPatrouille FROM utilisateur WHERE ?',{NumCarte:numcard}, function(error1, results1) {
                    if (error1) {
                        reject(Errors.CONNECTION_ERROR);
                        return;
                    }
                    if(results1[0] !== undefined) {
                        if (results1[0].IdPatrouille === null) {
                            connection.query('SELECT IdTroupe FROM patrouille WHERE ?',{IdPatrouille:result.IdPatrouille}, function(error2, results2) {
                                if (error2) {
                                    reject(Errors.CONNECTION_ERROR);
                                    return;
                                }
                                if(results2[0] !== undefined) {
                                    connection.query('SELECT IdPatrouille FROM patrouille WHERE ? AND ?',[{IdTroupe:results2[0].IdTroupe}, {NomPatrouille:namepatrol}], function(error3, results3) {
                                        if (error3) {
                                            reject(Errors.CONNECTION_ERROR);
                                            return;
                                        }
                                        if(results3[0] !== undefined) {
                                            connection.query('UPDATE utilisateur SET ? WHERE ?', [{IdPatrouille:results3[0].IdPatrouille},{NumCarte:numcard}], function(error3, results3) {
                                                if (error3) {
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
                        } else {
                            reject(Errors.SCOUT_ALREADY_EXIST);
                            return;
                        }
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

    deleteScout : function(req, numcard) {
        return new Promise((resolve, reject) => {
            const token = func.getToken(req);
            tokenService.checkToken(token).then((result) => {
                connection.query('SELECT IdPatrouille FROM utilisateur WHERE ?',{NumCarte:numcard}, function(error1, results1) {
                    if (error1) {
                        reject(Errors.CONNECTION_ERROR);
                        return;
                    }
                    if(results1[0] !== undefined) {
                        connection.query('SELECT IdTroupe FROM patrouille WHERE ?',{IdPatrouille:results1[0].IdPatrouille}, function(error2, results2) {
                            if (error2) {
                                reject(Errors.CONNECTION_ERROR);
                                return;
                            }
                            if(results2[0] !== undefined) {
                                connection.query('SELECT IdTroupe FROM patrouille WHERE ?',{IdPatrouille:result.IdPatrouille}, function(error3, results3) {
                                    if (error3) {
                                        reject(Errors.CONNECTION_ERROR);
                                        return;
                                    }
                                    if(results3[0] !== undefined) {
                                        if (results2[0].IdTroupe === results3[0].IdTroupe) {
                                            connection.query('UPDATE utilisateur SET ? WHERE ?', [{IdPatrouille:null},{NumCarte:numcard}], function(error4, results4) {
                                                if (error4) {
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

    getEvents : function(req) {
        return new Promise((resolve, reject) => {
            const token = func.getToken(req);
            tokenService.checkToken(token).then((result) => {
                connection.query('SELECT IdTroupe FROM patrouille WHERE ?',{IdPatrouille:result.IdPatrouille}, function(error1, results1) {
                    if (error1) {
                        reject(Errors.CONNECTION_ERROR);
                        return;
                    }
                    if(results1[0] !== undefined) {
                        connection.query('SELECT IdEvenement, DateEvenement, IdType_E FROM evenements WHERE ? ORDER BY DateEvenement',{IdTroupe:results1[0].IdTroupe}, function(error2, results2) {
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

    deleteEvents : function(req, idevent) {
        return new Promise((resolve, reject) => {
            const token = func.getToken(req);
            tokenService.checkToken(token).then((result) => {
                connection.query('SELECT IdTroupe FROM patrouille WHERE ?',{IdPatrouille:result.IdPatrouille}, function(error1, results1) {
                    if (error1) {
                        reject(Errors.CONNECTION_ERROR);
                        return;
                    }
                    if(results1[0] !== undefined) {
                        connection.query('SELECT IdTroupe FROM evenements WHERE ?',{IdEvenement:idevent}, function(error2, results2) {
                            if (error2) {
                                reject(Errors.CONNECTION_ERROR);
                                return;
                            }
                            if(results2[0] !== undefined) {
                                if (results1[0].IdTroupe === results2[0].IdTroupe) {
                                    connection.query('DELETE FROM evenements WHERE ?',{IdEvenement:idevent}, function(error3, result3) {
                                        if (error3) {
                                            reject(Errors.CONNECTION_ERROR);
                                            return;
                                        } else {
                                            resolve();
                                        }
                                    });
                                } else {
                                    reject(Errors.BAD_REQUEST);
                                }
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

    createEvents : function(req, date, idtypeE) {
        return new Promise((resolve, reject) => {
            const token = func.getToken(req);
            tokenService.checkToken(token).then((result) => {
                connection.query('SELECT IdTroupe FROM patrouille WHERE ?',{IdPatrouille:result.IdPatrouille}, function(error1, results1) {
                    if (error1) {
                        reject(Errors.CONNECTION_ERROR);
                        return;
                    }
                    if(results1[0] !== undefined) {
                        connection.query('INSERT INTO evenements SET ?', {DateEvenement:date, IdType_E:idtypeE, IdTroupe:results1[0].IdTroupe}, function(error2, results2) {
                            if (error2) {
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
            }).catch(() => {
                reject(Errors.BAD_REQUEST);
            });
        });
    }
}

module.exports = Chef;