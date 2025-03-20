const fetchF = function(res) {
  //If response is not ok
  if(!res.ok) throw new Error(`${res.status}`)
  //if everything is OK let continue chain
  return res.json()
  };
  
  // 1. 
  const whereAmI = function(lat, lng){
    //let's fetch the data first
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
    //next we change data to object
    .then(res => fetchF(res))
    //here we take the needed data out (country) and make nice little string about it:)
    .then(data => {
      if (!data.countryName) throw new Error("Could not determine country from coordinates.");
      console.log(`You are in ${data.countryName}`)
      //Let's use an other api to get info from there based on country name
      return fetch(`https://restcountries.com/v2/name/${data.countryName}`)
    })
    .then(res => fetchF(res))
    .then(data => console.log(data))
    .catch(err => {
      console.log(`${err}`);
    });
  };
  
  whereAmI(52.508, 13.381);
  whereAmI(19.037, 72.873);
  whereAmI(-33.933, 18.474);