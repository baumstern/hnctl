import {initCommands} from  './bootstrap.js'

const parser = initCommands()
// TODO: Move to bootstrap.ts
const args = parser.parse_args()
const subCommand = args.subcommand;

switch (subCommand) {
    case 'start':
        console.log('Implement me!');
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
