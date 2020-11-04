const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: { type: String, required: true },
    logo: { type: String },
    bannerImage: { type: String },
    searchImage: { type: String },
    address: { type: Object },
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
    menu: { type: Array },
    reviews: { type: Array }
});

module.exports = mongoose.model('restaurants', restaurantSchema);
