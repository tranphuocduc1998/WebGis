var express = require('express');
var router = express.Router();
var db = require('../../api/models/connectPg');

/* GET home page. */
router.get('/', async function (req, res, next) {
    const area = await db.query('SELECT * FROM vungranhgioiphuongtxtdm_region ORDER BY gid');
    const arrdanhmuc = ['Mã số', 'Tên Khu vực', 'Tọa độ', 'Thao tác'];

    const doccument = {
        arrdanhmuc: arrdanhmuc,
        area: area.rows
    };
    res.render('secure/area/area', doccument);
});

/* GET Detail page. */
router.get('/:areaId', async function (req, res, next) {
    const area = await db.query(`SELECT * FROM vungranhgioiphuongtxtdm_region where gid = ${req.params.areaId}`);
    console.log(area.rows[0].tenphuong);
    const doccument = {
        area: area.rows[0],
    };
    res.render('secure/area/detail', doccument);
});

/* POST Detail page. */
router.post('/:areaId', async function (req, res, next) {
    const query = `UPDATE vungranhgioiphuongtxtdm_region
    SET tenphuong = '${req.body.tenphuong}',
        geom = '${req.body.geometryArea}'
    WHERE
       gid = ${req.params.areaId};`;
    await db.query(query);
    res.redirect(`/admin/area/${req.params.areaId}`);
});



module.exports = router;
