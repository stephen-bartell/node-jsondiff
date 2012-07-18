#!/usr/bin/env node

var main = require('../lib/jsdiff.js')
  , pkg = require('../package')
  , nopt = require('nopt')
  , known = { 'diff-only': Boolean
            , 'file-input': Boolean
            , 'output': String
            , 'append': String
            }
  , shorthands =  { 'f': ['--file-input']
                  , 'd': ['--diff-only']
                  }
  , parsed = nopt(known, shorthands, process.argv)
  , help =  [ 'jsdiff v.'+pkg.version
            , ''
            , ''+pkg.description
            , ''
            , 'usage: jsdiff [options] left right'
            , ''
            , 'options:'
            , '   d,  --diff-only       print json diff only.'
            , '   f,  --file-input      read json from files.'
            // , '   o,  --output=FILE     output to FILE or "-" for stdin'
            // , '   a,  --append=FILE     append to FILE'
            ].join('\n')

var args = parsed.argv
if (!parsed.output && !parsed.append && args.remain.length === 0) 
  return console.log(help)

if (args.remain.length > 0 && !parsed['file-input']) {
  console.log('If you\'re trying to read from files, use "-f"')
  return console.log(help)
}

if (parsed['file-input']) {
  parsed.left = args.remain.shift()
  parsed.right = args.remain.shift()
}
main(parsed)