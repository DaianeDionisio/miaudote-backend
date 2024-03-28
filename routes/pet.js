const express = require('express');
const router = express.Router();
const authMiddleware = require('./../middlewares/authMiddleware');
const multer = require('multer');

const apiControllerPet = require('../controllers/apiControllerPet');

// Configuração do Multer para lidar com o upload de arquivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Onde os arquivos serão armazenados
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nome do arquivo
    }
});

const upload = multer({ storage: storage });

// Rota para criar um novo pet com upload de fotos
router.post('/pet', authMiddleware.verifyToken, upload.array('photos', 5), apiControllerPet.createPet);

// Outras rotas para manipulação de pets
router.get('/pet/:id', apiControllerPet.getPet);
router.get('/pet', apiControllerPet.getAllPets);
router.put('/pet/:id', authMiddleware.verifyToken, apiControllerPet.updatePet);
router.delete('/pet/:id', authMiddleware.verifyToken, apiControllerPet.deletePet);
router.get('/getPetsByUser/:id', authMiddleware.verifyToken, apiControllerPet.getPetsByUser);
router.post('/getPetsByCity', apiControllerPet.getPetsByCity);
router.post('/getPetsByFilter', apiControllerPet.getPetsByFilter);
router.get('/getSavedPetsByUser/:id', apiControllerPet.getSavedPetsByUser);

module.exports = router;
