var express = require('express');
var router = express.Router();

//Middleware
const sessionMiddleware = require('../../validations/session.validation');
router.use(sessionMiddleware);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('secure/index');
});

module.exports = router;
