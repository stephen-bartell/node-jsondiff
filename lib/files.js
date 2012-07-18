var fs = require('fs')
  , path = require('path')
  , jdp = require('jsondiffpatch')


module.exports.readAll = function (files, cb) {
  var res = []
    , count = 0

  var iterate = function () {
    if (count === files.length) return cb(null, res)
    if (!files[count]) {
      res[count] = {}
      count +=1
      iterate()

    } else {
      fs.readFile(files[count], function (er, data) {
        if (er) return cb(er)
        res[count] = JSON.parse(data)
        count += 1
        iterate()
      })
    }
  }
  iterate()
}


// modules.exports.write = function (data) {
//   fs.writeFile()
// }


// module.exports.diff = function (opts, files, cb) {
//   this.readAll(args, function (er, files) {
//     if (er) throw(er)
//     if (opts['patch-only']) {
//       return cb(null, jdp.diff(files[0], files[1]))
//     } else {
//       cb(null, difflet.compare(files[0], files[1]))
      
//     }
//   })
// }

