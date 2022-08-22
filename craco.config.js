const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@Components': path.resolve(__dirname, 'src/components'),
      '@Images': path.resolve(__dirname, 'src/assets/images'),
      '@Styles': path.resolve(__dirname, 'src/styles'),
    },
  },
}
