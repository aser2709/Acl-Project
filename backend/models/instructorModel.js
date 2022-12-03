const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const instructorSchema = new Schema({
    Username: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true
    }});

    const instructor = mongoose.model('instructorModel', instructorSchema);
    module.exports = instructor;