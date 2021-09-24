const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation
} = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
    
  console.log('It worked! Returned IP:' , ip);

  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
      
    console.log('It worked! Returned Coords:' , coords);
  
    fetchISSFlyOverTimes(coords, (error, time) => {
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }
        
      console.log('It worked! Returned Times:' , time);

      nextISSTimesForMyLocation((error, passTimes) => {
        if (error) {
          console.log("It didn't work!", error);
          return;
        }
        // success, print out the deets!
        for (eachTime of time) {
        const dt = new Date(eachTime.risetime)
        passTimes = `Next pass at ${dt} for ${eachTime.duration} seconds! \n`
        console.log(passTimes);
        }
      });
      
    });
  });
});




