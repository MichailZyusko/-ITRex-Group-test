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

function getArray(arr) {
  arr = arr.replace(/'/g, `"`); // Заменяем все "'" на """
  arr = arr.replace(/`/g, `"`); // Заменяем все "`" на """
  arr = arr.replace(/ /g, ``); // Удаляем все пробелы

  if (arr.length - arr.lastIndexOf(",") < 4)
    // Проверка на висячую запятую
    arr = arr.slice(arr.indexOf("["), arr.lastIndexOf(",")) + "]"; // Удаляем последнюю запятую

  // let result;
  try {
    return JSON.parse(arr); // Преобразуем из строки к массиву
  } catch (error) {
    return -1;
  }
}

module.exports.solution = function (arr) {
  const array = getArray(arr);
  if (~array) {
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

    //   ["*", "*", ".", ".", "*", "*", "*", "*", "*"],

    //   ["*", "*", "*", ".", "*", "*", "*", "*", "*"],
    // ]

    printArray(array);
    console.log("================================");

    let obj = makeMap(array, 0); // Вместо точек ставим цифры, обозначающие расстояние от старта

    if (~obj) {
      let words = [];

      // Восстанавлием путь из последней координаты в начальную
      makeWay(array, obj.d - 1, obj.X, obj.Y, words);

      printArray(array);
      console.log("================================");
      console.log(words.reverse());
      console.log("================================");
      console.log("Time:", new Date() - start);
      return words;
    } else return -1;
  } else return -1;
};
