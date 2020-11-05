const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');

dotenv.config();

const registerController = async (req, res) => {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).send('Email already registered');
    }
    try {
        if (req.body.password && req.body.password !== '') {
            const hashedPassword = await bcrypt.hash(
                req.body.password,
                await bcrypt.genSalt(10)
            );
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword
            });

            const savedUser = await user.save();

            const authToken = jwt.sign(
                { email: savedUser.email },
                process.env.JWT_SECRET,
                {}
            );

            res.status(200).json({ ...savedUser, authToken });
        } else {
            res.status(400).send('Password is required');
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
};

const loginController = async (req, res) => {
    if (req.body.email === '') {
        return res.status(400).send('Email is required');
    }
    if (req.body.password === '') {
        return res.status(400).send('Password is required');
    }
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send('Email is not registered');
        }

        if (req.body.password && req.body.email) {
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
            res.json({
                firstName: user['_doc'].firstName,
                lastName: user['_doc'].lastName,
                email: user['_doc'].email,
                address: user['_doc'].address,
                orders: user['_doc'].orders,
                payments: user['_doc'].payments,
                cart: user['_doc'].cart,
                authToken
            });
        } else {
            if (!req.body.password) {
                res.status(400).send('Password is required');
            } else {
                res.status(400).send('Email is required');
            }
        }
    } catch (err) {
        return res.status(400).send(err.message);
    }
};

module.exports = { registerController, loginController };
