#!/usr/bin/env node
var program = require('commander')
  , exec = require('child_process').exec
  , fs = require('fs')
  , http = require('http')
  , url = require('url')
  , port = 3333
  , compile = false
  , src
  , out;
 

program
  .version('0.0.3')
  .option('-p, --port <port>', 'The port on which to run the server.')
  .option('-c, --compile', 'Should it invoke coffee -w -c (watch and compile).')
  .option('-s, --src [path]', 'CoffeeScript source directory.', 'cs')
  .option('-o, --out [path]', 'CoffeeScript output directory.', 'js')
  .parse(process.argv);


function startServer(port) {
  var path = require('path')
    , uri
    , filename;

  http.createServer(function (request, response) {
    uri = url.parse(request.url).pathname;
    filename = path.join(process.cwd(), uri);
     
    path.exists(filename, function (exists) {
      if (!exists) {
        response.writeHead(404, {'Content-type' : 'text/plain'});
        response.end('404 not found');
        return;
      }
      fs.readFile(filename, 'binary', function (err, file) {
        if (err) {
          response.writeHead(500, {'Content-type' : 'text/plain'});
          response.end(err + '\n');
          return;
        }
        response.writeHead(200);
        response.end(file, 'binary');
      });
    }); 
    
  }).listen(port);
  console.log('Starting server on port %d', port);
}

function compileCoffee(outDir, srcDir) {
  var callback, child;
  callback = function (error, stdout, stderr) {
    if (error !== null) 
      console.log(error);
  };
  child = exec('coffee -o ' + outDir + ' -w -c ' + srcDir, callback);
  return child;
}


if (program.port) port = program.port;

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

startServer(port);

