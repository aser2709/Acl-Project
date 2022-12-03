const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    Username: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true
    }});

    const admin = mongoose.model('adminModel', adminSchema);
    module.exports = admin;