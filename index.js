#! /usr/bin/env node
const {program} = require('commander');
const chalk = require('chalk');
const moveAndConvert = require('./commands/moveAndConvert');
program
  .argument('<dir>')
  .option('-o, --output <outputdir>', 'output directory')
  .option(`-t, --type <type>`, `output type [${chalk.green('text')},${chalk.green('json')}]`)
  .usage(`${chalk.green('<dir>')} directory origin file`)
  .action(moveAndConvert);
    
program.parse()