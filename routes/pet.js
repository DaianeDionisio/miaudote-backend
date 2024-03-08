const express = require ('express');
const router = express.Router();

const apiControllerPet = require('../controllers/apiControllerPet');

router.get('/pet/:id',apiControllerPet.getPet);
router.get('/pet',apiControllerPet.getAllPets);
router.post('/pet',apiControllerPet.createPet);
router.put('/pet/:id',apiControllerPet.updatePet);
router.delete('/pet/:id',apiControllerPet.deletePet);

module.exports = router;