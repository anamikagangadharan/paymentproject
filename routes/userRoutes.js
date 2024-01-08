const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

// Import the User model
const User = require('../models/user');

// Create a new user instance
const user = new User({
 // Add your user data here
});

// Assign the user instance to controller.user
controller.user = user;

// router.get('/users', controller.getUsers);
router.post('/get-users', controller.getUsers);
// router.post('/process-payment', controller.processPayment);
router.post('/send-sms', controller.sendSMS);
router.post('/send-email', controller.sendEmail);
router.post('/get-vehicle-details', controller.getVehicleDetails);


// Move the wildcard route to the bottom:
router.get('/:id', async (req, res) => {
 try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
 } catch (err) {
    res.status(500).json({ message: err.message });
 }
});

// other routes...

module.exports = router;
