#!/usr/bin/env node

import { initCommands } from './bootstrap';

async function startNode() {
    const hardhat = await import('./node');
    hardhat.hn();
}

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
