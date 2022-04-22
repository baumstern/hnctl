// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as hardhat from 'hardhat';
import { pid } from 'process';

// export async function hn() {
//     // hardhat.hardhatArguments.config = '../hardhat.config.js'
//     // console.log(hardhat.config)

// }

process.disconnect();
console.log(`This process is pid ${pid}`);

hardhat.run('node');
