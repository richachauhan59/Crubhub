const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: { type: String, required: true },
    logo: { type: String },
    bannerImage: { type: String },
    searchImage: { type: String },
    address: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number], //array of numbers, longitude first
            index: '2dsphere'
        },
        address_country: {
            type: String
        },
        address_locality: {
            type: String
        },
        address_region: {
            type: String
        },
        postal_code: {
            type: String
        },
        street_address: {
            type: String
        }
    },
    cuisines: { type: Array },
    delivery: { type: Object },
    pickup: { type: Object },
    contact: { type: Number },
    rating: { type: Object },
    avgDeliveryTime: { type: Number },
    avgPickupTime: { type: Number },
    priceRating: { type: Number },
    deliveryFee: { type: Number },
    premium: { type: Boolean },
    minDelivery: { type: Number },
    menu_category_list: { type: Array },
    reviews: { type: Array }
});

module.exports = mongoose.model('restaurants', restaurantSchema);
