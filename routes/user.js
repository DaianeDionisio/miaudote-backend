const express = require ('express');
const router = express.Router();
const authMiddleware = require('./../middlewares/authMiddleware');

const apiControllerUser= require('../controllers/apiControllerUser');

router.get('/user/:id',apiControllerUser.getUser);
router.get('/user',apiControllerUser.getAllUsers);
router.post('/user',apiControllerUser.createUser);
router.put('/user/:id', authMiddleware.verifyToken, apiControllerUser.updateUser);
router.delete('/user/:id', authMiddleware.verifyToken, apiControllerUser.deleteUser);
router.post('/addFavoritePet', apiControllerUser.addFavoritePet);
router.post('/removeFavoritePet', apiControllerUser.removeFavoritePet);

module.exports = router;