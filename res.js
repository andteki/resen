#!/usr/bin/env node

const { Command } = require('commander');
const { get } = require('./comp/getmethod');


const program = new Command();

program
    .name('res')
    .description('Command-line HTTP client')
    .version('0.0.1');

program
    .argument('<url>', 'Server url')
    .action((url) => {
        get(url)
    })

program
    .command('get <url>')
    .description('GET method')
    .action((url) => {
        get(url)
    })

program.parse()
