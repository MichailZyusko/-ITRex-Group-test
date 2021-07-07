const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const URL = "https://www.nbrb.by/statistics/rates/ratesdaily.asp";

module.exports.description = function (res) {
  res.send({
    task: `You need to create a web page with the current exchange rate of the Belarusian
    ruble in relation to all the foreign currencies established by the National Bank of the
    Republic of Belarus. The course should always be up-to-date at the time the web page is opened.`,
    manual: "How you can use it?",
    firstStep:
      'Сhange the page URL from "http://localhost:3000/task_1" to "http://localhost:3000/task_1/course"',
    secondStep: "Wait a few seconds for the page to reload and see the result",
  });
};

function setCurNameObjectProperties(elem) {
  return elem.children
    .find((el) => el?.attribs?.class === "curName")
    .children.find((el) => el?.name === "div")
    .children.find((el) => el?.name === "span")
    .children[0]?.data?.trim();
}

function setCurAmountObjectProperties(elem) {
  return elem.children
    .find((el) => el?.attribs?.class === "curAmount")
    .children[0]?.data?.trim();
}

function setCurCoursObjectProperties(elem) {
  return elem.children
    .find((el) => el?.attribs?.class.includes("curCours"))
    .children.find((el) => el.name === "div")
    .children[0]?.data?.trim();
}

module.exports.solution = async function (req, res) {
  console.log("================================");
  const start = new Date();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL);

  const html = await page.evaluate(() => document.querySelector("*").outerHTML);
  const $ = cheerio.load(html);
  const tbody = $("#ratesData > table > tbody > tr");

  let arr = [];

  Array.from(tbody).forEach((e) => {
    arr.push({
      curName: setCurNameObjectProperties(e),
      curAmount: setCurAmountObjectProperties(e),
      curCours: setCurCoursObjectProperties(e),
    });
  });

  await browser.close();

  res.send(arr);
  console.log(arr);
  console.log("================================");
  console.log("Time:", new Date() - start);
};
