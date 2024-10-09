const fs = require('fs');
const { Command } = require('commander');
const path = require('path');

const program = new Command();
program
  .option('-i, --input <path>', 'path to input file (JSON data)')
  .option('-o, --output <path>', 'path to output file')
  .option('-d, --display', 'display the result in the console');

program.parse(process.argv);

const options = program.opts();

if (!options.input) 
{
console.error('Please, specify input file');
process.exit(1);
}

const inputFilePath = path.resolve(options.input);
let data;
try 
{
data = fs.readFileSync(inputFilePath, 'utf8');
} catch (err) 
{
console.error('Cannot find input file');
process.exit(1);
}

let jsonData;
try 
{
jsonData = JSON.parse(data);
} catch (err) 
{
console.error('Error parsing JSON');
process.exit(1);
}

const results = jsonData.map(item => {
  const stockCode = item.StockCode || 'N/A';
  const valCode = item.ValCode || 'N/A';
  const attraction = item.Attraction || 'N/A';
  return `${stockCode}--${valCode}--${attraction}`;
}).join('\n');

  if (options.display) {console.log(results);}

if (options.output) 
  {
  const outputFilePath = path.resolve(options.output);
  try 
  {
  fs.writeFileSync(outputFilePath, results);
  } catch (err) { process.exit(1);}
  }
