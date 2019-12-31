var express = require('express');
var router = express.Router();
var db = require('../../api/models/connectPg');

/* GET home page. */
router.get('/', async function (req, res, next) {
    const line = await db.query('SELECT * FROM duong_tdm_polyline ORDER BY gid');
    const arrdanhmuc = ['Mã số', 'Tên đường', 'Tọa độ', 'Thao tác'];

    const doccument = {
        arrdanhmuc: arrdanhmuc,
        line: line.rows
    };
    res.render('secure/line/line', doccument);
});

/* GET Detail page. */
router.get('/:lineId', async function (req, res, next) {
    const line = await db.query(`SELECT * FROM duong_tdm_polyline where gid = ${req.params.lineId}`);
    const doccument = {
        line: line.rows[0],
    };
    res.render('secure/line/detail', doccument);
});

/* POST Detail page. */
router.post('/:lineId', async function (req, res, next) {
    const query = `UPDATE duong_tdm_polyline
    SET tenduong = '${req.body.tenduong}'
    WHERE
       gid = ${req.params.lineId};`;
    await db.query(query);
    res.redirect(`/admin/line/${req.params.lineId}`);
});



module.exports = router;
