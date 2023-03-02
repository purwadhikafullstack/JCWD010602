module.exports = {
  apps: [
    {
      name: "JCWD-0106-02", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 8010602,
      },
      time: true,
    },
  ],
};
