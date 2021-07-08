const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const URL = "https://www.nbrb.by/statistics/rates/ratesdaily.asp";

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

module.exports.solution = async function () {
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
  console.log(arr);
  console.log("================================");
  console.log("Time:", new Date() - start);
  return arr;
};
