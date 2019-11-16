var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}


function changeStars(rating, parentId) {
  const starTotal = 4;

  if(rating <= starTotal &
         document.getElementById(parentId + '-' + rating).style.visibility == 'visible') {
    if(rating == 4) {
      rating = 0;
    }
    else if(document.getElementById(parentId + '-' + (rating+1)).style.visibility == 'hidden') {
         rating = 0;
    }
  }

  document.getElementById(parentId).value = rating;

  for(i = 1; i <= rating; i++) {
    document.getElementById(parentId + '-' + i).style.visibility = 'visible';
  }
  for(i = rating+1; i <= starTotal; i++) {
    document.getElementById(parentId + '-' + i).style.visibility = 'hidden';
  }

}





/** BEGIN MAPS CODE */

/**
 * A distance widget that will display a circle that can be resized and will
 * provide the radius in km.
 *
 * @param {google.maps.Map} map The map to attach to.
 *
 * @constructor
 */
function DistanceWidget(map) {
  this.set('map', map);
  this.set('position', map.getCenter());

  var marker = new google.maps.Marker({
    // draggable: true,  // <-- change to make so position doesn't move
    title: 'Move me!'
  });

  // Bind the marker map property to the DistanceWidget map property
  marker.bindTo('map', this);

  // Bind the marker position property to the DistanceWidget position
  // property
  marker.bindTo('position', this);

  // Create a new radius widget
  var radiusWidget = new RadiusWidget();

  // Bind the radiusWidget map to the DistanceWidget map
  radiusWidget.bindTo('map', this);

  // Bind the radiusWidget center to the DistanceWidget position
  radiusWidget.bindTo('center', this, 'position');

  // Bind to the radiusWidgets' distance property
  this.bindTo('distance', radiusWidget);

  // Bind to the radiusWidgets' bounds property
  this.bindTo('bounds', radiusWidget);
}
DistanceWidget.prototype = new google.maps.MVCObject();


/**
 * A radius widget that add a circle to a map and centers on a marker.
 *
 * @constructor
 */
function RadiusWidget() {
  var circle = new google.maps.Circle({
    strokeWeight: 2
  });

  // Set the distance property value, default to 10km.
  this.set('distance', 3);

  // Bind the RadiusWidget bounds property to the circle bounds property.
  this.bindTo('bounds', circle);

  // Bind the circle center to the RadiusWidget center property
  circle.bindTo('center', this);

  // Bind the circle map to the RadiusWidget map
  circle.bindTo('map', this);

  // Bind the circle radius property to the RadiusWidget radius property
  circle.bindTo('radius', this);

  // Add the sizer marker
  this.addSizer_();
}
RadiusWidget.prototype = new google.maps.MVCObject();


/**
 * Update the radius when the distance has changed.
 */
RadiusWidget.prototype.distance_changed = function() {
  this.set('radius', this.get('distance') * 1000);
};


/**
 * Add the sizer marker to the map.
 *
 * @private
 */
RadiusWidget.prototype.addSizer_ = function() {
  var sizer = new google.maps.Marker({
    draggable: true,
    title: 'Drag me!'
  });

  sizer.bindTo('map', this);
  sizer.bindTo('position', this, 'sizer_position');

  var me = this;
  google.maps.event.addListener(sizer, 'drag', function() {
    // As the sizer is being dragged, its position changes.  Because the
    // RadiusWidget's sizer_position is bound to the sizer's position, it will
    // change as well.
    var min = 0.5;
    var max = 15;
    var pos = me.get('sizer_position');
    var center = me.get('center');
    var distance = google.maps.geometry.spherical.computeDistanceBetween(center, pos) / 1000;
    if (distance < min) {
      me.set('sizer_position', google.maps.geometry.spherical.computeOffset(center, min * 1000, google.maps.geometry.spherical.computeHeading(center, pos)));
    } else if (distance > max) {
      me.set('sizer_position', google.maps.geometry.spherical.computeOffset(center, max * 1000, google.maps.geometry.spherical.computeHeading(center, pos)));
    }
    // Set the circle distance (radius)
    me.setDistance();
  });
};


/**
 * Update the center of the circle and position the sizer back on the line.
 *
 * Position is bound to the DistanceWidget so this is expected to change when
 * the position of the distance widget is changed.
 */
RadiusWidget.prototype.center_changed = function() {
  var bounds = this.get('bounds');

  // Bounds might not always be set so check that it exists first.
  if (bounds) {
    var lng = bounds.getNorthEast().lng();

    // Put the sizer at center, right on the circle.
    var position = new google.maps.LatLng(this.get('center').lat(), lng);
    this.set('sizer_position', position);
  }
};


/**
 * Set the distance of the circle based on the position of the sizer.
 */
RadiusWidget.prototype.setDistance = function() {
  // As the sizer is being dragged, its position changes.  Because the
  // RadiusWidget's sizer_position is bound to the sizer's position, it will
  // change as well.
  var pos = this.get('sizer_position');
  var center = this.get('center');
  var distance = google.maps.geometry.spherical.computeDistanceBetween(center, pos) / 1000;

  // Set the distance property for any objects that are bound to it
  this.set('distance', distance);
};


function init() {
  var mapDiv = document.getElementById('map-canvas');
  let latitude = 41.745345;
  let longitude = -111.810054;
  var map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(latitude, longitude),
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  var distanceWidget = new DistanceWidget(map);

  google.maps.event.addListener(distanceWidget, 'distance_changed', function() {
    displayInfo(distanceWidget);
  });

  google.maps.event.addListener(distanceWidget, 'position_changed', function() {
    displayInfo(distanceWidget);
  });
}

function displayInfo(widget) {
  var info = document.getElementById('info');
  info.innerHTML = 'Position: ' + widget.get('position') + ', distance: ' +
    widget.get('distance');
}

google.maps.event.addDomListener(window, 'load', init);


/** END MAPS CODE */