/*
Task 2: The "Multi-Step" Authentication
Goal: Practice "Chaining" or sequential awaits (One thing after another).
● The Scenario: A user logs in. You need to find the user first, then check their
subscription.
● The Functions:
1. getUser(username): Resolves with { name: "Rahul", type:
"Premium" } after 1.5s.
2. checkSubscription(user): Takes the user object. If type is "Premium",
resolve with "Access Granted to Netflix". Otherwise, reject with
"Please Subscribe".

● The Requirement: Create a "Consumer" function that calls getUser first, then passes
that result into checkSubscription.
*/

const usernames = {
  Rahul: { name: "Rahul", type: "Premium" },
  Sanya: { name: "Sanya", type: "Basic" }
};

//get user 
const getUser = (username) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (usernames[username]) {
        resolve(usernames[username]);
      } 
    }, 1500);
  });
};

//check subscription
const checkSubscription = (user) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (user.type === "Premium") {
        resolve("Access Granted to Netflix");
      } else {
        reject("Please Subscribe");
      }
    }, 1500);
  });
};

// consumer function
const authenticateUser = async (username) => {
  try {
    const user = await getUser(username);          // find user
    const result = await checkSubscription(user);  // check subscription
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

authenticateUser("Rahul");  
authenticateUser("Sanya");  
authenticateUser("Ankit");  

