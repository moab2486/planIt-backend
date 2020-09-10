//users model
const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    company_id: Number,
    branch_id: Number,
    title: String,
    gender: String, 
    first_name: String, 
    last_name: String, 
    other_name: String,
    dob: Date,
    conatact: String, 
    email: String, 
    address: String, 
    role: String, 
    department: String,
    marital_status: String, 
    no_of_children: Number, 
    state_of_origin: String, 
    local_govern_area: String, 
    primary_contact_name: String,
    relationship: String, 
    primary_contact_number: String,
    primary_contact_email: String, 
    primary_contact_address: String, 
    employment_dat: Date, 
    status: Number, 
    username: String, 
    password: String
}, {
    timestamps: true
});


module.exports = mongoose.model('Users', UsersSchema);