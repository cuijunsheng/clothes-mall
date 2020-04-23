/**
 * vue.config.js是vue-cli3以上版本，提供给我们自己定义配置的文件，运行和打包时会将该文件与基本的配置文件合并
 * @type {{}}
 */
module.exports = {
  //publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views'
      }
    }
  }
}
