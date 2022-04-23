import { ArgumentParser } from 'argparse';

const version = '0.0.1';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function initCommands(): ArgumentParser {
    const parser = new ArgumentParser({
        description: 'hardhat network contoller (hnctl)',
        add_help: true,
    });

    parser.add_argument('-v', '--version', { action: 'version', version });

    const subParsers = parser.add_subparsers({ dest: 'subcommand' });
    subParsers.add_parser('start', {
        help: 'start hardhat network',
    });
    subParsers.add_parser('destroy', {
        help: 'destroy hardhat network',
    });
    subParsers.add_parser('logs', {
        help: 'print logs of hardhat network',
    });

    return parser;
}

export { initCommands };
