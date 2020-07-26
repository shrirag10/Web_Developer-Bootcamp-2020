 var faker= require("faker");

console.log("--------------------------------");
console.log("--------------------------------");
console.log("WELCOME TO THE FAKER EXERCISE ");
console.log("--------------------------------");
console.log("--------------------------------");


for(var i=0;i<10;i++)
{
  randomProduct=faker.commerce.productName();
  randomPrice=faker.commerce.price();
console.log(randomProduct + "- $" + randomPrice);
}