const rawUsers = [
{ id: 1, name: "Rahul", password: "fb_password", role: "admin" },
{ id: 2, name: "Sanya", password: "123_password", role: "user" },
{ id: 3, name: "Amit", password: "secret_password", role: "user" }
];
//Use .map() and the Rest operator (...) to create a new array of users without passwords
const usersWithoutPasswords = rawUsers.map(({password, ...rest}) => rest);
console.log(usersWithoutPasswords);

//Use .filter() to create an array of 'admins' only.
const admins = rawUsers.filter(user => user.role === "admin");
console.log(admins);