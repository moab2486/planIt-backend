const mongoose = require('mongoose');

const CertificationSchema = mongoose.Schema({
    user_id: Number,
    certificate_title: String,
    awarding_institution: String,
    year_obtained: Date,
    expiration: String
}, {
    timestamps: true
});


module.exports = mongoose.model('Certificate', CertificationSchema);

    