const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../../api/models/connectPg');

/* GET sigin page. */
router.get('/', function (req, res, next) {
    const errors = [];
    const document = {
        errors: errors,
        values: {
            un: '',
        }
    };
    res.render('secure/Login', document);
});

/* POST sigin page. */
router.post('/', async function (req, res, next) {
    const errors = [];
    const node = await db.query(`SELECT * FROM public.account WHERE username = '${req.body.un}'`);
    if (node.rows.length < 1) {
        errors.push('Tài khoản không tồn tại.');
        res.render('secure/Login', {
            errors: errors,
            values: {
                un: req.body.un,
            }
        });
        return;
    }
    bcrypt.compare(req.body.pw, node.rows[0].password, function (err, result) {
        // res == true
        if (err) {
            return res.status(500).json({
                Error: err
            });
        }
        if (result) {
            res.cookie('GisT', node.rows[0]._id, { signed: true });
            next();
        } else {
            errors.push('Mật khẩu không đúng.');
            res.render('secure/Login', {
                errors: errors,
                values: {
                    un: req.body.un,
                }
            });
            return;
        }
    });
}, function (req, res, next) {
    res.redirect('/admin');
});

/* POST sigin page. */
router.get('/logout', function (req, res, next) {
    // if (req.signedCookies.accountId) {
    //     const _id = await db.accounts.findById(req.signedCookies.accountId);
    //     if (_id.role === 3) {
    //         res.clearCookie("accountId");
    //         res.redirect('/');
    //         return;
    //     }
    // }
    res.clearCookie("GisT");
    res.redirect('/signin');
});

module.exports = router;