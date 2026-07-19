// Usage: node make_dictionarylist.js dictionary.txt dictionarylist.js
const fs = require('fs');

if (process.argv.length < 4) {
  console.error("Usage: node make_dictionarylist.js words.txt dictionarylist.js");
  process.exit(1);
}

const inputFile = process.argv[2];
const outputFile = process.argv[3];

const words = fs.readFileSync(inputFile, 'utf8')
  .split(/\r?\n/)
  .map(w => w.trim().toUpperCase())
  .filter(w => w.length <= 15);

const js = `// dictionarylist.js\nwindow.DICTIONARY = ${JSON.stringify(words, null, 2)};\n`;

fs.writeFileSync(outputFile, js, 'utf8');
console.log(`Wrote ${words.length} words to ${outputFile}`);

