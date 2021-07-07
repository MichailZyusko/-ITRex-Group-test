const express = require("express");
const port = 3000;
const app = express();

const task_1 = require("./modules/task_1");
const task_2 = require("./modules/task_2");

app.get("/", (req, res) => {
  res.send({
    question: "What it is and how to use it",
    answer:
      "This is a test task for the ITRex Group Node.js Lab. Follow the instructions below to test the tasks.",
    manual: "How you can use it?",
    firstStep:
      'If you want to check the work of the first task, change the URL of the page from "http://localhost:3000/" to "http://localhost:3000/task_1" and wait a few seconds.',
    secondStep:
      'If you want to check the work of the second task, change the URL of the page from "http://localhost:3000/" to "http://localhost:3000/task_2" and wait a few seconds.',
  });
});

//description for first task
app.get("/task_1", (req, res) => {
  task_1.description(res);
});

// solution for first task
app.get("/task_1/course", async (req, res) => {
  task_1.solution(req, res);
});

//description for second task
app.get("/task_2", (req, res) => {
  task_2.description(res);
});
// solution for second task
app.get("/task_2/labyrinth", async (req, res) => {
  task_2.solution(req, res);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
