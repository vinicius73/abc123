const path = require('path');
const readline = require('readline');
const { createReadStream } = require('fs');
const fs = require('fs/promises');

const SOURCE = path.join(__dirname, '../sources/br-utf8.txt');
const TARGET = path.join(__dirname, '../src/sources/words-simple.json');

const vogals = ['a', 'e', 'i', 'o', 'u'];
const badEnds = ['emo', 'ara', 'amo', 'imo'];

const file = readline.createInterface({
  input: createReadStream(SOURCE),
  output: process.stdout,
  terminal: false,
});

const isEven = val => val % 2 === 0;
const haveBadEnds = val => badEnds.some(end => val.endsWith(end));

/**
 * @param line {string}
 */
const isSimple = line => {
  if (line.length < 4 || !isEven(line.length)) {
    return false;
  }

  if (haveBadEnds(line)) {
    return false;
  }

  return line.split('').every((rune, index) => {
    if (isEven(index + 1)) {
      return vogals.includes(rune);
    }

    return true;
  });
};

const results = [];

file.on('line', line => {
  if (isSimple(line)) {
    results.push(line.toLocaleLowerCase());
  }
});

file.on('close', () => {
  const content = JSON.stringify(results, null, 2);

  fs.writeFile(TARGET, content)
    .then(() => console.log(TARGET))
    .catch(console.error);
});

file.on('error', console.error);
