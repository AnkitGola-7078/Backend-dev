const express = require('express');
const app = express();
const PORT = 8000;
app.use(express.json());

const students = [
    { id: 1, name: "Rahul", age: 20, class: "B.Tech" },
    { id: 2, name: "Priya", age: 21, class: "B.Sc" },
    { id: 3, name: "Amit", age: 22, class: "MCA" }
];

app.get('/', (req, res) => {
    res.send('Hello, welcome to the Express.js backend server!');
});
//-----------------------------------------------------GET----------------------------------------------------------
// Get all students
app.get('/students', (req, res) => {
    console.log("hello students");
    res.json(students);
});

// Get student by id
app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id); // convert to number
    if (!id) {
        return res.status(400).send("Student id is required");
    }
    const student = students.find((s) => s.id === id);
    res.json(student);
});

// Search student by class
app.get('/branch/:branch', (req, res) => {
    const branch = req.params.branch;
    if (!branch) {
        return res.status(400).send("Class query parameter is required");
    }
    const filteredStudents = students.filter((s) => s.class === branch);
    res.json(filteredStudents);
});

//--------------------------------------------------Post----------------------------------------------------------
//add new student
app.post('/students/registers',(req,res)=>{
    const newStudent = req.body;
    console.log(newStudent);
    if(!newStudent){
        return res.status(404).send("Internal server error");
    }
    students.push(newStudent);
    res.status(200).json(newStudent);
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
