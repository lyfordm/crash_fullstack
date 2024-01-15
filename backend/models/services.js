const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
   
    point: {
      type: String,
      required: true,
    },
  });

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  desc: [pointSchema]
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
