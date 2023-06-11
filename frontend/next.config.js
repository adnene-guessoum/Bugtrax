module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.mjs$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'next/babel',
              '@babel/preset-react',
              '@babel/preset-typescript',
              '@babel/preset-env'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-private-methods'
            ]
          }
        }
      });
    }
    return config;
  }
};
