const mongoose = require('mongoose');

const emailValidator = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
};

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: emailValidator,
            message: (props) => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        unique: false
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User