function handleOnLoad(email) {
  var pass = document.getElementById("pass").value;
  var error = document.getElementById("errorMsg");
  if (email == "" || pass == "") {
    error.innerHTML = "You must fill out all fields";
  } else if (email == "customer" && pass == "password") {
    localStorage.setItem("user", email);
    window.location = "/GreenTakeout/screens/Customer.html";
  } else if (email == "restaurant" && pass == "password") {
    localStorage.setItem("user", email);
    window.location = "/GreenTakeout/screens/Restaurant.html";
  } else if (email == "driver" && pass == "password") {
    localStorage.setItem("user", email);
    window.location = "/GreenTakeout/screens/Driver.html";
  } else if (
    email != "customer" ||
    pass != "password" ||
    email != "restaurant" ||
    email != "driver"
  ) {
    error.innerHTML = "Incorrect username or password";
  }
}

function handleRegister(email) {
  var pass = document.getElementById("pass").value;
  var error = document.getElementById("errorMsg");
  var fname = document.getElementById("fname");
  var lname = document.getElementById("lname");

  if (fname == "" || lname == "" || pass == "" || email == "") {
    error.innerHTML = "You must fill out all fields";
  } else {
    localStorage.setItem("user", fname);
    window.location = "/GreenTakeout/screens/Customer.html";
  }
}
