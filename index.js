const fs = require("fs");
const chalk = require('chalk');
const authorize = require("./utils/authorize");
const indexer = require("./utils/indexer");
const { delay } = require("./utils/utils");
const filePath = "links.txt";
const totalRows = "Total Rows: ";
const timerCycle = 1000;

const gic = async () => {
  console.log(chalk.white.bgBlue.bold("Google Index Script"));
  console.log('');
  const auth = await authorize();
  const readingData = fs.readFileSync(filePath, "utf8");
  const dataArray = readingData.split("\n");
  let updatedLinksPositions = [];
  if (dataArray.length === 1 && dataArray[0].length === 0) {
    console.log(chalk.bgRed("No Links Found"));
  } else {
    console.log(chalk.blue(totalRows) + chalk.green(dataArray.length));
  }
  console.log('');
  for (const [index, item] of dataArray.entries()) {
    if (dataArray.length === 1 && dataArray[0].length === 0) {
      break;
    }
    const statusCheck = await indexer(item, auth.accessToken);
    if (statusCheck == "RESOURCE_EXHAUSTED") {
      console.log(chalk.bgRed("Quota Limit Reached"));
      break;
    }
    if (statusCheck == "HAS_ERROR") {
      console.log(chalk.bgRed("Script Has Errors. Please Check Credentials and Permits"));
      break;
    }
    await delay(timerCycle);
    updatedLinksPositions.push(index);
    break; // delete later
  }
  for (const itm of updatedLinksPositions) {
    dataArray.splice(updatedLinksPositions, 1);
  }
  const updatedFileContent = dataArray.join("\n");
  fs.writeFileSync(filePath, updatedFileContent, "utf-8");
  console.log('');
};

gic();
