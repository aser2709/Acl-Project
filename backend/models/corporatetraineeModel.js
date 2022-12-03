const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const corporatetraineeSchema = new Schema({
    Username: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true
    }});

    const corporatetrainee = mongoose.model('corpatetraineeModel', corporatetraineeSchema);
    module.exports = corporatetrainee;