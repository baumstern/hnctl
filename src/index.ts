#!/usr/bin/env node

// TODO: Apply a software design principles (package structure, code style...etc)

import { initCommands } from './bootstrap';

import { createWriteStream } from 'fs';
import { spawn } from 'child_process';
import { checkPortStatus } from 'portscanner';

const defaultPort = 8545;

// TODO: follow the DRY principle
function isPortClosed() {
    return new Promise((resolve) => {
        checkPortStatus(defaultPort, (_error, status) => {
            let isPortClosed = false;
            if (status === 'closed') {
                isPortClosed = true;
            }
            resolve(isPortClosed);
        });
    });
}

async function startNode() {
    // Print info
    console.log('Launching hardhat network...⚙️');

    const isPortAvailable = await isPortClosed();
    if (!isPortAvailable) {
        console.log('Error: port ' + defaultPort + ' is not available...');
        process.exit(1);
    }

    // Log for Hardhat network process
    const logStream = createWriteStream('./log');

    // TODO: Maintain child process status in persistent storage
    // Create new process
    logStream.on('open', () => {
        const subProcess = spawn('node', [__dirname + '/node'], {
            detached: true,
            stdio: ['ignore', logStream, logStream, 'ipc'],
        });

        subProcess.on('disconnect', () => {
            console.log('Created hardhat network listening on port 8545...✨');
            // It enables this parent process exit (see: https://nodejs.org/api/child_process.html#optionsdetached)
            subProcess.unref();
        });
    });
}

async function destroyNode() {
    const isPortAvailable = await isPortClosed();
    if (isPortAvailable) {
        console.log('Error: port ' + defaultPort + ' is not in use...');
        process.exit(1);
    }

    const { getBackgroundPID } = await import('./node_utils');
    getBackgroundPID().then((pid) => {
        process.kill(pid);
        console.log('Terminated hardhat network...✨');
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
