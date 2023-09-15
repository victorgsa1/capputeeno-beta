module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.flow$/,
      use: 'null-loader',
    });

    return config;
  },
};