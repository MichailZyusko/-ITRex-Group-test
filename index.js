const express = require("express");
const port = 3000;
const app = express();

const task_1 = require("./services/task_1");
const task_2 = require("./services/task_2");

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
  res.send({
    task: `You need to create a web page with the current exchange rate of the Belarusian
    ruble in relation to all the foreign currencies established by the National Bank of the
    Republic of Belarus. The course should always be up-to-date at the time the web page is opened.`,
    manual: "How you can use it?",
    firstStep:
      'Сhange the page URL from "http://localhost:3000/task_1" to "http://localhost:3000/task_1/course"',
    secondStep: "Wait a few seconds for the page to reload and see the result",
  });
});

// solution for first task
app.get("/task_1/course", async (req, res) => {
  res.send(await task_1.solution());
});

//description for second task
app.get("/task_2", (req, res) => {
  res.send({
    task: `Write an algorithm for finding a way out of the maze. The maze is a 2-dimensional array in which:

    '0' - start position
    '.' - way
    '*' - wall
    The solution should be an array of strings with a sequence of necessary actions to exit the maze.`,

    exampleOfInputData: `[
      ["*","*","*","*","*","*","*","*","*"],

      ["*",".",".",".","*",".",".",".","*"],

      ["*",".","*",".","*",".","*",".","*"],

      [".",".","*",".","0",".","*",".","*"],

      ["*","*","*",".","*","*","*","*","*"],

      ["*","*",".",".","*","*","*","*","*"],

      ["*","*",".","*","*","*","*","*","*"],

      ["*","*","*","*","*","*","*","*","*"],
    ]`,

    exampleOfAnswer: `['left', 'top','top','left','left','bottom','bottom','left']`,
    manual: "How you can use it?",
    firstStep:
      'Сhange the page URL from "http://localhost:3000/task_2" to "http://localhost:3000//task_2/labyrinth"',
    secondStep:
      'Change the page URL from "http://localhost:3000//task_2/labyrinth" to "http://localhost:3000//task_2/labyrinth?array=" and paste the array as described above',
    thirdStep: "Wait a few seconds for the page to reload and see the result",
  });
});
// solution for second task
app.get("/task_2/labyrinth", async (req, res) => {
  const arr = req.query.array; // Получаем массив из URL параметров
  const result = task_2.solution(arr);
  if (~result) {
    res.send(result);
  } else {
    res.send({
      Error:
        "Something went wrong. Perhaps you did not specify the array correctly, or there is no exit from it, or its length is more than 250 characters.",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
