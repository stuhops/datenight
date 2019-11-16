// library = document.createElement("script");
// library.setAttribute("type", "text/javascript");
// var myLine = getLine();
// var myString = "https://maps.googleapis.com/maps/api/js?key=" + myLine + "&libraries=places";
// library.setAttribute("src", myString);
// document.getElementsByTagName("head").appendChild(library);




function handleSubmit() {
    var requestString = "";

    // var location = document.getElementById("input-location").value;
    // var radius = document.getElementById("radius").value;

    var location = "Logan Utah";
    var radius = "1000";

    var googleData;




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

    location = location.replace(" ", "+");


    var geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + getLine();

    // Erik's fetch method
    console.log("Fetching geocode: " + geocodeURL);
    var lat;
    var long;

    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    fetch(geocodeURL)
        .then(r => r.json()) 

        .then(json => { 
            theData = json;

            console.log(theData);

            lat = theData.results[0].geometry.location.lat;
            long = theData.results[0].geometry.location.lng;
            console.log("Longitude and latitude: " + lat + " " + long);


            var googleURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=" + radius + "&min=0" + "&key=" + getLine();
        
            console.log("FETCHING: " + googleURL);
        
        
            // Erik's fetch method
            fetch(proxyurl + googleURL)
                .then(r => r.json()) 
        
                .then(json => { 
                    googleData = json;
                    console.log(googleData);


                    var orgResults = {
                        food: [],
                        entertainment: [],
                        shopping: [],
                        selfcare: [],
                        drinks: [],
                        random: [],
                    }


                    var results = googleData.results;

                    for (var i = 0; i < results.length; i++) {
                        for (var j = 0; j < results[i].types.length; j++) {
                            if (results[i].types[j] == "food") {
                                console.log(results[i].name);
                                orgResults.food.push(results[i]);
                            }
                            if (results[i].types[j] == "aquarium" || results[i].types[j] == "art_gallery" || results[i].types[j] == "bowling_alley" || results[i].types[j] == "campground" ||  results[i].types[j] == "casino" ||  results[i].types[j] == "library" || results[i].types[j] == "movie_theater" || results[i].types[j] == "museum" || results[i].types[j] == "night_club" || results[i].types[j] == "park" || results[i].types[j] == "tourist_attraction" || results[i].types[j] == "zoo"){
                                console.log(results[i].name);
                                orgResults.entertainment.push(results[i]);
                            }
                            // if (results[i].types[j] == "bicycle_store" || name[i].types[j] == "book_store" || name[i].types[j] == "clothing_store" || name[i].types[j] == "convenience_store" || name[i].types[j] == "department_store" || name[i].types[j] == "drugstore" || name[i].types[j] == "electronics_store" || name[i].types[j] == "florist" || name[i].types[j] == "furniture_store" || name[i].types[j] == "gas_station" || name[i].types[j] == "grocery_or_supermarket" || name[i].types[j] == "hardware_store" || name[i].types[j] == "home_goods_store" || name[i].types[j] == "jewelry_store" || name[i].types[j] == "shoe_store" || name[i].types[j] == "shopping_mall" || name[i].types[j] == "store" || ) {
                            if (results[i].types[j] == "store") {
                                console.log(results[i].name);
                                orgResults.shopping.push(results[i]);
                            }
                            if (results[i].types[j] == "beauty_salon" || results[i].types[j] == "hair_care" || results[i].types[j] == "gym" || results[i].types[j] == "spa") {
                                console.log(results[i].name);
                                orgResults.selfcare.push(results[i]);
                            }
                            if (results[i].types[j] == "bar" || results[i].types[j] == "liquor_store" || results[i].types[j] == "grocery_or_supermarket" || results[i].types[j] == "supermarket") {
                                console.log(results[i].name);
                                orgResults.drinks.push(results[i]);
                            }
                        }
                        console.log(results[i].name);
                        orgResults.random.push(results[i]);
                    }

                    var resultingPlaces = [];

                    var foodCheckbox = document.getElementById("food-form-include").checked;
                    if (foodCheckbox) {
                        pickedFood = getRandomElement(orgResults.food);
                        resultingPlaces.push(pickedFood);
                        // for (var i = 0; i < orgResults.food.length; i++) {
                        //     if (orgResults.food[i].rating > foodCheckbox) {
                                
                        //     }
                        // }
                    }

                    var entertainmentCheckbox = document.getElementById("entertainment-form-include").checked;
                    if (entertainmentCheckbox) {
                        pickedEntertainment = getRandomElement(orgResults.entertainment);
                        resultingPlaces.push(pickedEntertainment);

                        // for (var i = 0; i < orgResults.entertainment.length; i++) {
                        //     if (orgResults.entertainment[i].rating > entertainmentCheckbox) {
                        //         orgByValue.push(orgResults.entertainment[i]);
                        //     }
                        // }
                    }

                    var shoppingCheckbox = document.getElementById("shopping-form-include").checked;
                    if (shoppingCheckbox) {
                        pickedShopping = getRandomElement(orgResults.shopping);
                        resultingPlaces.push(pickedShopping);

                        // for (var i = 0; i < orgResults.shopping.length; i++) {
                        //     if (orgResults.shopping[i].rating > shoppingCheckbox) {
                        //         orgByValue.push(orgResults.shopping[i]);
                        //     }
                        // }
                    }

                    var selfcareCheckbox = document.getElementById("self-care-form-include").checked;
                    if (selfcareCheckbox) {
                        pickedSelfcare = getRandomElement(orgResults.selfcare);
                        resultingPlaces.push(pickedSelfcare);

                        // for (var i = 0; i < orgResults.selfcare.length; i++) {
                        //     if (orgResults.selfcare[i].rating > selfcareCheckbox) {
                        //         orgByValue.push(orgResults.selfcare[i]);
                        //     }
                        // }
                    }

                    var drinksCheckbox = document.getElementById("drinks-form-include").checked;
                    if (drinksCheckbox) {
                        pickedDrinks = getRandomElement(orgResults.drinks);
                        resultingPlaces.push(pickedDrinks);

                        // for (var i = 0; i < orgResults.drinks.length; i++) {
                        //     if (orgResults.drinks[i].rating > drinkCheckbox) {
                        //         orgByValue.push(orgResults.drinks[i]);
                        //     }
                        // }
                    }

                    var randomCheckbox = document.getElementById("random-form-include").checked;
                    if (randomCheckbox) {
                        pickedRandom = getRandomElement(orgResults.random);
                        resultingPlaces.push(pickedRandom);

                        // for (var i = 0; i < orgResults.drinks.length; i++) {
                        //     if (orgResults.drinks[i].rating > drinkCheckbox) {
                        //         orgByValue.push(orgResults.drinks[i]);
                        //     }
                        // }
                    }


                    
        
                    
        
        
            });

    });

    // if (document.getElementById("Stu ID").value > 0) {

    // }





    // var randomElement = getRandomElement(foodArray);


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

function getLine() {
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

    return textByLine;
}

function getRandomElement(inputArray) {
    return inputArray[Math.floor(Math.random() * inputArray.length)];
}