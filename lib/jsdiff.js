var inspect = require('eyes').inspector({maxLength: null})
  , files = require('./files.js')
  , jpd = require('jsondiffpatch')

module.exports = function (opts) {
  var left
    , right
  if (opts['file-input']) {
    files.readAll([opts.left, opts.right], function(er, files) {
      if (er) throw(er)
      left = files.shift()
      right = files.shift()
      diff(left, right, opts)
    })
  }
}


function diff (left, right, opts) {
  if ('output' in opts && opts.output === '-') {
    process.stdout.write(JSON.stringify(jpd.diff(left, right)))

  } else {
    inspect(jpd.diff(left, right))
  }

}