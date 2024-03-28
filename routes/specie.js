const express = require ('express');
const router = express.Router();
const authMiddleware = require('./../middlewares/authMiddleware');


const apiControllerSpecie = require('../controllers/apiControllerSpecie');

router.get('/specie/:id', apiControllerSpecie.getSpecie);
router.get('/specie', apiControllerSpecie.getAllSpecies);
router.post('/specie', apiControllerSpecie.createSpecie);
router.put('/specie/:id', apiControllerSpecie.updateSpecie);
router.delete('/specie/:id', apiControllerSpecie.deleteSpecie);

module.exports = router;