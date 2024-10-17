/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

function makeText(filePath) {
    fs.readFile(filePath, "utf8", function cb(error, data) {
        if (error) {
        console.error(`Cannot read file: ${filePath}: ${error}`);
        process.exit(1);
        } else {
        generateText(data);
        }
    });
}

async function makeURL(url) {
    let response;
  
    try {
      response = await axios.get(url);
    } catch (error) {
      console.error(`Cannot read URL: ${url}: ${error}`);
      process.exit(1);
    }
    generateText(response.data)
}

let [method, path] = process.argv.slice(2);

if (method === "file") {
    makeText(path);
  }
  
  else if (method === "url") {
    makeURL(path);
  }
  
  else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
  }