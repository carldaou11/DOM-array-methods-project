///Get DOM elements
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = []; //This is an empty array, where we will have all the people from the random user api
getRadomUser();
getRadomUser();
getRadomUser();

//Fetch Random users and add money
async function getRadomUser() {
  ///await response of the fetch call
  const response = await fetch("https://randomuser.me/api");
  
  const resData = await response.json();
  const user = resData.results[0];

  ///Construct a new user by a newUser object and add that to addData function
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 10000000), ///Generate random money in millions
  };
  console.log(newUser);
  addData(newUser);
}

///Add new object to data array that was declared earlier
function addData(obj) {
  data.push(obj);
  updateDOM();
}

//Function to double wealth
function doubleWealth() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 }; ////here we are using map and spread operators so that we reassign data with the user object and then double the money property values.
  });
  updateDOM();
}

//Function to sort people by wealth
function sortByWealth() {
  data = data.sort((a, b) => b.money - a.money);

  updateDOM();
}

///Function to show only millionaires
function showOnlyMillionaires() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}

//Function to calculate entire wealth using reduce() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
function calculateEntireWealth() {
  let initialValue = 0;
  const sumOfWealth = data.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.money;
  }, initialValue);

  //another way of doing this:
  // const sumOfWealth = data.reduce(function (accumulator, user) {
  //   return (accumulator += user.money);
  // }, 0);
  console.log(formatMoney(sumOfWealth));

  const sumOfWealthEl = document.createElement("div");
  sumOfWealthEl.innerHTML = `<h3>The sum of total Wealth is: <strong>${formatMoney(
    sumOfWealth
  )}</strong></h3>`;
  main.appendChild(sumOfWealthEl);
}
///Update DOM function
function updateDOM(providedData = data) {
  //here we have added a default in case nothing is passed into the function - ES6(ES2015) feature

  //Clear the main div
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

  //Loop through providedData = data
  providedData.forEach((person) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`;
    main.appendChild(element);
  });
}

//Function number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return "£" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//Event Listeners
addUserBtn.addEventListener("click", getRadomUser);
doubleBtn.addEventListener("click", doubleWealth);
sortBtn.addEventListener("click", sortByWealth);
showMillionairesBtn.addEventListener("click", showOnlyMillionaires);
calculateWealthBtn.addEventListener("click", calculateEntireWealth);