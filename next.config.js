const {nanoid} = require('nanoid')
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config, options) => {
      config.plugins.push(
          {
              apply: (compiler) => {
                  compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                      process.env.SALT = nanoid(15)
                  });
              }
          }    
      )
      return config
  },
}
