#!/usr/bin/env node

const { Command } = require('commander');
const { startSend } = require('./comp/sender');
const version = '0.13.3';

function commandParse() {
    const program = new Command();

    program
        .name('res')
        .description('Command-line HTTP client')
        .version(version)

    program
        .argument('<url>', 'Server url')
        .option('-a, --auth <token>', 'Token')
        .option('-A, --auth-type <type>', 'The authentication mechanism. bearer|basic|digest')
        .option('-I, --ignore-stdin', 'Do not attempt to read stdin')
        .parse()
        .action(async (url, options) => {
            await startSend(url, 'GET', {}, options, version)
        })

    program
        .command('get <url>')
        .description('GET method')
        .option('-a, --auth <token>', 'Token')
        .option('-A, --auth-type <type>', 'The authentication mechanism. bearer|basic|digest')
        .option('-I, --ignore-stdin', 'Do not attempt to read stdin')
        .parse()
        .action(async (url, options) => {
            await startSend(url, 'GET', {}, options, version)
        })

    program
        .command('post <url> [params...]')
        .description('POST method. The params: Key=value pairs, separated by spaces.')
        .option('-a, --auth <token>', 'Token')
        .option('-A, --auth-type <type>', 'The authentication mechanism. bearer|basic|digest')
        .option('-I, --ignore-stdin', 'Do not attempt to read stdin')
        .parse()
        .action(async (url, params, options) => {
            await startSend(url, 'POST', params, options, version)
        })

    program
        .command('put <url> [params...]')
        .description('PUT method')
        .option('-a, --auth <token>', 'Token')
        .option('-A, --auth-type <type>', 'The authentication mechanism. bearer|basic|digest')
        .option('-I, --ignore-stdin', 'Do not attempt to read stdin')
        .parse()
        .action((url, params, options) => {
            startSend(url, 'PUT', params, options, version)
        })

    program
        .command('patch <url> [params...]')
        .description('PATCH method')
        .option('-a, --auth <token>', 'Token')
        .option('-A, --auth-type <type>', 'The authentication mechanism. bearer|basic|digest')
        .option('-I, --ignore-stdin', 'Do not attempt to read stdin')
        .parse()
        .action((url, params, options) => {
            startSend(url, 'PATCH', params, options, version)           
        })

    program
        .command('delete <url>')
        .description('DELETE method')
        .option('-a, --auth <token>', 'Token')
        .option('-A, --auth-type <type>', 'The authentication mechanism. bearer|basic|digest')
        .option('-I, --ignore-stdin', 'Do not attempt to read stdin')
        .parse()
        .action((url, options) => {
            startSend(url, 'DELETE', {}, options, version)
        })

    program.parse()
}

commandParse()
