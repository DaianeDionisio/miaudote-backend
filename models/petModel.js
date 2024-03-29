const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
    url: {type: String, required: [true,'*Campo obrigatório!']},
    alt: {type: String, required: [true,'*Campo obrigatório!']}
})

const PetAgesSchema = new Schema({
    id: {type: Number, required: [true,'*Campo obrigatório!']},
    age: {type: String, required: [true,'*Campo obrigatório!']}
})

const PetSchema = new Schema({
    status: {type: String, required: [true,'*Campo obrigatório!']},
    registrationDate: {type: Date, required: [true, '*Campo obrigatório!']},
    idUser: {type: String, required: [true,'*Campo obrigatório!']},
    photos: {type: [PhotoSchema], required: [true,'*Campo obrigatório!']},
    name: {type: String, required: [true,'*Campo obrigatório!']},
    gender: {type: String},
    idSpecie: {type: String, required: [true,'*Campo obrigatório!']},
    typeSpecie: {type: String, required: [true,'*Campo obrigatório!']},
    idAge: {type: Number},
    age: {type: String},
    idState: {type: String, required: [true,'*Campo obrigatório!']},
    idCity: {type: String, required: [true,'*Campo obrigatório!']},
    breed: {type: String},
    description: {type: String}
});

const Pet = mongoose.model('Pet', PetSchema);
const AgePet = mongoose.model('AgeSchema', PetAgesSchema);
module.exports = Pet;
module.exports = AgePet;


// example:

// {
//     "status": "available",
//     "registrationDate": "2024-03-08T00:00:00.000Z",
//     "idUser": "123456789",
//     "photos": [url: "www.teste.com", alt: "Photo 1"],
//     "name": "Floquinho",
//     "gender": "male",
//     "idSpecie": "123456",
//     "age": "2 anos",
//     "idState": "Minas Gerais",
//     "idCity": "Santa Rita do Sapucaí",
//     "breed": "Vira lata",
//     "description": "Não se adaptou ao irmãozinho (um gatinho)"
// }