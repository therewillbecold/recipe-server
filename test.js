var fs = require('fs')

fs.readFile('./entry222.js', { encoding: 'utf-8' }, (err, data) => {
  console.log(err, data)
})
