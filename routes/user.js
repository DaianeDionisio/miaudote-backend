const express = require ('express');
const router = express.Router();

const apiControllerUser= require('../controllers/apiControllerUser');

router.get('/user/:id',apiControllerUser.getUser);
router.get('/user',apiControllerUser.getAllUsers);
router.post('/user',apiControllerUser.createUser);
router.put('/user/:id',apiControllerUser.updateUser);
router.delete('/user/:id',apiControllerUser.deleteUser);

module.exports = router;