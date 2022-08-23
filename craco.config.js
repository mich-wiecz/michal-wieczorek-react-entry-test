const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@Components': path.resolve(__dirname, 'src/components'),
      '@Images': path.resolve(__dirname, 'src/assets/images'),
      '@Styles': path.resolve(__dirname, 'src/styles'),
      '@Queries': path.resolve(__dirname, 'src/queries'),
      '@Utils': path.resolve(__dirname, 'src/utils'),
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          use: [
            {
              loader: 'optimized-images-loader',
              options: {
                includeStrategy: 'react',
              },
            },
          ],
        },
      ],
    },
  },
  babel: {
    plugins: ['react-optimized-image/plugin'],
  },
}
