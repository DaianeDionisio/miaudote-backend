const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpecieSchema = new Schema({
    type: {type: String, required: [true,'*Campo obrigatório!']}
});

const Specie = mongoose.model('Specie', SpecieSchema);
module.exports = Specie;


// example:

// {
//     "type": "Cachorro"
// }