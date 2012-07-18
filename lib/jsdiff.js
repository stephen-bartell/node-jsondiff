var inspect = require('eyes').inspector({maxLength: null})
  , files = require('./files.js')
  , jpd = require('jsondiffpatch')
  , stdin = process.stdin
  , stdout = process.stdout
  , BufferStream = require('bufferstream')


module.exports = function (opts) {
  var prev
    , next

  if (opts['file-input']) {
    // this on is easy, just read and diff the files

    files.readAll([opts.prev, opts.next], function(er, files) {
      if (er) throw(er)
      prev = files.shift()
      next = files.shift()
      diff(prev, next, opts)
    })
  } else {
    // this one is not so easy

    // `buffer` will buffer incoming data. While its doing this
    // it is looking for `opts.separator`.  When `separator` is found, 
    // the buffer is sliced and the chunk is emitted with "split" event.
    var buffer = new BufferStream({encoding:'utf8', size:'flexible'})
    buffer.split(opts.separator)

    prev = next = {}
    buffer.on('split', function (maybejson, token) {
      next = {}
      try {
        next = JSON.parse(maybejson)  
      } catch(jsonerr) {
        //do nothing.
      }
      diff(prev, next, opts)

      // move the next to the prev to get ready for next diff
      prev = next
    })

    // pipe stdin into buffer
    stdin.setEncoding('utf8')
    stdin.resume()
    stdin.on('data', function (data) {
      buffer.write(data)
    })
  }
}



function diff (prev, next, opts) {
  if ('output' in opts && opts.output === '-') {
    process.stdout.write(JSON.stringify(jpd.diff(prev, next)))

  } else {
    inspect(jpd.diff(prev, next))
  }

}