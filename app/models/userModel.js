//users model
const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    first_name: String, 
    last_name: String, 
    phone_number: String,
    gender: String, 
    email: String, 
    password: String
}, {
    timestamps: true
});

UsersSchema.method('transform', function() {
    const obj = this.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
});

module.exports = mongoose.model('Users', UsersSchema);