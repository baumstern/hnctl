#!/usr/bin/env node

// TODO: Apply a software design principles (package structure, code style...etc)

import { initCommands } from './bootstrap';

import { fork } from 'child_process';
import { createWriteStream } from 'fs';

async function startNode() {
    // Print info
    console.log('Launching hardhat network...✨');
    console.log(
        'The hardhat network will listening the port 8545 in the background...👂',
    );

    // Log for Hardhat network process
    const logStream = createWriteStream('./log');

    // Create new process
    logStream.on('open', () => {
        fork(__dirname + '/node', {
            detached: true,
            stdio: ['ipc', logStream, logStream],
        });
    });
}

async function destroyNode() {
    const { getBackgroundPID } = await import('./node_utils');
    getBackgroundPID().then((pid) => {
        process.kill(pid);
    });
}

// To resolve hardhat.config.js file for hardhat process, when this package installed global scope
process.chdir(__dirname);

const parser = initCommands();
// TODO: Move to bootstrap.ts
const args = parser.parse_args();
const subCommand = args.subcommand;

switch (subCommand) {
    case 'start':
        startNode();
        break;
    case 'destroy':
        destroyNode();
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
