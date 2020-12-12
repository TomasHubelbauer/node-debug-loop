import readline from 'readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('PID: ' + process.pid + '\n', console.log);
