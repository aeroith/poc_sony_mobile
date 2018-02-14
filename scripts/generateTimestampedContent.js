const fs = require('fs');
const { exec } = require('child_process');
const db = require('../db');

const modifiedDbPath = `${__dirname}/modifieddb.json`;
let port = 3005;

const toModify = ['nextAiring'];

const args = process.argv;

if (args.length > 2) {
  const portArg = args.find(a => a.indexOf('--port') > -1);
  if (!portArg) {
    return console.error('Wrong arguments');
  }
  const [param, value] = portArg.split('=');
  if (value > 1024) {
    port = value;
  }
}

const currentTime = Math.round(new Date().getTime() / 1000.0);
const content = db.content
  .map(c => toModify
    .reduce((acc, val) => Object.assign({}, acc, { [val]: (currentTime + c[val] + (3600 * c.id)) }), c));

const deleteFile = path => fs.unlinkSync(path);

const runScript = (script) => {
  const jsonServer = exec(script, (err, stdout) => {
    if (err) {
      return;
    }
    console.log(stdout);
  });
  jsonServer.on('exit', () => console.log('\nJson-server has stopped.'))

  // capture the ctrl-c on main process
  process.on('SIGINT', () => {
    jsonServer.kill();
  });

  // handle exiting gracefully and remove modifieddb file
  process.on('exit', () => {
    deleteFile(modifiedDbPath);
  });
};

return fs.writeFile(modifiedDbPath, JSON.stringify(Object.assign({}, db, { content })), 'utf-8', (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Running json-server at port: ${port}. \nVisit http://localhost:${port}/content to see it!`);
  runScript(`json-server --port=${port} --watch ${modifiedDbPath}`);
});
