const request = require('request-promise-native');

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(body => {
      const { response } = JSON.parse(body);
      return response;
    });
};

const fetchMyIP = function() {
  const API = 'https://api.ipify.org?format=json';
  return request(API);
};
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  const API = `https://freegeoip.app/json/${ip}`;
  return request(API);
};
const fetchISSFlyOverTimes = function(body) {
  const latitude = JSON.parse(body).latitude;
  const longitude = JSON.parse(body).longitude;
  const API = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(API);
};



module.exports = {
  nextISSTimesForMyLocation
};