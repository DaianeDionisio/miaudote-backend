const express = require ('express');
const router = express.Router();
const authMiddleware = require('./../middlewares/authMiddleware');


const apiControllerPet = require('../controllers/apiControllerPet');

router.get('/pet/:id', apiControllerPet.getPet);
router.get('/pet', apiControllerPet.getAllPets);
router.post('/pet',  apiControllerPet.createPet);
router.put('/pet/:id', authMiddleware.verifyFirebaseToken, apiControllerPet.updatePet);
router.delete('/pet/:id', authMiddleware.verifyFirebaseToken, apiControllerPet.deletePet);
router.get('/getPetsByUser/:id', authMiddleware.verifyFirebaseToken, apiControllerPet.getPetsByUser);
router.post('/getPetsByCity', apiControllerPet.getPetsByCity);
router.post('/getPetsByFilter', apiControllerPet.getPetsByFilter);
router.get('/getSavedPetsByUser/:id', apiControllerPet.getSavedPetsByUser);
// router.get('/getInterestedUsersByPet/:id', apiControllerPet.getInterestedUsersByPet);

/** Idade dos pets */
router.get('/agePets', apiControllerPet.getAllAgePets);
router.post('/createAgePets', apiControllerPet.createAgePets);
router.put('/agePet/:id', apiControllerPet.updateAgePet);

router.put('/notification/:id/marcar-lida', apiControllerPet.updateNotification);


module.exports = router;