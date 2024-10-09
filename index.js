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

fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) 
  {
    console.error('Cannot find input file');
    process.exit(1);
  }

  let result;
  try 
  {
    result = JSON.parse(data);
  } catch (parseError) 
  {
    process.exit(1);
  }

  if (options.display) 
  {
    console.log(result);
  }

  if (options.output) 
  {
    const outputFilePath = path.resolve(options.output);
    fs.writeFile(outputFilePath, JSON.stringify(result, null, 2), () => {});
  }

});
