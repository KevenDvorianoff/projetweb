const cookieParser = require('cookie-parser')

exports.setcookie = function(res, name, args, time) {
    return res.cookie(name, args, { maxAge: time * 1000, httpOnly: true })
}

exports.getCookie = function(req, name) {
    return req.cookies[name]
};

exports.clearCookie = function(res, name) {
    return res.clearCookie(name)
};

exports.setAlert = function(res, Atype, Atext) {
    alert = {type : Atype, text : Atext}
    return res.cookie("Alert_message", alert, { maxAge: 1 * 1000, httpOnly: true })
};

exports.getAlert = function(req) {
    return req.cookies["Alert_message"]
};

exports.clearAlert = function(res) {
    return res.clearCookie("Alert_message")
};

exports.setToken = function(res, token) {
    return res.cookie('Auth', token)
}

exports.getToken = function(req) {
    return req.cookies['Auth']
}

exports.clearToken = function(res) {
    return res.clearCookie('Auth')
}