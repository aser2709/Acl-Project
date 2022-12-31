const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const adminrequestSchema = new Schema({
    Email: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true
    },
    Request: {
        type: String,
        required: true
    }});
    module.exports = mongoose.model('Request', adminrequestSchema)