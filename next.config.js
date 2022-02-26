/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // webpackDevMiddlewareの設定を追加
  // HOKIDAR_USEPOLLING=trueにするだけではDocker環境でホットリロードされなかった
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
    };
    return config;
  },
};

module.exports = nextConfig;
