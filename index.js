const express = require('express');
const app = express();
const PORT = 8000;
const students = [
    { id: 1, name: "Rahul", age: 20, class: "B.Tech" },
    { id: 2, name: "Priya", age: 21, class: "B.Sc" },
    { id: 3, name: "Amit", age: 22, class: "MCA" }
];


app.get('/students', (req, res) => {
    console.log("hello students");
    res.json(students);
});

app.get('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});



app.get('/', (req, res) => {
    // res.send('Hello, welcome to the Express.js backend server!');
    console.log("hello students");
    res.json(students);

});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


