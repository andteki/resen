#!/usr/bin/env node

const { Command } = require('commander');
const { get } = require('./comp/getmethod');
const { post } = require('./comp/postmethod');
const { del } = require('./comp/deletemethod');
const { convertToObject } = require('./comp/tools');
const { put } = require('./comp/putmethod');
const { patch } = require('./comp/patchmethod');

var inputData = {};

if(!process.stdin.isTTY) {
  process.stdin.on('data', (content) => {
    inputData = JSON.parse(content.toString().trim())
    handler()
  })
} else {
    handler()       
}

function handler() {
    const program = new Command();

    program
        .name('res')
        .description('Command-line HTTP client')
        .version('0.12.0')

    program
        .argument('<url>', 'Server url')
        .option('-a, --auth <token>', 'Token')
        .option('-A, --auth-type <type>', 'The authentication mechanism. Currently only: bearer')
        .parse()
        .action((url, options) => {
            get(url, options)
        })

    program
        .command('get <url>')
        .description('GET method')
        .option('-a, --auth <token>', 'Token')
        .option('-A, --auth-type <type>', 'The authentication mechanism. Currently only: bearer')
        .parse()
        .action((url, options) => {
            get(url, options)
        })

    program
        .command('post <url> [params...]')
        .description('POST method. The params: Key=value pairs, separated by spaces.')
        .option('-a, --auth <token>', 'Token')
        .option('-A, --auth-type <type>', 'The authentication mechanism. Currently only: bearer')
        .parse()
        .action(async (url, params, options) => {
            if(!Object.keys(inputData).length) {
                inputData = convertToObject(params)
            }
            post(url, inputData, options)
        })

    program
        .command('put <url> [params...]')
        .description('PUT method')
        .option('-a, --auth <token>', 'Token')
        .option('-A, --auth-type <type>', 'The authentication mechanism. Currently only: bearer')
        .parse()
        .action((url, params, options) => {
            if(!Object.keys(inputData).length) {
                inputData = convertToObject(params)
            }
            put(url, inputData, options)
        })

    program
        .command('patch <url> [params...]')
        .description('PATCH method')
        .option('-a, --auth <token>', 'Token')
        .option('-A, --auth-type <type>', 'The authentication mechanism. Currently only: bearer')
        .parse()
        .action((url, params, options) => {
            if(!Object.keys(inputData).length) {
                inputData = convertToObject(params)
            }
            patch(url, inputData, options)            
        })

    program
        .command('delete <url>')
        .description('DELETE method')
        .option('-a, --auth <token>', 'Token')
        .option('-A, --auth-type <type>', 'The authentication mechanism. Currently only: bearer')
        .parse()
        .action((url, options) => {
            del(url, options)
        })

    program.parse()
}