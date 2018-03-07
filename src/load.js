const fs = require('fs')
const path = require('path')

module.exports = async (content) => {
  const filePath = path.resolve(content)
  return await fs.readFileSync(filePath, 'utf-8')
}
