const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../middleware/authenticationToken');
const authenticationToken = require('../middleware/authenticationToken');
const {
    registerController,
    loginController,
    OauthController
} = require('../controllers/authControllers');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/Oauth', OauthController);
//router.use(authenticationToken);

module.exports = router;
