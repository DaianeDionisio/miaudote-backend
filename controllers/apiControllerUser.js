const User = require('../models/userModel');

exports.getUser = function (req, res, next) {
    User.findOne({_id: req.params.id}).then(function(user){
        res.send(user);
    }).catch(next);
};


exports.getAllUsers = function (req, res, next) {
    User.find().then(function(users){
        res.send(users);
    }).catch(next);
};
 
exports.createUser = function (req, res, next) {
    User.create(req.body).then(function(user){
        res.send(user);
    }).catch(next);
};

exports.updateUser = function (req, res, next) {
    User.findByIdAndUpdate({_id: req.params.id},req.body).then(function(){
        User.findOne({_id: req.params.id}).then(function(user){
            res.send(user);
        });
    }).catch(next);
};

exports.deleteUser = function (req, res, next) {
    User.findByIdAndDelete({_id: req.params.id}).then(function(user){
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.send(user);
    }).catch(next);
};