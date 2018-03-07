module.exports = async (content) => {
  return await new Promise((resolve, reject) => {
    resolve(`.title {font-size: 20px;color: #333;} ${content}`)
  })
}
