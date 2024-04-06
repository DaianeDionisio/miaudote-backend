const express = require ('express');
const router = express.Router();
const authMiddleware = require('./../middlewares/authMiddleware');


const apiControllerPet = require('../controllers/apiControllerPet');

router.get('/pet/:id', apiControllerPet.getPet);
router.get('/pet', apiControllerPet.getAllPets);
router.post('/pet',  apiControllerPet.createPet);
router.put('/pet/:id', authMiddleware.verifyToken, apiControllerPet.updatePet);
router.delete('/pet/:id', authMiddleware.verifyToken, apiControllerPet.deletePet);
router.get('/getPetsByUser/:id', authMiddleware.verifyToken, apiControllerPet.getPetsByUser);
router.post('/getPetsByCity', apiControllerPet.getPetsByCity);
router.post('/getPetsByFilter', apiControllerPet.getPetsByFilter);
router.get('/getSavedPetsByUser/:id', apiControllerPet.getSavedPetsByUser);

/** Idade dos pets */
router.get('/agePets', apiControllerPet.getAllAgePets);
router.post('/createAgePets', apiControllerPet.createAgePets);
router.put('/agePet/:id', apiControllerPet.updateAgePet);


module.exports = router;