const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const chokidar = require('chokidar');

const log = console.log.bind(console);
const modifiedDbPath = `${__dirname}/modifieddb.json`;
let port = 3005;

const toModify = {
  content: ['nextAiring'],
  guide: ['timeStart', 'timeEnd']
};

// parse --port argument
const args = process.argv;
if (args.length > 2) {
  const portArg = args.find(a => a.indexOf('--port') > -1);
  if (!portArg) {
    console.error('Wrong arguments');
    process.exit();
  }
  const [param, value] = portArg.split('=');
  if (value > 1024) {
    port = value;
  }
}

const currentTime = Math.round(new Date().getTime() / 1000.0);


const getDb = () => JSON.parse(fs.readFileSync(`${__dirname}/../db.json`));
const getDbContent = () => {
  const db = getDb();
  return Object.keys(toModify)
    .reduce((acc, key) => {
      const modified = acc[key]
        .map(c => toModify[key]
          .reduce((acc0, val) =>
            Object.assign({}, acc0, { [val]: (currentTime + acc0[val] + (3600 * acc0.id)) }), c));
      return Object.assign({}, acc, { [key]: modified });
    }, db);
};


const deleteFile = path_ => fs.unlinkSync(path_);

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

let baseContent;
try {
  baseContent = getDbContent();
} catch (err1) {
  console.log(`Error at file ${path.normalize(`${__dirname}/../db.json`)}: ${err1.message}`);
  process.exit();
}

fs.writeFile(modifiedDbPath, JSON.stringify(baseContent), 'utf-8', (err) => {
  if (err) return console.log(err);
  this.watcher = chokidar.watch(`${__dirname}/../db.json`);
  this.watcher
    .on('change', () => {
      let content;
      try {
        content = getDbContent();
      } catch (err_) {
        console.log(`Error at file ${path.normalize(`${__dirname}/../db.json`)}: ${err_.message}`);
      }
      fs.writeFileSync(modifiedDbPath, JSON.stringify(content), 'utf-8');
    })
    .on('error', (error) => {
      log(`Watcher error: ${error}`);
    });
  console.log(`Running json-server at port: ${port}. \nVisit http://localhost:${port} to see it!`);
  runScript(`json-server --port=${port} --watch ${modifiedDbPath} --delay 250`);
});
