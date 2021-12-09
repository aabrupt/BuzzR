const {nanoid} = require('nanoid')
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config, options) => {
      config.plugins.push(
          {
              apply: (compiler) => {
                  compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                      
                  });
              }
          }    
      )
      return config
  },
}
