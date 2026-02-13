const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// read students.json
function getStudents() {
  try {
    const data = fs.readFileSync("students.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

//write students.json
function saveStudents(students) {
  fs.writeFileSync("students.json", JSON.stringify(students, null, 2));
}

// Home page: form
app.get("/", (req, res) => {
  res.render("form");
});

// Register student
app.post("/student/register", (req, res) => {
  const newStudent = {
    id: Date.now(), 
    name: req.body.name,
    branch: req.body.branch,
  };

  let students = getStudents();
  students.push(newStudent);
  saveStudents(students);
  res.redirect("/students"); 
});

// Students list with filter
app.get("/students", (req, res) => {
  let students = getStudents();
  const branchFilter = req.query.branch;
  if (branchFilter) {
    students = students.filter((s) => s.branch === branchFilter);
  }
  res.render("students", {
    allstudents: students,
    total: students.length,
    branch: branchFilter || "All",
  });
});

// Delete student
app.get("/students/delete/:id", (req, res) => {
  let students = getStudents();
  const id = parseInt(req.params.id);
  students = students.filter((s) => s.id !== id);
  saveStudents(students);
  res.redirect("/students");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});