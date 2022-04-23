import { run } from 'hardhat';

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
    run('node');

    // There might be delay to launch hardhat network in slow processor before closing cli process
    // TODO: check if port is opened for hardhat network before terminate parent cli process
    process.disconnect();
}
