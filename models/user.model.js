const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    password: {
        type: String,
        required: [true, "can't be blank"]
    }
});

let User = mongoose.model('User', userSchema);

module.exports = User