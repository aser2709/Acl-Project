const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const adminrequestSchema = new Schema({
    Email: {
      type: String,
      required: true,
    },
    course_id: {
      type: String,
      required: true
    },
    course_name: {
      type: String,
      required: true
    },
    Request: {
        type: Boolean,
        required: true
    }});
    const request = mongoose.model('Request', adminrequestSchema);
    module.exports = request;