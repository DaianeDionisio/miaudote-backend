const Pet = require('../models/petModel');

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
        }
        res.send(pet);
    }).catch(next);
};