const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetInterestData = new Schema({
    gender: {type: String},
    specie: {type: Schema.Types.ObjectId, ref: 'Specie'},
    age: {type: Schema.Types.ObjectId, ref: 'AgePet'},
    idState: {type: String},
    idCity: {type: String},
    breed: {type: String}
});

const UserSchema = new Schema({
    password: {type: String, required: [true,'*Campo obrigatório!']},
    name: {type: String, required: [true,'*Campo obrigatório!']},
    registrationDate: {type: Date, required: [true, '*Campo obrigatório!']},
    email: {type: String, required: [true,'*Campo obrigatório!'], unique: true},
    celphone: {type: String, required: [true,'*Campo obrigatório!']},
    savedPets: {type: [Schema.Types.ObjectId], ref: 'Pet'},
    petInterestData: {type:[PetInterestData]}
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

// example:

// {
//     "password": "ana123",
//     "name": "Ana da Silva",
//     "registrationDate": "2024-03-08T00:00:00.000Z",
//     "email": "ana@silva.gmail",
//     "celphone": "12965412395",
//     "city": "Pouso Alegre",
//     "savedPets": [{"_id": "123456"}],
//     "petInterestData": [{
//         "gender": "male",
//         "age": {"_id": "123456"}
//     }]
// }