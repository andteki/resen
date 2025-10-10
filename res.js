#!/usr/bin/env node

const { Command } = require('commander');
const { startSend } = require('./comp/sender');

function commandParse() {
    const program = new Command();

    program
        .name('res')
        .description('Command-line HTTP client')
        .version('0.13.0')

    program
        .argument('<url>', 'Server url')
        .option('-a, --auth <token>', 'Token')
        .option('-A, --auth-type <type>', 'The authentication mechanism. bearer|basic|digest')
        .option('-I, --ignore-stdin', 'Do not attempt to read stdin')
        .parse()
        .action((url, options) => {
            startSend(url, 'GET', {}, options)
        })

    program
        .command('get <url>')
        .description('GET method')
        .option('-a, --auth <token>', 'Token')
        .option('-A, --auth-type <type>', 'The authentication mechanism. bearer|basic|digest')
        .option('-I, --ignore-stdin', 'Do not attempt to read stdin')
        .parse()
        .action((url, options) => {
            startSend(url, 'GET', {}, options)
        })

    program
        .command('post <url> [params...]')
        .description('POST method. The params: Key=value pairs, separated by spaces.')
        .option('-a, --auth <token>', 'Token')
        .option('-A, --auth-type <type>', 'The authentication mechanism. bearer|basic|digest')
        .option('-I, --ignore-stdin', 'Do not attempt to read stdin')
        .parse()
        .action(async (url, params, options) => {
            await startSend(url, 'POST', params, options)
        })

    program
        .command('put <url> [params...]')
        .description('PUT method')
        .option('-a, --auth <token>', 'Token')
        .option('-A, --auth-type <type>', 'The authentication mechanism. bearer|basic|digest')
        .option('-I, --ignore-stdin', 'Do not attempt to read stdin')
        .parse()
        .action((url, params, options) => {
            startSend(url, 'PUT', params, options)
        })

    program
        .command('patch <url> [params...]')
        .description('PATCH method')
        .option('-a, --auth <token>', 'Token')
        .option('-A, --auth-type <type>', 'The authentication mechanism. bearer|basic|digest')
        .option('-I, --ignore-stdin', 'Do not attempt to read stdin')
        .parse()
        .action((url, params, options) => {
            startSend(url, 'PATCH', params, options)           
        })

    program
        .command('delete <url>')
        .description('DELETE method')
        .option('-a, --auth <token>', 'Token')
        .option('-A, --auth-type <type>', 'The authentication mechanism. bearer|basic|digest')
        .option('-I, --ignore-stdin', 'Do not attempt to read stdin')
        .parse()
        .action((url, options) => {
            startSend(url, 'DELETE', {}, options)
        })

    program.parse()
}

commandParse()
