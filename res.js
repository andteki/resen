#!/usr/bin/env node

const { Command } = require('commander');
const { get } = require('./comp/getmethod');
const { post } = require('./comp/postmethod');
const { del } = require('./comp/deletemethod');
const { convertToObject } = require('./comp/tools');
const { put } = require('./comp/putmethod');
const { patch } = require('./comp/patchmethod');


const program = new Command();

program
    .name('res')
    .description('Command-line HTTP client')
    .version('0.9.2');

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
    .description('POST method. The params: Key=value pairs, separated by spaces.')
    .action((url, params) => {
        const data = convertToObject(params)
        post(url, data)
    })

program
    .command('put <url> [params...]')
    .description('PUT method')
    .action((url, params) => {
        const data = convertToObject(params)
        put(url, data)
    })

program
    .command('patch <url> [params...]')
    .description('PATCH method')
    .action((url, params) => {
        const data = convertToObject(params)
        patch(url, data)
    })

program
    .command('delete <url>')
    .description('DELETE method')
    .action((url) => {
        del(url)
    })

program.parse()
