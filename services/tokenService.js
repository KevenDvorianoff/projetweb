const jwt = require('jsonwebtoken');
const secretkey = require('../config/secretkey')

const key = secretkey.secretkey;

exports.createToken = function(numcard, admin, pat) {

    return jwt.sign( {NumCarte: numcard, Admin: admin, IdPatrouille: pat}, key, {expiresIn: '1h'});

}

exports.checkToken = function(token) {
    
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, function(err, decoded) {
            if (err) {
                reject(err);
                return;
            }
            if (decoded !== undefined){
                resolve(decoded);
            } else {
                reject(err);
            }
        });
    });

}






