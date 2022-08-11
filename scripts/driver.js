function getDriver() {
  var element = document.getElementById("welcome-driver");
  var driver = localStorage.getItem("user");
  element.innerHTML =
    "Welcome " +
    driver +
    "! Select an order below that you would like to deliver.";
}
