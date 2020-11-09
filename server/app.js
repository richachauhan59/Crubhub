const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');
//const Restaurants = require('./models/restaurant');

dotenv.config();

const app = express();

app.use(cors());

mongoose.connect(
    process.env.MONGO_URL,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to database');
        }
    }
);

app.use('/api', apiRoutes);

// app.get('/restaurants', async (req, res) => {
//     const data = await Restaurants.find({ cuisines: 'Indian' });
//     res.send(data);
// });

// app.get('/search/restaurants', async (req, res) => {
//     const data = await Restaurants.aggregate([
//         {
//             $geoNear: {
//                 near: { type: 'Point', coordinates: [-73.99279, 40.719296] },
//                 distanceField: 'distance', //adds a field 'distance' with distance of restaurant from delivery location
//                 maxDistance: 8047, //5 miles in mtrs - delivery radius
//                 //maxDistance: 3000,
//                 //query: { cuisines: 'American' }, //*optional
//                 spherical: true,
//                 distanceMultiplier: 0.000621371
//             }
//         }
//     ]);
//     res.send(data);
// });

app.listen(5000, () => {
    console.log('Server live on port 5000');
});
