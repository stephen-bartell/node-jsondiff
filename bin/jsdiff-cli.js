#!/usr/bin/env node

var main = require('../lib/jsdiff.js')
  , pkg = require('../package')
  , nopt = require('nopt')
  , known = { 'patch-only': Boolean
            , 'output': String
            , 'append': String
            }
  , parsed = nopt(known, process.argv, 2)
  , help =  [ 'jsdiff v.'+pkg.version
            , ''
            , ''+pkg.description
            , ''
            , 'usage: jsdiff [options] left right'
            , ''
            , 'options:'
            , '   p,  --patch-only      return patch only.'
            , '   o,  --output=FILE     output to FILE or "-" for stdin'
            , '   a,  --append=FILE     append to FILE'
            ].join('\n')



console.log(parsed)
// main(parsed)
