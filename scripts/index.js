var placeSearch, autocomplete;

// List all address components (corresponds to form field IDs and Google address object)
var componentForm = {
  autocomplete: ["street_number", "route"],
  inputCity: "locality",
  inputState: "administrative_area_level_1",
  inputZip: "postal_code",
  inputCounty: "administrative_area_level_2",
  inputCountry: "country",
};

// Create autocomplete object based on the autocomplete ("street") field
// Location type restricted to geocode
function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */ (document.getElementById("autocomplete")),
    { type: ["geocode"] }
  ); // Call fillInAddress when user selects an address from dropdown

  autocomplete.addListener("place_changed", fillInAddress);
}

// Fill fields with values from Google Maps autocomplete object
function fillInAddress() {
  // Get place data from autocomplete object
  var place = autocomplete.getPlace();
  console.log(place);

  // Enable each field, then fill them with the corresponding value from the place object
  for (var component in componentForm) {
    document.getElementById(component).disabled = false;
    document.getElementById(component).value = search(
      componentForm[component],
      place.address_components
    );
  } // Original Google Implementation - do not use

  // Get each component of the address from the place
  // object and fill the corresponding field
  //   for (var i = 0; i < place.address_components.length; i++) {

  //     var addressType = place.address_components[i].types[0];

  //     if (componentForm[addressType]) {
  //       var val = place.address_components[i][componentForm[addressType]];
  //       document.getElementById(addressType).value = val;
  //     }
  //   }

  // Fill the autocomplete field with values from the place object
  // If a street number is not found, set the field to route only.
  if (search("street_number", place.address_components) != "") {
    document.getElementById("autocomplete").value =
      search("street_number", place.address_components) + " ";
  }
  document.getElementById("autocomplete").value += search(
    "route",
    place.address_components
  );

  // Search the passed object for a specified address component/type and return the short_name value of the matched component/type
  // If requested type does not exist in the placeObject, return an empty string
  function search(type, placeObject) {
    for (var i = 0; i < placeObject.length; i++) {
      if (placeObject[i].types[0] === type) {
        return placeObject[i].short_name;
      } else if (i === placeObject.length - 1) {
        return "";
      }
    }
  }
}

function routeMainPage() {
  var addy = document.getElementById("autocomplete").value;
  var city = document.getElementById("inputCity").value;
  var state = document.getElementById("inputState").value;
  var zip = document.getElementById("inputZip").value;
  var user = localStorage.getItem("user");
  if (addy == "" || city == "" || state == "" || zip == "") {
    alert("You must fill out all fields");
  } else if (user == null) {
    window.location = "../index.html";
  } else {
    window.location = "../screens/Home.html";
  }
}

function saveAddress() {
  var address = document.getElementById("autocomplete").value;
  sessionStorage.setItem("address", address);
}

function getAddress() {
  var address = sessionStorage.getItem("address");
  var element = document.getElementById("li-address");
  var user = localStorage.getItem("user");
  element.innerHTML = "Delivery to: " + address + " for " + user;
}

function getUser() {
  var user = localStorage.getItem("user");
  var buttons = document.getElementById("login-buttons");
  if (user == null) {
    buttons.innerHTML = `<li>
    <a class="login-button" href="./screens/Login.html">Login</a>
    </li>
    <li>
        <a class="login-button" href="./screens/Register.html">Register</a>
    </li>`;
  } else {
    buttons.innerHTML = `<li class="nav-item" style="color: white;">Welcome back ${user}!</li>`;
  }
}

function handleLogout() {
  localStorage.clear();
  window.location = "../index.html";
}

function handleOrderClick() {
  window.location = "../screens/Order.html";
}