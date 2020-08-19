#!/usr/bin/env node
require('shelljs/global');

const program = require('commander');
const command = require('../src');
const package = require('../package.json');

program.version(package.version);

program.on('--help', () => {
  // Print PO UI
  console.log('  ____     ___         _   _   ___   _   _  ');
  console.log(' |  _ \\   / _ \\       | | | | |_ _| | | | | ');
  console.log(' | |_) | | | | |      | | | |  | |  | | | | ');
  console.log(' |  __/  | |_| |      | |_| |  | |  |_| |_| ');
  console.log(' |_|      \\___/        \\___/  |___| (_) (_) ');
});

program
  .command('new <themeName>')
  .alias('n')
  .description('Create a new theme for PO UI')
  .action(themeName => command.new(themeName));

program
  .command('build')
  .alias('b')
  .description('Build package for new theme')
  .option('--fonts', 'to copy custom fonts')
  .option('--name', 'name of file generated on build')
  .action(options => command.build(options));

program.parse(process.argv);
