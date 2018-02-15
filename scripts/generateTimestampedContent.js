const fs = require('fs');
const { exec } = require('child_process');
const chokidar = require('chokidar');

const log = console.log.bind(console);
const modifiedDbPath = `${__dirname}/modifieddb.json`;
let port = 3005;

const toModify = ['nextAiring'];

// parse --port argument
const args = process.argv;
if (args.length > 2) {
  const portArg = args.find(a => a.indexOf('--port') > -1);
  if (!portArg) return console.error('Wrong arguments');
  const [param, value] = portArg.split('=');
  if (value > 1024) {
    port = value;
  }
}

const currentTime = Math.round(new Date().getTime() / 1000.0);


const getDb = () => JSON.parse(fs.readFileSync(`${__dirname}/../db.json`));
const getDbContent = () => {
  const db = getDb();
  const content = db.content
    .map(c => toModify
      .reduce((acc, val) => Object.assign({}, acc, { [val]: (currentTime + c[val] + (3600 * c.id)) }), c));
  return Object.assign({}, db, { content })
};


const deleteFile = path => fs.unlinkSync(path);

const runScript = (script) => {
  this.jsonServer = exec(script, (err, stdout) => {
    if (err) return;
    console.log(stdout);
  });
  this.jsonServer.on('exit', () => console.log('\nJson-server has stopped.'));

  // capture the ctrl-c on main process
  process.on('SIGINT', () => {
    this.jsonServer.kill();
    this.watcher.close();
  });

  // handle exiting gracefully and remove modifieddb file
  process.on('exit', () => {
    deleteFile(modifiedDbPath);
  });
};

return fs.writeFile(modifiedDbPath, JSON.stringify(getDbContent()), 'utf-8', (err) => {
  if (err) return console.log(err);
  this.watcher = chokidar.watch(`${__dirname}/../db.json`);
  this.watcher
    .on('change', () => {
      fs.writeFileSync(modifiedDbPath, JSON.stringify(getDbContent()), 'utf-8');
    })
    .on('error', (error) => {
      log(`Watcher error: ${error}`);
    });
  console.log(`Running json-server at port: ${port}. \nVisit http://localhost:${port}/content to see it!`);
  runScript(`json-server --port=${port} --watch ${modifiedDbPath}`);
});
