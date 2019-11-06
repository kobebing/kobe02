module.exports = {
  // 打包的根路径 使用的是相对
  publicPath: './',
  configureWebpack:{
  externals: {
    'vue':'Vue',
    'vue-router':"VueRouter",
    'axios':'axios',
    'element-ui':"ELEMENT"
  }
}
}