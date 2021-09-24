const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const API = 'https://api.ipify.org?format=json';
  request(API, (error, response, body) =>{
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    if (!error && !body) {
      const msg = 'IP is not found';
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};


const fetchCoordsByIP = function(ip, callback) {
  const API = `https://freegeoip.app/json/${ip}`;
  request(API, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    if (!body && !error) {
      const msg = 'Coordinates are not found!';
      callback(Error(msg), null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const coords = new Object();
    coords.latitude = JSON.parse(body).latitude;
    coords.longitude = JSON.parse(body).longitude;
    callback(null, coords);
    
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const API = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(API, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (!error && !body) {
      const msg = "Data cannot be found!";
      callback(Error(msg), null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching overhead time. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const times = JSON.parse(body).response;
    callback(null, times);

  });
};

const nextISSTimesForMyLocation = function(callback) {
  // empty for now
  callback();
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};