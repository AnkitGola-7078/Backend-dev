 
const express = require("express");
const path = require("path");
const fs=require("fs");
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files server
app.use(express.static(path.join(__dirname, "public") ));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "form.html"));
});



app.post("/student/register", (req, res) => {

    const newStudent = {
        name: req.body.name,
        branch: req.body.branch
    };
    fs.readFile("students.json", "utf8", (err, data) => {

        let students = [];
        if (!err && data.length > 0) {
            students = JSON.parse(data);
        }
        students.push(newStudent);

        fs.writeFile("students.json", JSON.stringify(students, null, 2), (err) => {
            if (err){
                return res.send("Error saving data");
            }
            res.send("Student Registered");
        });
    });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
