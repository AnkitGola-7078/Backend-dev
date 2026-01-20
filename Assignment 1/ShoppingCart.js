const cart = [
{ item: "Laptop", price: 50000, quantity: 1, inStock: true },
{ item: "Mouse", price: 1500, quantity: 2, inStock: false },
{ item: "Keyboard", price: 3000, quantity: 1, inStock: false }
];

//Check if "every" item is inStock. Print "Ready to Ship" or "Wait".
const allInstock=cart.every(product => product.inStock === true ? console.log("Ready to Ship") : console.log("Wait"));

//2. Filter out the items that are NOT in stock.
const notinstock=cart.filter(item =>item.inStock===false);
console.log(notinstock);

// 3. Use .reduce() on the filtered list to find the final 'Total Bill'.
const totalbill=cart.reduce((acc ,cart) => {return acc+(cart.price*cart.quantity)},0);
console.log(totalbill);
