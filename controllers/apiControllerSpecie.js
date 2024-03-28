const Specie = require('../models/specieModel');

exports.getSpecie = function (req, res, next) {
    Specie.find({_id: req.params.id}).then(function(specie){
        res.send(specie);
    }).catch(next);
};

exports.getAllSpecies = function (req, res, next) {
    Specie.find().then(function(species){
        res.send(species);
    }).catch(next);
};
 
exports.createSpecie = function (req, res, next) {
    Specie.create(req.body).then(function(specie){
        res.send(specie);
    }).catch(next);
};

exports.updateSpecie = function (req, res, next) {
    Specie.findByIdAndUpdate({_id: req.params.id},req.body).then(function(){
        Specie.findOne({_id: req.params.id}).then(function(specie){
            res.send(specie);
        });
    }).catch(next);
};

exports.deleteSpecie = function (req, res, next) {
    Specie.findByIdAndDelete({_id: req.params.id}).then(function(specie){
        if (!specie) {
            return res.status(404).json({ error: "Specie not found" });
        } else {
            res.send(specie);
        }
    }).catch(next);
};