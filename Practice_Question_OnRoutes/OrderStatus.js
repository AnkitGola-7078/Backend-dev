/*

Task 1: The "Order Status"
Goal: Practice basic resolve and reject logic.
● The Scenario: Create a function checkOrderStatus(orderId).
● The Logic: * If the orderId is a number, resolve after 1 second with
"Order Shipped".
 If the orderId is not a number (e.g., a string or null), reject with
"Invalid Order ID".

● The Requirement: Use an async function with try/catch to call this
and log the result

*/

// order object
const order = {
  id: 1234,
  status: "shipped",
  items: [{ item: "Laptop", quantity: 1 }]
};

// // Function that returns a Promise
const checkOrderStatus=(orderId)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(typeof orderId==='number'){
                resolve("order shipped");
            }else{
                reject("Invalid orderId");
            }
        },1000);
    });
};

// Async function to call checkOrderStatus
async function processOrder(orderId){
    try{
        const res=await checkOrderStatus(orderId);
        console.log(res);
    }catch(e){
        console.log(e);
    }
}
processOrder(1234);   
processOrder("abcd"); 
processOrder(null);  