// This is the entrypoint of the child process to run hardhat network.
// All of the implementations are in the `node_utils.ts` files.
// When its contents are belongs together to this file, then all the code block's are called at the moment of forked.
// I don't know why this happens yet so separated to the another file to to fix the misbehavior

import { runHardhatNetwork } from './node_utils';

async function init() {
    await runHardhatNetwork();
}

init();
