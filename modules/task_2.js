function makeMap(arr, d) {
  // Помечаем все рядом стоящие ячейки до тех пор пока не найжем выход из лабиринта
  while (1) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] == d) {
          try {
            if (arr[i + 1][j] === ".") {
              arr[i + 1][j] = String(d + 1);
            } else if (arr[i + 1][j] === undefined)
              return {
                d: d,
                X: i,
                Y: j,
              };
          } catch (error) {
            console.log(error);
            return {
              d: d,
              X: i,
              Y: j,
            };
          }
          try {
            if (arr[i - 1][j] === ".") {
              arr[i - 1][j] = String(d + 1);
            } else if (arr[i - 1][j] === undefined)
              return {
                d: d,
                X: i,
                Y: j,
              };
          } catch (error) {
            console.log(error);
            return {
              d: d,
              X: i,
              Y: j,
            };
          }
          try {
            if (arr[i][j + 1] === ".") {
              arr[i][j + 1] = String(d + 1);
            } else if (arr[i][j + 1] === undefined)
              return {
                d: d,
                X: i,
                Y: j,
              };
          } catch (error) {
            console.log(error);
            return {
              d: d,
              X: i,
              Y: j,
            };
          }
          try {
            if (arr[i][j - 1] === ".") {
              arr[i][j - 1] = String(d + 1);
            } else if (arr[i][j - 1] === undefined)
              return {
                d: d,
                X: i,
                Y: j,
              };
          } catch (error) {
            console.log(error);
            return {
              d: d,
              X: i,
              Y: j,
            };
          }
        }
      }
    }
    d++;
    if (d > 10000) return -1;
  }
}

function makeWay(arr, d, i, j, words) {
  // До тех пор пока начальные изменяя конечные не придем к начальным координатам
  while (arr[i][j] != 0) {
    try {
      // bottom
      if (arr[i - 1][j] == d) {
        words.push("bottom");
        d--;
        i--;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      // right
      if (arr[i][j - 1] == d) {
        words.push("right");
        d--;
        j--;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      // top
      if (arr[i + 1][j] == d) {
        words.push("top");
        d--;
        i++;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      // left
      if (arr[i][j + 1] == d) {
        words.push("left");
        d--;
        j++;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

function printArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i].join(" "));
  }
}

module.exports.description = function (res) {
  res.send({
    task: `Write an algorithm for finding a way out of the maze. The maze is a 2-dimensional array in which:

    '0' - start position
    '.' - way
    '*' - wall
    The solution should be an array of strings with a sequence of necessary actions to exit the maze.

    Example of input data:

    [
      ["*","*","*","*","*","*","*","*","*"],

      ["*",".",".",".","*",".",".",".","*"],

      ["*",".","*",".","*",".","*",".","*"],

      [".",".","*",".","0",".","*",".","*"],

      ["*","*","*",".","*","*","*","*","*"],

      ["*","*",".",".","*","*","*","*","*"],

      ["*","*",".","*","*","*","*","*","*"],

      ["*","*","*","*","*","*","*","*","*"],
    ]

    Example of answer: 

    ['left', 'top','top','left','left','bottom','bottom','left']`,
    manual: "How you can use it?",
    firstStep:
      'Сhange the page URL from "http://localhost:3000/task_2" to "http://localhost:3000//task_2/labyrinth"',
    secondStep:
      'Change the page URL from "http://localhost:3000//task_2/labyrinth" to "http://localhost:3000//task_2/labyrinth?array=" and paste the array as described above',
    thirdStep: "Wait a few seconds for the page to reload and see the result",
  });
};

module.exports.solution = function (req, res) {
  let arr = req.query.array; // Получаем массив из URL параметров

  arr = arr.replace(/'/g, `"`); // Заменяем все "'" на """

  arr = arr.replace(/`/g, `"`); // Заменяем все "`" на """

  arr = arr.replace(/ /g, ``); // Удаляем все пробелы

  if (arr.length - arr.lastIndexOf(",") < 3)
    // Проверка на висячую запятую
    arr = arr.slice(arr.indexOf("["), arr.lastIndexOf(",")) + "]"; // Удаляем последнюю запятую

  const array = JSON.parse(arr); // Преобразуем из строки к массиву

  console.log("================================");
  const start = new Date();

  // Просто удобно проверять работоспособность :)
  // [
  //   ["*", "*", "*", "*", "*", "*", "*", "*", "*"],

  //   ["*", ".", ".", ".", "*", ".", ".", ".", "*"],

  //   ["*", ".", "*", ".", "*", ".", "*", ".", "*"],

  //   ["*", ".", "*", ".", "0", ".", "*", ".", "*"],

  //   ["*", "*", "*", ".", "*", "*", "*", ".", "*"],

  //   ["*", "*", ".", ".", "*", "*", "*", ".", "*"],

  //   ["*", "*", ".", "*", "*", "*", "*", ".", "*"],

  //   ["*", "*", "*", "*", "*", "*", "*", "*", "*"],
  // ]

  printArray(array);
  console.log("================================");

  let obj = makeMap(array, 0); // Вместо точек ставим цифры, обозначающие расстояние от старта
  if (~obj) {
    // Получаем координаты последней цифры и саму цифру
    let i = obj.X;
    let j = obj.Y;
    let d = obj.d - 1;

    let words = [];

    // Восстанавлием путь из последней координаты в начальную
    makeWay(array, d, i, j, words);

    printArray(array);
    console.log("================================");
    console.log(words.reverse());

    res.send(words);
    console.log("================================");
    console.log("Time:", new Date() - start);
  } else {
    res.send({
      Error:
        "I think there is no way out of here or your matrix is more than 10,000 characters.",
    });
  }
};
