var express = require('express');
var router = express.Router();
var user = require('../controllers/AuthController');


router.post('/login',user.login);
router.post('/register',user.register);

module.exports = router;