const db = require('../api/models/connectPg');

module.exports = async function (req, res, next) {
    if (!req.signedCookies.GisT) {
        res.redirect('/signin');
        return;
    }
    next();
};
