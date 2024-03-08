const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema({
    status: {type: String, required: [true,'*Campo obrigatório!']},
    registrationDate: {type: Date, required: [true, '*Campo obrigatório!']},
    idUser: {type: Number, required: [true,'*Campo obrigatório!']},
    imageUrl: {type: String, required: [true,'*Campo obrigatório!']},
    name: {type: String, required: [true,'*Campo obrigatório!']},
    gender: {type: String},
    species: {type: String, required: [true,'*Campo obrigatório!']},
    age: {type: String},
    state: {type: String, required: [true,'*Campo obrigatório!']},
    city: {type: String, required: [true,'*Campo obrigatório!']},
    race: {type: String},
    description: {type: String}
});

const Pet = mongoose.model('Pet', PetSchema);
module.exports = Pet;


// example:

// {
//     "status": "available",
//     "registrationDate": "2024-03-08T00:00:00.000Z",
//     "idUser": 123456789,
//     "imageUrl": "www.teste.com",
//     "name": "Floquinho",
//     "gender": "male",
//     "species": "Cachorro",
//     "age": "2 anos",
//     "state": "Minas Gerais",
//     "city": "Santa Rita do Sapucaí",
//     "race": "Vira lata",
//     "description": "Não se adaptou ao irmãozinho (um gatinho)"
// }