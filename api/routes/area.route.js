const express = require('express');
const router = express.Router();
const db = require('../models/connectPg');

router.get('/', function (req, resquest, next) {
    db.query('SELECT *, ST_AsGeoJSON(geom, 15) as geojson FROM vungranhgioiphuongtxtdm_region', (err, res) => {
        const rows = res.rows;
        resquest.status(200).json({
            type: "FeatureCollection",
            features: rows.map(doc => {
                delete doc.geom;
                let geometry = JSON.parse(doc.geojson);
                delete doc.geojson;
                return {
                    type: "Feature",
                    properties: doc,
                    geometry: geometry,
                }
            })
        });
    });
});

router.get('/:id', function (req, resquest, next) {
    db.query(`SELECT *, ST_AsGeoJSON(geom, 15) as geojson FROM vungranhgioiphuongtxtdm_region WHERE gid=${Number(req.params.id)}`, (err, res) => {
        const rows = res.rows;
        resquest.status(200).json({
            type: "FeatureCollection",
            features: rows.map(doc => {
                delete doc.geom;
                let geometry = JSON.parse(doc.geojson);
                delete doc.geojson;
                return {
                    type: "Feature",
                    properties: doc,
                    geometry: geometry,
                }
            })
        });
    });
});

module.exports = router;