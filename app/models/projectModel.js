const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    project_name: String,
    start_date: Date,
    end_date: Date,
    status: Number
}, {
    timestamps: true
});


module.exports = mongoose.model('Project', ProjectSchema);

    