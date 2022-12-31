const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const reportSchema = new Schema({
     user_email: {
      type: String,
      required: true,
    },
    course_id: {
      type: String,
      required: true
    },

    Type: {
        type: String,
        required: true
      },
    Body: {
        type: String,
        required: true
      },
    
    resolved: {
        type: Boolean,
        required: true
      }
    
    
    




});

    const report = mongoose.model('reportModel', reportSchema);
    module.exports = report;