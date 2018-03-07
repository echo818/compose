const fs = require('fs')
const path = require('path')
const less = require('less')
// const isGeneratorFunction = require('is-generator-function')
// const compose = require('koa-compose')

// const getContent = async (strPath) => {
//   const filePath = path.resolve(strPath)
//   return await fs.readFileSync(strPath, 'utf-8')
// }

// const addContent = (content) => {
//   return `#box {font-size: 20px;} ${content}`
// }

// const asyncContent = async (content) => {
//   return await new Promise((resolve, reject) => {
//     resolve(`.title {font-size: 20px;color: #333;} ${content}`)
//   })
// }

// const styleRender = async (content) => {
//   return await less.render(content).then(res => {
//     return res.css
//   })
// }

let middleware = []

~['load', 'append', 'async', 'render'].forEach(item => {
  middleware.push(require(`./${item}`))
})

// const middleware = [getContent, addContent, asyncContent, styleRender]

const compose = (fn) => {
  let i = 0
  const dispatch = (content) => {
    if (Object.prototype.toString.call(fn[i]).slice(8, -1) === 'AsyncFunction') {
      return fn[i](content)
              .then(res => {
                if (++i === fn.length) return res
                else return dispatch(res)
              })
    } else {
      content = fn[i](content)
      if (++i === fn.length) return content
      else return dispatch(content)
    }
  }
  return dispatch
}

const fnMiddleware = compose(middleware)
fnMiddleware('src/index.less').then(res => console.log(res))
