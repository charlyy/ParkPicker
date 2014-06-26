// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require foundation
//= require_tree .

$(function(){ $(document).foundation(); });

var markersArray = [];
var SM_LAT = 34.0219;
var SM_LNG = -118.4814;
var QUERY_DELAY = 400;
var inactive = false;

$(document).ready(function() {
  // initialize the map on load
  initialize();
});

/**
 * Initializes the map and some events on page load
 */
var initialize = function() {
  // Define some options for the map
  var mapOptions = {
    center: new google.maps.LatLng(SM_LAT, SM_LNG),
    zoom: 12,

    // hide controls
    panControl: false,
    streetViewControl: false,

    // reconfigure the zoom controls
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM,
      style: google.maps.ZoomControlStyle.SMALL
    }
  };

  // create a new Google map with the options in the map element
  var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

  bind_controls(map);
}

/**
 * Bind and setup search control for the map
 *
 * param: map - the Google map object
 */
var bind_controls = function(map) {
  // get the container for the search control and bind and event to it on submit
  var controlContainer = $('#control_container')[0];
  google.maps.event.addDomListener(controlContainer, 'submit', function(e) {
    e.preventDefault();
    search(map);
  });

  // get the search button and bind a click event to it for searching
  var searchButton = $('#map_search_submit')[0];
  google.maps.event.addDomListener(searchButton, 'click', function(e) {
    e.preventDefault();
    search(map);
  });

  var basketball_button = $('#basketball_search')[0];
  google.maps.event.addDomListener(basketball_button, 'click', function(e) {
    e.preventDefault();
    searchBasketball(map);
  });


  var tennis_button = $('#tennis_search')[0];
  google.maps.event.addDomListener(tennis_button, 'click', function(e) {
    e.preventDefault();
    searchTennis(map);
  });

  var soccer_button = $('#soccer_search')[0];
  google.maps.event.addDomListener(soccer_button, 'click', function(e) {
    e.preventDefault();
    searchSoccer(map);
  });

  var track_button = $('#track_search')[0];
  google.maps.event.addDomListener(track_button, 'click', function(e) {
    e.preventDefault();
    searchTrack(map);
  });

  var dog_button = $('#dog_search')[0];
  google.maps.event.addDomListener(dog_button, 'click', function(e) {
    e.preventDefault();
    searchDog(map);
  });

  var playground_button = $('#playground_search')[0];
  google.maps.event.addDomListener(playground_button, 'click', function(e) {
    e.preventDefault();
    searchPlayground(map);
  });

  // push the search controls onto the map
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(controlContainer);
}

/**
 * Makes a post request to the server with the search term and
 * populates the map with the response businesses
 *
 * param: map - the Google map object
 */
var search = function(map) {
  var searchTerm = $('#map_search input[type=text]').val();

  if (inactive === true) { return };

  // post to the search with the search term, take the response data
  // and process it
  $.post('/search', { term: searchTerm }, function(data) {
    inactive = true;

    // do some clean up
    $('#results').show();
    $('#results').empty();
    clearMarkers();

    // iterate through each business in the response capture the data
    // within a closure.
    data['businesses'].forEach(function(business, index) {
      capture(index, map, business);
    });
  });
};

var searchBasketball = function(map) {
  if (inactive === true) { return };
  // post to the search with the search term, take the response data
  // and process it
  $.post('/search', { term: "basketball" }, function(data) {
    inactive = true;
    // do some clean up
    $('#results').show();
    $('#results').empty();
    clearMarkers();
    // iterate through each business in the response capture the data
    // within a closure.
    data['businesses'].forEach(function(business, index) {
      capture(index, map, business);
    });
  });
};

var searchTennis = function(map) {
  // post to the search with the search term, take the response data
  // and process it
  $.post('/search', { term: "tennis" }, function(data) {
    inactive = true;
    // do some clean up
    $('#results').show();
    $('#results').empty();
    clearMarkers();
    // iterate through each business in the response capture the data
    // within a closure.
    data['businesses'].forEach(function(business, index) {
      capture(index, map, business);
    });
  });
};

var searchSoccer = function(map) {
  // post to the search with the search term, take the response data
  // and process it
  $.post('/search', { term: "soccer" }, function(data) {
    inactive = true;
    // do some clean up
    $('#results').show();
    $('#results').empty();
    clearMarkers();
    // iterate through each business in the response capture the data
    // within a closure.
    data['businesses'].forEach(function(business, index) {
      capture(index, map, business);
    });
  });
};


var searchTrack = function(map) {
  // post to the search with the search term, take the response data
  // and process it
  $.post('/search', { term: "track" }, function(data) {
    inactive = true;
    // do some clean up
    $('#results').show();
    $('#results').empty();
    clearMarkers();
    // iterate through each business in the response capture the data
    // within a closure.
    data['businesses'].forEach(function(business, index) {
      capture(index, map, business);
    });
  });
};


var searchDog = function(map) {
  // post to the search with the search term, take the response data
  // and process it
  $.post('/search', { term: "dog" }, function(data) {
    inactive = true;
    // do some clean up
    $('#results').show();
    $('#results').empty();
    clearMarkers();
    // iterate through each business in the response capture the data
    // within a closure.
    data['businesses'].forEach(function(business, index) {
      capture(index, map, business);
    });
  });
};

var searchPlayground = function(map) {
  // post to the search with the search term, take the response data
  // and process it
  $.post('/search', { term: "playground" }, function(data) {
    inactive = true;
    // do some clean up
    $('#results').show();
    $('#results').empty();
    clearMarkers();
    // iterate through each business in the response capture the data
    // within a closure.
    data['businesses'].forEach(function(business, index) {
      capture(index, map, business);
    });
  });
};



