
function handleSubmit() {
    var requestString = "";

    // var location = document.getElementById("input-location").value;
    // var radius = document.getElementById("radius").value;

    var location = "Logan Utah";
    var radius = "1000";




    // var geocoder = new google.maps.Geocoder();
    // geocoder.geocode( { 'address': location}, function(results, status) {
    //     if (status == google.maps.GeocoderStatus.OK)
    //     {
    //         // do something with the geocoded result
    //         //
    //         // results[0].geometry.location.latitude
    //         // results[0].geometry.location.longitude
    //     }
    // });

    var config = {
        first: "AIzaSXyCW",
        second: "afdsAvOrG",
        third: "NrtBX7RP",
        fourth: "OmXjcfwtX5",
        fifth: "aNkJXXEvw"
    }
    var size = Object.keys(config).length;
    var textByLine = "";

    textByLine += config["first"];
    textByLine += config["second"];
    textByLine += config["third"];
    textByLine += config["fourth"];
    textByLine += config["fifth"];
    textByLine = textByLine.replace(/X/gi, "");

    location = location.replace(" ", "+");
    var types = "bar"

    // Erik's fetch method
    /*console.log("Fetching geocode: " + geocodeURL);
    var lat;
    var long;
    var geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + textByLine;

    fetch(geocodeURL,{mode: 'cors'})
        .then(r => r.json()) 

        .then(json => { 
            theData = json;

            console.log(theData);

            lat = theData.results[0].geometry.location.lat;
            long = theData.results[0].geometry.location.lng;
            console.log("Longitude and latitude: " + lat + " " + long);+

    });*/
    const proxyurl = "https://cors-anywhere.herokuapp.com/";


    var googleURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=3000&type=" + types + "&key=" + textByLine;

    console.log("FETCHING: " + googleURL);


    // Erik's fetch method
    fetch(proxyurl+googleURL)
         .then(r => r.json()) 

         .then(json => { 
             theData = json;

             for(var i = 0; i < theData.results.length; i++) {
                var obj = theData.results[i];
                if(obj.rating >3)
                    console.log(obj.name);
            }

     });


    // API call to get ALL markers within location and radius
    // var allMarkers = ...

    // var categories = document.getElementsByClassName("category");

    // var category_food = document.getElementById("food").checked;
    // var category_entertainment = document.getElementById("entertainment").checked;
    // var category_shopping = document.getElementById("shopping").checked;
    // var category_selfcare = document.getElementById("selfcare").checked;
    // var category_drinks = document.getElementById("drinks").checked;

    // var category_random = document.getElementById("random").checked;

    // if (!category_random) {
    //     if (category_food) {
    //         requestString += "&bakery&cafe&restaurant&grocery_or_supermarket&supermarket";
    //     }
    //     if (category_entertainment) {
    //         reqeuestString += "&aquariam&art_gallery&bowling_alley&campground&casino&library&movie_theater&museum&night_club&park&tourist_attraction&zoo";
    //     }
    //     if (category_shopping) {
    //         requestString += "&bicycle_store&book_store&clothing_store&convenience_store&department_store&drugstore&electronics_store&florist&furniture_store";
    //         requestString += "&gas_station&grocery_or_supermarket&hardware_store&home_goods_store&jewelry_store&pet_store&shoe_store&shopping_mall&store";
    //     }
    //     if (category_selfcare) {
    //         requestString += "&beauty_salon&gym&hair_care&spa";
    //     }
    //     if (category_drinks) {
    //         requestString += "&bar&liquor_store&grocery_or_supermarket&supermarket"
    //     }
    // }

    // if (category_random) {
        // requestString += "accounting&airport&amusement_park&aquarium&art_gallery&atm&bakery&bank&bar&beauty_salon&bicycle_store&book_store
        // requestString += "bowling_alley&bus_station&cafe&campground&car_dealer&car_rental&car_repair&car_wash&casino&cemetery&church&city_hall
        // requestString += "clothing_store&convenience_store&courthouse&dentist&department_store&doctor&drugstore&electrician&electronics_store&embassy
        // requestString += "fire_station&florist&funeral_home&furniture_store&gas_station&grocery_or_supermarket&gym&hair_care&hardware_store

        // ...
    
    // }



    // for (var i = 0; i < categories.size(); i++) {
    //     if (categories[i].checked) {
    //         checkedCategories.push(categories[i]);
    //     }

    // }

    // for (var i = 0; i < checkedCategories.size(); i++) {
    //     if 
    // }
}