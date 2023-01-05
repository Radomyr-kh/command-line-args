// !example command:
// node server.js - i 500 - t 2500

const express = require('express');
const yargs = require('yargs');
const PORT = 3000;
const app = express();

const argv = yargs
  .option('interval', {
    alias: '-i',
    description: 'console output recurrence interval',
    type: 'number',
    default: 500,
  })
  .option('timeout', {
    alias: '-t',
    description: 'time after which the web client message will be displayed',
    type: 'number',
    default: 5000,
  })
  .help().argv;

// console.log(`interval: ${argv.interval} timeout: ${argv.timeout}`);

// !server
app.get('/', (req, res) => {
  console.log('Starting');
  console.log(`Server is listening on ${PORT}`);
  let myInterval = setInterval(
    () => console.log(new Date().toLocaleString()),
    argv.interval
  );

  setTimeout(() => {
    clearInterval(myInterval);
    res.send(new Date().toLocaleString());
  }, argv.timeout);
});

app.listen(PORT);
