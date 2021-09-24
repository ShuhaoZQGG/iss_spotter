const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
    
  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP((error, coords) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
    
  console.log('It worked! Returned Coords:' , coords);
  return coords;
});

fetchISSFlyOverTimes(coords, (error, time) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
    
  console.log('It worked! Returned Times:' , time);
}) 
