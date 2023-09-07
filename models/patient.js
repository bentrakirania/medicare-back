const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  familyname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  age: { type: Number, required: true },
  date: { type: String, required: true },
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports =Patient;