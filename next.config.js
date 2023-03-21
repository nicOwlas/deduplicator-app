module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Fixes an issue with the File System Access API in Next.js development mode
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};
