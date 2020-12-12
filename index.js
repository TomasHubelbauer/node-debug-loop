import cdp from './node-cdp-ws/index.js';
import readline from 'readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(/** @type {string} */ question) {
  return new Promise((resolve, reject) => {
    rl.on('close', reject);
    rl.question(question, resolve);
  });
}

let pid;

function interact() {
  return new Promise(async resolve => {
    const send = await cdp(process.pid, async message => {
      global.stream.end();
      global.response.connection.end();
      global.response.destroy();
      await new Promise(resolve => setTimeout(resolve, 100));
      resolve(message.result.result.value);
    });

    send({ id: 1, method: 'Runtime.evaluate', params: { expression: 'process.pid' } });
  });
}

void async function() {
  while (pid = await ask('PID:\n')) {
    const check = await interact();
    console.log(check, check.toString() === pid ? 'OK' : 'NOK');
  }
}()
