const mongoose = require('mongoose');


const Doctor= mongoose.model( 'Doctor' , {

    firstname: String,
    familyname: String,
    speciality: String,
    phone: Number,
    id:String,
    image: String

} );

module.exports = Doctor;