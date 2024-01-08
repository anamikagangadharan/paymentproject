// services/vehicleService.js
const axios = require('axios');

const getVehicleDetails = async (registrationNumber) => {
  try {
    const clientId = process.env.CAR_API_CLIENT_ID;
    const clientSecret = process.env.CAR_API_CLIENT_SECRET;

    
    const response = await axios.post(
      'https://api.invincibleocean.com/invincibleVehicleFastest',
      { registrationNumber },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Client-ID': clientId,
          'X-Client-Secret': clientSecret,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching vehicle details:', error.message);
    throw error;
  }
};

module.exports = { getVehicleDetails };
