// 配置信息
module.exports = {
  lintOnSave: true, // 是否开启eslint
  // 代理服务器
  devServer: {
    proxy: {
      // 表示以/api开头的地址，都会走当前正向代理
      '/api': {
        target: 'https://elm.cangdu.org',
        // 是否允许跨域
        changeOrigin: true,
        // 地址重写，将/api地址去掉
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
}