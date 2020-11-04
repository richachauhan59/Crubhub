const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: Object, default: {} },
    email: { type: String, required: true },
    password: { type: String },
    orders: { type: Array, default: [] },
    payments: { type: Object, default: {} }
});

module.exports = mongoose.model('restaurants', restaurantSchema);
