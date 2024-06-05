const mongoose = require('mongoose');
const User = require('../models/userModel');
const PetInterestData = require('../models/petInterestDataModel');
const Notification = require('../models/notificationModel')
const admin = require('firebase-admin');

const ApiControllerPet = require('./apiControllerPet');

exports.getUser = function (req, res, next) {
    User.findOne({ _id: req.params.id }).then(function (user) {
        res.send(user);
    }).catch(next);
};

exports.getAllUsers = function (req, res, next) {
    User.find().then(function (users) {
        res.send(users);
    }).catch(next);

};

exports.createUser = async function (req, res, next) {

    const { email, password } = req.body;

    try {
        // Criar usuário no Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email: email,
            password: password
        });
        console.debug('USER => ',userRecord)
        await User.create({
            userId: userRecord.uid,
            email: email,
            ...req.body
          });

        res.status(201).json({ message: 'Usuário criado com sucesso', uid: userRecord.uid });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

exports.updateUser = function (req, res, next) {
    User.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
        User.findOne({ _id: req.params.id }).then(function (user) {
            res.send(user);
        });
    }).catch(next);
};

exports.deleteUser = function (req, res, next) {
    User.findByIdAndDelete({ _id: req.params.id }).then(function (user) {
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.send(user);
    }).catch(next);
};

exports.addFavoritePet = function (req, res, next) {
    let idPet = req.body.idPet;
    let idUser = req.body.idUser;

    User.findByIdAndUpdate(
        { _id: idUser },
        { $push: { savedPets: { _id: idPet } } },
        { new: true }
    ).then(user => {
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.send(user);
    }).catch(next);
};

exports.removeFavoritePet = function (req, res, next) {
    let idPet = req.body.idPet;
    let idUser = req.body.idUser;

    User.findByIdAndUpdate(
        { _id: idUser },
        { $pull: { savedPets: idPet } },
        { new: true }
    ).then(user => {
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.send(user);
    }).catch(next);
};

exports.addPetOfInterest = function (req, res, next) {
    let idUser = req.body.idUser;
    let petData = req.body.petData;

    ApiControllerPet.getPetInterestData(petData).then(object => {
        if (!object) {
            petData.users = [{ _id: idUser }];
            ApiControllerPet.createPetInterestData(petData).then(createdObject => {
                res.send(createdObject);
            });
        } else {
            let users = object.users || [];
            users.push({ _id: idUser });
            object.users = users;

            ApiControllerPet.updatePetInterestData(object).then(updateObject => {
                res.send(updateObject);
            });
        }
    }).catch(next);
};

exports.removePetOfInterest = function (req, res, next) {
    let idUser = req.body.idUser;
    let petData = req.body.petData;

    ApiControllerPet.getPetInterestData(petData).then(object => {
        if (!object) {
            return res.status(404).json({ error: "Pet Data not found" });
        } else {
            let users = object.users || [];
            users = users.filter(user => user.valueOf() !== idUser);

            if (users.length) {
                object.users = users;

                ApiControllerPet.updatePetInterestData(object).then(updateObject => {
                    res.send(updateObject);
                });
            } else {
                ApiControllerPet.deletePetInterestData(object).then(deletedObject => {
                    res.send(deletedObject);
                });
            }
        }
    }).catch(next);
};

exports.getPetOfInterestByUser = function (req, res, next) {
    let idUser = req.params.id;

    PetInterestData.find({ "users": idUser }).then(petInterestedData => {
        res.send(petInterestedData);
    }).catch(next);
};

exports.getAllPetOfInterest = function () {
    return PetInterestData.find();
};

exports.getNotificationsByUser = async function (req, res, next) {
    const userId = req.params.id;
    Notification.find(
        { userId: userId }
    ).then(notifications => {
        if (!notifications) {
            return res.status(404).json({ error: "User not found" });
        }
        res.send(notifications);
    }).catch(next);
}

exports.getUserById = function (idUser) {
    return User.findOne({ _id: idUser });
};