#!/usr/bin/env node

/** 
 * @author: jcastelain <jcastelain@gmail.com> 
 */
var program = require('commander')
  , exec = require('child_process').exec
  , fs = require('fs')
  , express = require('express')
  , port = 3333
  , dir
  , compile = true
  , src
  , out;

program
  .version('0.0.1')
  .option('-p, --port <port>', 'The port on which to run the server.')
  .option('-d, --dir [path]', 'The directory from where to serve files.', './')
  .option('-c, --compile', 'Enable CoffeeScript compilation.')
  .option('-s, --src [path]', 'CoffeeScript source directory.', 'cs')
  .option('-o, --out [path]', 'CoffeeScript output directory.', 'js')
  .parse(process.argv);


function startServer(port, path) {
  var server;
  server = express.createServer();
  server.configure(function () {
    server.use(express.static(path));
    server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    server.use(express.logger(':method :url :status'));
  });
  server.get('/', function(req, res) {
    return res.render('index.html');
  });
  server.listen(parseInt(port, 10));
  return server;
}

function compileCoffee(outDir, srcDir) {
  var callback, child;
  callback = function (error, stdout, stderr) {
    if (error !== null) {
      console.log('[error]: ' + error);
    }
  };
  child = exec('coffee -o ' + outDir + ' -w -c ' + srcDir, callback);
  return child;
}


if (program.port) port = program.port;
dir = program.dir ? program.dir : fs.realpathSync(dir);
if (program.compile) compile = program.compile;

if (compile) {
  if (program.src) src = program.src;
  if (program.out) out = program.out;

  try {
    src = fs.realpathSync(dir + '/' + src);
  } catch (e) { }

  try {
    out = fs.realpathSync(dir + '/' + out);
  } catch (e) { }

  if (src !== null && out !== null) 
    compileCoffee(out, src);
}
console.log('Starting server from %j on port %d', dir, port);
startServer(port, dir);

