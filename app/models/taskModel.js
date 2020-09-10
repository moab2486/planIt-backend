const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    user_id: Number,
    task_name: String,
    categories: String, 
    day_date: Date,      
    day_time: String,
    note: String
}, {
    timestamps: true
});


module.exports = mongoose.model('Task', TaskSchema);

    