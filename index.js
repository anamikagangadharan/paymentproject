const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const http = require('http'); // Require http module
const socketIo = require('socket.io'); // Require socket.io for notification purpose


// const userRoutes = require('../routes/userRoutes'); // same directory so no need ".."

const userRoutes = require('./routes/userRoutes');


dotenv.config();


const app = express();
const server = http.createServer(app); // Create http server

const io = socketIo(server); // Attach socket.io to the server

io.on('connection', (socket) => {
  console.log('A user connected');
  // You can add more logic here for handling connections
});


app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {  
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB Connection Error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB Disconnected');
});




// Use your routes
app.use('/api', userRoutes);

const port = process.env.PORT || 3000;

// app.listen(port, () => {
  server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed due to application termination');
    process.exit(0);
  });
});



