const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../middleware/authenticationToken');
const authenticationToken = require('../middleware/authenticationToken');
const {
    registerController,
    loginController,
    OauthController
} = require('../controllers/authControllers');
const {
    restaurantSearch,
    restaurantDetails,
    createPaymentInstance,
    capturePaymentId
} = require('../controllers/restaurantController');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/Oauth', OauthController);
router.post('/search', restaurantSearch);
router.get('/restaurant/:id', restaurantDetails);
router.post('/order', createPaymentInstance);
router.post('/capture/:paymentId', capturePaymentId);
//router.use(authenticationToken);

module.exports = router;
