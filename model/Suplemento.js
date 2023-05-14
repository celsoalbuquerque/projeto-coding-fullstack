const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Suplemento = new Schema({
  name: {
    type: String
  },
  marca: {
    type: String
  },
  notaQualidade: {
    type: Number
  }
},{
    collection: 'suplemento'
});

module.exports = mongoose.model('Suplemento', Suplemento);