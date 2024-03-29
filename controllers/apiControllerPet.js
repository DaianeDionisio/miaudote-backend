const Pet = require('../models/petModel');
const ApiControllerUser = require('./apiControllerUser');

exports.getPet = function (req, res, next) {
    Pet.find({_id: req.params.id}).then(function(pet){
        res.send(pet);
    }).catch(next);
};

exports.getAllPets = function (req, res, next) {
    Pet.find().then(function(pets){
        res.send(pets);
    }).catch(next);
};
 
exports.createPet = function (req, res, next) {
    Pet.create(req.body).then(function(pet){
        res.send(pet);
    }).catch(next);
};

exports.updatePet = function (req, res, next) {
    Pet.findByIdAndUpdate({_id: req.params.id},req.body).then(function(){
        Pet.findOne({_id: req.params.id}).then(function(pet){
            res.send(pet);
        });
    }).catch(next);
};

exports.deletePet = function (req, res, next) {
    Pet.findByIdAndDelete({_id: req.params.id}).then(function(pet){
        if (!pet) {
            return res.status(404).json({ error: "Pet not found" });
        } else {
            res.send(pet);
        }
    }).catch(next);
};

exports.getPetsByUser = function (req, res, next) {
    let idUser = req.params.id;

    Pet.find({idUser: idUser}).then(function(pets){
        if (pets.length) {
            res.send(pets);
        } else {
            return res.status(404).json({ error: "Pets not found" });
        }
        res.send(pet);
    }).catch(next);
};

exports.getPetsByCity = function (req, res, next) {
    let city = req.body.city;

    Pet.find({city: city}).then(function(pets){
        if (pets.length) {
            res.send(pets);
        } else {
            return res.status(404).json({ error: "Pets not found" });
        }
        res.send(pet);
    }).catch(next);
};

exports.getPetsByFilter = function (req, res, next) {
    Pet.find(req.body).then(function(pets){
        if (pets.length) {
            res.send(pets);
        } else {
            return res.status(404).json({ error: "Pets not found" });
        }
        res.send(pet);
    }).catch(next);
};

exports.getSavedPetsByUser = function (req, res, next) {
    let idUser = req.params.id;

    ApiControllerUser.getUserById(idUser).then(user => {
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log(user)
        let petIds = user.idSavedPets;
        return Pet.find({ _id: { $in: petIds } });
    }).then(pets => {
        if (pets && pets.length) {
            res.send(pets);
        } else {
            return res.status(404).json({ error: "Pets not found for this user" });
        }
    }).catch(next);
};