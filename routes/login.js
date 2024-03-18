const express = require ('express');
const router = express.Router();

const apiControllerLogin = require('../controllers/apiControllerLogin');

router.post('/login', apiControllerLogin.login);


module.exports = router;