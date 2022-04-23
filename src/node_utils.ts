import * as hardhat from 'hardhat';

import { pid } from 'process';

import { init, setItem, getItem } from 'node-persist';

async function saveCurrentPID() {
    await init();
    await setItem('pid', pid);
}

export async function getBackgroundPID() {
    await init();
    const pid = await getItem('pid');

    return pid;
}

export async function runHardhatNetwork() {
    saveCurrentPID();
    hardhat.run('node');
    process.disconnect();
}
