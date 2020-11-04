const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
//const User = require('../models/User');

dotenv.config();

const registerController = async (req, res) => {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).send('Email already registered');
    }
    try {
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(
                req.body.password,
                await bcrypt.genSalt(10)
            );
            // change to handle first name, last name, email and password
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });

            const savedUser = await user.save();
            res.send(savedUser);
        } else {
            // register with google/facebook token
            const user = new User({
                name: req.body.name,
                email: req.body.email
            });

            const savedUser = await user.save();
            res.send(savedUser);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
};

const loginController = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send('Email is not registered');
        }

        if (req.body.password) {
            const validPass = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPass) {
                return res.status(400).send('Wrong password');
            }
            const authToken = jwt.sign(
                { email: user.email },
                process.env.JWT_SECRET,
                {}
            );
            res.json({ ...user['_doc'], authToken });
        } else {
            //login with google/facebook token
        }
    } catch (err) {
        return res.status(400).send(err.message);
    }
};

module.exports = { registerController, loginController };
