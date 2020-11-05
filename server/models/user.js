const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Name is required'],
            min: [1, 'Name must contain altlest 1 letter']
        },
        lastName: {
            type: String,
            required: [true, 'Name is required'],
            min: [1, 'Name must contain altlest 1 letter']
        },
        email: { type: String, required: true },
        password: {
            type: String,
            required: [true, 'Password is required'],
            min: [6, 'Min length is 6']
        },
        address: { type: Object, default: {} },
        orders: { type: Array, default: [] },
        payments: { type: Object, default: {} },
        cart: { type: Object, default: {} } //save restaurant object and array of items
    },
    { minimize: false }
);

module.exports = mongoose.model('users', userSchema);
