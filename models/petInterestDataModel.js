const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetInterestDataSchema = new Schema({
    gender: {type: String},
    specie: {type: Schema.Types.ObjectId, ref: 'Specie'},
    age: {type: Schema.Types.ObjectId, ref: 'AgePet'},
    idState: {type: String},
    idCity: {type: String},
    breed: {type: String}
});

const PetInterestData = mongoose.model('PetInterestData', PetInterestDataSchema);
module.exports = PetInterestData;