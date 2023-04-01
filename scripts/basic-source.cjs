const path = require('path');
const readline = require('readline');
const { createReadStream } = require('fs');
const fs = require('fs/promises');

const SOURCE = path.join(__dirname, '../sources/br-basic-utf8.txt');
const TARGET = path.join(__dirname, '../src/sources/words-basic.json');

const file = readline.createInterface({
  input: createReadStream(SOURCE),
  output: process.stdout,
  terminal: false,
});

const results = [];

file.on('line', line => {
  results.push(line.toLocaleLowerCase());
});

file.on('close', () => {
  const content = JSON.stringify(results, null, 2);

  fs.writeFile(TARGET, content)
    .then(() => console.log(TARGET))
    .catch(console.error);
});

file.on('error', console.error);
