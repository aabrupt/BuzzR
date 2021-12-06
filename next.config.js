const {nanoid} = require('nanoid')
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config, options) => {
      config.plugins.push(
          {
              apply: (compiler) => {
                  compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                      process.env.SALT = nanoid(16)
                      process.env.KEY = nanoid(16)
                  });
              }
          }    
      )
      return config
  },
}
