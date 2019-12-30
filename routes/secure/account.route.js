var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var db = require('../../api/models/connectPg');

/* GET account page. */
router.get('/', async function (req, res, next) {
    const accounts = await db.query('SELECT * FROM public.account');
    const err = [];
    const arrdanhmuc = ['Tài khoản', 'Mật khẩu', 'quyền', 'Thao tác'];
    const doccument = {
        arrdanhmuc: arrdanhmuc,
        accounts: accounts.rows,
        err: err,
    };
    res.render('secure/account/index', doccument);
});

/* POST account page. */
router.post('/', async function (req, res, next) {
    const hashPw = await bcrypt.hash(req.body.pw, 10);
    const node = await db.query(`SELECT * FROM public.account WHERE username = '${req.body.us}'`);
    if (node.rows.length >= 1) {
        const accounts = await db.query('SELECT * FROM public.account');
        const err = [];
        const arrdanhmuc = ['Tài khoản', 'Mật khẩu', 'quyền', 'Thao tác'];
        err.push('<script>alert("Tài khoản đã tồn tại");</script >');
        const doccument = {
            arrdanhmuc: arrdanhmuc,
            accounts: accounts.rows,
            err: err,
        };
        console.log(doccument.err);
        res.render('secure/account/index', doccument);
        return;
    }

    const query = 'INSERT INTO public.account(username,password,role)' +
        `values ('${req.body.us}', '${hashPw}', ${1})`;
    await db.query(query);

    res.redirect('/admin/account');
});

/* GET delete page. */
router.get('/del/:delId', async function (req, res, next) {
    await db.query(`DELETE FROM public.account WHERE _id=${Number(req.params.delId)}`);
    res.redirect('/admin/account');
});

/* GET delete page. */
router.post('/edit/:editId', async function (req, res, next) {
    const hashPw = await bcrypt.hash(req.body.edpw, 10);
    const query = `UPDATE public.account
    SET password = '${hashPw}'
    WHERE
       _id = ${req.params.editId};`;
    await db.query(query);
    res.redirect('/admin/account');
});





module.exports = router;
