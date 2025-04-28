const express = require("express");
const path = require("path");
const app = express();

let tasks = [];

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/add-task", (req, res) => {
    const task = req.body.task;
    if (task) {
        tasks.push({ description: task, done: false });
    }
    res.redirect("/");
});

app.post("/mark-done", (req, res) => {
    const taskIndex = parseInt(req.body.index);
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        tasks[taskIndex].done = true;
    }
    res.redirect("/");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});