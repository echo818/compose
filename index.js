const path = require('path')
const chokidar = require('chokidar')
const cmd = require('node-cmd')

chokidar.watch(path.resolve('src')).on('all', (event, filePath) => {
  if (path.resolve('src/compose.js') === path.resolve(filePath)) {
    cmd.get('node src/compose.js', (err, res) => {
      console.log(res)
    })
  }
})