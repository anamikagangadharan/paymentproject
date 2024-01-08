// const razorpay = require('razorpay');
const twilio = require('twilio');
const nodemailer = require('nodemailer');
const vehicleService = require('../services/vehicleService');
const io = require('../index').io; // Import socket.io instance





exports.getVehicleDetails = async (req, res) => {
  try {
    const { registrationNumber } = req.body;
    const vehicleDetails = await vehicleService.getVehicleDetails(registrationNumber);
    res.status(200).json({ message: 'Vehicle details fetched successfully', data: vehicleDetails });

    // Emit a push notification to all connected clients
    io.emit('notification', { message: 'New vehicle details available!' });

    res.status(200).json({ message: 'Vehicle details fetched successfully', data: vehicleDetails });
 
  } catch (err) {
    console.error('Error fetching vehicle details:', err.message);
    res.status(500).json({ message: 'Error fetching vehicle details', error: err.message });
  }
};




// const razorpayInstance = new razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// exports.processPayment = async (req, res) => {
//   try {
//     // const { amount } = req.body;
//     const { amount, currency, receipt } = req.body;

   

//     const options = {
//       amount: amount * 100,
//       currency: currency || 'INR',
//       receipt: receipt || 'receipt #123',
//       payment_capture: 1,
//     };

//     const response = await razorpayInstance.orders.create(options);

//     res.status(200).json({ message: 'Payment order created successfully', data: response });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };




exports.getUsers = async (req, res) => {
  try {
    // Your getUsers logic here
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




exports.sendSMS = async (req, res) => {
  try {
    const { phone, message } = req.body;

    const twilioClient = new twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const response = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    res.status(200).json({ message: 'SMS sent successfully', data: response });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




exports.sendEmail = async (req, res) => {
  try {

    console.log('Inside sendEmail route'); // Add this line

    const { to, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to,
      // to: 'anamikadevi.g@invicious.in', // Replace with the recipient email address
      subject,
      // subject: 'ANU',
      text,
      // text: `Hello BATCAVE`,

    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info);


    res.status(200).json({ message: 'Email sent successfully', data: info });
  } catch (err) {
    console.error('Error sending email:', err.message);
    res.status(500).json({ message: err.message });
  }
};
