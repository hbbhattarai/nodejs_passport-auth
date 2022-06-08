const express = require('express');
const router = express.Router();

/* GET home page. */


// Rander Route 

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/login', function (req, res, next) {
  res.render('auth/login');
});
router.get('/register', function (req, res, next) {
  res.render('auth/register');
});

module.exports = router;
