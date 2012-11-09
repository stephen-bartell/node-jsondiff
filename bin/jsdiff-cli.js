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
            , 'usage: jsdiff [options] prev next'
            , ''
            , 'options:'
            , '   d,  --diff-only       print json diff only.'
            , '   f,  --file-input      read json from files.'
            , ''
            , 'environment variables:'
            , ''
            , '   delim                 json document delimiter'
            , ''
            , 'Note:'
            , 'jsdiff is pretty dumb when parsing json from stdin.'
            , 'set the delim env var as the delimiter.'
            ].join('\n')

var args = parsed.argv

if (args.remain.length > 0 && !parsed['file-input']) {
  console.log('If you\'re trying to read from files, use "-f"')
  return console.log(help)
}

parsed.separator = process.env.delim
if (!parsed.separator) parsed.separator = '\r\n\n\n'

if (parsed['file-input']) {
  parsed.prev = args.remain.shift()
  parsed.next = args.remain.shift()
}
main(parsed)