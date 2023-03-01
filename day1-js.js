//Observe: no return type, no type on parameters
function add(n1, n2) {
  return n1 + n2;
}

const sub = function (n1, n2) {
  return n1 - n2;
};

function mul(n1, n2) {
  return n1 * n2;
}

const cb = function (n1, n2, callback) {
  return (
    "Result from the two numbers: " + n1 + "+" + n2 + "=" + callback(n1, n2)
  );
};

//console.log( add(1,2) )     // What will this print? The result 3
//console.log( add )          // What will it print and what does add represent? It prints [Function : add] which is the reference
//console.log( add(1,2,3) ) ; // What will it print? It prints the result of 1+2=3 and leave out the third number.
//console.log( add(1) );	  // What will it print? 	NaN because when you leave out the second parameter, the value becomes undefined
//console.log( cb(3,3,add) ); // What will it print? It prints the following: "Result from the two numbers: 3 + 3 = 6".
//console.log( cb(4,3,sub) ); // What will it print? The same as above, but with sub. so result is 1
//console.log(cb(3,3,add())); // What will it print (and what was the problem)? It prints an error, because now its runs the method add without the values passed into it, which means it passes the return value of the function instead of passing the reference of the function into the function.
//console.log(cb(3,"hh",add));// What will it print? It prints "Result from the two numbers: 3 + hh = 3hh". and converts it to a string.

//console.log(cb(5,3,mul))
//console.log(cb(6,2,function(n1,n2) {return n1/n2} ))

const namesArray = ["Lars", "Peter", "Bo", "Jan", "Hans"];
const longNamesOnly = namesArray.filter((name) => name.length >= 3);

//namesArray.forEach(name => console.log(name));
//longNamesOnly.forEach(name => console.log(name));

const uppercaseName = namesArray.map((name) => name.toUpperCase());

//console.log(uppercaseName)

function createHtmlList(namesList) {
  return (
    "<ul>" + namesList.map((name) => "<li>" + name + "</li>").join("") + "</ul>"
  );
}

function createSQLStatement(carList) {
  return (
    "INSERT INTO cars (id,year,make,model,price) VALUES" +
    carList
      .map(
        (car) =>
          " (" +
          car.id +
          "," +
          car.year +
          ',"' +
          car.make +
          '","' +
          car.model +
          '",' +
          car.price +
          ")"
      )
      .join(",") +
    ";"
  );
}

//const nameListDiv = document.getElementById('name-list')
//nameListDiv.innerHTML = createHtmlList(namesArray);

const cars = [
  { id: 1, year: 1997, make: "Ford", model: "E350", price: 3000 },
  { id: 2, year: 1999, make: "Chevy", model: "Venture", price: 4900 },
  { id: 3, year: 2000, make: "Chevy", model: "Venture", price: 5000 },
  { id: 4, year: 1996, make: "Jeep", model: "Grand Cherokee", price: 4799 },
  { id: 5, year: 2005, make: "Volvo", model: "V70", price: 44799 },
];

const newerCars = cars.filter((car) => car.year > 1999);
const volvosOnly = cars.filter((car) => car.make === "Volvo");
const cheapCars = cars.filter((car) => car.price < 5000);
//console.log("Newer Cars: ")
//console.log(newerCars);
//console.log("Volvos only: ")
//console.log(volvosOnly)
//console.log("Cheap cars: ")
//console.log(cheapCars)

//console.log(createSQLStatement(cars));

function myFilter(array, callback) {
  return callback(array);
}

function longNamesFilter(array) {
  const newArray = [];
  array.forEach((element) => {
    if (element.length >= 3) newArray.push(element);
  });
  return newArray;
}

function uppercaseNameMap(array) {
  const newArray = [];
array.forEach((element) => {
newArray.push(element.toUpperCase());
});
return newArray
}

//console.log(myFilter(namesArray, longNamesFilter));
//console.log(myFilter(namesArray, uppercaseNameMap));

//It prints 'a' 'd' 'f' 'e' 'b'
const msgPrinter = function(msg,delay){
  setTimeout(() => console.log(msg),delay); //Observe an arrow-function
};
/*console.log("aaaaaaaaaa");
msgPrinter ("bbbbbbbbbb",2000);
console.log("dddddddddd");
msgPrinter ("eeeeeeeeee",1000);
console.log("ffffffffff");
*/

const person = {
  name: "Hans",
  birthday: 120252,
  hobby: "Stone collecting"
}

for(prop in person){
  console.log(prop,person[prop])
}
delete person.hobby;

person.eyeColor = "Blue";

for(prop in person){
  console.log(prop,person[prop])
}

