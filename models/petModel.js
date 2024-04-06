const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
    url: {type: String, required: [true,'*Campo obrigatório!']},
    alt: {type: String, required: [true,'*Campo obrigatório!']}
})

const PetAgesSchema = new Schema({
    age: {type: String, required: [true,'*Campo obrigatório!'], unique: true}
})

const PetSchema = new Schema({
    status: {type: String, required: [true,'*Campo obrigatório!']},
    registrationDate: {type: Date, required: [true, '*Campo obrigatório!']},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: [true,'*Campo obrigatório!']},
    photos: {type: [PhotoSchema], required: [true,'*Campo obrigatório!']},
    name: {type: String, required: [true,'*Campo obrigatório!']},
    gender: {type: String},
    specie: {type: Schema.Types.ObjectId, ref: 'Specie', required: [true,'*Campo obrigatório!']},
    age: {type: Schema.Types.ObjectId, ref: 'AgePet', required: [true,'*Campo obrigatório!']},
    idState: {type: String, required: [true,'*Campo obrigatório!']},
    idCity: {type: String, required: [true,'*Campo obrigatório!']},
    breed: {type: String},
    description: {type: String}
});

const Pet = mongoose.model('Pet', PetSchema);
const AgePet = mongoose.model('AgePet', PetAgesSchema);

module.exports = {
    Pet: mongoose.model('Pet', PetSchema),
    AgePet: mongoose.model('AgePet', PetAgesSchema)
};

// example:

// {
//     "status": "available",
//     "registrationDate": "2024-03-08T00:00:00.000Z",
//     "user": {"_id": "123456789"},
//     "photos": [{"url": "www.teste.com", "alt": "Photo 1"}],
//     "name": "Floquinho",
//     "gender": "male",
//     "specie": {"_id": "123456"},
//     "age": {"_id": "123456"},
//     "idState": "Minas Gerais",
//     "idCity": "Santa Rita do Sapucaí",
//     "breed": "Vira lata",
//     "description": "Não se adaptou ao irmãozinho (um gatinho)"
// }