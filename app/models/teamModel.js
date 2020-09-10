const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({
    user_id: Number,
    project_id: Number
}, {
    timestamps: true
});


module.exports = mongoose.model('Team', TeamSchema);