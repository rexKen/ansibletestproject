// console.log(process.env.NODE_ENV)
const config = {
  dev: {
    host: 'localhost',
    port: 8082,
    proxy: {
      // '/api': {
      //   target: 'http://localhost:3000',
      //   pathRewrite: { '^/api': '' }
      // }
    },
    publicPath: '/',
    assetsPublicPath: '/assets/', //资源开发地址
  },
  build: {
    publicPath: '/fdc-front/'
  }
}

module.exports = config
