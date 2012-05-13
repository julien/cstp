A node module to serve static files and compile [CoffeeScript](http://www.coffeescript.org) (.coffee) files.

### Instalation

    npm install cstp

or for a global installation

    npm install -g cstp

### Usage:
    Usage: cstp.js [options]

    Options:

    -h, --help         output usage information
    -V, --version      output the version number
    -p, --port <port>  The port on which to run the server.
    -c, --compile      Should it invoke coffee -w -c (watch and compile).
    -s, --src [path]   CoffeeScript source directory.
    -o, --out [path]   CoffeeScript output directory.


### Misc:

This is **a really basic** npm module so don't expect much.

Check the example in the examples dir (it just serves a basic html file, using the generated javascript from the coffeescript source).








