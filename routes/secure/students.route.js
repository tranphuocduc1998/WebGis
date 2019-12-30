var express = require('express');
var router = express.Router();
var db = require('../../api/models/connectPg');

/* GET home page. */
router.get('/', async function (req, res, next) {
  const students = await db.query('SELECT * FROM Students ORDER BY gid DESC');
  const arrdanhmuc = ['Tên sinh viên', 'Giới tính', 'Ngày sinh', 'Tuổi', 'Thao tác'];
  const date = new Date(Date.now());
  const doccument = {
    arrdanhmuc: arrdanhmuc,
    students: students.rows.map(doc => {
      return {
        gid: doc.gid,
        displayname: doc.displayname,
        gender: doc.gender,
        birthday: `${doc.birthday.getDate()}/${doc.birthday.getMonth() + 1}/${doc.birthday.getFullYear()}`,
        age: `${date.getFullYear() - doc.birthday.getFullYear()} `,
      }
    })
  };
  res.render('secure/students/index', doccument);
});

/* GET Additional page. */
router.get('/new', async function (req, res, next) {
  res.render('secure/students/additional');
});

/* POST Additional page. */
router.post('/new', async function (req, res, next) {
  const dt = new Date(req.body.birthday);
  const geoJson = `{"type":"Point","coordinates":[${req.body.geoJson.split(',')[1]},${req.body.geoJson.split(',')[0]}]}`;
  const query = 'INSERT INTO Students(displayname,gender,birthday,geom)' +
    `values ('${req.body.displayname}', '${req.body.gender}', '${dt.getMonth() + 1}-${dt.getDate()}-${dt.getFullYear()}', ST_Force4D(ST_GeomFromGeoJSON('${geoJson}')))`;
  await db.query(query);

  res.redirect('/admin/students');
});

/* GET delete page. */
router.get('/detele/:gid', async function (req, res, next) {
  const query = `DELETE FROM Students WHERE gid = ${Number(req.params.gid)};`;
  await db.query(query);

  res.redirect('/admin/students');
});



module.exports = router;
