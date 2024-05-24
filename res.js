#!/usr/bin/env node

const { Command } = require('commander');
const { get } = require('./comp/getmethod');
const { post } = require('./comp/postmethod');
const { del } = require('./comp/deletemethod');


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

program
    .command('post <url> [params...]')
    .description('POST method')
    .action((url, params) => {
        const data = params.reduce((acc, param) => {
            const [key, value] = param.split('=')
            acc[key] = value
            return acc
        }, {})
        post(url, data)
    })

program
    .command('delete <url>')
    .description('DELETE method')
    .action((url) => {
        del(url)
    })

program.parse()
