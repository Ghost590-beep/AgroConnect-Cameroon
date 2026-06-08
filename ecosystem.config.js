module.exports = {
  apps: [
    {
      name: "agroconnect-server",
      script: "./server/index.js",
      cwd: "./",
      env: {
        NODE_ENV: "production",
        PORT: process.env.SERVER_PORT || 5000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: process.env.SERVER_PORT || 5000,
      },
    },
  ],
};
