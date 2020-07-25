const mongoose = require('mongoose');
const { Schema } = mongoose;

const DiaFeriadoSchema = new Schema({
  id   : { type: String, required: true },     // String // Identificador único de feriado


    motivo : { type: String, required: true },  // String
    tipo  : { type: String, required: true },   // String // inamovible | trasladable | nolaborable | puente
    dia  : { type: Number, required: true },    // Number // Día del mes
    mes  : { type: Number, required: true }   // Number // Número de mes en base 1 (enero = 1)


});

module.exports = mongoose.model('DiaFeriado', DiaFeriadoSchema);
