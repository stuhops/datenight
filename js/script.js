document.addEventListener('DOMContentLoaded', function () {
    /* your logic here */
    document.body.style.backgroundColor = "grey";
 });




function api_call(){
    let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=bar&keyword=cruise&key=api_key"
    fetch(url) // make a request of the URL
    .then( r => r.json() )  // convert the response into JSON
    .then( json => {
        myJSONResult = json;
        //document.querySelector('#quandl').textContent = "Your data is available in the variable 'theData'";
        //document.title = theData.dataset.name;
        for (i = 0; i < myJSONResult.results.length; i++) {
            myAddress[i] = myJSONResult.results[i].formatted_address;
        }
    });
}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
  }