const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    password: {type: String, required: [true,'*Campo obrigatório!']},
    name: {type: String, required: [true,'*Campo obrigatório!']},
    registrationDate: {type: Date, required: [true, '*Campo obrigatório!']},
    email: {type: String, required: [true,'*Campo obrigatório!'], unique: true},
    celphone: {type: String, required: [true,'*Campo obrigatório!']},
    savedPets: {type: [Schema.Types.ObjectId], ref: 'Pet'}
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