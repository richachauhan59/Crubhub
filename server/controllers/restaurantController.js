const mongoose = require('mongoose');
const Restaurants = require('../models/restaurant');
const Users = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const Razorpay = require('razorpay');
const request = require('request');
const dotenv = require('dotenv');

dotenv.config();

const restaurantSearch = async (req, res) => {
    if (!req.body.geometry) {
        return res
            .status(400)
            .send('Search location is required to find restaurants');
    }

    // There's probably a better way to do this.
    if (req.body.cuisine) {
        const data = await Restaurants.aggregate([
            {
                $geoNear: {
                    near: req.body.geometry,
                    distanceField: 'distance', //adds a field 'distance' with distance of restaurant from delivery location
                    maxDistance: 8047, //5 miles in mtrs - delivery radius
                    query: { cuisines: req.body.cuisine }, //*optional
                    spherical: true,
                    distanceMultiplier: 0.000621371
                }
            },
            { $project: { menu_category_list: 0, reviews: 0 } }
        ]);
        res.send(data);
    } else {
        const data = await Restaurants.aggregate([
            {
                $geoNear: {
                    near: req.body.geometry,
                    distanceField: 'distance', //adds a field 'distance' with distance of restaurant from delivery location
                    maxDistance: 8047, //5 miles in mtrs - delivery radius
                    spherical: true,
                    distanceMultiplier: 0.000621371
                }
            },
            { $project: { menu_category_list: 0, reviews: 0 } }
        ]);
        res.send(data);
    }
};

const restaurantDetails = async (req, res) => {
    if (req.params.id) {
        const id = mongoose.Types.ObjectId(req.params.id);
        const details = await Restaurants.findOne({ _id: id });
        res.json(details);
    } else {
        res.send('ID is required to get restaurant details');
    }
};

const saveOrderDetails = async (req, res) => {
    try {
        const id = mongoose.Types.ObjectId(req.body.restaurant);
        let restaurant = await Restaurants.findOne({ _id: id });
        let user = await Users.findOne({ email: req.body.email });
        let date = new Date();
        user.orders = [
            {
                restaurant: restaurant.name,
                restaurantId: id,
                image: restaurant.searchImage,
                address: `${restaurant.address.street_address}, ${restaurant.address.address_locality}`,
                cost: req.body.total,
                date: date.toDateString()
            },
            ...user.orders
        ];
        await user.save();
        res.json(user.orders);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const instance = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_KEY_SECRET
});

const createPaymentInstance = (req, res) => {
    const options = {
        amount: req.body.amount * 100,
        currency: 'USD',
        receipt: uuidv4(),
        payment_capture: 0
    };
    instance.orders
        .create(options)
        .then((order) => res.status(200).json(order))
        .catch((err) => res.status(500).json({ message: err.message }));
};

const capturePaymentId = (req, res) => {
    try {
        return request(
            {
                method: 'POST',
                url: `https://${process.env.RAZOR_PAY_KEY_ID}:${process.env.RAZOR_PAY_KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
                form: {
                    amount: req.body.amount * 100,
                    currency: 'USD'
                }
            },
            async function (err, response, body) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error: Something Went Wrong'
                    });
                }
                return res.status(200).json(response);
            }
        );
    } catch (err) {
        return res.status(500).json({
            message: 'Something Went Wrong'
        });
    }
};

module.exports = {
    restaurantSearch,
    restaurantDetails,
    saveOrderDetails,
    createPaymentInstance,
    capturePaymentId
};
