module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push({
            test: /\.md$/,
            use: {
                loader: 'raw-loader'
            },
          }, {
            test: /\.(jpg|png)$/,
            use: {
              loader: 'url-loader',
            },
          });
        return config;
    },
    webpackDevMiddleware: (config) => {
      // Perform customizations to webpack dev middleware config
      // Important: return the modified config
      return config
    },
  }