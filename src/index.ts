#!/usr/bin/env node

import { initCommands } from './bootstrap';

import { fork } from 'child_process';
import { pid } from 'process';
import { createWriteStream } from 'fs';

async function startNode() {
    console.log('Launching hardhat network... ✨');
    console.log(
        'The hardhat network will listening the port 8545 in the background... 👂',
    );
    const logStream = createWriteStream('./log');

    logStream.on('open', () => {
        fork(__dirname + '/node', {
            detached: true,
            stdio: ['ipc', logStream, logStream],
        });
    });
}

console.log(`This process is pid ${pid}`);

process.chdir(__dirname);

const parser = initCommands();
// TODO: Move to bootstrap.ts
const args = parser.parse_args();
const subCommand = args.subcommand;

switch (subCommand) {
    case 'start':
        startNode();
        break;
    case 'restart':
        console.log('Implement me!');
        break;
    case 'destroy':
        console.log('Implement me!');
        break;
    case 'logs':
        console.log('Implement me!');
        break;
    case 'status':
        console.log('Implement me!');
        break;
    default:
        parser.print_help();
}
