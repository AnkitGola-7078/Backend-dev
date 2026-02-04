const express = require('express');

module.exports = (students) => {
    const router = express.Router();

    // PUT update student
    router.put('/students/update/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const index = students.findIndex(s => s.id === id);
        if (index === -1) {
            return res.status(404).send("Student not found");
        }
        students[index] = { ...students[index], ...req.body };
        res.json(students[index]);
    });

    // DELETE student
    router.delete('/student/khtam/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const index = students.findIndex(s => s.id === id);
        if (index === -1) {
            return res.status(404).send("Student not found");
        }
        students.splice(index, 1);
        res.send("Student deleted successfully");
    });

    return router;
};
