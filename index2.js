const {nextISSTimesForMyLocation} = require('./iss_promised');

const printPassTime = function(passTimes) {
  for (let passTime of passTimes){
    let dt = new Date(passTime.response);
    console.log(`Next pass at ${dt} for ${passTime.duration} seconds! \n`)
  }
}

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTime(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });


