const mongoose = require('mongoose');
const Restaurants = require('../models/restaurant');

const restaurantSearch = async (req, res) => {
    if (!req.body.geometry) {
        return res
            .status(400)
            .send('Search location is required to find restaurants');
    }
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

module.exports = { restaurantSearch, restaurantDetails };
