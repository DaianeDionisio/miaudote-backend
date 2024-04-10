const { Pet, AgePet } = require('../models/petModel');

const ApiControllerUser = require('./apiControllerUser');

exports.getPet = function (req, res, next) {
    Pet.findOne({ _id: req.params.id }).populate('age').populate('specie').then(function (pet) {
        res.send(pet);
    }).catch(next);
};

exports.getAllPets = function (req, res, next) {
    Pet.find().populate('age').populate('specie').then(function (pets) {
        res.send(pets);
    }).catch(next);
};

exports.createPet = function (req, res, next) {
    Pet.create(req.body).then(function (pet) {
        res.send(pet);
    }).catch(next);
};

exports.updatePet = function (req, res, next) {
    Pet.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
        Pet.findOne({ _id: req.params.id }).populate('age').populate('specie').then(function (pet) {
            res.send(pet);
        });
    }).catch(next);
};

exports.deletePet = function (req, res, next) {
    Pet.findByIdAndDelete({ _id: req.params.id }).populate('age').populate('specie').then(function (pet) {
        if (!pet) {
            return res.status(404).json({ error: "Pet not found" });
        } else {
            res.send(pet);
        }
    }).catch(next);
};

exports.getPetsByUser = function (req, res, next) {
    let idUser = req.params.id;

    Pet.find({ 'user': idUser }).populate('age').populate('specie').then(function (pets) {
        if (pets) {
            res.send(pets);
        } else {
            return res.status(404).json({ error: "Pets not found" });
        }
    }).catch(next);
};

exports.getPetsByCity = function (req, res, next) {
    let idCity = req.body.city;

    Pet.find({ idCity: idCity }).populate('age').populate('specie').then(function (pets) {
        if (pets.length) {
            res.send(pets);
        } else {
            return res.status(404).json({ error: "Pets not found" });
        }
    }).catch(next);
};

exports.getPetsByFilter = function (req, res, next) {
    const filter = req.body; // Os filtros são enviados no corpo da requisição

    // Construir o objeto de filtro com base nos parâmetros recebidos
    const query = {};
    if (filter.age) query.age = filter.age;
    if (filter.specie) query.specie = filter.specie;
    if (filter.breed) query.breed = filter.breed;
    if (filter.gender) query.gender = filter.gender;
    if (filter.idState) query.idState = filter.idState;
    if (filter.idCity) query.idCity = filter.idCity;
    Pet.find(query)
        .populate('age')
        .populate('specie')
        .then(function (pets) {
            if (pets.length) {
                res.send(pets);
            } else {
                return res.status(404).json({ error: "Pets not found" });
            }
        })
        .catch(next);
};


exports.getSavedPetsByUser = function (req, res, next) {
    let idUser = req.params.id;

    ApiControllerUser.getUserById(idUser).then(user => {
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        let savedPetsIds = user.savedPets; // IDs dos pets favoritos

        // Buscar os detalhes de cada pet favorito
        Pet.find({ _id: { $in: savedPetsIds } })
            .populate('age')
            .populate('specie')
            .then(savedPets => {
                res.send(savedPets); // Retorna a lista completa de pets favoritos com todos os detalhes
            })
            .catch(next);

    }).catch(next);
};

/** Idade dos pets */

exports.getAllAgePets = function (req, res, next) {
    AgePet.find().then(function (ages) {
        res.send(ages);
    }).catch(next);
};

exports.createAgePets = function (req, res, next) {
    AgePet.create(req.body).then(function (age) {
        res.send(age);
    }).catch(next);
};

exports.updateAgePet = function (req, res, next) {
    AgePet.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
        AgePet.findOne({ _id: req.params.id }).then(function (age) {
            res.send(age);
        });
    }).catch(next);
};