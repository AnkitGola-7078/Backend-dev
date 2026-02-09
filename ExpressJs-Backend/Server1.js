// code (wtthout try catch, fs- promises)

const express = require("express");
const fs = require("fs");

const app = express();

const PORT = 8000;

app.use(express.json());
const students = [
  { id: 1, name: "raj", branch: "CSE" },
  { id: 2, name: "Ajay", branch: "ECE" },
  { id: 3, name: "Yash", branch: "IT" },
];

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

//store in log file
app.get("/students", (req, res) => {
  fs.readFile("./students.json", (err, data) => {
    if (err) {
      return res.status(500).send("Error occured");
    }
    return res.status(200).send(JSON.parse(data));
  });
});

app.get("/students/search", (req, res) => {
  const branch = req.query.branch;

  if (!branch) {
    return res.status(400).send("please provide query parameter");
  }
  const foundStudents = students.filter((s) => s.branch == branch);
  return res.json(foundStudents);
});

app.get("/students/:id", (req, res) => {
  const id = req.params.id;

  const arrayIndex = students.findIndex((s) => s.id == id);
  if (arrayIndex == -1) {
    return res.status(404).send("Student not found");
  }

  const foundStudent = students[arrayIndex];
  res.json(foundStudent);
});

app.post("/students/register", (req, res) => {
  const { name, branch } = req.body;
  if (!name || !branch) return res.status(400).send("Details missing");

  //  Read the file first
  fs.readFile("./students.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send("Could not read file");

    // . Parse existing data or start with empty array
    const students = JSON.parse(data || "[]");

    //  Create and push new student
    const newStudent = {
      id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
      name,
      branch,
    };
    students.push(newStudent);

    //  Write the WHOLE array back to the file (Overwriting)
    fs.writeFile(
      "./students.json",
      JSON.stringify(students, null, 2),
      (err) => {
        if (err) return res.status(500).send("Error writing to file");

        //  ONLY send response inside the success callback
        return res
          .status(201)
          .json({ message: "Registered!", student: newStudent });
      },
    );
  });
});


app.put("/students/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  const foundIndex = students.findIndex((s) => s.id === userId);

  if (foundIndex == -1) {
    return res.status(404).send("Student  not found");
  }

  students[foundIndex] = { ...students[foundIndex], ...req.body };

  const result = { message: "updated sucessfully", students: students };
  return res.status(200).json(result);
});


app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const foundIndex = students.findIndex((s) => s.id == id);
  if (foundIndex == -1) {
    return res.status(400).send("Student not found");
  }
  students.splice(foundIndex, 1);

  return res.status(200).json({
    message: "Student deleted sucessfully",
    updatedStudents: students,
  });
});

app.listen(PORT, () => {
  console.log("Server is listening on port:8000");
});

//with try catch and fs-promises

/*
const fs = require("fs").promises;
const express = require("express");
const app = express();

app.use(express.json())

const PORT= 8000;
app.listen(PORT, () => {
  console.log("Server is listening on port:8000");
});


const readStudentsFromFile = async () => {
  const data = await fs.readFile("./students.json", "utf-8");
  return JSON.parse(data || "[]");
};

const writeStudentsToFile = async (records) => {
  await fs.writeFile("./students.json", JSON.stringify(records, null, 2));
};

app.get("/students", async(req, res) => {
    const students= await readStudentsFromFile();
    return res.status(200).json(students);
})

app.put("/students/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Empty body not allowed" });
    }

    const existingStudents = await readStudentsFromFile();

    const foundIndex = existingStudents.findIndex((s) => s.id === userId);
    if (foundIndex === -1) {
      return res.status(404).send("Student not found");
    }

    existingStudents[foundIndex] = {
      ...existingStudents[foundIndex],
      ...req.body,
    };

    await writeStudentsToFile(existingStudents);

    return res.status(200).json({
      message: "Updated Successfully",
      student: existingStudents[foundIndex],
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});


app.delete("/students/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const existingStudents = await readStudentsFromFile();

    const foundIndex = existingStudents.findIndex((s) => s.id === userId);
    if (foundIndex === -1) {
      return res.status(404).send("Student not found");
    }

    const deletedStudent = existingStudents.splice(foundIndex, 1);

    await writeStudentsToFile(existingStudents);

    return res.status(200).json({
      message: "Student deleted successfully",
      deletedStudent: deletedStudent[0],
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});
 */