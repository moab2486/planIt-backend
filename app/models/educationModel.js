const mongoose = require('mongoose');

const CertificationSchema = mongoose.Schema({
    user_id: Number,
    school_name: String,
    school_address: String,
    started: Date,
    ended: Date,
    certificate_type: String,
    upload_file: String
}, {
    timestamps: true
});


module.exports = mongoose.model('Certification', CertificationSchema);

    